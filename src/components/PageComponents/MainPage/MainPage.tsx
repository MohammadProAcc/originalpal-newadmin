import Layout from 'Layouts';
import { translator, useStore } from 'utils';
import { Alert, Button, Card, CardBody, CardHeader, Checkbox, InputGroup, Select } from '@paljs/ui';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Dot } from 'components';
import Image from 'next/image';

export const MainPage: React.FC = () => {
  const { banner } = useStore((state: any) => ({
    banner: state?.banner,
  }));
  console.log(banner);

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      ...(banner ?? {}),
    },
  });

  const platformOptions = [
    { label: 'دسکتاپ', value: 'desktop' },
    { label: 'موبایل', value: 'mobile' },
  ];

  const typeOptions = [
    { label: 'اسلاید', value: 'slide' },
    { label: 'ایستاده', value: 'stand' },
  ];

  const onSubmit = async (form: any) => {
    setLoading(true);
    console.log(form);
    setLoading(false);
  };

  return (
    <Layout title="بنر صفحه اصلی">
      <h1 style={{ marginBottom: '3rem' }}>بنر شماره {banner?.id ?? '?'}</h1>

      <Card>
        <CardHeader>عنوان</CardHeader>
        <CardBody>{banner?.title}</CardBody>
      </Card>

      <Card>
        <CardHeader>رنگ عنوان</CardHeader>
        <CardBody>
          {
            <span>
              <Dot color={banner?.title_color} /> {banner?.title_color}{' '}
            </span>
          }
        </CardBody>
      </Card>

      <Card>
        <CardHeader>محتوا</CardHeader>
        <CardBody>{banner?.content}</CardBody>
      </Card>

      <Card>
        <CardHeader>رنگ محتوا</CardHeader>
        <CardBody>
          {
            <span>
              <Dot color={banner?.content_color} /> {banner?.content_color}{' '}
            </span>
          }
        </CardBody>
      </Card>

      <Card>
        <CardHeader>لینک</CardHeader>
        <CardBody>{banner?.link}</CardBody>
      </Card>

      <Card>
        <CardHeader>پلتفرم</CardHeader>
        <CardBody>{translator(banner?.platform)}</CardBody>
      </Card>

      <Card>
        <CardHeader>اولویت</CardHeader>
        <CardBody>{banner?.priority}</CardBody>
      </Card>

      <Card>
        <CardHeader>فعال بودن بنر</CardHeader>
        <CardBody>
          {banner?.active ? <Alert status="Success">فعال</Alert> : <Alert status="Danger">غیرفعال</Alert>}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>تصویر بنر</CardHeader>
        <CardBody>
          <Image layout="fill" src={`${process?.env.SRC}/${banner?.media?.u ?? ''}`} />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>تگ های تصویر</CardHeader>
        <CardBody style={{ display: 'flex', flexDirection: 'column' }}>
          <span>تگ alt : {banner?.media?.a}</span>
          <span>تگ title : {banner?.media?.t}</span>
        </CardBody>
      </Card>
    </Layout>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
