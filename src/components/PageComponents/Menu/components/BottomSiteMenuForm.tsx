import { Button as _Button, Checkbox, InputGroup as _InputGroup } from '@paljs/ui'
import { BasicModal, ModalBox } from 'components'
import { FlexContainer } from 'components/Container'
import produce from 'immer'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { Colors } from 'styles'
import {
  ProductsBottomSiteColumn,
  BottomSiteMenu,
  ProductsBottomSiteRow,
  initialProductsBottomSiteColumn,
  initialProductsBottomSiteRow,
} from 'types'

interface BottomSiteMenuFormProps {
  loading?: boolean
  callback: any
  defaultValues?: any
}

export const ProductsBottomSiteMenuForm: React.FC<BottomSiteMenuFormProps> = ({ loading, callback, defaultValues }) => {
  const [menu, setMenu] = useState<ProductsBottomSiteColumn[]>(defaultValues)

  const findColumnIndex = (targetColumn: ProductsBottomSiteColumn) => {
    return menu?.findIndex(
      (_column) =>
        !_column
          ?.map(
            (_row) =>
              !!targetColumn?.find((_targetRow) => _targetRow?.name === _row?.name && _targetRow?.url === _row?.url),
          )
          ?.includes(false),
    )
  }

  const findRowIndex = (targetColumn: ProductsBottomSiteColumn, targetRow: ProductsBottomSiteRow) => {
    return menu[findColumnIndex(targetColumn)]?.findIndex(
      (_row) => _row?.name === targetRow?.name && _row?.url === targetRow?.url,
    )
  }

  // <<<------------ Column ------------>>>
  const addColumn = () =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft?.push(initialProductsBottomSiteColumn)
      }),
    )

  const removeColumn = (column: ProductsBottomSiteColumn) => {
    const targetIndex = findColumnIndex(column)
    setMenu((_menu) => _menu?.filter((_column, index) => index !== targetIndex))
    setActiveForm(null)
  }

  const editColumn = (column: ProductsBottomSiteColumn, form: ProductsBottomSiteColumn) => {
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findColumnIndex(column)] = form
      }),
    )
  }

  // <<<------------ Row ------------>>>
  const addRow = (column: ProductsBottomSiteColumn, row: ProductsBottomSiteRow) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findColumnIndex(column)]?.push(row)
      }),
    )

  const removeRow = (column: ProductsBottomSiteColumn, row: ProductsBottomSiteRow) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findColumnIndex(column)]?.splice(findRowIndex(column, row), 1)
      }),
    )

  const editRow = (column: ProductsBottomSiteColumn, row: ProductsBottomSiteRow, form: ProductsBottomSiteRow) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findColumnIndex(column)][findRowIndex(column, row)] = form
      }),
    )

  // <<<------------ Forms ------------>>>
  const [selectedColumn, setSelectedColumn] = useState<ProductsBottomSiteColumn | null>(null)
  const [selectedRow, setSelectedRow] = useState<ProductsBottomSiteRow | null>(null)

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

  const onColumnFormSubmit = (form: ProductsBottomSiteColumn) => {
    selectedColumn ? editColumn(selectedColumn, form) : addColumn()
    columnReset()
    setActiveForm(null)
    toast.success(<p>{selectedColumn ? 'بروز' : 'ساخته'} شد</p>)
  }

  const onRowFormSubmit = (form: ProductsBottomSiteRow) => {
    selectedRow ? editRow(selectedColumn!, selectedRow, form) : addRow(selectedColumn!, form)
    setActiveForm(null)
    toast.success(
      <p>
        <div>
          <strong>"{form?.name}"</strong>
        </div>{' '}
        {selectedRow ? 'بروز' : 'ساخته'} شد
      </p>,
    )
    rowReset()
  }

  useEffect(() => {
    selectedColumn
      ? Object.entries(selectedColumn)?.map((entry) => columnSetValue(entry[0], entry[1]))
      : Object.entries(initialProductsBottomSiteColumn)?.map((entry) => columnSetValue(entry[0], null))
  }, [selectedColumn])

  useEffect(() => {
    selectedRow
      ? Object.entries(selectedRow)?.map((entry) => rowSetValue(entry[0], entry[1]))
      : Object.entries(initialProductsBottomSiteRow)?.map((entry) => rowSetValue(entry[0], null))
  }, [selectedRow])

  const onColumnRemoval = (column: ProductsBottomSiteColumn) => {
    removeColumn(column)
    setActiveForm(null)
    toast.success(<p>حذف شد</p>)
  }

  const onRowRemoval = (column: ProductsBottomSiteColumn, row: ProductsBottomSiteRow) => {
    removeRow(column, row)
    setActiveForm(null)
    toast.success(
      <p>
        <div>
          <strong>"{row?.name}"</strong>
        </div>{' '}
        حذف شد
      </p>,
    )
  }

  return (
    <Component>
      <Columns>
        {menu?.map((_column) => (
          <Column key={Math.random()}>
            <Button
              status="Danger"
              appearance="outline"
              onClick={() => {
                setSelectedColumn(_column)
                setActiveForm('column')
              }}
            >
              حذف ستون
            </Button>

            <Rows>
              {_column?.map((_row) => (
                <Row
                  key={_row?.name}
                  onClick={() => {
                    setSelectedColumn(_column)
                    setSelectedRow(_row)
                    setActiveForm('row')
                  }}
                >
                  {_row?.name}
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
        <Button status="Info" appearance="outline" onClick={addColumn}>
          افزودن ستون
        </Button>
      </Columns>

      {/* =========================== MODAL =========================== */}

      <BasicModal on={!!activeForm} toggle={() => setActiveForm(null)}>
        <ModalBox>
          {activeForm === 'column' ? (
            <FlexContainer>
              <P>
                آیا از حذف ستون شماره
                <Strong>{findColumnIndex(selectedColumn!)}</Strong>
                اطمینان دارید؟
              </P>
              <FlexContainer>
                <Button appearance="outline" onClick={() => setActiveForm(null)}>
                  انصراف
                </Button>

                <Button status="Danger" appearance="outline" onClick={() => removeColumn(selectedColumn!)}>
                  بله
                </Button>
              </FlexContainer>
            </FlexContainer>
          ) : (
            <Form onSubmit={rowHandleSubmit(onRowFormSubmit)}>
              <InputGroup>
                <label>عنوان لینک</label>
                <input {...rowRegister('name', { required: true })} />
              </InputGroup>

              <InputGroup>
                <label>لینک</label>
                <input {...rowRegister('url', { required: true })} />
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

              <Container>
                <Button onClick={() => setActiveForm(null)} type="button" className="form">
                  انصراف
                </Button>

                <Button status="Success" appearance="outline">
                  ثبت
                </Button>

                <Button
                  disabled={!selectedRow}
                  type="button"
                  className="form"
                  status="Danger"
                  appearance="outline"
                  onClick={() => onRowRemoval(selectedColumn!, selectedRow!)}
                >
                  حذف
                </Button>
              </Container>
            </Form>
          )}
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
    margin-bottom: 1rem;
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

const P = styled.p`
  margin-bottom: 1.5rem;
`

const Strong = styled.strong`
  margin: 0 0.25rem;

  font-family: IRANSansWebBold;
`
