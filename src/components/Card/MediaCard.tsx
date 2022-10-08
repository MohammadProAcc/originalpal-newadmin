import { Close } from '@material-ui/icons'
import { Alert, Button, Card, CardBody, CardHeader, Container, InputGroup as _InputGroup } from '@paljs/ui'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { Media } from 'types'

interface MediaCardProps {
  media: Media
  index: number
  removalCallback: Function
  updateCallback: Function
  isVideo?: boolean
}
export const MediaCard: React.FC<MediaCardProps> = ({
  media: mediaRaw,
  index,
  removalCallback,
  updateCallback,
  isVideo,
}) => {
  const [loading, setLoading] = useState(false)

  const media =
    typeof mediaRaw === 'string'
      ? {
          t: '',
          a: '',
          s: 1,
          u: mediaRaw,
          p: 1,
        }
      : mediaRaw

  const { register, handleSubmit } = useForm({
    defaultValues: media,
  })

  const onSubmit = async (form: any) => {
    setLoading(true)

    await updateCallback(form)

    setLoading(false)
  }

  return (
    <Card style={{ maxHeight: '40rem' }}>
      <CardHeader style={{ position: 'relative' }}>
        {isVideo ? (
          <Alert status="Info">ویدیو</Alert>
        ) : index === 0 ? (
          media === null ? (
            <Alert status="Danger">تصویر وجود ندارد</Alert>
          ) : (
            <Alert status="Success">تصویر اصلی</Alert>
          )
        ) : (
          <Alert status="Info">تصویر شماره {index}</Alert>
        )}
      </CardHeader>
      <CardBody style={{ display: 'flex', position: 'relative' }}>
        {media === null ? (
          <></>
        ) : (
          <>
            <Button
              style={{ padding: '0.125rem', position: 'absolute', top: '1rem', left: '1rem' }}
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
            <InputGroup style={{ width: '100%', marginLeft: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
              {isVideo ? (
                <Video src={`${process.env.VID_SRC}/${media?.u}`} controls />
              ) : (
                <Image width="264px" height="264px" src={`https://api.originalpal.co.uk/images/${media?.u}`} />
              )}
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

const Video = styled.video`
  width: 16.5rem;
  height: 16.5rem;
`
