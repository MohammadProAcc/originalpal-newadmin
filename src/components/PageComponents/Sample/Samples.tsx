import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore, translator } from 'utils';
import Layout from 'Layouts';
import { Button, Container, Modal } from '@paljs/ui';
import { BasicTable, PaginationBar, SearchBar } from 'components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Add } from '@material-ui/icons';

export const Samples = () => {
  const router = useRouter();

  const { samples } = useStore((state) => ({
    samples: state?.samples,
  }));

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const toggleModal = () => setItemToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    // =====>> Removal Mechanism <<=====
    setLoading(false);
  };

  const columns: any[] = [
    // =====>> Table Columns <<=====
    'فعالیت ها',
  ];

  const data = samples?.data?.data?.map((sample: any) => [
    // =====>> Table Columns <<=====
    <Container>
      <Button style={{ marginLeft: '1rem' }} status="Info">
        مشاهده
      </Button>
      <Link href={`=====>> Editing Link <<=====`}>
        <Button style={{ marginLeft: '1rem' }} status="Primary">
          ویرایش
        </Button>
      </Link>
      <Button status="Danger" onClick={() => setItemToRemove(sample)}>
        حذف
      </Button>
    </Container>,
  ]);

  return (
    <Layout title="بنر های صفحه اصلی">
      <h1>::::.... title ....::::</h1>

      <Link href="....:::: Creation Link ::::....">
        <Button
          style={{
            margin: '1rem 0 1rem 1rem',
            display: 'flex',
          }}
          status="Success"
          appearance="outline"
        >
          افزودن ....:::: sample ::::....
          <Add />
        </Button>
      </Link>

      <SearchBar
        fields={samples.fields}
        entity="....:::: sample ::::...."
        params={router.query}
        callback={(form: any) =>
          router.push({
            pathname: '/....:::: sample ::::..../search',
            query: form,
          })
        }
      />

      <BasicTable columns={columns} rows={data} />
      <PaginationBar
        totalPages={samples?.data?.last_page}
        activePage={router.query.page ? Number(router.query.page) : 1}
        router={router}
      />

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف بنر مورد <span className="text-danger">{`....:::: title ::::....`}</span> با عنوان{' '}
          <span className="text-danger">{`....:::: title ::::....`}</span> اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={toggleModal} style={{ marginLeft: '1rem' }}>
              خیر، منصرم شدم
            </Button>
            <Button onClick={() => removeItem(itemToRemove)} disabled={loading} status="Danger">
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
