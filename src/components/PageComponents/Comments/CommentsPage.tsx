import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore, deleteComment } from 'utils';
import Layout from 'Layouts';
import { Button, Container, Modal } from '@paljs/ui';
import { BasicTable, PaginationBar, SearchBar } from 'components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Add } from '@material-ui/icons';
import { toast } from 'react-toastify';

export const CommentsPage = () => {
  const router = useRouter();

  const { comments, clearList } = useStore((state) => ({
    comments: state?.comments,
    clearList: state?.clearList,
  }));

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const toggleModal = () => setItemToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await deleteComment(item?.id);
    if (response?.status === 'success') {
      clearList('comments', item?.id);
      setItemToRemove(null);
      toast.success('نظر با موفقیت حذف شد');
    } else {
      toast.error('حذف نظر موفقیت آمیز نبود');
    }
    setLoading(false);
  };

  const columns: any[] = [
    'شناسه نظر',
    'شناسه کاربر',
    'شناسه محصول',
    'متن',
    'تاریخ ایجاد',
    'تاریخ بروزسانی',
    'بروزشده در',
  ];

  const data = comments?.data?.data?.map((comment: any) => [
    // =====>> Table Columns <<=====
    comment?.id ?? '-',
    `کاربر ${comment?.user_id}` ?? '-',
    `محصول ${comment?.product_id}` ?? '-',
    comment?.content ?? '-',
    comment?.created_at ?? '-',
    comment?.updated_at ?? '-',
    <Container>
      <Link href={`/comments/${comment?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Info">
          مشاهده
        </Button>
      </Link>
      <Link href={`/comments/edit/${comment?.id}`}>
        <Button style={{ marginLeft: '1rem' }} status="Primary">
          ویرایش
        </Button>
      </Link>
      <Button status="Danger" onClick={() => setItemToRemove(comment)}>
        حذف
      </Button>
    </Container>,
  ]);

  return (
    <Layout title="بنر های صفحه اصلی">
      <h1>نظر ها</h1>

      <SearchBar
        fields={comments.fields}
        entity="comments"
        params={router.query}
        callback={(form: any) =>
          router.push({
            pathname: '/comments/search',
            query: form,
          })
        }
      />

      <BasicTable columns={columns} rows={data} />
      <PaginationBar
        totalPages={comments?.data?.last_page}
        activePage={router.query.page ? Number(router.query.page) : 1}
        router={router}
      />

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف بنر نظر <span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{' '}
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
