import axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'
import styled from 'styled-components'
import { getSingleProduct } from 'utils'

interface FileInputProps {
  callback: any
  productId: string
  type: 'media' | 'site_main_picture'
}

export const UploadProductImage = (props: FileInputProps) => {
  const [loading, setLoading] = useState(false)

  async function handleImageUpload(type: 'media' | 'site_main_picture', file: File) {
    setLoading(true)
    const formData = new FormData()
    formData?.append(type, file)

    await axios.post(`${process.env.API}/admin/products/${props.productId}/image`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get(process.env.TOKEN!)}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    const product = await getSingleProduct(props.productId)
    props.callback(product.site_main_picture)
    setLoading(false)
  }

  return (
    <Label loading={loading}>
      <Input onChange={(e) => handleImageUpload(props.type, e?.target?.files?.[0]!)} />
    </Label>
  )
}

const Label = styled.label<{ loading: boolean }>`
  width: 2rem;
  height: 2rem;
  padding: 2rem;

  background-image: url(${(props) => (props.loading ? '/svg/spinner.svg' : '/jpg/upload.jpg')});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.75;

  &:hover {
    cursor: pointer;

    opacity: 1;
  }
`

const Input = styled.input.attrs({
  type: 'file',
})`
  display: none;
`
