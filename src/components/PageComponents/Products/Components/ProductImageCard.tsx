import { Close } from '@material-ui/icons';
import { Alert, Badge, Button, Card, CardBody, CardHeader, Container, InputGroup as _InputGroup } from '@paljs/ui';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Media } from 'types';
import Cookies from 'js-cookie';
import { deleteProductMedia } from 'utils';
import { toast } from 'react-toastify';

interface ProductImageCardProps {
  media: Media;
  index: number;
  removalCallback: Function;
}
export const ProductImageCard: React.FC<ProductImageCardProps> = ({ media, index, removalCallback }) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: media,
  });

  const onSubmit = (form: any) => {
    console.log(form);
  };

  return (
    <Card style={{ maxHeight: '40rem' }}>
      <CardHeader style={{ position: 'relative' }}>
        {index === 0 ? <Alert status="Success">تصویر اصلی</Alert> : <Alert status="Info">تصویر شماره {index}</Alert>}
      </CardHeader>
      <CardBody style={{ display: 'flex', position: 'relative' }}>
        <Button
          style={{ padding: '0.125rem', position: 'absolute', top: '1rem', left: '1rem' }}
          status="Danger"
          appearance="outline"
          onClick={() => removalCallback(media)}
        >
          <Close />
        </Button>
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup>
              <label>وضعیت نمایش</label>
              <input {...register('s')} placeholder="وضعیت نمایش" />
            </InputGroup>

            <InputGroup>
              <label>اولویت</label>
              <input {...register('p')} placeholder="اولویت" />
            </InputGroup>

            <InputGroup>
              <label>تگ alt</label>
              <input {...register('a')} placeholder="تگ alt" />
            </InputGroup>

            <InputGroup>
              <label>تگ title</label>
              <input {...register('t')} placeholder="تگ title" />
            </InputGroup>

            <Button type="submit" status="Info" appearance="outline">
              بروزرسانی تصویر
            </Button>
          </Form>
        </Container>
        <InputGroup style={{ width: '100%', marginLeft: '3rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Image width="264px" height="264px" src={`${process.env.SRC}/${media?.u}`} />
        </InputGroup>
      </CardBody>
    </Card>
  );
};

const InputGroup = styled(_InputGroup)`
  margin-bottom: 1rem;

  label {
    min-width: 8rem;
    white-space: nowrap;
  }
`;

const Form = styled.form``;
