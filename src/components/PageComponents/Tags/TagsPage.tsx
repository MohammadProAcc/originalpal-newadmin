import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore, deleteTag } from 'utils';
import Layout from 'Layouts';
import { Button, Container, Modal } from '@paljs/ui';
import { BasicTable, PaginationBar, SearchBar } from 'components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Add } from '@material-ui/icons';
import { toast } from 'react-toastify';

export const TagsPage = () => {
  const router = useRouter();

  const { tags, clearList } = useStore((state) => ({
    tags: state?.tags,
    clearList: state?.clearList,
  }));

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const toggleModal = () => setItemToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await deleteTag(item?.id);
    if (response?.status === 'success') {
      clearList('tags', item?.id);
      setItemToRemove(null);
      toast.success('برچسب با موفقیت حذف شد');
    } else {
      toast.error('حذف برچسب موفقیت آمیز نبود');
    }
    setLoading(false);
  };

  const columns: any[] = ['شناسه برچسب', 'نام برچسب', 'نوع برچسب', 'فعالیت ها'];

  const data = tags?.data?.data?.map((tag: any) => [
    // =====>> Table Columns <<=====
    tag?.id,
    tag?.name,
    tag?.type,
    <Container>
      <Link href={`/tags/${tag?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Info">
          مشاهده
        </Button>
      </Link>
      <Link href={`/tags/edit/${tag?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Primary">
          ویرایش
        </Button>
      </Link>
      <Button status="Danger" onClick={() => setItemToRemove(tag)}>
        حذف
      </Button>
    </Container>,
  ]);

  return (
    <Layout title="بنر های صفحه اصلی">
      <h1>برچسب ها</h1>

      <Link href="/tags/create">
        <Button
          style={{
            margin: '1rem 0 1rem 1rem',
            display: 'flex',
          }}
          status="Success"
          appearance="outline"
        >
          افزودن برچسب
          <Add />
        </Button>
      </Link>

      <SearchBar
        fields={tags.fields}
        entity="tags"
        params={router.query}
        callback={(form: any) =>
          router.push({
            pathname: '/tags/search',
            query: form,
          })
        }
      />

      <BasicTable columns={columns} rows={data} />
      <PaginationBar
        totalPages={tags?.data?.last_page}
        activePage={router.query.page ? Number(router.query.page) : 1}
        router={router}
      />

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف بنر برچسب <span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{' '}
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