import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from 'utils';
import Layout from 'Layouts';
import { Button, Container, Modal } from '@paljs/ui';
import { BasicTable, deleteBrand, PaginationBar, SearchBar } from 'components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Add } from '@material-ui/icons';
import { toast } from 'react-toastify';

export const BrandsPage = () => {
  const router = useRouter();

  const { brands, clearList } = useStore((state) => ({
    brands: state?.brands,
    clearList: state?.clearList,
  }));

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const toggleModal = () => setItemToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await deleteBrand(item?.id);
    if (response?.status === 'success') {
      clearList('brands', item?.id);
      setItemToRemove(null);
      toast.success('برند با موفقیت حذف شد');
    } else {
      toast.error('حذف برند موفقیت آمیز نبود');
    }
    setLoading(false);
  };

  const columns: any[] = ['شناسه برند', 'نام برند', 'فعالیت ها'];

  const data = brands?.data?.data?.map((brand: any) => [
    // =====>> Table Columns <<=====
    brand?.id,
    brand?.name,
    <Container>
      <Link href={`/brands/${brand?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Info">
          مشاهده
        </Button>
      </Link>
      <Link href={`/brands/edit/${brand?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Primary">
          ویرایش
        </Button>
      </Link>
      <Button status="Danger" onClick={() => setItemToRemove(brand)}>
        حذف
      </Button>
    </Container>,
  ]);

  return (
    <Layout title="بنر های صفحه اصلی">
      <h1>برند ها</h1>

      <Link href="/brands/create">
        <Button
          style={{
            margin: '1rem 0 1rem 1rem',
            display: 'flex',
          }}
          status="Success"
          appearance="outline"
        >
          افزودن برند
          <Add />
        </Button>
      </Link>

      <SearchBar
        fields={brands.fields}
        entity="brands"
        params={router.query}
        callback={(form: any) =>
          router.push({
            pathname: '/brands/search',
            query: form,
          })
        }
      />

      <BasicTable columns={columns} rows={data} />
      <PaginationBar
        totalPages={brands?.data?.last_page}
        activePage={router.query.page ? Number(router.query.page) : 1}
        router={router}
      />

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف بنر برند <span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{' '}
          <span className="text-danger">{`${itemToRemove?.name}`}</span> اطمینان دارید؟
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
