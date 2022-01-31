import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore, deleteMenu, pluralRemove, editMenu } from 'utils'
import Layout from 'Layouts'
import { Button, Container, InputGroup, Modal, Popover } from '@paljs/ui'
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Add } from '@material-ui/icons'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

export const MenuPage = () => {
  const router = useRouter()

  const { menu, clearList } = useStore((state) => ({
    menu: state?.menu,
    clearList: state?.clearList,
  }))

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)

  const toggleModal = () => setItemToRemove(null)

  const removeItem = async (item: any) => {
    setLoading(true)
    const response = await deleteMenu(item?.id)
    if (response?.status === 'success') {
      clearList('menu', item?.id)
      setItemToRemove(null)
      toast.success('منو با موفقیت حذف شد')
    } else {
      toast.error('حذف منو موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const [itemsToRemove, setItemsToRemove] = useState<any>(null)
  const togglePluralRemoveModal = () => setItemsToRemove(null)

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      'menu',
      selections,
      deleteMenu,
      (entity: string, id: any) => {
        clearList(entity, id)
        toast.success(`مورد با شناسه ${id} حذف شد`)
      },
      async () => {
        setTableSelections([])
        setItemsToRemove(null)
      },
    )
  }

  const { register, handleSubmit } = useForm()

  const [menuToEdit, setMenuToEdit] = useState<any>(null)
  const [editMenuState, setEditMenuState] = useState<any>(null)

  useEffect(() => console.log(editMenuState), [editMenuState])

  const updateMenu = async (form: any) => {
    setLoading(true)

    console.log(editMenuState)
    const response = await editMenu(menuToEdit?.id, { items: editMenuState })

    if (response?.status === 'success') {
      // if (false) {
      setMenuToEdit(null)
      toast.success('منو با موفقیت بروز شد')
    } else {
      toast.error('برپزرسانی منو موفقیت آمیز نبود')
    }

    setLoading(false)
  }

  const columns: any[] = ['شناسه منو', 'نوع منو', 'فعالیت ها']

  const data = menu?.data?.data?.map((menu: any) => [
    // =====>> Table Columns <<=====
    menu?.id,
    menu?.type,
    <Container>
      {/*
        <Link href={`/menu/${menu?.id}`}>
          <Button style={{ marginLeft: '1rem' }} status="Info">
            مشاهده
          </Button>
        </Link>
      */}
      <Button onClick={() => setMenuToEdit(menu)} style={{ marginLeft: '1rem' }} status="Primary">
        ویرایش
      </Button>
      {/*
        <Button status="Danger" onClick={() => setItemToRemove(menu)}>
          حذف
        </Button>
      */}
    </Container>,
  ])

  return (
    <Layout title="منو ها">
      <h1>منو ها</h1>

      <FlexContainer>
        <Link href="/menu/create">
          <Button
            disabled
            style={{
              margin: '1rem 0 1rem 1rem',
              display: 'flex',
            }}
            status="Success"
            appearance="outline"
          >
            افزودن منو
            <Add />
          </Button>
        </Link>
        {tableSelections?.length > 0 && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      <SearchBar
        fields={menu.fields}
        entity="menu"
        params={router.query}
        callback={(form: any) =>
          router.push({
            pathname: '/menu/search',
            query: form,
          })
        }
      />

      <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />
      <PaginationBar
        totalPages={menu?.data?.last_page}
        activePage={router.query.page ? Number(router.query.page) : 1}
        router={router}
      />

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف منو <span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{' '}
          <span className="text-danger">{`${itemToRemove?.title}`}</span> اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={toggleModal} style={{ marginLeft: '1rem' }}>
              خیر، منصرم شدم
            </Button>
            <Button onClick={() => removeItem(itemToRemove)} disabled={loading} status="Danger">
              بله، حذف شود
            </Button>
          </ButtonGroup>
        </ModalBox>
      </Modal>

      <Modal on={menuToEdit} toggle={() => setMenuToEdit(null)}>
        <ModalBox fluid>
          بروزرسانی منوی {menuToEdit?.id}
          <form onSubmit={handleSubmit(updateMenu)}>
            <InputGroup className="d-flex flex-column my-3">
              <label>موارد</label>
              <Popover
                trigger="focus"
                placement="top"
                overlay={
                  <p>
                    منوی ساخته شده توسط{' '}
                    <a href="https://www.jqueryscript.net/demo/Drag-Drop-Menu-Builder-For-Bootstrap/">ابزار منو ساز</a>{' '}
                    را در ورودی کپی کنید
                  </p>
                }
              >
                <input {...register('items')} onChange={(e) => setEditMenuState(e.target.value)} placeholder="موارد" />
              </Popover>
            </InputGroup>
            <Button status="Info" type="submit">
              برورسانی منو
            </Button>
          </form>
        </ModalBox>
      </Modal>

      <Modal on={itemsToRemove} toggle={togglePluralRemoveModal}>
        <ModalBox fluid>برای بروزرسانی منو، منوی جدید را در ورودی زیر کپی کنید</ModalBox>
      </Modal>
    </Layout>
  )
}

const ModalBox = styled(Container)`
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #fff;
`

const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: flex;
`
