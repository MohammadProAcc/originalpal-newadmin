import { Button, Checkbox, InputGroup, Modal, Select } from '@paljs/ui'
import { FlexContainer, HeaderButton, ModalBox } from 'components'
import Cookies from 'js-cookie'
import Layout from 'Layouts'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { removeItem, useStore } from 'utils'
import { deleteBanner, uploadBannerImage } from 'utils/api/REST/actions/banners'
import { getSingleBanner } from 'utils/api/REST/actions/banners/getSingleBanner'
import { updateBanner } from 'utils/api/REST/actions/banners/updateBanner'

export function EditMainPage() {
  const router = useRouter()

  const { banner, reload } = useStore((state: any) => ({
    banner: state?.banner,
    reload: state?.reload,
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
  const [video, setVideo] = useState(banner?.media?.u?.includes('mp4'))

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      ...(banner ?? null),
    },
  })

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('banners', removeId, deleteBanner, () => router.push('/main-page'), [
      `بنر ${removeId} با موفقیت حذف شد`,
      'حذف بنر موفقیت آمیز نبود',
    ])
  }

  const onSubmit = async (form: any) => {
    setLoading(true)

    const image = form?.image
    delete form.image

    const finalForm = {
      ...form,
      platform: platform?.value,
      active,
      type: 'slide',
    }

    const updatBannerResponse = await updateBanner(
      router?.query?.banner_id as string,
      finalForm,
      Cookies.get('token') ?? '',
    )

    if (updatBannerResponse?.status === 'success') {
      const formData = new FormData()
      formData.append('image', image[0])

      const uploadResponse = await uploadBannerImage(banner?.id, formData, video)
      console.log('Upload Response >>>', uploadResponse)

      toast.info('بنر با موفقیت بروزرسانی شد')
    } else {
      toast.error('بروزرسانی بنر موفقیت آمیز نبود')
    }

    const updatedBanner = await getSingleBanner(banner.id)
    reload('banner', updatedBanner)

    setLoading(false)
  }

  return (
    <Layout title="ساخت بنر صفحه اصلی">
      <h1>
        بروزرسانی بنر صفحه اصلی (شناسه: {banner?.id})
        <FlexContainer style={{ display: 'inline-flex' }}>
          <HeaderButton status="Info" href={`/main-page/${banner?.id}`}>
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

          <FlexContainer col style={{ marginTop: '1rem' }}>
            <InputGroup>
              <input {...register('button_bg_color', { required: true })} type="color" />
              <label>رنگ دکمه</label>
            </InputGroup>

            <InputGroup>
              <input {...register('button_color', { required: true })} type="color" />
              <label>رنگ متن دکمه</label>
            </InputGroup>
          </FlexContainer>

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
          <Checkbox checked={active} style={{ color: 'transparent' }} onChange={(e: any) => setActive(e)} />
        </InputGroup>

        <InputGroup className="mt-4">
          <label>ویدیو</label>
          <Checkbox checked={video} style={{ color: 'transparent' }} onChange={(e: any) => setVideo(e)} />
        </InputGroup>

        <InputGroup className="d-flex align-items-center">
          <img
            style={{ width: '12rem', height: '12rem' }}
            src={`https://api.originalpal.co.uk/images/${banner?.media?.u}`}
          />

          <InputGroup className="col m-4">
            <InputGroup>
              <label style={{ minWidth: '6rem' }}>تصویر بنر</label>
              <input type="file" {...register('image')} />
            </InputGroup>

            <InputGroup>
              <label style={{ width: '6rem' }}>تگ آلت</label>
              <input {...register('media.a')} placeholder="a" />
            </InputGroup>

            <InputGroup>
              <label style={{ width: '6rem' }}>تگ تایتل</label>
              <input {...register('media.t')} placeholder="t" />
            </InputGroup>

            <InputGroup>
              <label style={{ width: '6rem' }}>اولویت</label>
              <input {...register('media.p')} type="number" placeholder="p" />
            </InputGroup>
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
