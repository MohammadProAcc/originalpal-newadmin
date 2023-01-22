import { Button, Checkbox, InputGroup as _InputGroup, Popover, Select as _Select } from '@paljs/ui'
import Layout from 'Layouts'
import React, { useState, useRef, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled, { css } from 'styled-components'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import { createMainPageSection, translator } from 'utils'
import router from 'next/router'

const sectionTypeOptions = [
  { label: 'محصول', value: 'product' },
  { label: 'لینک', value: 'link' },
  { label: 'بنر', value: 'banner' },
]

export function CreateMainPageSection() {
  const [loading, setLoading] = useState(false)

  const [selectedType, setSelectedType] = useState<any>(null)

  const [insertedLinks, setInsertedLinks] = useState<any>([])

  useEffect(() => {
    linkTitleRef.current.value = ''
    linkLinkRef.current.value = ''
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

  const { register, handleSubmit, control, reset } = useForm()

  const onSubmit = async (form: any) => {
    const final = {
      ...form,
      tags: form?.tags?.split(' '),
      brands: form?.brands?.split(' '),
      banners: form?.banners?.split(' '),
      links: insertedLinks,
    }

    setLoading(true)
    const response = await createMainPageSection(final, Cookies.get(process.env.TOKEN!))
    if (response?.status === 'success') {
      toast.success('بخش صفحه اصلی  با موفقیت ساخته شد')
      router.push('/main-page-sections')
      reset()
    } else {
      toast.error('ساخت بخش صفحه اصلی  موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <Layout title="ساخت بخش صفحه اصلی  صفحه اصلی">
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
                    style={{ color: 'transparent' }}
                    checked={field?.value}
                    onChange={field?.onChange}
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

        <Button type="submit" status="Success">
          ساخت بخش
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
