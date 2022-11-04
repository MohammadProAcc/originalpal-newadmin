import { deleteMenu, has, removeItem, toLocalDate, useStore, useUserStore } from 'utils'
import Layout from 'Layouts'
import { Alert as _Alert, Button, Card, CardBody, CardHeader, Modal } from '@paljs/ui'
import Image from 'next/image'
import styled from 'styled-components'
import React, { useState } from 'react'
import router from 'next/router'
import { FlexContainer, HeaderButton, ModalBox } from 'components'
import { PermissionEnum } from 'types'

export const SingleMenuPage: React.FC = () => {
  const { menu } = useStore((state: any) => ({
    menu: state?.menu,
  }))
  const permissions = useUserStore().getPermissions()

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('menu', removeId, deleteMenu, () => router.push('/menu'), [
      `منو ${removeId} با موفقیت حذف شد`,
      'حذف منو موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`مشاهده منو ${menu?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        <span style={{ marginLeft: '1rem' }}>مشاهده منو {menu?.id}</span>{' '}
        {has(permissions, PermissionEnum.editMainPageSection) && (
          <HeaderButton status="Info" href={`/menu/edit/${menu.id}`}>
            ویرایش
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteMainPageSection) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(menu)}>
            حذف
          </HeaderButton>
        )}
        {menu?.is_news ? (
          <Alert status="Info">
            <h2
              style={{
                color: '#fff',
              }}
            >
              اخبار
            </h2>
          </Alert>
        ) : (
          <></>
        )}
      </h1>

      {/* ....:::::: Removal Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: '1rem' }}>
            آیا از حذف برچسب
            <span className="mx-1">{itemToRemove?.id}</span>
            اطمینان دارید؟
          </div>
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <Card>
        <CardHeader>نوع منو</CardHeader>
        <CardBody>{menu?.type}</CardBody>
      </Card>

      <Card>
        <CardHeader>موارد منو</CardHeader>
        <CardBody>
          {menu?.items?.map((item: any) => (
            <Card>
              <CardHeader>
                عنوان : {item?.title}, اینک : {item?.href}
              </CardHeader>
              <CardBody>
                {item?.chidren?.length > 0 &&
                  item?.children?.map((child: any) => (
                    <Card>
                      <CardHeader>
                        عنوان : {child?.title}, لینک : {child?.href}
                      </CardHeader>
                    </Card>
                  ))}
              </CardBody>
            </Card>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>ساخته شده در</CardHeader>
            <CardBody>{toLocalDate(menu?.created_at)}</CardBody>
          </Card>
          <Card>
            <CardHeader>بروز شده در</CardHeader>
            <CardBody>{toLocalDate(menu?.updated_at)}</CardBody>
          </Card>
        </CardBody>
      </Card>
    </Layout>
  )
}

const Alert = styled(_Alert)`
  width: 10rem;
  display: inline-flex;
  text-align: center;
`
