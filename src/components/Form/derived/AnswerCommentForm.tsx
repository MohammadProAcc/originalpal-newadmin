import { Button, InputGroup as _InputGroup } from '@paljs/ui'
import { Form as _Form } from 'components'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { Comment } from 'types'
import { createComment } from 'utils'
import { AnswerCommentFormEl } from './AnswerCommentFormEl'
import { AnswerCommentInputGroup } from './AnswerCommentInputGroup'
import { CommentReplies } from "components/Card/CommentReplies";

export function AnswerCommentForm(props: AnswerCommentFormProps) {
  const { register, handleSubmit, reset } = useForm()

  const [loading, setLoading] = useState(false)

  async function onSubmitAnswerComment(form: any) {
    setLoading(true)
    const response = await createComment({
      title: form.title,
      contents: form.contents,
      parent_id: props.comment.id,
      admin_check: 0,
      [props.comment.product_id ? 'product_id' : 'blog_id']: props.comment.product_id ?? props.comment.blog_id,
    })
    reset();
    if (response !== null) {
      toast.success(`پاسخ نظر ${props.comment.id} داده شد`)
    } else {
      toast.error('پاسخ به نظر موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  return (
    <>
      <AnswerCommentFormEl onSubmit={handleSubmit(onSubmitAnswerComment)}>
        <Details>
          <p>
            <strong>پاسخ به نظر شماره {props.comment.id}</strong>
          </p>
          <p>عنوان نظر : {props.comment.title}</p>
          <p>متن نظر : {props.comment.content}</p>
        </Details>
        <AnswerCommentInputGroup>
          <label htmlFor="answer-title">
            عنوان پاسخ
            <input id="answer-title" placeholder="عنوان پاسخ" {...register('title')} />
          </label>

          <label htmlFor="answer-content">
            متن پاسخ
            <textarea id="answer-content" placeholder="متن پاسخ" {...register('contents')} />
          </label>

          <Button type="submit" status="Success" appearance="hero" disabled={loading}>
            ارسال پاسخ
          </Button>
        </AnswerCommentInputGroup>
      </AnswerCommentFormEl>
      <CommentReplies comment={props.comment} />
    </>
  )
}

interface AnswerCommentFormProps {
  comment: Comment
}

const Details = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
`

