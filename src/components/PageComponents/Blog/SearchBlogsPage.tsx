import { Flex } from "@mantine/core";
import { Add } from "@material-ui/icons";
import { Button, Container, Modal } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from "components";
import Cookies from "js-cookie";
import Layout from "Layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { PermissionEnum } from "types";
import { deleteBlog, has, pluralRemove, search_in, useUserStore } from "utils";

export const SearchBlogsPage = () => {
  const router = useRouter();

  const blogsQuery = useQuery(["blogs", router.query], () =>
    search_in("blog", router.query, { page: router.query.page }, Cookies.get(process.env["TOKEN"]!)).then((res) => ({
      ...res,
      fields: [
        "comments",
        "created_at",
        "deleted_at",
        "desc",
        "endalt",
        "endimage",
        "endtext",
        "endtitle",
        "headers",
        "id",
        "is_news",
        "isboard",
        "iscast",
        "ishighlight",
        "istop",
        "isvideo",
        "labels",
        "meta_description",
        "meta_keywords",
        "meta_title",
        "show_categories",
        "slug",
        "srcvideo",
        "summary",
        "thumb",
        "title",
        "title_page",
        "trend",
        "updated_at",
        "writer",
      ],
    })),
  );

  const permissions = useUserStore().getPermissions();

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const toggleModal = () => setItemToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await deleteBlog(item?.id);
    if (response?.status === "success") {
      blogsQuery.refetch();
      setItemToRemove(null);
      toast.success("وبلاگ با موفقیت حذف شد");
    } else {
      toast.error("حذف وبلاگ موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);
  const clearSelectionsRef = useRef<any>();

  const [itemsToRemove, setItemsToRemove] = useState<any>(null);
  const togglePluralRemoveModal = () => setItemsToRemove(null);

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      "blog",
      selections,
      deleteBlog,
      (entity: string, id: any) => {
        blogsQuery.refetch();
        toast.success(`مورد با شناسه ${id} حذف شد`);
      },
      async () => {
        setTableSelections([]);
        clearSelectionsRef.current?.();
        setItemsToRemove(null);
      },
      (id: number) => toast.error(`حذف  وبلاگ با  شناسه ${id} موفقیت آمیز نبود`),
    );
  };

  const columns: any[] = ["شناسه وبلاگ", "عنوان وبلاگ", "فعالیت ها"];

  const data = blogsQuery?.data?.data?.data?.map((blog: any) => [
    // =====>> Table Columns <<=====
    blog?.id,
    blog?.title,
    <Flex gap="0.25rem">
      {has(permissions, PermissionEnum.readBlog) && (
        <Link href={`/blog/${blog?.id}`} passHref>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.editBlog) && (
        <Link href={`/blog/edit/${blog?.id}`} passHref>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteBlog) && (
        <Button status="Danger" onClick={() => setItemToRemove(blog)}>
          حذف
        </Button>
      )}
    </Flex>,
  ]);

  return (
    <Layout title="وبلاگ ها">
      <h1>وبلاگ ها</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.editBlog) && (
          <Link href="/blog/create" passHref>
            <a>
              <Button
                style={{
                  margin: "1rem 0 1rem 1rem",
                  display: "flex",
                }}
                status="Success"
                appearance="outline"
              >
                انتشار وبلاگ
                <Add />
              </Button>
            </a>
          </Link>
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteBlog) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseBlog) && (
        <>
          <SearchBar
            fields={blogsQuery?.data?.fields}
            entity="blog"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: "/blog/search",
                query: form,
              })
            }
          />

          <BasicTable
            getSelections={setTableSelections}
            columns={columns}
            rows={data}
            clearSelectionTriggerRef={clearSelectionsRef}
          />
          <PaginationBar
            totalPages={blogsQuery?.data?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}
      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف وبلاگ <span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{" "}
          <span className="text-danger">{`${itemToRemove?.title}`}</span> اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={toggleModal} style={{ marginLeft: "1rem" }}>
              خیر، منصرم شدم
            </Button>
            <Button onClick={() => removeItem(itemToRemove)} disabled={loading} status="Danger">
              بله، حذف شود
            </Button>
          </ButtonGroup>
        </ModalBox>
      </Modal>

      <Modal on={itemsToRemove} toggle={togglePluralRemoveModal}>
        <ModalBox fluid>
          آیا از حذف موارد
          <span className="text-danger mx-1">{itemsToRemove?.join(" , ")}</span>
          اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={togglePluralRemoveModal} style={{ marginLeft: "1rem" }}>
              خیر، منصرم شدم
            </Button>
            <Button onClick={() => pluralRemoveTrigger(tableSelections)} disabled={loading} status="Danger">
              بله، حذف شوند
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
