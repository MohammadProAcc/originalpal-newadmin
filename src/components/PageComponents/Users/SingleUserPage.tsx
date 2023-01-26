import { deleteUser, has, removeItem, toLocalDate, translator, useStore, useUserStore } from "utils";
import Layout from "Layouts";
import { Button, Card, CardBody, CardHeader, Modal } from "@paljs/ui";
import React, { useState } from "react";
import { FlexContainer, HeaderButton, ModalBox } from "components";
import router from "next/router";
import { PermissionEnum } from "types";
import { DatesCard } from "components/Card/DatesCard";

export const SingleUserPage: React.FC = () => {
  const { user } = useStore((state: any) => ({
    user: state?.user,
  }));
  const permissions = useUserStore().getPermissions();

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const remove = async (removeId: any) => {
    await removeItem("users", removeId, deleteUser, () => router.push("/users"), [
      `کاربر ${removeId} با موفقیت حذف شد`,
      "حذف کاربر موفقیت آمیز نبود",
    ]);
  };

  return (
    <Layout title={`${user?.id}`}>
      <h1 style={{ marginBottom: "4rem" }}>
        کاربر "{user?.name}"
        {has(permissions, PermissionEnum.editUser) && (
          <HeaderButton status="Info" href={`/users/edit/${user?.id}`}>
            ویرایش
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteUser) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(user)}>
            حذف
          </HeaderButton>
        )}
      </h1>

      {/* ....:::::: Removal Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: "1rem" }}>
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
        <CardHeader>شناسه کاربر</CardHeader>
        <CardBody>{user?.id}</CardBody>
      </Card>

      <Card>
        <CardHeader>نام</CardHeader>
        <CardBody>{user?.name}</CardBody>
      </Card>

      <Card>
        <CardHeader>نام خانوادگی</CardHeader>
        <CardBody>{user?.lastname ?? "-"}</CardBody>
      </Card>

      <Card>
        <CardHeader>ایمیل</CardHeader>
        <CardBody>{user?.email ?? "-"}</CardBody>
      </Card>

      <Card>
        <CardHeader>زمان ثبت نام</CardHeader>
        <CardBody>{toLocalDate(user?.created_at) ?? "-"}</CardBody>
      </Card>

      <Card>
        <CardHeader>وضعیت</CardHeader>
        <CardBody>{user?.status ? "فعال" : "غیر فعال"}</CardBody>
      </Card>

      <Card>
        <CardHeader>نقش ها</CardHeader>
        <CardBody>{user?.roles?.map((role: any) => role.name).join(", ")}</CardBody>
      </Card>

      <Card>
        <CardHeader>شماره تلفن</CardHeader>
        <CardBody>{user?.phone_number ?? "-"}</CardBody>
      </Card>

      <DatesCard createdAt={user?.created_at} updatedAt={user?.updated_at} />
    </Layout>
  );
};
