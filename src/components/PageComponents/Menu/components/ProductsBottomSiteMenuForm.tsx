import { Button as _Button, Checkbox, InputGroup as _InputGroup } from '@paljs/ui'
import { BasicModal, ModalBox } from 'components'
import produce from 'immer'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { Colors } from 'styles'
import { BottomSiteColumn, BottomSiteMenu, BottomSiteRow, initialBottomSiteColumn, initialBottomSiteRow } from 'types'

interface BottomSiteMenuFormProps {
  loading?: boolean
  callback: any
  defaultValues?: any
}

export const BottomSiteMenuForm: React.FC<BottomSiteMenuFormProps> = ({ loading, callback, defaultValues }) => {
  const [menu, setMenu] = useState<BottomSiteColumn[]>(defaultValues)

  const findColumnIndex = (targetColumn: BottomSiteColumn) => {
    return menu?.findIndex((item) => item?.title === targetColumn?.title)
  }

  const findRowIndex = (targetColumn: BottomSiteColumn, targetRow: BottomSiteRow) => {
    return menu[findColumnIndex(targetColumn)]?.rows?.findIndex((item) => item?.title === targetRow?.title)
  }

  // <<<------------ Column ------------>>>
  const addColumn = (column: BottomSiteColumn) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft?.push(column)
      }),
    )

  const removeColumn = (column: BottomSiteColumn) => {
    setMenu((current) =>
      produce(current, (draft) => {
        console.log(draft?.filter((item) => !_.isEqual(item, column)))
        draft = draft?.filter((item) => {
          return !_.isEqual(item, column)
        })
      }),
    )
  }

  const editColumn = (column: BottomSiteColumn, form: BottomSiteColumn) => {
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findColumnIndex(column)] = form
      }),
    )
  }

  // <<<------------ Row ------------>>>
  const addRow = (column: BottomSiteColumn, row: BottomSiteRow) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findColumnIndex(column)]?.rows?.push(row)
      }),
    )

  const removeRow = (column: BottomSiteColumn, row: BottomSiteRow) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findColumnIndex(column)]?.rows?.splice(findRowIndex(column, row), 1)
      }),
    )

  const editRow = (column: BottomSiteColumn, row: BottomSiteRow, form: BottomSiteRow) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findColumnIndex(column)].rows[findRowIndex(column, row)] = form
      }),
    )

  // <<<------------ Forms ------------>>>
  const [selectedColumn, setSelectedColumn] = useState<BottomSiteColumn | null>(null)
  const [selectedRow, setSelectedRow] = useState<BottomSiteRow | null>(null)

  const [activeForm, setActiveForm] = useState<'column' | 'row' | null>(null)

  const {
    register: columnRegister,
    handleSubmit: columnHandleSubmit,
    control: columnControl,
    setValue: columnSetValue,
    reset: columnReset,
  } = useForm()

  const {
    register: rowRegister,
    handleSubmit: rowHandleSubmit,
    control: rowControl,
    setValue: rowSetValue,
    reset: rowReset,
  } = useForm()

  const onColumnFormSubmit = (form: BottomSiteColumn) => {
    selectedColumn ? editColumn(selectedColumn, form) : addColumn({ ...initialBottomSiteColumn, title: form?.title })
    columnReset()
    setActiveForm(null)
    toast.success(
      <p>
        <div>
          <strong>"{form?.title}"</strong>
        </div>{' '}
        {selectedColumn ? 'بروز' : 'ساخته'} شد
      </p>,
    )
  }

  const onRowFormSubmit = (form: BottomSiteRow) => {
    selectedRow ? editRow(selectedColumn!, selectedRow, form) : addRow(selectedColumn!, form)
    setActiveForm(null)
    toast.success(
      <p>
        <div>
          <strong>"{form?.title}"</strong>
        </div>{' '}
        {selectedRow ? 'بروز' : 'ساخته'} شد
      </p>,
    )
    rowReset()
  }

  useEffect(() => {
    selectedColumn
      ? Object.entries(selectedColumn)?.map((entry) => columnSetValue(entry[0], entry[1]))
      : Object.entries(initialBottomSiteColumn)?.map((entry) => columnSetValue(entry[0], null))
  }, [selectedColumn])

  useEffect(() => {
    selectedRow
      ? Object.entries(selectedRow)?.map((entry) => rowSetValue(entry[0], entry[1]))
      : Object.entries(initialBottomSiteRow)?.map((entry) => rowSetValue(entry[0], null))
  }, [selectedRow])

  const onColumnRemoval = (column: BottomSiteColumn) => {
    removeColumn(column)
    setActiveForm(null)
    toast.success(
      <p>
        <div>
          <strong>"{column?.title}"</strong>
        </div>{' '}
        حذف شد
      </p>,
    )
  }

  const onRowRemoval = (column: BottomSiteColumn, row: BottomSiteRow) => {
    removeRow(column, row)
    setActiveForm(null)
    toast.success(
      <p>
        <div>
          <strong>"{row?.title}"</strong>
        </div>{' '}
        حذف شد
      </p>,
    )
  }

  return (
    <Component>
      <Columns>
        {menu?.map((_column) => (
          <Column key={_column?.title}>
            <ColumnTitle
              title="برای ویرایش فهرست کلیک کنید"
              onClick={() => {
                setSelectedColumn(_column)
                setActiveForm('column')
              }}
            >
              {_column?.title}
            </ColumnTitle>

            <Rows>
              {_column?.rows?.map((_row) => (
                <Row
                  key={_row?.title}
                  onClick={() => {
                    setSelectedColumn(_column)
                    setSelectedRow(_row)
                    setActiveForm('row')
                  }}
                >
                  {_row?.title}
                </Row>
              ))}

              <Button
                onClick={() => {
                  setSelectedColumn(_column)
                  setSelectedRow(null)
                  setActiveForm('row')
                }}
                status="Info"
                appearance="outline"
              >
                افزودن لینک
              </Button>
            </Rows>
          </Column>
        ))}
        <Button
          status="Info"
          appearance="outline"
          onClick={() => {
            setSelectedColumn(null)
            setActiveForm('column')
          }}
        >
          افزودن ستون
        </Button>
      </Columns>

      {/* =========================== MODAL =========================== */}

      <BasicModal on={!!activeForm} toggle={() => setActiveForm(null)}>
        <ModalBox>
          <Form
            onSubmit={
              activeForm === 'column' ? columnHandleSubmit(onColumnFormSubmit) : rowHandleSubmit(onRowFormSubmit)
            }
          >
            {activeForm === 'column' ? (
              <>
                <InputGroup>
                  <label>نام فهرست</label>
                  <input {...columnRegister('title', { required: true })} />
                </InputGroup>
              </>
            ) : (
              <>
                <InputGroup>
                  <label>عنوان لینک</label>
                  <input {...rowRegister('title', { required: true })} />
                </InputGroup>

                <InputGroup>
                  <label>لینک</label>
                  <input {...rowRegister('href', { required: true })} />
                </InputGroup>

                <InputGroup>
                  <Controller
                    control={rowControl}
                    name="bold"
                    render={({ field }) => (
                      <Checkbox {...field} checked={field?.value}>
                        برجسته
                      </Checkbox>
                    )}
                  />
                </InputGroup>
              </>
            )}
            <Container>
              <Button onClick={() => setActiveForm(null)} type="button" className="form">
                انصراف
              </Button>

              <Button status="Success" appearance="outline">
                ثبت
              </Button>

              <Button
                disabled={activeForm === 'column' ? !selectedColumn : !selectedRow}
                type="button"
                className="form"
                status="Danger"
                appearance="outline"
                onClick={() =>
                  activeForm === 'column'
                    ? onColumnRemoval(selectedColumn!)
                    : onRowRemoval(selectedColumn!, selectedRow!)
                }
              >
                حذف
              </Button>
            </Container>
          </Form>
        </ModalBox>
      </BasicModal>
      <Button status="Success" appearance="hero" className="submit" onClick={() => callback(menu)} disabled={loading}>
        بروزرسانی منو
      </Button>
    </Component>
  )
}

const Component = styled.div``

const Columns = styled.div`
  display: flex;
`

interface IMenuColumnProps {
  highlight?: boolean
}
const Column = styled.div<IMenuColumnProps>`
  flex: 1;
  padding: 1rem;
  border: ${(props) => (props.highlight ? '0.175rem' : '0.125rem')} solid
    ${(props) => (props?.highlight ? Colors.grayDark : Colors.grayBorder)};
  border-radius: 0.5rem;
  margin: 1rem 0 0 1rem;

  display: flex;
  flex-direction: column;

  &:hover {
    border-color: ${Colors.Danger};
  }
`

const ColumnTitle = styled.h4`
  &:hover {
    cursor: pointer;
    color: ${Colors.Danger};
  }
`
const Rows = styled.div`
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
`

interface IMenuRowProps {
  footer?: boolean
  invalid?: boolean
}
const Row = styled.div<IMenuRowProps>`
  padding: 1rem;
  border: 2px solid
    ${(props) => (props.footer ? Colors.grayDark : props.invalid ? Colors.MaterialRed : Colors.grayBorder)};
  border-radius: 0.5rem;
  margin: 0 0 1rem 0;

  &:hover {
    cursor: pointer;
    background-color: ${Colors.grayBorder};
  }
`

const Container = styled.div`
  display: flex;
`

const Button = styled(_Button)`
  &.form {
    margin: 0 1rem;
  }

  &.add-menu {
    margin-botto: 1rem;
  }

  &.submit {
    margin-top: 1rem;
  }
`

const Form = styled.form`
  label {
    min-width: 5rem;
  }
`

const InputGroup = styled(_InputGroup)`
  margin-bottom: 1rem;
`
