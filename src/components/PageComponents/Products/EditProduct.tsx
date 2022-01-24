import { admin, deleteProductMedia, editProduct, search_in, useStore } from 'utils'
import Layout from 'Layouts'
import {
  Accordion,
  AccordionItem,
  Card as _Card,
  CardBody as _CardBody,
  CardHeader as _CardHeader,
  Container,
  InputGroup,
  Modal,
  Select as _Select,
} from '@paljs/ui'
import { BasicEditor, Button, ProductImageCard, SearchBar, StockItem } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Media, Product, ProductBrand, SearchForm } from 'types'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'

// TODO: add search brand mechanism

export const EditProductPage: React.FC = () => {
  const router = useRouter()

  const { product, brands, updateProductAfterMediaRemoval } = useStore((state: any) => ({
    product: state?.product,
    brands: state?.brands,
    updateProductAfterMediaRemoval: state?.updateProductAfterMediaRemoval,
  }))

  const brandsOptions = brands?.data?.data?.map((brand: ProductBrand) => ({
    label: brand?.name,
    value: brand,
  }))

  const activationOptions = [
    { label: 'فعال', value: '1' },
    { label: 'غیرفعال', value: '0' },
  ]

  const onesizeOptions = [
    { label: 'تک سایز', value: '1' },
    { label: 'غیر تک سایز', value: '0' },
  ]

  const typeOptions = [
    { label: 'جدید', value: 'new' },
    { label: 'دوباره موجود شده در انبار', value: 'restock' },
    { label: 'بزودی', value: 'comingsoon' },
  ]

  const categoryOptions = [{ label: 'کفش', value: 'shoe' }]

  // const searchBrand = async (form: SearchForm) => {
  // const result = await search_in('brands', form, router.query, Cookies.get('token'));
  //   console.log(form);
  // };

  const { register, handleSubmit, control } = useForm({
    defaultValues: product,
  })

  const onSubmit = async (form: any) => {
    delete form?.brand
    delete form?.url
    delete form?.collection
    delete form?.category
    delete form?.stock
    delete form?.color

    const finalForm = {
      ...form,
      brand_id: form?.brand?.value.id,
    }

    const response = await editProduct(product?.id, finalForm)
    if (response === null) {
      toast.success('محصول بروز شد')
    } else {
      toast.error('بروزرسانی محصول موفقیت آمیز نبود')
    }
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }: any, status: any) => {
    console.log(file)
    if (status === 'done') {
      const formData = new FormData()
      formData.append('media[]', file)
      axios
        .post(`${process.env.API}/admin/products/${product?.id}/image`, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        })
        .then((response) => {
          toast.success('تصویر با موفقیت آپلود شد')
        })
        .catch((error) => console.warn(error?.response?.data))
    }
  }

  const [itemToRemove, setItemToRemove] = useState<any>(null)

  const removeProductMedia = async (media: Media) => {
    const response = await deleteProductMedia(router?.query?.product_id as string, media?.u, Cookies.get('token') ?? '')
    if (response?.includes('operation done successfully')) {
      updateProductAfterMediaRemoval(media)
      setItemToRemove(null)
      toast.success('تصویر با موفقیت حذف شد')
    } else {
      toast.error('حذف تصویر موفیت آمیز نبود')
    }
  }

  console.log(product?.site_main_picture)

  return (
    <Layout title={`${product?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>محصول {product?.name}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>َUrl منحصر به فرد</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('url', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>H1 صفحه</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('title')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>کد</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('code')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>برند : {product?.brand?.name}</CardHeader>
          <CardBody>
            <InputGroup>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => (
                  <Select options={brandsOptions} {...field} onChange={(e: any) => field.onChange(e?.value)} />
                )}
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نام</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('name', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>قیمت</CardHeader>
          <CardBody>
            <InputGroup>
              <input placeholder="قیمت" type="number" {...register('price')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>قیمت با تخفیف</CardHeader>
          <CardBody>
            <InputGroup>
              <input placeholder="قیمت با تخفیف" type="number" {...register('discount_price')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>فعال یا غیرفعال کردن محصول</CardHeader>
          <CardBody>
            <InputGroup>
              <Controller
                control={control}
                name="Enable"
                render={({ field }) => <Select options={activationOptions} {...field} />}
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>وضعیت</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('state')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>رنگ</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('color')} placeholder="رنگ" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>SEO</CardHeader>
          <CardBody>
            <Card>
              <CardHeader>عنوان صفحه</CardHeader>
              <CardBody>
                <InputGroup>
                  <input {...register('title_page')} />
                </InputGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>عنوان سئو (tag title)</CardHeader>
              <CardBody>
                <InputGroup>
                  <input {...register('meta_title')} placeholder="عنوان سئو (tag title)" />
                </InputGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>مترادف ها (meta_keywords)</CardHeader>
              <CardBody>
                <InputGroup>
                  <textarea style={{ minWidth: '100%', height: '8rem' }} {...register('meta_keywords')} />
                </InputGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>توضیح متا (meta_description)</CardHeader>
              <CardBody>
                <InputGroup>
                  <textarea style={{ minWidth: '100%', height: '8rem' }} {...register('meta_keywords')} />
                </InputGroup>
              </CardBody>
            </Card>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نوع</CardHeader>
          <CardBody style={{ overflow: 'initial' }}>
            <InputGroup>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    options={typeOptions}
                    {...field}
                    onChange={(e: any) => field.onChange(e?.value)}
                    placeholder="در صورتی که قصد تغییر دادن دارید کلیک کنید..."
                  />
                )}
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>دسته بندی</CardHeader>
          <CardBody style={{ overflow: 'initial' }}>
            <InputGroup>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    options={categoryOptions}
                    {...field}
                    onChange={(e: any) => field.onChange(e?.value)}
                    placeholder="در صورتی که قصد تغییر دادن دارید کلیک کنید..."
                  />
                )}
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>خلاصه</CardHeader>
          <CardBody>
            <InputGroup>
              <textarea style={{ minWidth: '100%', height: '8rem' }} {...register('summary')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange } }) => (
            <BasicEditor initialValue={product?.description} callback={onChange} title="توضیحات محصول" />
          )}
        />

        <Card>
          <CardHeader>ترند</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('trend')} placeholder="ترند" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>میزان فروش</CardHeader>
          <CardBody>
            <InputGroup>
              <input type="number" {...register('sold')} placeholder="میزان فروش" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>زمان ایجاد</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('created_at')} placeholder="زمان ایجاد" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>تک سایز : {product?.onesize ? 'بله' : 'خیر'}</CardHeader>
          <CardBody>
            <InputGroup>
              <Controller
                name="onesize"
                control={control}
                render={({ field }) => (
                  <Select
                    options={onesizeOptions}
                    {...field}
                    onChange={(e: any) => field.onChange(e?.value)}
                    placeholder="در صورتی که قصد تغییر دادن دارید کلیک کنید..."
                  />
                )}
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>پایان تخفیف</CardHeader>
          <CardBody>
            <InputGroup>
              <input type="date" {...register('discount_exp')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>اسلاگ</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('slug')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 style={{ marginBottom: '1rem' }}>
              تصاویر
              <span style={{ fontSize: '1rem' }}>
                ( برای اضافه کردن تصویر, از طریق ورودی زیر عکس مورد نظر را بارگذاری کنید )
              </span>
            </h3>
            <DropZoneWrapper>
              <Dropzone onChangeStatus={handleChangeStatus} accept="image/*,audio/*,video/*" inputContent="" />
            </DropZoneWrapper>
          </CardHeader>
          <CardBody
            style={{
              maxHeight: '100vh',
              overflow: 'scroll',
            }}
          >
            {[
              product?.site_main_picture !== null && product?.site_main_picture,
              ...(product?.media?.length > 0 ? product?.media : []),
            ]?.map((media: Media, index: number) => (
              <ProductImageCard index={index} media={media} removalCallback={setItemToRemove} />
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>انبار</CardHeader>
          <CardBody>
            <Accordion>
              {product?.stock?.map((stock: any) => (
                <AccordionItem uniqueKey={stock?.id} title={`سایز :${stock?.size}`}>
                  <StockItem stock={stock} />
                </AccordionItem>
              ))}
            </Accordion>
          </CardBody>
        </Card>

        <Button status="Info" type="submit" appearance="outline">
          بروزرسانی محصول
        </Button>
      </Form>

      {/* -===>>> Modals <<<===- */}
      <Modal on={!!itemToRemove} toggle={() => setItemToRemove((current: boolean) => !current)}>
        <Card>
          <CardHeader>
            آیا از حذف تصویر {<Image width="100px" height="100px" src={`${process.env.SRC}/${itemToRemove?.u}`} />}{' '}
            اطمینان دارید؟
          </CardHeader>
          <CardBody>
            <Button onClick={() => setItemToRemove(null)} status="Info">
              انصراف
            </Button>
            <Button onClick={() => removeProductMedia(itemToRemove)} status="Danger">
              بله، حذف شود
            </Button>
          </CardBody>
        </Card>
      </Modal>
    </Layout>
  )
}

const Form = styled.form`
  input {
    min-width: 100%;
  }
`

const Select = styled(_Select)`
  width: 100%;
`

interface CardFamilyProps {
  overflow?: boolean
}

const Card = styled(_Card)<CardFamilyProps>`
  overflow: ${(props) => props.overflow && 'initial'};
  overflow: initial;
`

const CardBody = styled(_CardBody)<CardFamilyProps>`
  overflow: initial;
`

const CardHeader = styled(_CardHeader)<CardFamilyProps>`
  overflow: ${(props) => props.overflow && 'initial'};
  overflow: initial;
`

const DropZoneWrapper = styled.div`
  img {
    display: none;
  }
`
