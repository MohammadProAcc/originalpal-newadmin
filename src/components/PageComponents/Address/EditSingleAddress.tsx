import { Card, CardBody, CardHeader, InputGroup, Modal } from "@paljs/ui";
import { Button, FlexContainer, HeaderButton, ModalBox } from "components";
import Layout from "Layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PermissionEnum } from "types";
import { deleteAddress, editAddress, has, removeItem, useStore, useUserStore } from "utils";

export const EditAddressPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { address } = useStore((state: any) => ({
    address: state?.address,
  }));
  const permissions = useUserStore().getPermissions();

  const { register, handleSubmit } = useForm({
    defaultValues: address,
  });

  const onSubmit = async (form: any) => {
    setLoading(true);
    const response = await editAddress(address?.id, form);
    if (response === null) {
      toast.success("آدرس بروز شد");
      router.back();
    } else {
      toast.error("بروزرسانی آدرس موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const remove = async (removeId: any) => {
    await removeItem("address", removeId, deleteAddress, () => router.push("/address"), [
      `آدرس ${removeId} با موفقیت حذف شد`,
      "حذف آدرس موفقیت آمیز نبود",
    ]);
  };

  return (
    <Layout title={`${address?.id}`}>
      <h1 style={{ marginBottom: "4rem" }}>
        ویرایش آدرس {address?.name}
        <FlexContainer style={{ display: "inline-flex" }}>
          {has(permissions, PermissionEnum.readAddress) && (
            <HeaderButton status="Info" href={`/address/${address?.id}`}>
              مشاهده
            </HeaderButton>
          )}
          {has(permissions, PermissionEnum.deleteAddress) && (
            <HeaderButton status="Danger" onClick={() => setItemToRemove(address)}>
              حذف
            </HeaderButton>
          )}
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف آدرس {itemToRemove?.id} اطمینان دارید؟
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>شناسه آدرس</CardHeader>
          <CardBody>{address.id}</CardBody>
        </Card>

        <Card>
          <CardHeader>استان</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("province", { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>شهر</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("city", { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نشانی</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("address", { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>کد پستی</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("postalcode", { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Button disabled={loading}>ویرایش آدرس</Button>
      </form>
    </Layout>
  );
};
