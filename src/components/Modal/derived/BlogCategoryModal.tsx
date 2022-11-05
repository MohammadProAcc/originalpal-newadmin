import { Modal as _Modal, ModalProps } from '@mantine/core'
import { BlogCategoryForm } from 'components/Form/derived/BlogCategoryForm'
import { MantineModal } from 'components/Modal/MantineModal'
import React from 'react'

export function BlogCategoryModal(props: CreateBlogCategoryModalProps) {
  const { defaultValues, readOnly, ...modalProps } = props
  return (
    <MantineModal {...modalProps}>
      <BlogCategoryForm callback={props.onClose} defaultValues={defaultValues} readOnly={readOnly} />
    </MantineModal>
  )
}

interface CreateBlogCategoryModalProps extends ModalProps {
  defaultValues?: any
  readOnly?: boolean
}
