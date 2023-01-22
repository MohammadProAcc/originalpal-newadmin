import { Button as _Button, Checkbox, InputGroup as _InputGroup } from '@paljs/ui'
import { BasicModal, ModalBox } from 'components'
import produce from 'immer'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { Colors } from 'styles'
import {
  initialTopSiteMenu,
  initialTopSiteMenuColumn,
  initialTopSiteMenuColumnRow,
  TopSiteColumn,
  TopSiteMenu,
  TopSiteRow,
} from 'types'
import { uploadMediaFile, updateMedia } from 'utils'

interface TopSiteMenuFormProps {
  loading?: boolean
  callback: any
  defaultValues?: any
}

export const TopSiteMenuForm: React.FC<TopSiteMenuFormProps> = ({ loading, callback, defaultValues }) => {
  const [menu, setMenu] = useState<TopSiteMenu[]>(defaultValues)

  async function uploadColumnBanner(file: File, column: any) {
    const response = await uploadMediaFile(file)
    if (response !== null) {
      const updateResponse = await updateMedia(response.data.data.id, {
        type: 'top-site-menu',
        reference_id: column.menuTitle,
        meta: {
          a: `نمایه فهرست ${column.menuTitle}`,
          t: `نمایه فهرست ${column.menuTitle}`,
        },
      })
      if (updateResponse !== null) {
        return updateResponse.data.data
      } else {
        toast.error('بارگذاری تصویر موفقیت آمیز نبود')
      }
    } else {
      toast.error('بارگذاری تصویر موفقیت آمیز نبود')
    }
  }

  const findMenuIndex = (targetMenu: TopSiteMenu) => {
    return menu?.findIndex((item) => item?.menuTitle === targetMenu?.menuTitle)
  }

  const findMenuColumnIndex = (targetMenu: TopSiteMenu, targetColumn: TopSiteColumn) => {
    const menuIndex = findMenuIndex(targetMenu)
    return menu[menuIndex]?.columns?.findIndex((item) => item?.columnTitle === targetColumn?.columnTitle)
  }

  const findMenuColumnRowIndex = (targetMenu: TopSiteMenu, targetColumn: TopSiteColumn, targetRow: TopSiteRow) => {
    const menuIndex = findMenuIndex(targetMenu)
    const columnIndex = findMenuColumnIndex(targetMenu, targetColumn)
    return menu[menuIndex]?.columns[columnIndex]?.rows?.findIndex((item) => item?.name === targetRow?.name)
  }

  // <<<------------ Menu ------------>>>
  const addMenu = (menu: TopSiteMenu) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft?.push(menu)
      }),
    )

  const removeMenu = (menu: any) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft?.splice(findMenuIndex(menu), 1)
      }),
    )

  const editMenu = (menu: any, form: TopSiteMenu) => {
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findMenuIndex(menu)] = form
      }),
    )
  }

  // <<<------------ Column ------------>>>
  const addColumn = (menu: any, column: TopSiteColumn) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findMenuIndex(menu)]?.columns?.push(column)
      }),
    )

  const removeColumn = (menu: any, column: any) =>
    setMenu((current) =>
      produce(current, (draft) => {
        const menuIndex = findMenuIndex(menu)
        draft[menuIndex].columns = draft[menuIndex]?.columns?.filter(
          (item) => item?.columnTitle !== column?.columnTitle,
        )
      }),
    )

  const editColumn = (menu: any, column: any, form: TopSiteColumn) => {
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findMenuIndex(menu)].columns[findMenuColumnIndex(menu, column)] = form
      }),
    )
  }

  const removeColumnFooter = (menu: any, column: any) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findMenuIndex(menu)].columns[findMenuColumnIndex(menu, column)].footer = undefined
      }),
    )

  const editColumnFooter = (menu: any, column: any, form: TopSiteRow) => {
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findMenuIndex(menu)].columns[findMenuColumnIndex(menu, column)].footer = form
      }),
    )
  }

  // <<<------------ Row ------------>>>
  const addColumnRow = (menu: any, column: any, row: TopSiteRow) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findMenuIndex(menu)]?.columns[findMenuColumnIndex(menu, column)]?.rows?.push(row)
      }),
    )

  const removeColumnRow = (menu: any, column: any, row: any) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findMenuIndex(menu)]?.columns[findMenuColumnIndex(menu, column)]?.rows?.splice(
          findMenuColumnRowIndex(menu, column, row),
          1,
        )
      }),
    )

  const editColumnRow = (menu: any, column: any, row: any, form: TopSiteRow) =>
    setMenu((current) =>
      produce(current, (draft) => {
        draft[findMenuIndex(menu)].columns[findMenuColumnIndex(menu, column)].rows[
          findMenuColumnRowIndex(menu, column, row)
        ] = form
      }),
    )

  // <<<------------ Forms ------------>>>
  const [selectedMenu, setSelectedMenu] = useState<TopSiteMenu | null>(null)
  const [selectedColumn, setSelectedColumn] = useState<TopSiteColumn | null>(null)
  const [selectedRow, setSelectedRow] = useState<TopSiteRow | null>(null)

  const [activeForm, setActiveForm] = useState<'menu' | 'column' | 'columnFooter' | 'row' | null>(null)

  const {
    register: menuRegister,
    handleSubmit: menuHandleSubmit,
    control: menuControl,
    setValue: menuSetValue,
    reset: menuReset,
  } = useForm()

  const {
    register: columnRegister,
    handleSubmit: columnHandleSubmit,
    control: columnControl,
    setValue: columnSetValue,
    reset: columnReset,
  } = useForm()

  const {
    register: columnFooterRegister,
    handleSubmit: columnFooterHandleSubmit,
    control: columnFooterControl,
    setValue: columnFooterSetValue,
    reset: columnFooterReset,
  } = useForm()

  const {
    register: rowRegister,
    handleSubmit: rowHandleSubmit,
    control: rowControl,
    setValue: rowSetValue,
    reset: rowReset,
  } = useForm()

  const onMenuFormSubmit = (form: TopSiteMenu) => {
    selectedMenu
      ? editMenu(selectedMenu, form)
      : addMenu({
          ...initialTopSiteMenu,
          menuTitle: form?.menuTitle,
          href: form?.href,
        })
    menuReset()
    setActiveForm(null)
    toast.success(
      <p>
        <div>
          <strong>"{form?.menuTitle}"</strong>
        </div>{' '}
        {selectedMenu ? 'بروز' : 'ساخته'} شد
      </p>,
    )
  }

  const onColumnFormSubmit = async (form: TopSiteColumn) => {
    if (form.thumb) {
      const response = await uploadColumnBanner(form.thumb[0], selectedColumn)
      form.thumb = response
    }
    selectedColumn
      ? editColumn(selectedMenu, selectedColumn, form)
      : addColumn(selectedMenu, { ...initialTopSiteMenuColumn, columnTitle: form?.columnTitle })
    columnReset()
    setActiveForm(null)
    toast.success(
      <p>
        <div>
          <strong>"{form?.columnTitle}"</strong>
        </div>{' '}
        {selectedColumn ? 'بروز' : 'ساخته'} شد
      </p>,
    )
  }

  const onColumnFooterFormSubmit = (form: TopSiteRow) => {
    editColumnFooter(selectedMenu, selectedColumn, form)
    columnReset()
    setActiveForm(null)
    toast.success(
      <p>
        <div>
          <strong>"{selectedColumn?.columnTitle}"</strong>
        </div>{' '}
        بروز شد
      </p>,
    )
  }

  const onRowFormSubmit = (form: TopSiteRow) => {
    selectedRow
      ? editColumnRow(selectedMenu, selectedColumn, selectedRow, form)
      : addColumnRow(selectedMenu, selectedColumn, form)
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
    selectedMenu
      ? Object.entries(selectedMenu)?.map((entry) => menuSetValue(entry[0], entry[1]))
      : Object.entries(initialTopSiteMenu)?.map((entry) => menuSetValue(entry[0], null))
  }, [selectedMenu])

  useEffect(() => {
    selectedColumn
      ? Object.entries(selectedColumn)?.map((entry) => columnSetValue(entry[0], entry[1]))
      : Object.entries(initialTopSiteMenuColumn)?.map((entry) => columnSetValue(entry[0], null))
    activeForm === 'columnFooter' && selectedColumn?.footer
      ? Object.entries(selectedColumn?.footer)?.map((entry) => columnFooterSetValue(entry[0], entry[1]))
      : Object.entries(initialTopSiteMenuColumn?.footer)?.map((entry) => columnFooterSetValue(entry[0], entry[1]))
  }, [selectedColumn])

  useEffect(() => {
    selectedRow
      ? Object.entries(selectedRow)?.map((entry) => rowSetValue(entry[0], entry[1]))
      : Object.entries(initialTopSiteMenuColumnRow)?.map((entry) => rowSetValue(entry[0], null))
  }, [selectedRow])

  const onMenuRemoval = (menu: TopSiteMenu) => {
    removeMenu(menu)
    setActiveForm(null)
    toast.success(
      <p>
        <div>
          <strong>"{menu?.menuTitle}"</strong>
        </div>{' '}
        حذف شد
      </p>,
    )
  }

  const onColumnRemoval = (menu: TopSiteMenu, column: TopSiteColumn) => {
    removeColumn(menu, column)
    setActiveForm(null)
    toast.success(
      <p>
        <div>
          <strong>"{column?.columnTitle}"</strong>
        </div>{' '}
        حذف شد
      </p>,
    )
  }

  const onColumnFooterRemoval = (menu: TopSiteMenu, column: TopSiteColumn) => {
    removeColumnFooter(menu, column)
    setActiveForm(null)
    toast.success(
      <p>
        پاورقی فهرست
        <div>
          <strong>"{column?.columnTitle}"</strong>
        </div>
        حذف شد
      </p>,
    )
  }

  const onRowRemoval = (menu: TopSiteMenu, column: TopSiteColumn, row: TopSiteRow) => {
    removeColumnRow(menu, column, row)
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

  function removeColumnBanner() {
    columnSetValue('thumb', null)
    toast.success('بنر فهرست حذف شد, پس از ثبت موارد اعمال خواهد شد')
  }

  return (
    <Component>
      <Menus>
        <Button
          status="Info"
          appearance="outline"
          className="add-menu"
          type="button"
          onClick={() => {
            setSelectedMenu(null)
            setActiveForm('menu')
          }}
        >
          افزودن منو
        </Button>
        {menu?.map((_menu) => (
          <Menu key={_menu?.menuTitle}>
            <MenuTitle
              onClick={() => {
                setSelectedMenu(_menu)
                setActiveForm('menu')
              }}
            >
              {_menu?.menuTitle}
            </MenuTitle>
            <MenuColumns>
              {_menu?.columns?.map((_column) => (
                <Column highlight={_column?.highlight} key={_column?.columnTitle}>
                  <ColumnTitle
                    title="برای ویرایش فهرست کلیک کنید"
                    onClick={() => {
                      setSelectedMenu(_menu)
                      setSelectedColumn(_column)
                      setActiveForm('column')
                    }}
                  >
                    {_column?.columnTitle}
                  </ColumnTitle>

                  {_column?.thumb && (
                    <ThumbContainer>
                      <ColumnThumb src={`${process.env.MED_SRC}${_column?.thumb?.url}`} />
                    </ThumbContainer>
                  )}

                  <MenuRows>
                    {_column?.rows?.map((_row) => (
                      <MenuRow
                        key={_row?.name}
                        onClick={() => {
                          setSelectedMenu(_menu)
                          setSelectedColumn(_column)
                          setSelectedRow(_row)
                          setActiveForm('row')
                        }}
                      >
                        {_row?.name}
                      </MenuRow>
                    ))}
                    {_column?.footer ? (
                      <MenuRow
                        footer
                        key={_column?.footer?.name}
                        onClick={() => {
                          setSelectedMenu(_menu)
                          setSelectedColumn(_column)
                          setActiveForm('columnFooter')
                        }}
                      >
                        {_column?.footer?.name}
                      </MenuRow>
                    ) : (
                      <MenuRow
                        invalid
                        onClick={() => {
                          setSelectedMenu(_menu)
                          setSelectedColumn(_column)
                          setActiveForm('columnFooter')
                        }}
                      >
                        + افزودن پاورقی
                      </MenuRow>
                    )}
                    <Button
                      onClick={() => {
                        setSelectedMenu(_menu)
                        setSelectedColumn(_column)
                        setSelectedRow(null)
                        setActiveForm('row')
                      }}
                      status="Info"
                      appearance="outline"
                    >
                      افزودن لینک
                    </Button>
                  </MenuRows>
                </Column>
              ))}
              <Button
                status="Info"
                appearance="outline"
                onClick={() => {
                  setSelectedMenu(_menu)
                  setSelectedColumn(null)
                  setActiveForm('column')
                }}
              >
                افزودن ستون
              </Button>
            </MenuColumns>
          </Menu>
        ))}
      </Menus>

      {/* =========================== MODAL =========================== */}

      <BasicModal on={!!activeForm} toggle={() => setActiveForm(null)}>
        <ModalBox>
          <Form
            onSubmit={
              activeForm === 'menu'
                ? menuHandleSubmit(onMenuFormSubmit)
                : activeForm === 'column'
                ? columnHandleSubmit(onColumnFormSubmit)
                : activeForm === 'columnFooter'
                ? columnFooterHandleSubmit(onColumnFooterFormSubmit)
                : rowHandleSubmit(onRowFormSubmit)
            }
          >
            {activeForm === 'menu' ? (
              <>
                <InputGroup>
                  <label>نام منو</label>
                  <input {...menuRegister('menuTitle')} />
                </InputGroup>

                <InputGroup>
                  <label>لینک عنوان منو</label>
                  <input {...menuRegister('href')} />
                </InputGroup>

                <InputGroup>
                  <Controller
                    control={menuControl}
                    name="bold"
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value}>
                        برجسته
                      </Checkbox>
                    )}
                  />
                </InputGroup>

                <InputGroup>
                  <Controller
                    control={menuControl}
                    name="footer"
                    render={({ field }) => (
                      <Checkbox {...field} checked={field.value}>
                        منو پاروقی دارد
                      </Checkbox>
                    )}
                  />
                </InputGroup>
              </>
            ) : activeForm === 'column' ? (
              <>
                <InputGroup>
                  <label>نام فهرست</label>
                  <input {...columnRegister('columnTitle', { required: true })} />
                </InputGroup>

                <InputGroup>
                  <label>تصویر فهرست</label>
                  <input type="file" {...columnRegister('...thumb')} />
                </InputGroup>
                {selectedColumn?.thumb && (
                  <ThumbContainer>
                    <ColumnThumbDeleteButton onClick={removeColumnBanner}>حذف تصویر</ColumnThumbDeleteButton>
                    <ColumnThumb src={`${process.env.MED_SRC}${selectedColumn?.thumb?.url}`} />
                  </ThumbContainer>
                )}

                <InputGroup>
                  <Controller
                    control={columnControl}
                    name="highlight"
                    render={({ field }) => (
                      <Checkbox checked={field.value} {...field}>
                        فهرست برجسته
                      </Checkbox>
                    )}
                  />
                </InputGroup>
              </>
            ) : activeForm === 'columnFooter' ? (
              <>
                <H3 className="column-footer">
                  پاورقی منوی ({selectedMenu?.menuTitle})، فهرست ({selectedColumn?.columnTitle}){' '}
                </H3>

                <InputGroup>
                  <label>عنوان لینک پاورقی</label>
                  <input {...columnFooterRegister('name')} />
                </InputGroup>

                <InputGroup>
                  <label>لینک پاورقی</label>
                  <input {...columnFooterRegister('href')} />
                </InputGroup>

                <InputGroup>
                  <Controller
                    control={columnFooterControl}
                    name="bold"
                    render={({ field }) => (
                      <Checkbox {...field} checked={field?.value}>
                        برجسته
                      </Checkbox>
                    )}
                  />
                </InputGroup>
              </>
            ) : (
              <>
                <InputGroup>
                  <label>عنوان لینک</label>
                  <input {...rowRegister('name', { required: true })} />
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
                disabled={
                  activeForm === 'menu'
                    ? !selectedMenu
                    : activeForm === 'column'
                    ? !selectedColumn
                    : activeForm === 'columnFooter'
                    ? !selectedColumn?.footer
                    : !selectedRow
                }
                type="button"
                className="form"
                status="Danger"
                appearance="outline"
                onClick={() =>
                  activeForm === 'menu'
                    ? onMenuRemoval(selectedMenu!)
                    : activeForm === 'column'
                    ? onColumnRemoval(selectedMenu!, selectedColumn!)
                    : activeForm === 'columnFooter'
                    ? onColumnFooterRemoval(selectedMenu!, selectedColumn!)
                    : onRowRemoval(selectedMenu!, selectedColumn!, selectedRow!)
                }
              >
                حذف
              </Button>
            </Container>
          </Form>
        </ModalBox>
      </BasicModal>
      <Button status="Success" appearance="hero" onClick={() => callback(menu)} disabled={loading}>
        بروزرسانی منو
      </Button>
    </Component>
  )
}

const Component = styled.div``

const Menus = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Menu = styled.div`
  padding: 1rem;
  border: 3px solid ${Colors.grayBorder};
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: column;
`

const MenuTitle = styled.h3`
  &:hover {
    cursor: pointer;
    color: ${Colors.Danger};
  }
`

const MenuColumns = styled.div`
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

const ThumbContainer = styled.div`
  width: 100%;
  height: 0;
  padding-top: 45%;
  margin: 1rem 0;

  position: relative;
`

const ColumnThumb = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;

  position: absolute;
  top: 0;
  left: 0;
`

const MenuRows = styled.div`
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
`

interface IMenuRowProps {
  footer?: boolean
  invalid?: boolean
}
const MenuRow = styled.div<IMenuRowProps>`
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
`

const Form = styled.form`
  label {
    min-width: 5rem;
  }
`

const InputGroup = styled(_InputGroup)`
  margin-bottom: 1rem;
`

const H3 = styled.h3`
  &.column-footer {
    margin-bottom: 2rem;
  }
`

const ColumnThumbDeleteButton = styled.button.attrs({
  type: 'button',
})`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`
