import { Button, Modal } from "@paljs/ui";
import { HeaderButton, ModalBox, StockItem } from "components";
import { FlexContainer } from "components/Container/FlexContainer";
import Layout from "Layouts";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { PermissionEnum } from "types";
import { deleteStock, has, removeItem, useStore, useUserStore } from "utils";

export const EditStockPage: React.FC = () => {
  const router = useRouter();
  const { stock } = useStore((state: any) => ({
    stock: state?.stock,
  }));
  const permissions = useUserStore().getPermissions();

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const remove = async (removeId: any) => {
    await removeItem("stock", removeId, deleteStock, () => router.push("/stock"), [
      `انبار ${removeId} با موفقیت حذف شد`,
      "حذف انبار موفقیت آمیز نبود",
    ]);
  };

  return (
    <Layout title={`ویرایش انبار ${stock?.id}`}>
      <h1 style={{ marginBottom: "4rem" }}>
        ویرایش انبار {stock?.id}
        <FlexContainer style={{ display: "inline-flex" }}>
          {has(permissions, PermissionEnum.editStock) && (
            <HeaderButton status="Info" href={`/stock/${stock?.id}`}>
              مشاهده
            </HeaderButton>
          )}

          {has(permissions, PermissionEnum.deleteStock) && (
            <HeaderButton status="Danger" onClick={() => setItemToRemove(stock)}>
              حذف
            </HeaderButton>
          )}
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف انبار {itemToRemove?.id} اطمینان دارید؟
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <StockItem
        stock={stock}
        callback={() => {
          router.back();
        }}
      />
    </Layout>
  );
};
