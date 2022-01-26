import {
  admin,
  deleteProductMedia,
  deleteStock,
  editProduct,
  getSingleProduct,
  removeItem,
  search_in,
  toLocalDate,
  useStore,
} from 'utils'
import Layout from 'Layouts'
import {
  Accordion,
  AccordionItem,
  Alert,
  Card as _Card,
  CardBody as _CardBody,
  CardHeader as _CardHeader,
  Container,
  InputGroup,
  Modal,
  Select as _Select,
} from '@paljs/ui'
import { BasicEditor, Button, FlexContainer, ModalBox, ProductImageCard, SearchBar, StockItem } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Media, Product, ProductBrand, SearchForm } from 'types'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useLayoutEffect, useState } from 'react'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'
import { CreateStock } from '..'
import { StockForm } from '../Stock/components'

// TODO: add search brand mechanism

export const EditProductPage: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { product, updateProduct, brands, updateProductAfterMediaRemoval } = useStore((state: any) => ({
    product: state?.product,
    brands: state?.brands,
    updateProductAfterMediaRemoval: state?.updateProductAfterMediaRemoval,
    updateProduct: state?.updateProduct,
  }))

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      slug: product?.slug,
      Enable: product?.Enable,
      brand_id: product?.brand_id,
      code: product?.code,
      description: product?.description,
      discount_exp: product?.discount_exp,
      discount_price: product?.discount_price,
      meta_description: product?.meta_description,
      meta_keywords: product?.meta_keywords,
      meta_title: product?.meta_title,
      name: product?.name,
      price: product?.price,
      sold: product?.sold,
      state: product?.state,
      summary: product?.summary,
      title: product?.title,
      title_page: product?.title_page,
      trend: product?.trend,
    },
  })

  const resetProduct = async () => {
    const updatedProduct = await getSingleProduct(product?.id)
    updateProduct(updatedProduct)
  }

  const onSubmit = async (form: any) => {
    setLoading(true)

    delete form?.url
    delete form?.color

    const finalForm = {
      ...form,
    }

    console.log('Final Submit Form >>>', finalForm)

    const response = await editProduct(product?.id, finalForm)

    if (response !== null) {
      await resetProduct()
      toast.success('محصول بروز شد')
    } else {
      toast.error('بروزرسانی محصول موفقیت آمیز نبود')
    }

    setLoading(false)
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
          getSingleProduct(product?.id).then((updatedProduct) => updateProduct(updatedProduct))
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

  const [images, setImages] = useState<any>([product?.site_main_picture, ...product?.media])

  const [showAddStockModal, setShowAddStockModal] = useState(false)

  const brandsOptions = brands?.data?.map((brand: ProductBrand) => ({
    label: brand?.name,
    value: brand?.id,
  }))

  const afterStockCreation = async (response: any) => {
    console.log(response)
    await resetProduct()
    setShowAddStockModal(false)
  }

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

  const [stockToRemove, setStockToRemove] = useState<any>(null)

  const removeStock = async (stockId: number) => {
    setLoading(true)

    const response = await deleteStock(stockId)
    if (response !== null) {
      await resetProduct()
      setStockToRemove(null)
      toast.success('انبار با موفقیت حذف شد')
    } else {
      toast.success('حذف انبار موفقیت آمیز نبود')
    }

    setLoading(true)
  }

  return (
    <Layout title={`${product?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>محصول {product?.name}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>َUrl منحصر به فرد</CardHeader>
          <CardBody>
            <InputGroup>
              <input disabled value={product?.url} />
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
          <CardHeader>برند : {product?.brand?.name ?? '-'}</CardHeader>
          <CardBody>
            <InputGroup>
              <Controller
                name="brand_id"
                control={control}
                render={({ field }) => (
                  <Select options={brandsOptions} onChange={(e: any) => field.onChange(e?.value)} />
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
          <CardHeader>فعال یا غیرفعال کردن محصول : {product?.Enable ? 'فعال' : 'غیر فعال'}</CardHeader>
          <CardBody>
            <InputGroup>
              <Controller
                control={control}
                name="Enable"
                render={({ field }) => (
                  <Select options={activationOptions} onChange={(e: any) => field?.onChange(e?.value)} />
                )}
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
        {/* 
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
                    onChange={(e: any) => field.onChange(e?.value)}
                    placeholder="در صورتی که قصد تغییر دادن دارید کلیک کنید..."
                  />
                )}
              />
            </InputGroup>
          </CardBody>
        </Card> */}

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

        {/* <Card>
          <CardHeader>تک سایز : {product?.onesize ? 'بله' : 'خیر'}</CardHeader>
          <CardBody>
            <InputGroup>
              <Controller
                name="onesize"
                control={control}
                render={({ field }) => (
                  <Select
                    options={onesizeOptions}
                    onChange={(e: any) => field.onChange(Number(e?.value))}
                    placeholder="در صورتی که قصد تغییر دادن دارید کلیک کنید..."
                  />
                )}
              />
            </InputGroup>
          </CardBody>
        </Card> */}

        <Card>
          <CardHeader>
            پایان تخفیف : {toLocalDate(product?.discount_exp) ?? '-'} (برای بروزرسانی تاریخ پایان تخفیف، تاریخ موردنظر
            خود را وارد کنید.)
          </CardHeader>
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

        <Button disabled={loading} className="mb-4" status="Warning" type="submit" appearance="hero">
          بروزرسانی اطلاعات محصول
        </Button>
      </Form>

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
          {images?.map((media: Media, index: number) => (
            <ProductImageCard index={index} media={media} removalCallback={setItemToRemove} />
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex ali-center">
          انبار{' '}
          <Button className="mx-3" status="Success" appearance="hero" onClick={() => setShowAddStockModal(true)}>
            افزودن انبار
          </Button>
        </CardHeader>
        <CardBody>
          <Accordion>
            {product?.stock?.length > 0 ? (
              product?.stock?.map((stock: any) => (
                <AccordionItem
                  uniqueKey={stock?.id}
                  title={
                    <strong>
                      سایز :{stock?.size}{' '}
                      <Button
                        onClick={() => setStockToRemove(stock)}
                        className="mr-3"
                        appearance="outline"
                        status="Danger"
                      >
                        حذف انبار
                      </Button>
                    </strong>
                  }
                >
                  <StockItem callback={resetProduct} stock={stock} />
                </AccordionItem>
              ))
            ) : (
              <Alert status="Warning">این محصول در انبار موجود نیست</Alert>
            )}
          </Accordion>
        </CardBody>
      </Card>

      {/* -===>>> Modals <<<===- */}
      <Modal on={!!itemToRemove} toggle={() => setItemToRemove((current: boolean) => !current)}>
        <Card>
          <CardHeader>آیا از حذف تصویر زیر اطمینان دارید؟</CardHeader>
          <CardBody className="flex">
            <div className="flex col justify-content-between">
              <Button onClick={() => removeProductMedia(itemToRemove)} status="Danger">
                بله، حذف شود
              </Button>
              <Button onClick={() => setItemToRemove(null)} status="Info">
                انصراف
              </Button>
            </div>
            {<img className="mb-2" width="100px" height="100px" src={`${process.env.SRC}/${itemToRemove?.u}`} />}{' '}
          </CardBody>
        </Card>
      </Modal>

      <Modal on={showAddStockModal} toggle={() => setShowAddStockModal(false)}>
        <ModalBox>
          <StockForm callback={afterStockCreation} />
        </ModalBox>
      </Modal>

      <Modal on={stockToRemove} toggle={() => setStockToRemove(null)}>
        <ModalBox>
          آیا از حذف انبار شماره {stockToRemove?.id} مربوط به محصول {product?.name} با سایز {stockToRemove?.size}{' '}
          اطمینان دارید؟
          <FlexContainer className="mt-3 flex justify-content-between">
            <Button onClick={() => setStockToRemove(null)}>انصراف</Button>
            <Button status="Danger" onClick={() => removeStock(stockToRemove?.id)}>
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
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
