import { Card, CardBody, CardHeader } from '@paljs/ui'
import { toLocalDate, toLocalTime } from 'utils'

interface IDatesCardProps {
  createdAt: string
  updatedAt: string
  deletedAt?: string
}
export function DatesCard(props: IDatesCardProps) {
  return (
    <Card>
      <CardHeader>تاریخ ها</CardHeader>
      <CardBody>
        <Card>
          <CardHeader>ساخته شده در</CardHeader>
          <CardBody>
            {toLocalDate(props.createdAt)} - {toLocalTime(props.createdAt)}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>بروز شده در</CardHeader>
          <CardBody>
            {toLocalDate(props.updatedAt)} - {toLocalTime(props.updatedAt)}
          </CardBody>
        </Card>
        {props.deletedAt && (
          <Card>
            <CardHeader>حذف شده در</CardHeader>
            <CardBody>
              {toLocalDate(props.deletedAt)} - {toLocalTime(props.deletedAt)}
            </CardBody>
          </Card>
        )}
      </CardBody>
    </Card>
  )
}
