import { Comment } from 'types'
import styled from 'styled-components'
import { Card, CardBody, CardHeader } from '@paljs/ui'

function CommentReply(props: CommentReplyProps) {
  return (
    <Li>
      <Card>
        <CardHeader><strong>عنوان : </strong>{props.comment.title}</CardHeader>
        <CardBody>
          <strong>
            متن : 
          </strong>
          <p>{props.comment.content}</p>
        </CardBody>
      </Card>
    </Li>
  )
}

interface CommentReplyProps {
  comment: Comment
}

export function CommentReplies(props: CommentRepliesProps) {
  return (
    <>
      <h5>
        پاسخ ها :
      </h5>
      <hr />
      <Ul>
        {props.comment.replies?.map((_reply) => (
          <CommentReply comment={_reply} />
        ))}
      </Ul>
    </>
  )
}

interface CommentRepliesProps {
  comment: Comment
}

const Ul = styled.ul`
  width: 100%;

  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`

const Li = styled.li`
  list-style: none;
`
