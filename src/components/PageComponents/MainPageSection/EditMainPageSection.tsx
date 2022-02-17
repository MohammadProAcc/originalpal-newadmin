import { createMainPageSection, deleteMainPageSection, editMainPageSection, removeItem, useStore } from 'utils'
import Layout from 'Layouts'
import React, { useEffect, useRef, useState } from 'react'
import { HeaderButton, ModalBox } from 'components'
import { FlexContainer } from 'components/Container/FlexContainer'
import { Button, Checkbox, Modal, Select as _Select, InputGroup as _InputGroup, Popover } from '@paljs/ui'
import router from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import styled, { css } from 'styled-components'

const sectionTypeOptions = [
  { label: 'محصول', value: 'product' },
  { label: 'لینک', value: 'link' },
  { label: 'بنر', value: 'banner' },
]

export const EditMainPageSectionPage: React.FC = () => {
  const [loading, setLoading] = useState(false)

  const { mainPageSection } = useStore((state: any) => ({
    mainPageSection: state?.mainPageSection,
  }))

  const [insertedLinks, setInsertedLinks] = useState<any>(mainPageSection?.parameter)

  useEffect(() => {
    if (mainPageSection?.type === 'link') {
      linkTitleRef.current.value = ''
      linkLinkRef.current.value = ''
    }
  }, [insertedLinks])

  const linkTitleRef = useRef<any>(null)
  const linkLinkRef = useRef<any>(null)

  const addLink = () => {
    setInsertedLinks((current: any) =>
      current?.length > 0
        ? [
            ...current,
            {
              title: linkTitleRef?.current?.value,
              link: linkLinkRef?.current?.value,
            },
          ]
        : [
            {
              title: linkTitleRef?.current?.value,
              link: linkLinkRef?.current?.value,
            },
          ],
    )
  }

  const removeLink = (linkTitle: string) => {
    setInsertedLinks((current: any) => current?.filter((item: any) => item?.title !== linkTitle))
  }

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('mainPageSection', removeId, deleteMainPageSection, () => router.push('/mainPageSection'), [
      `بخش صقحه اصلی ${removeId} با موفقیت حذف شد`,
      'حذف mainPageر موفقیت آمیز نبود',
    ])
  }

  const [selectedType, setSelectedType] = useState<any>(mainPageSection?.type)

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues:
      mainPageSection?.type === 'product'
        ? {
            type: mainPageSection?.type,
            title: mainPageSection?.title,
            priority: mainPageSection?.priority,
            active: mainPageSection?.active,
            brands: mainPageSection?.parameter?.brand?.join(' '),
            tags: mainPageSection?.parameter?.tags?.join(' '),
            inStock: mainPageSection?.parameter?.inStock,
          }
        : mainPageSection?.type === 'banner'
        ? {
            type: mainPageSection?.type,
            title: mainPageSection?.title,
            priority: mainPageSection?.priority,
            active: mainPageSection?.active,
            banners: mainPageSection?.banners,
          }
        : {
            type: mainPageSection?.type,
            title: mainPageSection?.title,
            priority: mainPageSection?.priority,
            active: mainPageSection?.active,
            links: mainPageSection?.links,
          },
  })

  const onSubmit = async (form: any) => {
    console.log(form)

    const final = {
      ...form,
      tags: form?.tags ? form?.tags?.split(' ')?.map((tag: string) => Number(tag)) : [],
      brands: form?.brands?.split(' ')?.map((brand: string) => Number(brand)),
      banners: form?.banners?.split(' ')?.map((banner: string) => Number(banner)),
      links: insertedLinks,
      inStock: form?.inStock ? 1 : 0,
    }

    console.log('final', final)

    setLoading(true)
    const response = await editMainPageSection(mainPageSection?.id, final, Cookies.get('token'))
    if (response?.status === 'success') {
      toast.success('بخش صفحه اصلی  با موفقیت بروز شد')
      router.push('/main-page-sections')
      reset()
    } else {
      toast.error('بروزرسانی بخش صفحه اصلی  موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title={`ویرایش بخش صفحه اصلی - ${mainPageSection?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        ویرایش بخش صفحه اصلی - {mainPageSection?.id}
        <FlexContainer style={{ display: 'inline-flex' }}>
          <HeaderButton status="Info" href={`/mainPageSection/${mainPageSection?.id}`}>
            مشاهده
          </HeaderButton>

          <HeaderButton status="Danger" onClick={() => setItemToRemove(mainPageSection)}>
            حذف
          </HeaderButton>
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف mainPageر {itemToRemove?.id} اطمینان دارید؟
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <label>نوع</label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                options={sectionTypeOptions}
                onChange={(e: any) => {
                  setSelectedType(e?.value)
                  field.onChange(e?.value)
                }}
                placeholder="محصول، لینک، بنر..."
              />
            )}
          />
        </InputGroup>

        <InputGroup>
          <label>عنوان</label>
          <input {...register('title')} placeholder="عنوان" />
        </InputGroup>

        <InputGroup>
          <label>اولویت</label>
          <input {...register('priority')} type="number" placeholder="اولویت" />{' '}
        </InputGroup>
        <InputGroup>
          <label>فعال</label>
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <Checkbox style={{ color: 'transparent' }} checked={field?.value} onChange={field?.onChange}></Checkbox>
            )}
          />
        </InputGroup>

        {selectedType === 'product' ? (
          <>
            <H3>جزییات بخش محصول</H3>

            <InputGroup>
              <label>برند ها</label>
              <Popover trigger="focus" placement="top" overlay="شناسه برند های مورد نظر را با فاصله (space) وارد کنید">
                <input {...register('brands')} />
              </Popover>
            </InputGroup>

            <InputGroup>
              <label>برچسب ها</label>
              <Popover trigger="focus" placement="top" overlay="شناسه برچسب های مورد نظر را با فاصله (space) وارد کنید">
                <input {...register('tags')} />
              </Popover>
            </InputGroup>

            <InputGroup>
              <label>فقط محصولات موجود</label>
              <Controller
                name="inStock"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field?.value}
                    onChange={field?.onChange}
                    style={{ color: 'transparent' }}
                  ></Checkbox>
                )}
              />
            </InputGroup>
          </>
        ) : selectedType === 'banner' ? (
          <>
            <H3>جزییات بخش بنر</H3>

            <InputGroup>
              <label>بنر ها</label>
              <Popover trigger="focus" placement="top" overlay="شناسه بنر های مورد نظر را با فاصله (space) وارد کنید">
                <input {...register('banners')} />
              </Popover>
            </InputGroup>
          </>
        ) : (
          <>
            <H3>جزییات بخش لینک</H3>

            <InputGroup col>
              <label>لینک ها</label>

              <input placeholder="عنوان لینک" ref={linkTitleRef} style={{ marginBottom: '0.5rem' }} />

              <input ref={linkLinkRef} placeholder="مسیر لینک" />

              <AddLinkButton
                onClick={() => {
                  console.log('clicked')
                  addLink()
                }}
              >
                افزودن لینک
              </AddLinkButton>

              <LinksContainer>
                {insertedLinks?.length > 0 ? (
                  <>
                    {insertedLinks?.map((link: any) => (
                      <LinkEx title={link?.link} onClick={() => removeLink(link?.title)}>
                        {link?.title}
                      </LinkEx>
                    ))}
                  </>
                ) : (
                  <strong>لینکی وارد نکرده اید</strong>
                )}
              </LinksContainer>
            </InputGroup>
          </>
        )}

        <Button disabled={loading} type="submit" status="Info" appearance="outline">
          بروزرسانی بخش
        </Button>
      </Form>
    </Layout>
  )
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    min-width: 4rem;
  }
`

interface IInputGroupProps {
  col?: boolean
}
const InputGroup = styled(_InputGroup)<IInputGroupProps>`
  margin: 0 0 1rem 0;
  ${(p) =>
    p?.col &&
    css`
      display: flex;
      flex-direction: column;
    `}
`

const Select = styled(_Select)`
  width: 100%;
`

const H3 = styled.h3`
  margin: 0 0 2rem 0;
`

const LinksContainer = styled.div`
  display: flex;
`

const AddLinkButton = styled.a`
  max-width: 10rem;

  padding: 0.5rem;
  border: 1px solid #00d68f;
  border-radius: 0.5rem;
  margin: 0.75rem 0;

  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 214, 143, 0.5);
  }
`

const LinkEx = styled.a`
  max-width: 10rem;

  padding: 0.5rem;
  border: 1px solid #222b45;
  border-radius: 0.5rem;
  margin: 0.75rem 0.25rem;

  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 0, 0, 0.25);
    border-color: transparent;
  }
`
