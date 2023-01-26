import { Card, CardBody, CardHeader, Modal } from "@paljs/ui";
import { Button, FlexContainer, HeaderButton, ModalBox } from "components";
import { DatesCard } from "components/Card/DatesCard";
import Layout from "Layouts";
import router from "next/router";
import React, { useState } from "react";
import { PermissionEnum } from "types";
import {
  deleteOrder,
  has,
  numeralize,
  removeItem,
  toLocalDate,
  toLocalTime,
  translator,
  useStore,
  useUserStore,
} from "utils";

const clacTotalPrice = (orderItems: any[]) => {
  // const priceArr = order['order_items']
  const priceArr = orderItems?.map((orderItem: any) => +orderItem?.price);
  if (priceArr?.length > 0) {
    const price = priceArr?.reduce((prev: number, curr: number) => curr + prev);
    return price;
  }
};

export const SingleOrderPage: React.FC = () => {
  const { order } = useStore((state: any) => ({
    order: state?.order,
  }));
  const permissions = useUserStore().getPermissions();

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const remove = async (removeId: any) => {
    await removeItem("orders", removeId, deleteOrder, () => router.push("/orders"), [
      `سفارش ${removeId} با موفقیت حذف شد`,
      "حذف سفارش موفقیت آمیز نبود",
    ]);
  };

  return (
    <Layout title={`سفارش شماره ${order?.id}`}>
      <h1 style={{ margin: "0 0 4rem 0" }}>
        سفارش شماره {order?.id}
        {has(permissions, PermissionEnum.editOrder) && (
          <HeaderButton status="Info" href={`/orders/edit/${order?.id}`}>
            ویرایش
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteOrder) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(order)}>
            حذف
          </HeaderButton>
        )}
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: "1rem" }}>
            آیا از حذف سفارش
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
        <CardHeader>شماره سفارش</CardHeader>
        <CardBody>
          <p>{order?.id}</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>وضعیت</CardHeader>
        <CardBody>
          <p>{translator(order?.status)}</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>کاربر</CardHeader>
        <CardBody>
          {Object.keys(order?.user)?.map((field: any) => (
            <p>
              <span>{translator(field)} :</span>
              <span>{order["user"][field] ?? " - "}</span>
            </p>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>شناسه پرداخت</CardHeader>
        <CardBody>
          <p>{order?.payment_id}</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>آدرس</CardHeader>
        <CardBody>
          {Object.keys(order["address"])?.map((field: any) => (
            <p>
              <span>{translator(field)} :</span>
              <span>{order["address"][field] ?? " - "}</span>
            </p>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>یادداشت</CardHeader>
        <CardBody dangerouslySetInnerHTML={{ __html: order["notes"] }} />
      </Card>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>ساخته شده در :</CardHeader>
            <CardBody>
              {toLocalDate(order?.created_at)} - {toLocalTime(order?.created_at)}
            </CardBody>
          </Card>
          <Card>
            <CardHeader>بروزرسانی شده در :</CardHeader>
            <CardBody>
              {toLocalDate(order?.updated_at)} - {toLocalTime(order?.updated_at)}
            </CardBody>
          </Card>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>سفارشات</CardHeader>
        <CardBody>
          {order["order_items"]?.map((orderItem: any, orderItemIndex: number) => (
            <Card>
              <CardHeader>
                <h4>
                  {orderItemIndex + 1}.
                  <img
                    style={{ width: "10rem", height: "10rem" }}
                    src={`${process.env.SRC}/${orderItem?.product?.site_main_picture?.u}`}
                  />
                </h4>
              </CardHeader>
              <CardBody>
                <p>نام محصول : {orderItem?.product?.name}</p>
                <p>کد محصول : {orderItem?.product?.code}</p>
                <p>تعداد : {orderItem?.quantity}</p>
                <p>سایز : {orderItem?.size}</p>
                <p>قیمت : {numeralize(orderItem?.price)} تومان</p>
              </CardBody>
            </Card>
          ))}
          <hr />
          <p>جمع کل : {numeralize(clacTotalPrice(order["order_items"]) ?? 0)} تومان</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>نوع ارسال</CardHeader>
        <CardBody>{translator(order?.delivery)}</CardBody>
      </Card>

      <DatesCard createdAt={order?.created_at} updatedAt={order?.updated_at} />
    </Layout>
  );
};
