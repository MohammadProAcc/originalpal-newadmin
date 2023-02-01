import { Flex } from "@mantine/core";
import { Add } from "@material-ui/icons";
import { Button, Container, Modal } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { BasicTable, BlogCategoryModal, FlexContainer, HeaderButton, PaginationBar, SearchBar } from "components";
import Cookies from "js-cookie";
import Layout from "Layouts";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { BlogCategory, PermissionEnum } from "types";
import { $_delete_category, has, pluralRemove, search_in, useUserStore } from "utils";

export const SearchBlogCategoriesPage = () => {
  const router = useRouter();

  const blogCategoriesQuery = useQuery(["blog-categories", router.query], () =>
    search_in("categories", router.query, { page: router.query.page }, Cookies.get(process.env["TOKEN"]!)).then(
      (res) => ({
        ...res,
        fields: ["id", "slug", "title", "content", "priority", "created_at", "updated_at"],
      }),
    ),
  );

  const permissions = useUserStore().getPermissions();

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<BlogCategory | null>(null);
  const [itemToEdit, setItemToEdit] = useState<BlogCategory | null>(null);
  const [itemToShow, setItemToShow] = useState<BlogCategory | null>(null);
  const [showCreationModal, setShowCreationModal] = useState(false);

  const toggleRemoveModal = () => setItemToRemove(null);
  const toggleEditModal = () => {
    setItemToEdit(null);
    blogCategoriesQuery.refetch();
  };
  const toggleShowModal = () => setItemToShow(null);
  const toggleCreationModal = () => {
    setShowCreationModal((_state) => !_state);
    blogCategoriesQuery.refetch();
  };

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await $_delete_category({ id: item?.id });
    if (response?.status === "success") {
      blogCategoriesQuery.refetch();
      setItemToRemove(null);
      toast.success("دسته‌بندی وبلاگ با موفقیت حذف شد");
    } else {
      toast.error("حذف دسته‌بندی وبلاگ موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);
  const clearSelectionsRef = useRef<any>();

  const [itemsToRemove, setItemsToRemove] = useState<any>(null);
  const togglePluralRemoveModal = () => setItemsToRemove(null);

  const pluralRemoveTrigger = async (selections: any[]) => {
    setLoading(true);
    await pluralRemove(
      "blogCategories",
      selections,
      (id: any) => $_delete_category({ id }),
      (entity: string, id: any) => {
        blogCategoriesQuery.refetch();
        toast.success(`مورد با شناسه ${id} حذف شد`);
      },
      async () => {
        setTableSelections([]);
        clearSelectionsRef.current?.();
        setItemsToRemove(null);
      },
      (id: number) => toast.error(`حذف  دسته‌بندی وبلاگ با  شناسه ${id} موفقیت آمیز نبود`),
    );
    setLoading(false);
  };

  const columns: any[] = ["شناسه دسته‌بندی", "عنوان", "اسلاگ", "محتوا", "تعداد وبلاگ ها", "فعالیت ها"];

  const data = blogCategoriesQuery?.data?.data?.data?.map((blogCategory: BlogCategory) => [
    // =====>> Table Columns <<=====
    blogCategory?.id,
    blogCategory?.title,
    blogCategory?.slug,
    blogCategory?.content,
    blogCategory?.blog?.length,
    <Flex gap="0.25rem">
      {has(permissions, PermissionEnum.readBlogCategory) && (
        <Button style={{ marginLeft: "1rem" }} status="Info" onClick={() => setItemToShow(blogCategory)}>
          مشاهده
        </Button>
      )}
      {has(permissions, PermissionEnum.editBlogCategory) && (
        <Button style={{ marginLeft: "1rem" }} status="Primary" onClick={() => setItemToEdit(blogCategory)}>
          ویرایش
        </Button>
      )}
      {has(permissions, PermissionEnum.deleteBlogCategory) && (
        <Button status="Danger" onClick={() => setItemToRemove(blogCategory)}>
          حذف
        </Button>
      )}
    </Flex>,
  ]);

  return (
    <Layout title="دسته بندی وبلاگ ها">
      <h1>دسته بندی وبلاگ ها</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.editBlog) && (
          <Button
            style={{
              margin: "1rem 0 1rem 1rem",
              display: "flex",
            }}
            status="Success"
            appearance="outline"
            onClick={toggleCreationModal}
          >
            افزودن دسته‌بندی وبلاگ <Add />
          </Button>
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteBlog) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseBlog) && (
        <>
          {blogCategoriesQuery.data && (
            <SearchBar
              fields={blogCategoriesQuery?.data?.fields}
              entity="categories"
              params={router.query}
              callback={(form: any) =>
                router.push({
                  pathname: "/blog-categories/search",
                  query: form,
                })
              }
            />
          )}

          {blogCategoriesQuery.data && (
            <BasicTable
              getSelections={setTableSelections}
              columns={columns}
              rows={data}
              clearSelectionTriggerRef={clearSelectionsRef}
            />
          )}

          <PaginationBar
            totalPages={blogCategoriesQuery?.data?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}
      <Modal on={!!itemToRemove} toggle={toggleRemoveModal}>
        <ModalBox fluid>
          آیا از حذف دسته‌بندی وبلاگ<span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{" "}
          <span className="text-danger">{`${itemToRemove?.title}`}</span> اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={toggleRemoveModal} style={{ marginLeft: "1rem" }}>
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
            <Button onClick={async () => await pluralRemoveTrigger(tableSelections)} disabled={loading} status="Danger">
              بله، حذف شوند
            </Button>
          </ButtonGroup>
        </ModalBox>
      </Modal>

      <BlogCategoryModal onClose={toggleCreationModal} opened={showCreationModal} />
      <BlogCategoryModal onClose={toggleEditModal} opened={!!itemToEdit} defaultValues={itemToEdit} />
      <BlogCategoryModal onClose={toggleShowModal} opened={!!itemToShow} defaultValues={itemToShow} readOnly />
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
