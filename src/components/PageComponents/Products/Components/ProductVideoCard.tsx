import { Close } from '@material-ui/icons'
import { Alert, Button, Card, CardBody, CardHeader, Container, InputGroup as _InputGroup } from '@paljs/ui'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { Media } from 'types'
import { editProductVideo, mediaCoersion, useStore } from 'utils'

interface ProductVideoCardProps {
  media: Media
  removalCallback: Function
  index: number
  updateCallback: (media: any, isMain?: boolean, isVideo?: boolean) => void
}
export const ProductVideoCard: React.FC<ProductVideoCardProps> = ({
  media,
  removalCallback,
  updateCallback,
  index,
}) => {
  const { productId, updateProduct } = useStore((state: any) => ({
    productId: state?.product?.id,
    updateProduct: state?.updateProduct,
  }))

  const [loading, setLoading] = useState(false)

  const { register, handleSubmit } = useForm({
    defaultValues: mediaCoersion(media),
  })

  const onSubmit = async (form: any) => {
    setLoading(true)

    let response: any

    response = await editProductVideo(productId, form)

    if (response.status === 'success') {
      updateCallback({ ...media, ...form }, false, true)
      toast.success('اطلاعات تصویر با موفقیت بروز شد')
    } else {
      toast.error('بروزرسانی اطلاعات تصویر موفقیت آمیز نبود')
    }

    setLoading(false)
  }

  return (
    <Card style={{ maxHeight: '40rem' }}>
      <CardHeader style={{ position: 'relative' }}>
        <Alert status="Info">ویدیو شماره {index}</Alert>
      </CardHeader>
      <CardBody style={{ display: 'flex', position: 'relative' }}>
        {media === null ? (
          <></>
        ) : (
          <>
            <Button
              style={{
                padding: '0.125rem',
                position: 'absolute',
                top: '1rem',
                left: '1rem',
              }}
              status="Danger"
              appearance="outline"
              onClick={() => removalCallback(media)}
            >
              <Close />
            </Button>
            <Container>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                  <label>وضعیت نمایش</label>
                  <input {...register('s')} placeholder="وضعیت نمایش" />
                </InputGroup>

                <InputGroup>
                  <label>اولویت</label>
                  <input {...register('p')} placeholder="اولویت" />
                </InputGroup>

                <InputGroup>
                  <label>تگ alt</label>
                  <input {...register('a')} placeholder="تگ alt" />
                </InputGroup>

                <InputGroup>
                  <label>تگ title</label>
                  <input {...register('t')} placeholder="تگ title" />
                </InputGroup>

                <Button disabled={loading} type="submit" status="Info" appearance="outline">
                  بروزرسانی تصویر
                </Button>
              </Form>
            </Container>
            <InputGroup
              style={{
                width: '100%',
                marginLeft: '3rem',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <ProductVideo controls src={`${process.env.VID_SRC}/${media?.u}`} />
            </InputGroup>
          </>
        )}
      </CardBody>
    </Card>
  )
}

const InputGroup = styled(_InputGroup)`
  margin-bottom: 1rem;

  label {
    min-width: 8rem;
    white-space: nowrap;
  }
`

const Form = styled.form``

const ProductVideo = styled.video`
  width: 16rem;
  height: 16rem;

  object-fit: contain;

  object-fit: cover;
`
