import { Avatar } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Button, Container, Modal } from '@paljs/ui';
import { BasicTable, SearchBar } from 'components';
import Layout from 'Layouts';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'utils';
import { delete_banner } from 'utils/api/REST/actions/banners';

export const MainPage = () => {
  const router = useRouter();

  const { mainPageBanners } = useStore((state) => ({
    mainPageBanners: state?.mainPageBanners,
    cache: state?.cache,
    setCache: state?.setCache,
  }));

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const toggleModal = () => setItemToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await delete_banner(item?.id);
    console.log(response);
    setLoading(false);
  };

  const columns = [
    'شناسه بنر',
    'تصویر',
    'عنوان بنر',
    'رنگ عنوان بنر',
    'توضیحات',
    'رنگ توضیحات',
    'وضعیت',
    <p style={{ margin: 0, textAlign: 'center' }}>فعالیت ها</p>,
  ];

  const data = mainPageBanners?.data?.data?.map((banner: any) => [
    banner?.id,
    <Avatar src={`${process.env.SRC}/${banner?.media ? banner?.media[0]?.u : null}`} />,
    banner?.title,
    banner?.title_color,
    banner?.content,
    banner?.content_color,
    banner?.active,
    <Container>
      <Button style={{ marginLeft: '1rem' }} status="Info">
        مشاهده
      </Button>
      <Button style={{ marginLeft: '1rem' }} status="Primary">
        ویرایش
      </Button>
      <Button status="Danger" onClick={() => setItemToRemove(banner)}>
        حذف
      </Button>
    </Container>,
  ]);

  return (
    <Layout title="بنر های صفحه اصلی">
      <h1>بنر های صفحه اصلی سایت </h1>

      <Link href="/main-page/create">
        <Button
          style={{
            margin: '1rem 0 1rem 1rem',
            display: 'flex',
          }}
          status="Success"
          appearance="outline"
        >
          افزودن بنر
          <Add />
        </Button>
      </Link>

      <SearchBar
        fields={mainPageBanners.fields}
        entity="banners"
        params={router.query}
        callback={(form: any) =>
          router.push({
            pathname: '/main-page/search',
            query: form,
          })
        }
      />

      <BasicTable columns={columns} rows={data} />

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف بنر <span className="text-danger">{itemToRemove?.title}</span> اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={toggleModal} style={{ marginLeft: '1rem' }}>
              خیر، منصرم شدم
            </Button>
            <Button disabled={loading} status="Danger" onClick={() => removeItem(itemToRemove)}>
              بله، حذف شود
            </Button>
          </ButtonGroup>
        </ModalBox>
      </Modal>
    </Layout>
  );
};

const ModalBox = styled(Container)`
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #fff;
`;

const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: flex;
`;
