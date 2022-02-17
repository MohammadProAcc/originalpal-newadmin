import { Button as _Button, InputGroup as _InputGroup } from '@paljs/ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'

interface AdsMenuFormProps {
  callback: any
  loading: boolean
  defaultValues?: any
}
export const AdsMenuForm: React.FC<AdsMenuFormProps> = ({ callback, loading, defaultValues }) => {
  const [adLinks, setAdLinks] = useState<{ text: string; href: string }[]>(defaultValues)

  const { register, handleSubmit, formState } = useForm()
  const onSubmit = (form: any) =>
    adLinks?.length >= 3
      ? toast.info('افزودن بیش از ۳ مورد مقدور نیست')
      : setAdLinks((current) => (current ? [...current, form] : [form]))

  return (
    <Component>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FlexContainer col>
          <InputGroup>
            <label>متن لینک</label>
            <input {...register('text', { required: true })} />
          </InputGroup>

          <InputGroup>
            <label>لینک</label>
            <input {...register('href', { required: true })} />
          </InputGroup>
        </FlexContainer>
        <Button>افزودن لینک</Button>
      </Form>

      <FlexContainer className="links-container">
        {adLinks?.map((link) => (
          <Button
            disabled={loading}
            title={link?.href}
            className="link"
            status="Info"
            appearance="outline"
            onClick={() => setAdLinks((current) => current?.filter((item) => item?.text !== link?.text))}
          >
            {link?.text}
          </Button>
        ))}
      </FlexContainer>

      <Button className="create-menu" status="Success" appearance="hero" onClick={() => callback(adLinks)}>
        ساخت منو
      </Button>
    </Component>
  )
}

const Component = styled.div``

const Form = styled.form`
  label {
    min-width: 6rem;
  }
`

const InputGroup = styled(_InputGroup)`
  margin-bottom: 1rem;
`

interface FlexContainerProps {
  col?: boolean
}
const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.col && 'column'};

  &.links-container {
    margin-top: 1rem;
  }
`

const Button = styled(_Button)`
  &.link {
    margin-left: 1rem;
  }

  &.create-menu {
    margin-top: 1rem;
  }
`
