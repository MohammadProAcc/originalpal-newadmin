import {
  Button as _Button,
  Card as _Card,
  CardHeader as _CardHeader,
  CardBody as _CardBody,
  InputGroup as _InputGroup,
} from '@paljs/ui'
import { BasicModal, ModalBox } from 'components'
import { FlexContainer as _FlexContainer } from 'components/Container/FlexContainer'
import { useNonInitialEffect } from 'hooks'
import produce from 'immer'
import _ from 'lodash'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { BottomSiteDescription, BottomSiteDescriptionMenu, initialBottomSiteDescription } from 'types'

const modalContentStyle = css`
  width: 50%;
`

interface IBottomSiteDescriptionFormProps {
  loading?: boolean
  callback: any
  defaultValues?: any
}
export const BottomSiteDescriptionForm: React.FC<IBottomSiteDescriptionFormProps> = ({
  loading,
  callback,
  defaultValues,
}) => {
  const [menu, setMenu] = useState<BottomSiteDescriptionMenu>(defaultValues)

  const findDescriptionIndex = (description: BottomSiteDescription) =>
    menu?.findIndex((_menu) => _menu?.title === description?.title)

  const findParagraphIndex = (description: BottomSiteDescription, paragraph: string) => {
    console.log('selected descriotion >', description)
    const descIndex = findDescriptionIndex(description)
    console.log('desc index :', descIndex)
    const paragraphIndex = menu[descIndex]?.paragraphs?.findIndex((_paragraph) => _paragraph === paragraph)
    console.log('paragraph index :', paragraphIndex)
    return paragraphIndex
  }

  const { register, handleSubmit, setValue } = useForm()

  // WARN: not a pure function
  const onEditDescriptionSubmit = (form: any) => {
    setMenu((_menu) =>
      produce(_menu, (draft) => {
        const index = findDescriptionIndex(selectedDescription!)
        if (index >= 0) {
          draft[index].title = form?.title
        }
      }),
    )
    closeModal()
  }

  // WARN: not a pure function
  const onEditParagraphSubmit = (form: any) => {
    setMenu((_menu) =>
      produce(_menu, (draft) => {
        const descriptionIndex = findDescriptionIndex(selectedDescription!)
        const paragraphIndex = findParagraphIndex(selectedDescription!, selectedParagraph!)
        console.log('description index >', descriptionIndex)
        console.log('paragraph index >', paragraphIndex)

        if (descriptionIndex >= 0) {
          if (paragraphIndex >= 0) {
            draft[descriptionIndex].paragraphs[paragraphIndex] = form?.paragraph
          }
        }
      }),
    )
    closeModal()
  }

  const [selectedDescription, setSelectedDescription] = useState<BottomSiteDescription | null>(null)
  const [selectedParagraph, setSelectedParagraph] = useState<string | null>(null)

  useNonInitialEffect(() => {
    setValue('title', selectedDescription?.title)
  }, [selectedDescription])

  useNonInitialEffect(() => {
    setValue('paragraph', selectedParagraph)
  }, [selectedParagraph])

  type Mode = 'remove' | 'edit' | null

  const [mode, setMode] = useState<Mode>(null)

  const addDescription = () => {
    setMenu((_menu) =>
      produce(_menu, (draft) => {
        draft?.push(initialBottomSiteDescription)
      }),
    )
  }

  const addParagrapgh = (description: BottomSiteDescription) => {
    setMenu((_menu) =>
      produce(_menu, (draft) => {
        draft[findDescriptionIndex(description)]?.paragraphs?.push('بند')
      }),
    )
  }

  const deleteDescription = (description: BottomSiteDescription) => {
    console.log(findDescriptionIndex(description))
    setMenu((_menu) =>
      produce(_menu, (draft) => {
        draft?.splice(findDescriptionIndex(description), 1)
      }),
    )
    closeModal()
  }
  const deleteParagraph = (description: BottomSiteDescription, paragraph: string) => {
    setMenu((_menu) =>
      produce(_menu, (draft) => {
        draft[findDescriptionIndex(description)]?.paragraphs?.splice(findParagraphIndex(description, paragraph), 1)
      }),
    )
    closeModal()
  }

  const closeModal = () => {
    setMode(null)
    setSelectedDescription(null)
    setSelectedParagraph(null)
    setValue('description', null)
    setValue('paragraph', null)
  }

  const renderModalContent = (mode: Mode) => {
    switch (mode) {
      case 'remove':
        return (
          <FlexContainer className="col">
            {selectedParagraph ? (
              <>
                <P>آیا از حذف بند</P>
                <P className="my-2">
                  <strong>{selectedParagraph}</strong>
                </P>
                <P>مربوط به بخش :</P>
                <P className="my-2">
                  <strong>{selectedDescription?.title}</strong>
                </P>
                <P>اطمینان دارید؟</P>

                <FlexContainer className="my-2">
                  <Button status="Info" onClick={() => setMode(null)}>
                    انصراف
                  </Button>
                  <Button
                    status="Danger"
                    className="action"
                    onClick={() => deleteParagraph(selectedDescription!, selectedParagraph)}
                  >
                    بله
                  </Button>
                </FlexContainer>
              </>
            ) : (
              <>
                آیا از حذف بخش
                <P>
                  <strong>{selectedDescription?.title}</strong>
                </P>
                اطمینان دارید؟
                <FlexContainer className="mt-2">
                  <Button status="Info" onClick={() => setMode(null)}>
                    انصراف
                  </Button>
                  <Button status="Danger" className="action" onClick={() => deleteDescription(selectedDescription!)}>
                    بله
                  </Button>
                </FlexContainer>
              </>
            )}
          </FlexContainer>
        )
      case 'edit':
        return selectedParagraph ? (
          <Form onSubmit={handleSubmit(onEditParagraphSubmit)}>
            <InputGroup className="col">
              <label>بند :</label>
              <textarea {...register('paragraph')} className="full-width" />
            </InputGroup>

            <FlexContainer className="mt-3">
              <Button status="Danger" appearance="outline" className="ml-2" type="button" onClick={closeModal}>
                انصراف
              </Button>
              <Button status="Info" appearance="outline">
                ویرایش
              </Button>
            </FlexContainer>
          </Form>
        ) : (
          <Form onSubmit={handleSubmit(onEditDescriptionSubmit)}>
            <InputGroup className="col">
              <label>نام بخش: </label>
              <input className="full-width" {...register('title')} />
            </InputGroup>

            <FlexContainer className="mt-3">
              <Button status="Danger" appearance="outline" className="ml-2" type="button" onClick={closeModal}>
                انصراف
              </Button>
              <Button status="Info" appearance="outline">
                ویرایش
              </Button>
            </FlexContainer>
          </Form>
        )
      case null:
        return <div>null</div>
    }
  }

  return (
    <Component>
      <Button status="Success" appearance="outline" className="mb-3" onClick={addDescription}>
        افزودن توضیجات
      </Button>
      {menu?.map((_menu) => (
        <Card>
          <DescriptionTitle>
            {_menu?.title}
            <Button
              status="Danger"
              appearance="outline"
              className="action"
              onClick={() => {
                setSelectedParagraph(null)
                setSelectedDescription(_menu)
                setMode('remove')
              }}
            >
              حذف توضیحات
            </Button>
            <Button
              status="Info"
              appearance="outline"
              className="action"
              onClick={() => {
                setSelectedParagraph(null)
                setSelectedDescription(_menu)
                setMode('edit')
              }}
            >
              ویرایش توضیحات
            </Button>
            <Button status="Success" appearance="outline" className="action" onClick={() => addParagrapgh(_menu)}>
              افزودن بند
            </Button>
          </DescriptionTitle>
          {_menu?.paragraphs?.map((_paragraph) => (
            <CardBody>
              {_paragraph}

              <Button
                status="Danger"
                appearance="outline"
                className="action"
                onClick={() => {
                  setSelectedDescription(_menu)
                  setSelectedParagraph(_paragraph)
                  setMode('remove')
                }}
              >
                حذف بند
              </Button>
              <Button
                status="Info"
                appearance="outline"
                className="action"
                onClick={() => {
                  setSelectedDescription(_menu)
                  setSelectedParagraph(_paragraph)
                  setMode('edit')
                }}
              >
                ویرایش بند
              </Button>
            </CardBody>
          ))}
        </Card>
      ))}

      <Button status="Success" appearance="hero" onClick={() => callback(menu)} disabled={loading}>
        اعمال تغییرات
      </Button>

      {/* MODALS */}
      <BasicModal on={!!mode} toggle={closeModal} contentStyles={modalContentStyle}>
        <ModalBox>{renderModalContent(mode)}</ModalBox>
      </BasicModal>
    </Component>
  )
}

const Component = styled.div``

const Card = styled(_Card)``

const DescriptionTitle = styled(_CardHeader).attrs({
  title: 'ویرایش عنوان بند',
})`
  &:hover {
    cursor: pointer;

    background-color: rgba(0, 0, 0, 0.1);
  }
`

const CardBody = styled(_CardBody).attrs({
  title: 'ویرایش بند',
})`
  line-height: 1.875rem;

  &:hover {
    cursor: pointer;

    background-color: rgba(0, 0, 0, 0.1);
  }
`

const Button = styled(_Button)`
  &.action {
    margin-right: 1rem;
  }
`

const Form = styled.form`
  width: 100%;
  display: inline-flex;
  flex-direction: column;
`

const P = styled.p`
  display: flex;
  margin: 0 0.125rem;
`

const FlexContainer = styled(_FlexContainer)`
  &.col {
    flex-direction: column;
  }
`

const InputGroup = styled(_InputGroup)`
  input.full-width {
    min-width: 100%;
  }

  textarea.full-width {
    min-width: 100%;
    height: 20rem;
  }
`
