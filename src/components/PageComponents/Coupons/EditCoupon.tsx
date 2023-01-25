import { Card, CardBody, CardHeader, InputGroup, Modal } from "@paljs/ui";
import { Button, CouponForm, FlexContainer, HeaderButton, ModalBox } from "components";
import Layout from "Layouts";
import router from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { deleteCoupon, editCoupon, getSingleCoupon, removeItem, toLocalDate, useStore } from "utils";

export const EditCouponPage: React.FC = () => {
  const { coupon, updateCoupon } = useStore((state: any) => ({
    coupon: state?.coupon,
    updateCoupon: state?.updateCoupon,
  }));

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: coupon,
  });

  const onSubmit = async (form: any) => {
    const response = await editCoupon(coupon?.id, form);
    if (response?.status === "success") {
      toast.success("کوپن بروز شد");
    } else {
      toast.error("بروزرسانی کوپن موفقیت آمیز نبود");
    }
  };

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const remove = async (removeId: any) => {
    await removeItem("coupons", removeId, deleteCoupon, () => router.push("/coupons"), [
      `کوپن ${removeId} با موفقیت حذف شد`,
      "حذف کوپن موفقیت آمیز نبود",
    ]);
  };

  return (
    <Layout title={`ویراریش کوپن ${coupon?.id}`}>
      <h1 style={{ marginBottom: "4rem" }}>
        ویرایش کوپن {coupon?.code}
        <HeaderButton status="Info" href={`/coupons/${coupon?.id}`}>
          مشاهده
        </HeaderButton>
        <HeaderButton status="Danger" onClick={() => setItemToRemove(coupon)}>
          حذف
        </HeaderButton>
      </h1>

      {/* ....:::::: Modals :::::.... */}
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

      <CouponForm defaultValues={coupon} />
    </Layout>
  );
};
