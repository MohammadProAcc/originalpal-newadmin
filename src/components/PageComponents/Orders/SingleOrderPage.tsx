import { numeralize, translator, useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader } from '@paljs/ui';

export const SingleOrderPage: React.FC = () => {
  const { order } = useStore((state: any) => ({
    order: state?.order,
  }));

  return (
    <Layout title={`سفارش شماره ${order?.id}`}>
      <h1 style={{ margin: '0 0 4rem 0' }}>سفارش شماره {order?.id}</h1>
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
          {Object.keys(order?.user).map((field: any) => (
            <p>
              <span>{translator(field)} :</span>
              <span>{order['user'][field] ?? ' - '}</span>
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
          {Object.keys(order['address']).map((field: any) => (
            <p>
              <span>{translator(field)} :</span>
              <span>{order['address'][field] ?? ' - '}</span>
            </p>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>یادداشت</CardHeader>
        <CardBody dangerouslySetInnerHTML={{ __html: order['notes'] }} />
      </Card>

      <Card>
        <CardHeader>تاریخ ها</CardHeader>
        <CardBody>
          <Card>
            <CardHeader>ساخته شده در :</CardHeader>
            <CardBody>{order?.created_at}</CardBody>
          </Card>
          <Card>
            <CardHeader>بروزرسانی شده در :</CardHeader>
            <CardBody>{order?.updated_at}</CardBody>
          </Card>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>سفارشات</CardHeader>
        <CardBody>
          {order['order_items'].map((orderItem: any, orderItemIndex: number) => (
            <Card>
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
          ))}
          <hr />
          <p>
            جمع کل :{' '}
            {numeralize(
              order['order_items']
                .map((orderItem: any) => orderItem?.price)
                .reduce((prev: number, curr: number) => curr + prev),
            )}{' '}
            تومان
          </p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>نوع ارسال</CardHeader>
        <CardBody>{translator(order?.delivery)}</CardBody>
      </Card>
    </Layout>
  );
};
