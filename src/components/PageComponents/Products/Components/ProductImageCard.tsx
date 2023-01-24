// import { Alert, Badge, Button, Card, CardBody, CardHeader, Container, InputGroup as _InputGroup } from '@paljs/ui'
// import Image from 'next/image'
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  LoadingOverlay,
  NumberInput,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconTrash } from '@tabler/icons'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { Media } from 'types'
import { editProductImage, editProductMainImage, useStore } from 'utils'
import { append } from 'utils/general/append'

interface ProductImageCardProps {
  media: Media
  index: number
  removalCallback: Function
  updateCallback: () => Promise<any>
  productId: number
}
export const ProductImageCard: React.FC<ProductImageCardProps> = ({
  media,
  index,
  removalCallback,
  updateCallback,
  productId,
}) => {
  const [loading, setLoading] = useState(false)

  const imageForm = useForm({
    initialValues: {
      a: media?.a,
      t: media?.t,
      p: media?.p,
      s: media?.s,
      u: media?.u,
    },
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
      updateCallback().then(() => {
        toast.success('اطلاعات تصویر با موفقیت بروز شد')
        setLoading(false)
      })
    } else {
      toast.error('بروزرسانی اطلاعات تصویر موفقیت آمیز نبود')
      setLoading(false)
    }
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
    <Card shadow="sm" p="lg" radius="md" withBorder w="20rem" pos="relative">
      <LoadingOverlay visible={loading} />
      <Card.Section sx={{ figure: { display: 'flex', justifyContent: 'center' }, position: 'relative' }}>
        <Image src={append(media?.u)} height={160} alt="product main picture" />

        <ActionIcon
          color="red"
          variant="light"
          pos="absolute"
          top="-0.5rem"
          left="0.75rem"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          onClick={() => removalCallback(media)}
        >
          ❌
        </ActionIcon>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>تصویر شماره {index + 1}</Text>

        {index === 0 && (
          <Badge color="teal" variant="light">
            تصویر اصلی
          </Badge>
        )}
      </Group>

      <hr />

      <form onSubmit={imageForm.onSubmit(onSubmit)}>
        <TextInput defaultValue={media?.a} label="برچسب alt" {...imageForm.getInputProps('a')} />
        <TextInput defaultValue={media?.t} label="برچسب title" {...imageForm.getInputProps('t')} />
        <NumberInput defaultValue={media?.p} label="ترتیب" {...imageForm.getInputProps('p')} />

        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          type="submit"
          disabled={!(imageForm.isDirty('a') || imageForm.isDirty('t') || imageForm.isDirty('p'))}
        >
          بروزرسانی اطلاعات تصویر
        </Button>
      </form>
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
