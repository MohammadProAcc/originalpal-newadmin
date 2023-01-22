import { Button, Checkbox, InputGroup } from '@paljs/ui'
import { FlexContainer, Form } from 'components'
import { PLATFORM_OPTIONS } from 'constants/ui'
import { useLoading } from 'hooks'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { IBanner } from 'types'
import { admin, search_in } from 'utils'
import { createBanner, uploadBannerImage } from 'utils/api/REST/actions/banners'
import { updateBanner } from 'utils/api/REST/actions/banners/updateBanner'

interface IBannerFormProps {
  type: 'stand' | 'slide'
  defaultValues?: IBanner
  callback?: any
}

export function BannerForm(props: IBannerFormProps) {
  const router = useRouter()

  const [active, setActive] = useState(false)

  const [loadingList, toggleLoading] = useLoading()

  const [imageToUpload, setImageToUpload] = useState<null | File>()

  const formMethods = useForm({
    defaultValues: props.defaultValues && {
      ...props.defaultValues,
    },
  })

  async function onSubmit(form: Partial<IBanner>) {
    if (props.defaultValues) {
      toggleLoading('submitting')

      const image = imageToUpload

      const finalForm = {
        ...form,
        active,
        type: props.type,
      }

      const updatBannerResponse = await updateBanner(
        props.defaultValues.id.toString(),
        finalForm,
        Cookies.get(process.env.TOKEN!) ?? '',
      )

      if (updatBannerResponse?.status === 'success') {
        if (image) {
          try {
            const formData = new FormData()
            formData.append('image', image)

            await uploadBannerImage(props.defaultValues.id.toString(), formData)

            toast.info('بنر با موفقیت بروزرسانی شد')
          } catch (err) {
            toast.error('بروزرسانی تصویر بنر موفقیت آمیز نبود')
          }
        } else {
          toast.success('بروزرسانی بنر موفقیت آمیز بود')
          router.back()
        }
      } else {
        toast.error('بروزرسانی بنر موفقیت آمیز نبود')
      }
      toggleLoading('submitting')
    } else {
      toggleLoading('submitting')

      const finalForm = {
        ...form,
        type: props.type,
      }

      try {
        await createBanner(finalForm, Cookies.get(process.env.TOKEN!))
        const result = await search_in(
          'banners',
          {
            key: 'content',
            type: '=',
            value: form?.content,
          },
          router?.query,
        )
        const bannerId = result?.data?.data[0]?.id

        const formData = new FormData()
        if (imageToUpload) {
          formData.append('image', imageToUpload)
        }

        const uploadResponse = await uploadBannerImage(bannerId, formData)

        const { data: response } = await admin().post(`/banners/image/${bannerId}`, formData)

        formMethods.reset()

        toast.success('بنر با موفقیت ساخته شد')

        router.push('/banners')
      } catch (err) {
        toast.error('بنر با موفقیت ساخته شد')
      }

      toggleLoading('submitting')
    }
    props.callback && props.callback()
  }

  return (
    <Form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <InputGroup className="col">
        <label>عنوان</label>
        <InputGroup className="flex ali-end">
          <input {...formMethods.register('title', { required: true })} placeholder="عنوان" />
          <input {...formMethods.register('title_color', { required: true })} type="color" placeholder="عنوان" />
          <label>رنگ عنوان</label>
        </InputGroup>
      </InputGroup>

      <InputGroup className="col mt-4">
        <label>محتوا</label>
        <InputGroup className="flex ali-end">
          <textarea className="w-100" {...formMethods.register('content', { required: true })} placeholder="محتوا" />

          <input {...formMethods.register('content_color', { required: true })} type="color" placeholder="رنگ محتوا" />
          <label>رنگ محتوا</label>
        </InputGroup>

        {props.type === 'slide' && (
          <FlexContainer col style={{ marginTop: '1rem' }}>
            <InputGroup>
              <input {...formMethods.register('button_bg_color', { required: true })} type="color" />
              <label>رنگ دکمه</label>
            </InputGroup>

            <InputGroup>
              <input {...formMethods.register('button_color', { required: true })} type="color" />
              <label>رنگ متن دکمه</label>
            </InputGroup>
          </FlexContainer>
        )}

        <InputGroup className="mt-4">
          <label>لینک</label>
          <input {...formMethods.register('link', { required: true })} placeholder="لینک" />
        </InputGroup>

        <InputGroup className="mt-5">
          <label>پلتفرم بنر</label>

          <Controller
            name="platform"
            rules={{
              required: true,
            }}
            control={formMethods.control}
            render={({ field }) => (
              <Select
                options={PLATFORM_OPTIONS}
                className="w-25"
                onChange={({ value }: any) => field.onChange(value)}
              />
            )}
          />
        </InputGroup>
      </InputGroup>

      <InputGroup className="mt-4">
        <label>اولویت</label>
        <input type="number" {...formMethods.register('priority', { required: true })} placeholder="اولویت" />
      </InputGroup>

      <InputGroup className="mt-4">
        <Controller
          name="active"
          control={formMethods.control}
          render={({ field }) => (
            <Checkbox
              style={{ color: 'transparent' }}
              checked={active}
              {...formMethods.register('priority', { required: true })}
              onChange={(e: any) => {
                setActive(e)
                field.onChange(e)
              }}
            />
          )}
        />
        <label>فعال</label>
      </InputGroup>

      <InputGroup className="col m-4" style={{ position: 'relative' }}>
        {props.defaultValues && (
          <BannerMedia
            platform={(props.defaultValues?.platform as any) ?? 'desktop'}
            as={props.defaultValues?.media.u!.includes('.mp4') ? 'video' : 'img'}
            src={process.env.SRC + props.defaultValues?.media.u!}
          />
        )}
        <label>تصویر بنر</label>
        <InputGroup style={{ marginBottom: '1rem' }}>
          <input
            type="file"
            onChange={(e: any) => {
              setImageToUpload(e.target.files?.[0])
            }}
          />
        </InputGroup>

        <label style={{ width: '100%' }}>تگ alt تصویر</label>
        <InputGroup>
          <input {...formMethods.register('media.a')} placeholder="a" />
        </InputGroup>

        <label style={{ width: '100%' }}>تگ title تصویر</label>
        <InputGroup>
          <input {...formMethods.register('media.t')} placeholder="t" />
        </InputGroup>

        <label style={{ width: '100%' }}>اولویت تصویر</label>
        <InputGroup>
          <input {...formMethods.register('media.p')} type="number" placeholder="p" />
        </InputGroup>
      </InputGroup>

      <InputGroup className="col m-4">
        <label>موقعیت متن بنر</label>

        <label style={{ width: '100%' }}>top</label>
        <InputGroup>
          <input {...formMethods.register('position.top')} placeholder="top" defaultValue={'auto'} />
        </InputGroup>

        <label style={{ width: '100%' }}>right</label>
        <InputGroup>
          <input {...formMethods.register('position.right')} placeholder="right" defaultValue={'auto'} />
        </InputGroup>

        <label style={{ width: '100%' }}>bottom</label>
        <InputGroup>
          <input {...formMethods.register('position.bottom')} placeholder="bottom" defaultValue={'auto'} />
        </InputGroup>

        <label style={{ width: '100%' }}>left</label>
        <InputGroup>
          <input {...formMethods.register('position.left')} placeholder="left" defaultValue={'auto'} />
        </InputGroup>
      </InputGroup>

      <InputGroup status="Success">
        <Button
          disabled={loadingList.includes('submitting')}
          status={props.defaultValues ? 'Info' : 'Success'}
          type="submit"
        >
          {loadingList.includes('submitting') ? '...' : props.defaultValues ? 'بروزرسانی بنر' : 'افزودن بنر'}
        </Button>
      </InputGroup>
    </Form>
  )
}

interface IBannerMediaProps {
  platform: 'mobile' | 'desktop'
}
const BannerMedia = styled.img.attrs({
  controls: true,
})<IBannerMediaProps>`
  min-width: 10rem;
  max-width: ${(props) => (props.platform === 'mobile' ? '20rem' : '30rem')};

  object-fit: cover;

  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`
