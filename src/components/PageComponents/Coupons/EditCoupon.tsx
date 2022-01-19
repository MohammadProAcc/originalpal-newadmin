import { editCoupon, useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader, InputGroup } from '@paljs/ui';
import { Button } from 'components';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const EditCouponPage: React.FC = () => {
  const { coupon } = useStore((state: any) => ({
    coupon: state?.coupon,
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
    if (response?.status === 'success') {
      toast.success('کوپن بروز شد');
    } else {
      toast.error('بروزرسانی کوپن موفقیت آمیز نبود');
    }
  };

  return (
    <Layout title={`${coupon?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>کوپن {coupon?.name}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>کد کوپن</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('code', { required: true })} placeholder="کد کوپن" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>توضیحات</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('decription', { required: true })} placeholder="توضیحات" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نوع</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('type', { required: true })} placeholder="نوع" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>مقدار</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('amount', { required: true })} type="number" placeholder="مقدار" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>شروع : {coupon?.start}</CardHeader>
          <CardBody>
            <InputGroup>
              <input type="date" {...register('start', { required: true })} placeholder="شروع" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>انقضاء : {coupon?.expiration}</CardHeader>
          <CardBody>
            <InputGroup>
              <input type="date" {...register('expiration', { required: true })} placeholder="انقضاء" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>حداکثر</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('max', { required: true })} placeholder="حداکثر" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>deny_off</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('deny_off', { required: true })} placeholder="deny_off" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>محدودیت</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('limit', { required: true })} placeholder="محدودیت" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>شناسه کاربر</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('user_id', { required: true })} placeholder="شناسه کاربر" />
            </InputGroup>
          </CardBody>
        </Card>

        <Button status="Info" type="submit" appearance="outline">
          بروزرسانی کوپن
        </Button>
      </form>
    </Layout>
  );
};
