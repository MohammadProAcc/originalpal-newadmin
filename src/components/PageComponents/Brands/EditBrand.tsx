import { editBrand, useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader, InputGroup } from '@paljs/ui';
import { Button } from 'components';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const EditBrandPage: React.FC = () => {
  const { brand } = useStore((state: any) => ({
    brand: state?.brand,
  }));

  const { register, handleSubmit } = useForm({
    defaultValues: brand,
  });

  const onSubmit = async (form: any) => {
    delete form.id;
    delete form.created_at;
    delete form.updated_at;
    const response = await editBrand(brand?.id, form);
    if (response?.status === 'success') {
      toast.success('برند بروز شد');
    } else {
      toast.error('بروزرسانی برند موفقیت آمیز نبود');
    }
  };

  return (
    <Layout title={`${brand?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>برند {brand?.name}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>نام برند</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('name', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>عنوان صفحه</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('title_page')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>عنوان متا</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('meta_title')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>توضیحات متا</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('meta_description')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>کلمات کلیدی متا</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('meta_keywords')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>متن برچسب</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('tagtext')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Button status="Info" type="submit" appearance="outline">
          بروزرسانی برند
        </Button>
      </form>
    </Layout>
  );
};
