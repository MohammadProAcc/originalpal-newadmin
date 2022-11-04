import {
  Accordion,
  AccordionItem,
  Alert,
  Card as _Card,
  CardBody as _CardBody,
  CardHeader as _CardHeader,
  InputGroup,
  Modal,
  Popover,
  Select as _Select,
} from '@paljs/ui'
import axios from 'axios'
import { BasicEditor, Button, FlexContainer, ModalBox, ProductImageCard, ProductVideoCard, StockItem } from 'components'
import { UploadProductImage, UploadProductVideo } from 'components/Input'
import { useNonInitialEffect } from 'hooks'
import Cookies from 'js-cookie'
import Layout from 'Layouts'
import _ from 'lodash'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { Media, ProductBrand } from 'types'
import {
  deleteProductMedia,
  deleteProductVideo,
  deleteStock,
  editProduct,
  getSingleProduct,
  toLocalDate,
  useStore,
} from 'utils'
import { StockForm } from '../Stock/components'

// TODO: add search brand mechanism
export const EditProductPage: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { product, updateProduct, brands, updateProductAfterMediaRemoval, reload } = useStore((state: any) => ({
    product: state?.product,
    brands: state?.brands,
    updateProductAfterMediaRemoval: state?.updateProductAfterMediaRemoval,
    updateProduct: state?.updateProduct,
    reload: state?.reload,
  }))

  const [mainImage, setMainImage] = useState(product?.site_main_picture)
  function upadteMainImage(image: any) {
    setMainImage(image)
    toast.success('تصویر اصلی با موفقیت بارگذاری شد')
  }

  const [images, setImages] = useState(product?.media?.length > 0 ? [...product?.media] : [])
  const [videos, setVideos] = useState(product.video ? [...product?.video] : [])

  function appendImage(image: any) {
    setImages((_curr) => [..._curr, image])
    toast.success('تصویر با موفقیت بارگذاری شد')
  }

  function appendVideo(video: any) {
    setVideos((_curr) => [..._curr, video])
    toast.success('فایل تصویری با موفقیت بارگذاری شد')
  }

  function updateMediaCallback(media: any, isMain?: boolean, isVideo?: boolean) {
    if (isMain) {
      setMainImage(media)
    } else if (isVideo) {
      setVideos((_curr) =>
        _curr?.map((_media) => {
          if (_media.u === media.u) {
            return media
          } else {
            return _media
          }
        }),
      )
    } else {
      setImages((_curr) =>
        _curr?.map((_media) => {
          if (_media.u === media.u) {
            return media
          } else {
            return _media
          }
        }),
      )
    }
  }

  useNonInitialEffect(
    () =>
      setImages(
        product?.site_main_picture && product?.media?.length > 0
          ? [product?.site_main_picture, ...product?.media]
          : product?.site_main_picture
            ? [product?.site_main_picture]
            : [null],
      ),
    [product],
  )

  const [showAddStockModal, setShowAddStockModal] = useState(false)

  const brandsOptions = brands?.data?.map((brand: ProductBrand) => ({
    label: brand?.name,
    value: brand?.id,
  }))

  const afterStockCreation = async (response: any) => {
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
      tags: product?.tags?.map((tag: any) => tag?.id)?.join(' '),
    },
  })

  const resetProduct = async () => {
    const updatedProduct = await getSingleProduct(product?.id)
    reload('product', updatedProduct)
  }

  const onSubmit = async (form: any) => {
    setLoading(true)

    delete form?.url
    delete form?.color

    const tags = form?.tags
    delete form?.tags

    const finalForm = {
      ...form,
    }

    const response = await editProduct(product?.id, {
      ...finalForm,
      tags: tags?.split(' ').map((tagId: string) => Number(tagId)),
    })

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
    if (status === 'done') {
      const formData = new FormData()
      formData.append('media[]', file)

      axios
        .post(`${process.env.API}/admin/products/${product?.id}/image`, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get(process.env.TOKEN!)}`,
          },
        })
        .then(() => {
          getSingleProduct(product?.id).then((updatedProduct) => {
            updateProduct(updatedProduct)
          })
          toast.success('تصویر با موفقیت آپلود شد')
        })
        .catch((error) => console.warn(error?.response?.data))
    }
  }
  const handleMainChangeStatus = ({ meta, file }: any, status: any) => {
    if (status === 'done') {
      const formData = new FormData()
      formData.append('site_main_picture', file)

      axios
        .post(`${process.env.API}/admin/products/${product?.id}/image`, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get(process.env.TOKEN!)}`,
          },
        })
        .then(() => {
          getSingleProduct(product?.id).then((updatedProduct) => {
            updateProduct(updatedProduct)
            toast.success('تصویر اصلی با موفقیت بارگذاری شد')
          })
          toast.success('تصویر با موفقیت آپلود شد')
        })
        .catch((error) => {
          console.warn(error?.response?.data)
          toast.error('بارکذاری تصویر اصلی موفیت آمیز نبود')
        })
    }
  }

  const handleImageUpload = async (type: 'media' | 'site_main_picture', file: File) => {
    setLoading(true)
    const formData = new FormData()
    formData?.append(type, file)

    const { data: response } = await axios.post(`${process.env.API}/admin/products/${product?.id}/image`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get(process.env.TOKEN!)}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    setLoading(false)
  }

  const [imageToRemove, setImageToRemove] = useState<any>(null)

  const removeProductImage = async (media: Media) => {
    const response = await deleteProductMedia(router?.query?.product_id as string, media?.u, Cookies.get(process.env.TOKEN!) ?? '')
    if (response?.includes('operation done successfully')) {
      setImages((_curr) => _curr.filter((_image) => !_.isEqual(_image, media)))
      setImageToRemove(null)
      // await resetProduct()
      toast.success('تصویر با موفقیت حذف شد')
    } else {
      toast.error('حذف تصویر موفیت آمیز نبود')
    }
  }

  const [videoToRemove, setVideoToRemove] = useState<any>(null)

  // TODO: complete video remove process
  const removeProductVideo = async (media: Media) => {
    const response = await deleteProductVideo(router?.query?.product_id as string, media?.u, Cookies.get(process.env.TOKEN!) ?? '')
    console.error(response);
    // if (response?.includes('operation done successfully')) {
    //   setVideos((_curr) => _curr.filter((_image) => !_.isEqual(_image, media)))
    //   setVideoToRemove(null)
    //   // await resetProduct()
    //   toast.success('ویدیو با موفقیت حذف شد')
    // } else {
    //   toast.error('حذف ویدیو موفقیت آمیز نبود')
    // }
  }

  const [removeAllImageModal, setRemoveAllImagesModal] = useState(false)

  const removeAllImages = async () => {
    setLoading(true)

    for (let i = 0; i < images?.length; i++) {
      await removeProductImage(images[i])
    }

    setRemoveAllImagesModal(false)

    setLoading(false)
  }

  return (
    <Layout title={`ویرایش محصول ${product?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>محصول "{product?.name}"</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>َUrl منحصر به فرد</CardHeader>
          <CardBody>
            <InputGroup>
              <input value={product?.url} />
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
          <CardHeader>برچسب ها : {product?.tags?.map((tag: any) => tag?.name)?.join('-') ?? '-'}</CardHeader>
          <CardBody>
            <InputGroup fullWidth>
              <Popover
                trigger="focus"
                overlay="شناسه برچسب ها را با فاصله(space) وارد کنید. مثال: 1 12 9"
                placement="top"
                style={{ width: '100%' }}
              >
                <input {...register('tags')} placeholder="برجسب ها" />
              </Popover>
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
              <CardHeader>عنوان صفحه (tag title)</CardHeader>
              <CardBody>
                <InputGroup>
                  <input {...register('title_page')} />
                </InputGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>عنوان سئو (meta title)</CardHeader>
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
                  <textarea style={{ minWidth: '100%', height: '8rem' }} {...register('meta_description')} />
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
            {images?.length > 0 && (
              <Button
                status="Danger"
                appearance="outline"
                style={{ display: 'inline-block', marginRight: '0.5rem' }}
                onClick={() => setRemoveAllImagesModal(true)}
              >
                حذف تمام تصاویر
              </Button>
            )}
          </h3>
          <InputGroup>
            <label>تصویر اصلی</label>
            <UploadProductImage productId={product?.id} type="site_main_picture" callback={upadteMainImage} />
            <ProductImageCard
              index={0}
              media={mainImage}
              removalCallback={setImageToRemove}
              updateCallback={updateMediaCallback}
            />
          </InputGroup>
          <InputGroup>
            <label>تصویر</label>
            <UploadProductImage productId={product?.id} type="media" callback={appendImage} />
          </InputGroup>
        </CardHeader>
        <CardBody
          style={{
            maxHeight: '100vh',
            overflow: 'scroll',
          }}
        >
          {/* {product?.main_site_picture && (
            <ProductImageCard index={0} media={product?.main_site_picture} removalCallback={setItemToRemove} />
          )} */}
          {images?.map((media: Media, index: number) => (
            <ProductImageCard
              index={index + 1}
              media={media}
              removalCallback={setImageToRemove}
              updateCallback={updateMediaCallback}
            />
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 style={{ marginBottom: '1rem' }}>ویدیو ها</h3>
          <InputGroup>
            <label>تصویر</label>
            <UploadProductVideo productId={product.id} callback={appendVideo} />
          </InputGroup>
        </CardHeader>
        <CardBody
          style={{
            maxHeight: '100vh',
            overflow: 'scroll',
          }}
        >
          {/* {product?.main_site_picture && (
            <ProductImageCard index={0} media={product?.main_site_picture} removalCallback={setItemToRemove} />
          )} */}
          {videos?.map((media: Media, index: number) => (
            <ProductVideoCard
              index={index + 1}
              media={media}
              removalCallback={setVideoToRemove}
              updateCallback={updateMediaCallback}
            />
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
      <Modal on={!!imageToRemove} toggle={() => setImageToRemove((current: boolean) => !current)}>
        <Card>
          <CardHeader>آیا از حذف تصویر زیر اطمینان دارید؟</CardHeader>
          <CardBody className="flex">
            <div className="flex col justify-content-between">
              <Button onClick={() => removeProductImage(imageToRemove)} status="Danger">
                بله، حذف شود
              </Button>
              <Button onClick={() => setImageToRemove(null)} status="Info">
                انصراف
              </Button>
            </div>
            {<img className="mb-2" width="100px" height="100px" src={`${process.env.SRC}/${imageToRemove?.u}`} />}{' '}
          </CardBody>
        </Card>
      </Modal>

      <Modal on={!!videoToRemove} toggle={() => setVideoToRemove((current: boolean) => !current)}>
        <Card>
          <CardHeader>آیا از حذف ویدیو زیر اطمینان دارید؟</CardHeader>
          <CardBody className="flex">
            <div className="flex col justify-content-between">
              <Button onClick={() => removeProductVideo(videoToRemove)} status="Danger">
                بله، حذف شود
              </Button>
              <Button onClick={() => setVideoToRemove(null)} status="Info">
                انصراف
              </Button>
            </div>
            {<video controls className="mb-2" width="100px" height="100px" src={`${process.env.VID_SRC}/${videoToRemove?.u}`} />}{' '}
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

      <Modal on={removeAllImageModal} toggle={() => setRemoveAllImagesModal(false)}>
        <ModalBox>
          آیا از حذف تمامی تصاویر محصول اطمینان دارید ؟
          <FlexContainer className="mt-3 flex justify-content-between">
            <Button onClick={() => setRemoveAllImagesModal(false)}>انصراف</Button>
            <Button status="Danger" onClick={removeAllImages}>
              بله، همگی حذف شوند
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

const Card = styled(_Card) <CardFamilyProps>`
  overflow: ${(props) => props.overflow && 'initial'};
  overflow: initial;
`

const CardBody = styled(_CardBody) <CardFamilyProps>`
  overflow: initial;
`

const CardHeader = styled(_CardHeader) <CardFamilyProps>`
  overflow: ${(props) => props.overflow && 'initial'};
  overflow: initial;
`

const DropZoneWrapper = styled.div`
  img {
    display: none;
  }
`
