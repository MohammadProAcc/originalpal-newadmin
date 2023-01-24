import { Close } from '@material-ui/icons'
// import { Alert, Badge, Button, Card, CardBody, CardHeader, Container, InputGroup as _InputGroup } from '@paljs/ui'
import Cookies from 'js-cookie'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { Media } from 'types'
import { deleteProductMedia, editProductImage, editProductMainImage, getSingleProduct, useStore } from 'utils'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { append } from 'utils/general/append'

interface ProductImageCardProps {
  media: Media
  index: number
  removalCallback: Function
  updateCallback: (media: any, isMain: boolean) => void
}
export const ProductImageCard: React.FC<ProductImageCardProps> = ({
  media,
  index,
  removalCallback,
  updateCallback,
}) => {
  const router = useRouter()

  const { productId, updateProduct } = useStore((state: any) => ({
    productId: state?.product?.id,
    updateProduct: state?.updateProduct,
  }))

  const [loading, setLoading] = useState(false)

  const { register, handleSubmit } = useForm({
    defaultValues: media,
  })

  const onSubmit = async (form: any) => {
    setLoading(true)

    let response: any

    if (index === 0) {
      response = await editProductMainImage(productId, form)
    } else {
      response = await editProductImage(productId, form)
    }

    if (response.status === 'success') {
      updateCallback({ ...media, ...form }, index === 0)
      toast.success('اطلاعات تصویر با موفقیت بروز شد')
    } else {
      toast.error('بروزرسانی اطلاعات تصویر موفقیت آمیز نبود')
    }

    setLoading(false)
  }

  // return (
  //   <Card style={{ maxHeight: '40rem' }}>
  //     <CardHeader style={{ position: 'relative' }}>
  //       {index === 0 ? (
  //         media === null ? (
  //           <Alert status="Danger">تصویر اصلی وجود ندارد</Alert>
  //         ) : (
  //           <Alert status="Success">تصویر اصلی</Alert>
  //         )
  //       ) : (
  //         <Alert status="Info">تصویر شماره {index}</Alert>
  //       )}
  //     </CardHeader>
  //     <CardBody style={{ display: 'flex', position: 'relative' }}>
  //       {media === null ? (
  //         <></>
  //       ) : (
  //         <>
  //           <Button
  //             style={{
  //               padding: '0.125rem',
  //               position: 'absolute',
  //               top: '1rem',
  //               left: '1rem',
  //               display: index === 0 ? 'none' : '',
  //             }}
  //             status="Danger"
  //             appearance="outline"
  //             onClick={() => removalCallback(media)}
  //           >
  //             <Close />
  //           </Button>
  //           <Container>
  //             <Form onSubmit={handleSubmit(onSubmit)}>
  //               <InputGroup>
  //                 <label>وضعیت نمایش</label>
  //                 <input {...register('s')} placeholder="وضعیت نمایش" />
  //               </InputGroup>

  //               <InputGroup>
  //                 <label>اولویت</label>
  //                 <input {...register('p')} placeholder="اولویت" />
  //               </InputGroup>

  //               <InputGroup>
  //                 <label>تگ alt</label>
  //                 <input {...register('a')} placeholder="تگ alt" />
  //               </InputGroup>

  //               <InputGroup>
  //                 <label>تگ title</label>
  //                 <input {...register('t')} placeholder="تگ title" />
  //               </InputGroup>

  //               <Button disabled={loading} type="submit" status="Info" appearance="outline">
  //                 بروزرسانی تصویر
  //               </Button>
  //             </Form>
  //           </Container>
  //           <InputGroup
  //             style={{
  //               width: '100%',
  //               marginLeft: '3rem',
  //               display: 'flex',
  //               justifyContent: 'flex-end',
  //             }}
  //           >
  //             <ProductImage src={`http://api.originalpal.co.uk/images/${media?.u}`} />
  //           </InputGroup>
  //         </>
  //       )}
  //     </CardBody>
  //   </Card>
  // )
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={append(media?.u)}
          height={160}
          alt="product main picture"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>تصویر شماره {index}</Text>
        {
          index === 0 && (
            <Badge color="blue" variant="light">
              تصویر اصلی
            </Badge>
          )
        }
      </Group>

      <Text size="sm" color="dimmed">
        تگ alt: 
      </Text>
      <Text size="sm" color="dimmed">
        تگ 
      </Text>
      <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  )
}

// const InputGroup = styled(_InputGroup)`
//   margin-bottom: 1rem;

//   label {
//     min-width: 8rem;
//     white-space: nowrap;
//   }
// `

const Form = styled.form``

const ProductImage = styled.img`
  width: 16rem;
  height: 16rem;

  object-fit: cover;
`
