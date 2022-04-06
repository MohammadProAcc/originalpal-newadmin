import { Card, CardBody } from '@paljs/ui/Card'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

const RichTextEditor = dynamic<any>(() => import('@mantine/rte').then((mod) => mod.RichTextEditor), { ssr: false })

export function BasicEditor({
  callback,
  initialValue,
  title,
}: {
  callback: Function
  initialValue?: string
  title?: string
}) {
  const [content, setContent] = useState(initialValue)
  useEffect(() => callback(content), [content])
  return (
    <Card>
      <header>{title ?? 'ویرایشگر'}</header>
      <CardBody>
        <RichTextEditor value={content} onChange={setContent} />
      </CardBody>
    </Card>
  )
}
