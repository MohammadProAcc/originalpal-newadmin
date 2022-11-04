import axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'
import styled from 'styled-components'
import { getSingleBlog } from 'utils'

interface FileInputProps {
  callback: any
  blogId: string
  auto?: boolean
}

export const UploadBlogVideo = (props: FileInputProps) => {
  const [loading, setLoading] = useState(false)

  async function handleVideoUpload(file: File) {
    setLoading(true)

    if (props.auto) {
    } else {
      const formData = new FormData()
      formData?.append('blog_video', file)

      await axios.post(`${process.env.API}/admin/blogs/${props.blogId}/video`, formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get(process.env.TOKEN!)}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      const blog = await getSingleBlog(props.blogId)
      props.callback(blog.blog_video)
    }

    setLoading(false)
  }

  return (
    <Label loading={loading}>
      <Input onChange={(e) => handleVideoUpload(e?.target?.files?.[0]!)} />
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
