import { editComment, useStore } from 'utils';
import Layout from 'Layouts';
import { Card, CardBody, CardHeader, InputGroup } from '@paljs/ui';
import { Button } from 'components';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export const EditCommentPage: React.FC = () => {
  const { comment } = useStore((state: any) => ({
    comment: state?.comment,
  }));

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: comment,
  });

  const onSubmit = async (form: any) => {
    for (let key in form) {
      if (!dirtyFields[key]) {
        delete form[key];
      }
    }
    const response = await editComment(comment?.id, form);
    if (response?.status === 'success') {
      toast.success('نظر بروز شد');
    } else {
      toast.error('بروزرسانی نظر موفقیت آمیز نبود');
    }
  };

  return (
    <Layout title={`${comment?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>نظر {comment?.id}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>عنوان نظر</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('title', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>متن نظر</CardHeader>
          <CardBody>
            <InputGroup fullWidth style={{ height: '16rem' }}>
              <textarea {...register('content', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Button status="Info" type="submit" appearance="outline">
          بروزرسانی نظر
        </Button>
      </form>
    </Layout>
  );
};
