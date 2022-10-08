import axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'
import styled from 'styled-components'
import { getSingleProduct } from 'utils'

interface FileInputProps {
  callback: any
  productId: string
}

export const UploadProductVideo = (props: FileInputProps) => {
  const [loading, setLoading] = useState(false)

  async function handleImageUpload(file: File) {
    setLoading(true)
    const formData = new FormData()
    formData?.append('product_video', file)

    await axios.post(`${process.env.API}/admin/products/${props.productId}/video`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    const product = await getSingleProduct(props.productId)
    props.callback(product.product_video)
    setLoading(false)
  }

  return (
    <Label loading={loading}>
      <Input onChange={(e) => handleImageUpload(e?.target?.files?.[0]!)} />
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
