import React, { useState } from 'react'
import styled from 'styled-components'
import { deleteAddress, has, pluralRemove, translator, useStore, useUserStore } from 'utils'
import Layout from 'Layouts'
import { Button, Container, Modal } from '@paljs/ui'
import { BasicTable, HeaderButton, PaginationBar, SearchBar } from 'components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Address, PermissionEnum } from 'types'

export const AddressesPage = () => {
  const router = useRouter()

  const { addresses, clearList } = useStore((state) => ({
    addresses: state?.addresses,
    clearList: state?.clearList,
  }))
  const permissions = useUserStore().getPermissions()

  const [loading, setLoading] = useState(false)

  const [itemToRemove, setItemToRemove] = useState<any>(null)

  const [itemsToRemove, setItemsToRemove] = useState<any>(null)
  const togglePluralRemoveModal = () => setItemsToRemove(null)

  const [tableSelections, setTableSelections] = useState<number[] | []>([])

  const toggleModal = () => setItemToRemove(null)

  const removeItem = async (item: any) => {
    setLoading(true)
    const response = await deleteAddress(item?.id)
    if (response?.status === 'success') {
      clearList('addresses', item?.id)
      toggleModal()
      toast.success('آدرس با موفقیت حذف شد')
    } else {
      toast.error('عملیات حذف موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      'addresses',
      selections,
      deleteAddress,
      (entity: string, id: any) => {
        clearList(entity, id)
        toast.success(`مورد با شناسه ${id} حذف شد`)
      },
      async () => {
        setTableSelections([])
        setItemsToRemove(null)
      },
      // TODO: add a proper error callback
      () => {},
    )
  }

  const columns: string[] = ['شماره آدرس', 'شناسه کاربر', 'استان', 'شهر', 'آدرس', 'کد پستی', 'فعالیت ها']

  const data = addresses?.data?.data?.map((address: Address) => [
    address?.id,
    <Link href={`/users/${address.user_id}`} passHref>
      <a target="_blank">{address.user_id}</a>
    </Link>,
    address?.province,
    address?.city,
    address?.address,
    address?.postalcode,
    <Container>
      {has(permissions, PermissionEnum.readAddress) && (
        <Link href={`/address/${address?.id}`} passHref>
          <a>
            <Button style={{ marginLeft: '1rem' }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.editAddress) && (
        <Link href={`/address/edit/${address?.id}`} passHref>
          <a>
            <Button style={{ marginLeft: '1rem' }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteAddress) && (
        <Button status="Danger" onClick={() => setItemToRemove(address)}>
          حذف
        </Button>
      )}
    </Container>,
  ])

  return (
    <Layout title="آدرس ها">
      <h1>
        آدرس
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteAddress) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </h1>
      {has(permissions, PermissionEnum.browseAddress) && (
        <>
          <SearchBar
            fields={addresses.fields}
            entity="addresses"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: '/address/search',
                query: form,
              })
            }
          />

          <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />

          <PaginationBar
            totalPages={addresses?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف آدرس با شناسه <span className="text-danger">{itemToRemove?.id}</span> {" "}
         اطمینان دارید؟
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

      <Modal on={itemsToRemove} toggle={togglePluralRemoveModal}>
        <ModalBox fluid>
          آیا از حذف موارد
          <span className="text-danger mx-1">{itemsToRemove?.join(' , ')}</span>
          اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={togglePluralRemoveModal} style={{ marginLeft: '1rem' }}>
              خیر، منصرم شدم
            </Button>
            <Button onClick={() => pluralRemoveTrigger(tableSelections)} disabled={loading} status="Danger">
              بله، حذف شوند
            </Button>
          </ButtonGroup>
        </ModalBox>
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
