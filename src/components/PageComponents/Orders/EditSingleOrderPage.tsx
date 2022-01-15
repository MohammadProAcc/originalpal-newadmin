import { FormGroup } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { Alert, Button, Card, CardBody, CardHeader, Container, InputGroup, Modal, Select } from '@paljs/ui';
import { BasicEditor } from 'components';
import Cookies from 'js-cookie';
import Layout from 'Layouts';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styled, { css } from 'styled-components';
import { add_stock_option, admin, numeralize, removeOrderItem, translator, update_order_status, useStore } from 'utils';

const statusOptions = [
  { label: 'در انتظار پرداخت', value: 'waiting' },
  { label: 'پرداخت شده', value: 'paid' },
  { label: 'در حال پردازش', value: 'process' },
  { label: 'پست شده', value: 'post' },
  { label: 'تحویل شده', value: 'delivered' },
];

export const EditSingleOrderPage: React.FC = () => {
  const router = useRouter();

  const { order, stocks, clearOrderItems } = useStore((state: any) => ({
    order: state?.order,
    stocks: state?.stocks,
    clearOrderItems: state?.clearOrderItems,
  }));

  const [stockOptions, setStockOptions] = useState(
    stocks?.map((stock: any) => ({
      label: `شناسه انبار: ${stock?.id}, سایز: ${stock?.size} شناسه محصول: ${stock?.product_id}`,
      value: stock,
    })),
  );
  const [status, setStatus] = useState<any>();

  const changeStatus = async () => {
    setLoading(true);
    const response = await update_order_status(
      router.query.order_id as string,
      { status, sms: false },
      Cookies.get('token') ?? '',
    );
    if (response?.status === 'success') {
      toast.success(`وضعیت با موفقیت تغییر کرد به ${translator(status)}`);
    } else {
      toast.error('تغییر وضعیت موفقیت آمیز نبود');
    }
    setLoading(false);
  };

  const [selectedStock, setSelectedStock] = useState();

  const [stockToRemove, setStockToRemove] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const { register: addStockRegister, handleSubmit: addStockHandleSubmit, control: addStockControl } = useForm();

  const addStock = async (form: any) => {
    const finalForm = {
      quantity: Number(form?.quantity),
      stock_id: form?.stock?.id.toString(),
    };
    const response = await add_stock_option(router?.query?.order_id as string, finalForm, Cookies.get('token') ?? '');
    if (response?.status === 'success') {
      toast.success('محصول با موفقیت اضافه شد');
    } else {
      toast.error('افزودن محصول موفقیت آمیز نبود');
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

  const onSubmit = async (form: any) => {
    setLoading(true);
    try {
      const { data: response } = await admin().put(`/orders/${router?.query?.order_id}`, form);
      if (response?.status === 'success') {
        toast.success('سفارش با موفقیت بروز شد');
      }
    } catch (err) {
      console.log(err);
      toast.error('بروزرسانی سفارش موفقیت آمیز نبود');
    }
    setLoading(false);
  };

  const { register: smsRegister, handleSubmit: smsHandleSubmit } = useForm();

  const submitSmsForm = async (form: any) => {
    console.log(form);
  };

  const removeStock = async (stock: any) => {
    setLoading(true);
    const response = await removeOrderItem(stock?.id);
    if (response?.status === 'success') {
      clearOrderItems(stock?.id);
      setStockToRemove(null);
      toast.success('محصول با موفقیت از سبد خرید شما حذف شد');
    } else {
      toast.error('حذف محصول با موفقیت انجام شد');
    }
    setLoading(false);
  };

  return (
    <Layout title={`سفارش شماره ${order?.id}`}>
      <h1 style={{ margin: '0 0 4rem 0' }}>ویرایش سفارش شماره {order?.id}</h1>
      <p>نام کاربر : {order?.user?.name}</p>
      <p>شماره همراه کاربر : {order?.user?.phone_number ?? '?'}</p>
      <p>شماره سفارش : {order?.id}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            وضعیت : {translator(order?.status)}{' '}
            {status && (
              <Button status="Warning" appearance="outline" disabled={status === order?.status} onClick={changeStatus}>
                تغییر وضعیت به {translator(status)}
              </Button>
            )}{' '}
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
              <input {...register('payment_id')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نوع ارسال</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('delivery')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>شناسه کد تخفیف</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('coupon_id')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <BasicEditor callback={field.onChange} initialValue={order?.notes} title="یادداشت ها" />
          )}
        />

        <Button style={{ margin: '1rem 0' }} status="Warning" appearance="outline">
          اعمال تغییرات
        </Button>
      </form>

      <hr />

      <div style={{ marginBottom: '1rem' }}>
        <Form onSubmit={addStockHandleSubmit(addStock)}>
          <span style={{ display: 'flex', alignItems: 'center', margin: '1rem' }}>افزودن محصول به سفارش</span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  <input {...addStockRegister('quantity', { required: true })} placeholder="تعداد" />
                </InputGroup>
                <Button
                  type="submit"
                  style={{ padding: '0.125rem', marginRight: '1rem' }}
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
          <span style={{ display: 'flex', marginBottom: '1rem' }}>سفارشات</span>{' '}
        </CardHeader>
        <CardBody>
          {order['order_items']?.length > 0 ? (
            order['order_items']?.map((orderItem: any, orderItemIndex: number) => (
              <Card style={{ position: 'relative' }}>
                <Button
                  style={{ padding: '0.125rem', position: 'absolute', top: '1rem', left: '1rem' }}
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
                      style={{ width: '10rem', height: '10rem' }}
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
            جمع کل :{' '}
            {numeralize(
              order['order_items'] &&
                order['order_items'].length > 0 &&
                order['order_items']
                  ?.map((orderItem: any) => Number(orderItem?.price))
                  ?.reduce((prev: number, curr: number) => curr + prev),
            )}{' '}
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

      <Card>
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
      </Card>

      <Card>
        <CardHeader>فاکتور ها</CardHeader>
        <CardBody>
          <Container>
            <Button status="Info" appearance="hero" className="ml-1 mb-1">
              پرینت فاکتور سفارش
            </Button>

            <Button status="Info" appearance="hero" className="ml-1 mb-1">
              پرینت پشت فاکتور
            </Button>
          </Container>

          <Container>
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
          </Container>
        </CardBody>
      </Card>

      {/* -==>>> Modals <<<==- */}
      <Modal on={stockToRemove} toggle={() => setStockToRemove(null)}>
        <Card>
          <CardHeader>
            آیا از حذف محصول {stockToRemove?.product?.name} از سبد خرید اطمینان دارید؟
            <InputGroup style={{ marginTop: '1rem' }}>
              <Button status="Danger" style={{ marginLeft: '1rem' }} onClick={() => setStockToRemove(null)}>
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
