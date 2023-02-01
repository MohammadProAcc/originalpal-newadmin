import { Modal } from "@paljs/ui";
import { Button, FlexContainer, HeaderButton, ModalBox, TagForm } from "components";
import Layout from "Layouts";
import router from "next/router";
import { useState } from "react";
import { PermissionEnum } from "types";
import { deleteTag, has, removeItem, useStore, useUserStore } from "utils";

export const EditTagPage: React.FC = () => {
  const { tag } = useStore((state: any) => ({
    tag: state?.tag,
  }));

  const permissions = useUserStore().getPermissions();

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const remove = async (removeId: any) => {
    await removeItem("tags", removeId, deleteTag, () => router.push("/tags"), [
      `برچسب ${removeId} با موفقیت حذف شد`,
      "حذف برچسب موفقیت آمیز نبود",
    ]);
  };

  return (
    <Layout title={`${tag?.id}`}>
      <h1 style={{ marginBottom: "4rem" }}>
        ویرایش برچسب {tag?.name}
        <FlexContainer style={{ display: "inline-flex" }}>
          {has(permissions, PermissionEnum.readTag) && (
            <HeaderButton status="Info" href={`/tags/${tag?.id}`}>
              مشاهده
            </HeaderButton>
          )}

          {has(permissions, PermissionEnum.deleteTag) && (
            <HeaderButton status="Danger" onClick={() => setItemToRemove(tag)}>
              حذف
            </HeaderButton>
          )}
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف برچسب {itemToRemove?.id} اطمینان دارید؟
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <TagForm defaultValues={tag} />
    </Layout>
  );
};
