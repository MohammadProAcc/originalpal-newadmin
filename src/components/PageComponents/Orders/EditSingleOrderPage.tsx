import { Flex, Select as MantineSelect } from "@mantine/core";
import { Add, Close } from "@material-ui/icons";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  InputGroup as _InputGroup,
  Modal,
  Select,
} from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { Editor, FlexContainer, HeaderButton, ModalBox, SendSmsForm } from "components";
import { WriteOrderDetailsModal } from "components/Modal/derived/WriteOrderDetails";
import { useNonInitialEffect } from "hooks";
import Cookies from "js-cookie";
import Layout from "Layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled, { css } from "styled-components";
import { Coupon, PermissionEnum } from "types";
import {
  add_stock_option,
  admin,
  deleteOrder,
  editOrder,
  editOrderAddress,
  getCouponsList,
  getSingleCoupon,
  getSingleOrder,
  has,
  numeralize,
  removeItem,
  removeOrderItem,
  translator,
  update_order_status,
  useStore,
  useUserStore,
} from "utils";

const statusOptions = [
  { label: "در انتظار پرداخت", value: "waiting" },
  { label: "پرداخت شده", value: "paid" },
  { label: "در حال پردازش", value: "process" },
  { label: "پست شده", value: "post" },
  { label: "تحویل شده", value: "delivered" },
];

export const EditSingleOrderPage: React.FC = () => {
  const router = useRouter();
  const orderId = router.query.order_id as string;

  const {
    data: { data: order },
    refetch: refetchOrder,
  } = useQuery(["order", orderId], () => getSingleOrder(orderId));
  const {
    data: {
      data: { data: stocks },
    },
    refetch: refetchStocks,
  }: any = useQuery(["stocks"], () => admin().get("/stock/select"));
  const { data: coupons } = useQuery(["coupons"], () => getCouponsList({ q: "total" }));

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  useNonInitialEffect(() => {
    if (order.coupon_id) {
      getSingleCoupon(order.coupon_id).then((res) => {
        setAppliedCoupon(res.data);
      });
    }
  }, [order]);

  const { updateOrder, clearOrderItems, reload } = useStore((state: any) => ({
    updateOrder: state?.updateOrder,
    clearOrderItems: state?.clearOrderItems,
  }));
  const permissions = useUserStore().getPermissions();

  const [stockOptions, setStockOptions] = useState(
    stocks?.map((stock: any) => ({
      label: ` شناسه محصول: ${stock?.product_id} - سایز: ${stock?.size}`,
      value: stock,
    })),
  );

  const [couponOptions, setCouponOptions] = useState(
    coupons?.data?.data?.map((_coupon: Coupon) => ({
      label: `${_coupon.code} - ${_coupon.decription}`,
      value: _coupon.id,
    })) ?? [],
  );

  useNonInitialEffect(() => {
    setStockOptions(
      stocks?.map((stock: any) => ({
        label: ` شناسه محصول: ${stock?.product_id} - سایز: ${stock?.size}`,
        value: stock,
      })),
    );
  }, [stocks]);

  useNonInitialEffect(() => {
    setCouponOptions(
      coupons?.data?.data?.map((_coupon: Coupon) => ({
        label: `${_coupon.code} - ${_coupon.decription}`,
        value: _coupon.id,
      })),
    );
  }, [coupons]);

  const [status, setStatus] = useState<any>();
  const [sms, setSms] = useState<any>(false);

  const changeStatus = async () => {
    setLoading(true);
    const response = await update_order_status(
      router.query.order_id as string,
      { status, sms },
      Cookies.get(process.env.TOKEN!) ?? "",
    );
    if (response?.status === "success") {
      toast.success(`وضعیت با موفقیت تغییر کرد به ${translator(status)}`);
    } else {
      toast.error("تغییر وضعیت موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const [selectedStock, setSelectedStock] = useState();

  const [stockToRemove, setStockToRemove] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const [showOrderDetailsFormModal, setShowOrderDetailsFormModal] = useState(false);

  const { register: addStockRegister, handleSubmit: addStockHandleSubmit, control: addStockControl } = useForm();

  const addStock = async (form: any) => {
    const finalForm = {
      quantity: Number(form?.quantity),
      stock_id: form?.stock?.id.toString(),
    };
    const response = await add_stock_option(
      router?.query?.order_id as string,
      finalForm,
      Cookies.get(process.env.TOKEN!) ?? "",
    );
    if (response?.status === "success") {
      const updatedOrder = await getSingleOrder(order?.id);
      updateOrder(updatedOrder.data);
      refetchOrder({});
      toast.success("محصول با موفقیت اضافه شد");
    } else {
      toast.error("افزودن محصول موفقیت آمیز نبود");
    }
  };

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      delivery: order?.delivery,
      notes: order?.notes,
      payment_id: order?.payment_id,
      coupon_id: order?.coupon_id,
    },
  });

  const { register: userRegister, handleSubmit: userHandleSubmit } = useForm({
    defaultValues: {
      phone: order.user.phone,
      name: order.user.name,
      lastname: order.user.lastname,
      email: order.user.email,
      user_id: order.user_id,
    },
  });

  async function onUserFormSubmit(form: any) {
    const userForm = {
      user_id: form.user_id,
    };
    const response = await editOrder(order.id, userForm);
    if (response?.status === "success") {
      toast.success("کاربر با تغییر کرد");
      router.back();
    } else {
      toast.error("تغییر کاربر موفقیت آمیز نبود");
    }
  }

  const { register: addressRegister, handleSubmit: addressHandleSubmit } = useForm({
    defaultValues: {
      ...order?.address,
    },
  });

  const addressOnSubmit = async (form: any) => {
    const response = await editOrderAddress(order?.id, order?.address?.id, form);
    if (response?.status === "success") {
      toast.success("آدرس با موفقیت بروز شد");
      router.back();
    } else {
      toast.error("بروزرسانی آدرس موفقیت آمیز نبود");
    }
  };

  const onSubmit = async (form: any) => {
    setLoading(true);
    try {
      const { data: response } = await admin().put(`/orders/${router?.query?.order_id}`, form);
      if (response?.status === "success") {
        toast.success("سفارش با موفقیت بروز شد");
        router.back();
      }
    } catch (err) {
      toast.error("بروزرسانی سفارش موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const removeStock = async (stock: any) => {
    setLoading(true);
    const response = await removeOrderItem(stock?.id);
    if (response?.status === "success") {
      clearOrderItems(stock?.id);
      setStockToRemove(null);
      refetchOrder({});
      toast.success("محصول با موفقیت از سبد خرید شما حذف شد");
    } else {
      toast.error("حذف محصول با موفقیت انجام شد");
    }
    setLoading(false);
  };

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
        ویرایش سفارش شماره {order?.id}
        <FlexContainer style={{ display: "inline-flex" }}>
          {has(permissions, PermissionEnum.readOrder) && (
            <HeaderButton status="Info" href={`/orders/${order?.id}`}>
              مشاهده
            </HeaderButton>
          )}

          {has(permissions, PermissionEnum.deleteOrder) && (
            <HeaderButton status="Danger" onClick={() => setItemToRemove(order)}>
              حذف
            </HeaderButton>
          )}
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف سفارش {itemToRemove?.id} اطمینان دارید؟
          <FlexContainer jc="space-between" className="mt-3">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <form onSubmit={userHandleSubmit(onUserFormSubmit)}>
        <InputGroup fullWidth className="user">
          <label htmlFor="user-name">نام کاربر : </label>
          <input id="user-name" {...userRegister("name")} disabled />
        </InputGroup>

        <InputGroup fullWidth className="user">
          <label htmlFor="user-lastname">نام خانوادگی کاربر : </label>
          <input {...userRegister("lastname")} disabled />
        </InputGroup>
        <InputGroup fullWidth className="user">
          <label htmlFor="user-phone">شماره همراه کاربر : </label>
          <input id="user-phone" {...userRegister("phone")} disabled />
        </InputGroup>
        <InputGroup fullWidth className="user">
          <label htmlFor="user-email">ایمیل </label>
          <input id="user-email" {...userRegister("email")} disabled />
        </InputGroup>
        <InputGroup fullWidth className="user">
          <label htmlFor="user-id">شناسه کاربر</label>
          <input id="user-id" {...userRegister("user_id")} />
        </InputGroup>

        <Button style={{ margin: "1rem 0" }} status="Info" appearance="outline">
          اعمال تغییرات کاربر
        </Button>
      </form>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader style={{ display: "flex", alignItems: "center" }}>
            وضعیت : {translator(order?.status)}{" "}
            {status && (
              <Button
                status="Warning"
                appearance="outline"
                disabled={status === order?.status}
                onClick={changeStatus}
                className="mx-3"
              >
                تغییر وضعیت به {translator(status)}
              </Button>
            )}{" "}
            {status && status !== order?.status && (
              // <Checkbox style={{ color: 'transparent', marginRight: '2rem' }} checked={sms} onChange={setSms}>
              //   پیامک تغییر وضعیت ارسال شود؟
              // </Checkbox>
              <Button status="Info">تغییر دادن وضعیت + ارسال پیامک تغییر وضعیت</Button>
            )}
          </CardHeader>
          <Select
            placeholder="برای تغییر دادن وضعیت کلیک کنید..."
            options={statusOptions}
            onChange={(e: any) => setStatus(e.value)}
          />
        </Card>

        <Card>
          <CardHeader>شماره پرداخت</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("payment_id")} disabled />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نوع ارسال</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("delivery")} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Flex>کد تخفیف {appliedCoupon && `: ${appliedCoupon.code} - ${appliedCoupon.decription}`}</Flex>
            {coupons && (
              <Controller
                name="coupon_id"
                control={control}
                render={({ field }) => <CouponsSelect data={couponOptions} searchable {...field} />}
              />
            )}
          </CardHeader>
        </Card>

        <Controller
          name="notes"
          control={control}
          render={({ field }) => <Editor callback={field.onChange} content={order?.notes} title="یادداشت ها" />}
        />
        <Button style={{ margin: "1rem 0" }} status="Info" appearance="outline">
          اعمال تغییرات
        </Button>
      </form>

      <hr />

      <AddressForm onSubmit={addressHandleSubmit(addressOnSubmit)}>
        <Card>
          <CardHeader>ویرایش آدرس</CardHeader>
          <CardBody>
            <AddressInputGroup>
              <label>استان</label>
              <input {...addressRegister("province")} />
            </AddressInputGroup>

            <AddressInputGroup>
              <label>شهر</label>
              <input {...addressRegister("city")} />
            </AddressInputGroup>

            <AddressInputGroup>
              <label>آدرس</label>
              <textarea {...addressRegister("address")} />
            </AddressInputGroup>

            <AddressInputGroup>
              <label>کد پستی</label>
              <input {...addressRegister("postalcode")} />
            </AddressInputGroup>
          </CardBody>
        </Card>

        <Button style={{ margin: "1rem 0" }} status="Info" appearance="outline">
          اعمال تغییرات آدرس
        </Button>
      </AddressForm>

      <hr />

      <div style={{ marginBottom: "1rem" }}>
        <Form onSubmit={addStockHandleSubmit(addStock)}>
          <span style={{ display: "flex", alignItems: "center", margin: "1rem" }}>افزودن محصول به سفارش</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Controller
              name="stock"
              rules={{
                required: true,
              }}
              control={addStockControl}
              render={({ field }) => (
                <AddStockSelect
                  options={stockOptions}
                  // onChange={(e: any) => setSelectedStock(e.value)}
                  onChange={(e: any) => {
                    setSelectedStock(e.value);
                    field.onChange(e.value);
                  }}
                  placeholder="افزودن سفارش"
                />
              )}
            />

            {selectedStock && (
              <>
                <InputGroup>
                  <input {...addStockRegister("quantity", { required: true })} placeholder="تعداد" />
                </InputGroup>
                <Button
                  type="submit"
                  style={{ padding: "0.125rem", marginRight: "1rem" }}
                  status="Success"
                  appearance="outline"
                >
                  <Add />
                </Button>
              </>
            )}
          </div>
        </Form>
      </div>

      <Card>
        <CardHeader>
          <span style={{ display: "flex", marginBottom: "1rem" }}>سفارشات</span>{" "}
        </CardHeader>
        <CardBody>
          {order["order_items"]?.length > 0 ? (
            order["order_items"]?.map((orderItem: any, orderItemIndex: number) => (
              <Card style={{ position: "relative" }}>
                <Button
                  style={{
                    padding: "0.125rem",
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                  }}
                  status="Danger"
                  appearance="outline"
                  onClick={() => setStockToRemove(orderItem)}
                >
                  <Close />
                </Button>
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
            ))
          ) : (
            <Alert status="Warning">محصولی وجود ندارد</Alert>
          )}
          <hr />
          <p>
            جمع کل :{" "}
            {numeralize(
              order["order_items"] &&
                order["order_items"].length > 0 &&
                order["order_items"]
                  ?.map((orderItem: any) => Number(orderItem?.price))
                  ?.reduce((prev: number, curr: number) => curr + prev),
            )}{" "}
            تومان
          </p>
        </CardBody>
      </Card>
      {/*
      <Card>
        <CardHeader>کاربر</CardHeader>
        <CardBody>
          {Object.keys(order?.user)?.map((field: any) => (
            <p>
              <span>{translator(field)} :</span>
              <span>{order['user'][field] ?? ' - '}</span>
            </p>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>آدرس</CardHeader>
        <CardBody>
          {Object.keys(order['address'])?.map((field: any) => (
            <p>
              <span>{translator(field)} :</span>
              <span>{order['address'][field] ?? ' - '}</span>
            </p>
          ))}
        </CardBody>
      </Card> */}

      {/* <Card>
        <CardHeader>ارسال پیامک</CardHeader>
        <CardBody>
          <Form smsForm onSubmit={smsHandleSubmit(submitSmsForm)}>
            <InputGroup className="mb-2">
              <input {...smsRegister('delivery')} placeholder="نحوه ارسال" />
            </InputGroup>

            <InputGroup className="mb-2">
              <input {...smsRegister('delivery_description')} placeholder="توضیحات ارسال" />
            </InputGroup>

            <InputGroup className="mb-2">
              <input {...smsRegister('next_purchase_coupon')} placeholder="کد تخفیف خرید بعدی" />
            </InputGroup>

            <InputGroup className="mb-3">
              <input {...smsRegister('track_order_id')} placeholder="کد رهگیری سفارش" />
            </InputGroup>

            <Button status="Info" type="submit" appearance="outline">
              ارسال پیامک
            </Button>
          </Form>
        </CardBody>
      </Card> */}

      <Card>
        <CardHeader>فاکتور ها</CardHeader>
        <CardBody>
          <Container>
            <Button
              status="Info"
              appearance="hero"
              className="ml-1 mb-1"
              onClick={() => setShowOrderDetailsFormModal(true)}
            >
              پرینت فاکتور سفارش
            </Button>

            <Link href="/orders/return-form">
              <Button status="Info" appearance="hero" className="ml-1 mb-1">
                پرینت پشت فاکتور
              </Button>
            </Link>
          </Container>

          {/* <Container>
            <Button status="Info" appearance="hero" className="ml-1 mb-1">
              پرینت برگه ارسال ( A5 )
            </Button>

            <Button status="Info" appearance="hero" className="ml-1 mb-1">
              پرینت برگه برگشت ( A5 )
            </Button>

            <Button status="Info" appearance="hero" className="ml-1 mb-1">
              پرینت پشت برگه برگشت ( A5 )
            </Button>
          </Container>

          <Container>
            <h5 className="my-3">سیطره</h5>

            <Button status="Info" appearance="hero" className="ml-1 mb-1">
              پرینت برگه ارسال ( A5 ) سیطره
            </Button>

            <Button status="Info" appearance="hero" className="ml-1 mb-1">
              پرینت برگه برگشت ( A5 ) سیطره
            </Button>
          </Container>

          <Container>
            <h5 className="my-3">تیپاکس</h5>

            <Button status="Info" appearance="hero" className="ml-1 mb-1">
              پرینت برگه ارسال تیپاکس ( A5 ) سیطره
            </Button>

            <Button status="Info" appearance="hero" className="ml-1 mb-1">
              پرینت برگه برگشت تیپاکس ( A5 ) سیطره
            </Button>
          </Container> */}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>ارسال پیامک</CardHeader>
        <CardBody>
          <SendSmsForm />
        </CardBody>
      </Card>

      {/* -==>>> Modals <<<==- */}

      <WriteOrderDetailsModal on={showOrderDetailsFormModal} toggle={() => setShowOrderDetailsFormModal(false)} />

      <Modal on={stockToRemove} toggle={() => setStockToRemove(null)}>
        <Card>
          <CardHeader>
            آیا از حذف محصول {stockToRemove?.product?.name} از سبد خرید اطمینان دارید؟
            <InputGroup style={{ marginTop: "1rem" }}>
              <Button status="Danger" style={{ marginLeft: "1rem" }} onClick={() => setStockToRemove(null)}>
                خیر
              </Button>
              <Button disabled={loading} status="Success" onClick={() => removeStock(stockToRemove)}>
                بله
              </Button>
            </InputGroup>
          </CardHeader>
        </Card>
      </Modal>
    </Layout>
  );
};

const AddStockSelect = styled(Select)`
  width: 20rem;
  margin: 0 1rem;
`;

interface IFormProps {
  smsForm?: boolean;
}
const Form = styled.form<IFormProps>`
  display: flex;
  align-items: center;

  ${(props) =>
    props.smsForm &&
    css`
      flex-direction: column;
      align-items: flex-start;
    `}
`;

const AddressForm = styled.form`
  label {
    min-width: 5rem;
  }
`;

const AddressInputGroup = styled(_InputGroup)`
  margin-bottom: 1rem;

  input {
    width: 100%;
  }

  textarea {
    width: 100%;
  }
`;

const InputGroup = styled(_InputGroup)`
  &.user {
    label {
      min-width: 8rem;
    }
  }
`;

const CouponsSelect = styled(MantineSelect)`
  margin-top: 1rem;
`;
