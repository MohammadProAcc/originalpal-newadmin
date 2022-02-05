import { Button, Checkbox, InputGroup, Modal, Select } from '@paljs/ui'
import axios from 'axios'
import { FlexContainer, HeaderButton, ModalBox } from 'components'
import Cookies from 'js-cookie'
import Layout from 'Layouts'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone-uploader'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { admin, removeItem, useStore } from 'utils'
import { deleteBanner, uploadBannerImage } from 'utils/api/REST/actions/banners'
import { updateBanner } from 'utils/api/REST/actions/banners/updateBanner'

export function EditBanner() {
  const router = useRouter()

  const { banner } = useStore((state: any) => ({
    banner: state?.banner,
  }))

  const platformOptions = [
    { label: 'دسکتاپ', value: 'desktop' },
    { label: 'موبایل', value: 'mobile' },
  ]

  const [platform, setPlatform] = useState<any>(
    platformOptions.find((option: any) => option?.value === banner?.platform),
  )

  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(!!banner?.active)

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      ...(banner ?? null),
    },
  })

  const updateImage = async (image: File) => {
    const formData = new FormData()
    formData.append('media[]', image)

    const { data: response } = await admin().post(`/banners/image/${banner?.id}`, {
      image: formData,
    })
    console.log(response)
  }

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('banners', removeId, deleteBanner, () => router.push('/banners'), [
      `بنر ${removeId} با موفقیت حذف شد`,
      'حذف بنر موفقیت آمیز نبود',
    ])
  }

  // called every time a file's `status` changes
  // const handleChangeStatus = ({ meta, file }: any, status: any) => {
  //   if (status === 'done') {
  //     const formData = new FormData();
  //     formData.append('media[]', file);

  //     axios.post(`${process.env.API}/admin/banners/image/${banner?.id}`,
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: `Bearer 693|4ESmFZNsaQbSt8eNPV9CQwqcl1rGjOQVgaeI1swF`
  //         }
  //       }
  //     ).then(result => console.log(result))
  //   }
  // };

  const onSubmit = async (form: any) => {
    setLoading(true)

    const image = form?.image
    delete form.image

    const finalForm = {
      ...form,
      platform: platform?.value,
      active,
      type: 'stand',
    }

    const updatBannerResponse = await updateBanner(
      router?.query?.banner_id as string,
      finalForm,
      Cookies.get('token') ?? '',
    )

    if (updatBannerResponse?.status === 'success') {
      const formData = new FormData()
      formData.append('image', image[0])

      const uploadResponse = await uploadBannerImage(banner?.id, formData)
      console.log('Upload Response >>>', uploadResponse)

      toast.info('بنر با موفقیت بروزرسانی شد')
    } else {
      toast.error('بروزرسانی بنر موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title="ویرایش بنر">
      <h1>
        بروزرسانی بنر (شناسه: {banner?.id})
        <FlexContainer style={{ display: 'inline-flex' }}>
          <HeaderButton status="Info" href={`/banners/${banner?.id}`}>
            مشاهده
          </HeaderButton>

          <HeaderButton status="Danger" onClick={() => setItemToRemove(banner)}>
            حذف
          </HeaderButton>
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف بنر {itemToRemove?.id} اطمینان دارید؟
          <FlexContainer jc="space-between" className="mt-3">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="col">
          <label>عنوان</label>
          <InputGroup className="flex ali-end">
            <input {...register('title', { required: true })} placeholder="عنوان" />
            <input {...register('title_color', { required: true })} type="color" placeholder="عنوان" />
            <label>رنگ عنوان</label>
          </InputGroup>
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>محتوا</label>
          <InputGroup className="flex ali-end">
            <textarea className="w-100" {...register('content', { required: true })} placeholder="محتوا" />

            <input {...register('content_color', { required: true })} type="color" placeholder="رنگ محتوا" />
            <label>رنگ محتوا</label>
          </InputGroup>

          <InputGroup className="mt-4">
            <label>لینک</label>
            <input {...register('link', { required: true })} placeholder="لینک" />
          </InputGroup>

          <InputGroup className="mt-5">
            <label>پلتفرم بنر</label>

            <Select options={platformOptions} className="w-25" value={platform} onChange={(v) => setPlatform(v)} />
          </InputGroup>
        </InputGroup>

        <InputGroup className="mt-4">
          <label>اولویت</label>
          <input type="number" {...register('priority', { required: true })} placeholder="اولویت" />
        </InputGroup>

        <InputGroup className="mt-4">
          <label>فعال بودن</label>
          <Checkbox checked={active} onChange={(e: any) => setActive(e)} />
        </InputGroup>

        <InputGroup className="col m-4">
          <label>تصویر بنر</label>
          <InputGroup>
            {/* <DropZoneWrapper>
              <Dropzone
                onChangeStatus={handleChangeStatus}
                accept="image/*,audio/*,video/*"
                inputContent=""
              />
            </DropZoneWrapper> */}
            <input type="file" {...register('image')} />
          </InputGroup>

          <InputGroup>
            <label style={{ width: '6rem' }}>تگ آلت تصویر</label>
            <input {...register('media.a')} placeholder="a" />
          </InputGroup>

          <InputGroup>
            <label style={{ width: '6rem' }}>تگ تایتل تصویر</label>
            <input {...register('media.t')} placeholder="t" />
          </InputGroup>

          <InputGroup>
            <label style={{ width: '6rem' }}>اولویت تصویر</label>
            <input {...register('media.p')} type="number" placeholder="p" />
          </InputGroup>
        </InputGroup>

        <InputGroup status="Success">
          <Button disabled={loading} status="Info" appearance="outline" className="mt-5" type="submit">
            {loading ? '...' : 'بروزرسانی بنر'}
          </Button>
        </InputGroup>
      </Form>
    </Layout>
  )
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const DropZoneWrapper = styled.div`
  img {
    display: none;
  }
`
