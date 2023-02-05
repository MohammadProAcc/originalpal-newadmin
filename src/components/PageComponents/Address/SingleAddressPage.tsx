import { deleteAddress, numeralize, removeItem, translator, useStore, useUserStore, has } from "utils";
import Layout from "Layouts";
import { Card, CardBody, CardHeader, Modal } from "@paljs/ui";
import React, { useState } from "react";
import router from "next/router";
import { Button, FlexContainer, HeaderButton, ModalBox } from "components";
import { PermissionEnum } from "types";
import { DatesCard } from "components/Card/DatesCard";

const clacTotalPrice = (addressItems: any[]) => {
  // const priceArr = address['address_items']
  const priceArr = addressItems?.map((addressItem: any) => addressItem?.price);
  if (priceArr?.length > 0) {
    const price = priceArr?.reduce((prev: number, curr: number) => curr + prev);
    return price;
  }
};

export const SingleAddressPage: React.FC = () => {
  const { address } = useStore((state: any) => ({
    address: state?.address,
  }));
  const permissions = useUserStore().getPermissions();

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const remove = async (removeId: any) => {
    await removeItem("address", removeId, deleteAddress, () => router.push("/address"), [
      `آدرس ${removeId} با موفقیت حذف شد`,
      "حذف آدرس موفقیت آمیز نبود",
    ]);
  };

  return (
    <Layout title={`آدرس شماره ${address?.id}`}>
      <h1 style={{ margin: "0 0 4rem 0" }}>
        آدرس شماره {address?.id}
        {has(permissions, PermissionEnum.editAddress) && (
          <HeaderButton status="Info" href={`/address/edit/${address?.id}`}>
            ویرایش
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteAddress) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(address)}>
            حذف
          </HeaderButton>
        )}
      </h1>

      <Card>
        <CardHeader>شناسه آدرس</CardHeader>

        <CardBody>{address?.id}</CardBody>
      </Card>

      <Card>
        <CardHeader>کد پستی</CardHeader>

        <CardBody>{address?.postalcode}</CardBody>
      </Card>

      <Card>
        <CardHeader>استان</CardHeader>

        <CardBody>{address?.province}</CardBody>
      </Card>

      <Card>
        <CardHeader>شهر</CardHeader>

        <CardBody>{address?.city}</CardBody>
      </Card>

      <Card>
        <CardHeader>نشانی</CardHeader>

        <CardBody>{address?.address}</CardBody>
      </Card>

      <Card>
        <CardHeader>شناسه کاربر</CardHeader>

        <CardBody>{address?.user_id}</CardBody>
      </Card>

      <DatesCard createdAt={address?.created_at} updatedAt={address?.updated_at} />

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: "1rem" }}>
            آیا از حذف آدرس
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
    </Layout>
  );
};
