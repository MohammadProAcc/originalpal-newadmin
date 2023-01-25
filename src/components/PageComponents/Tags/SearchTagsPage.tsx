import { Add } from "@material-ui/icons";
import { Button, Container, Modal } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from "components";
import Layout from "Layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { PermissionEnum } from "types";
import { deleteTag, getTagsList, has, pluralRemove, useUserStore } from "utils";

export const SearchTagsPage = () => {
  const router = useRouter();

  const tagsQuery = useQuery(["tags", router.query], async () => await getTagsList(router?.query));
  const tagFields = useQuery(
    ["tagFields"],
    () =>
      new Promise((resolve) =>
        resolve({
          fields: [
            "id",
            "name",
            "type",
            "title",
            "meta_title",
            "meta_description",
            "description",
            "priority",
            "updated_at",
            "created_at",
          ],
        }),
      ),
  );

  const permissions = useUserStore().getPermissions();

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const [itemsToRemove, setItemsToRemove] = useState<any>(null);

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);

  const toggleModal = () => setItemToRemove(null);
  const togglePluralRemoveModal = () => setItemsToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await deleteTag(item?.id);
    if (response?.status === "success") {
      tagsQuery.refetch();
      setItemToRemove(null);
      toast.success("برچسب با موفقیت حذف شد");
    } else {
      toast.error("حذف برچسب موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      "tags",
      selections,
      deleteTag,
      (entity: string, id: any) => {
        tagsQuery.refetch();
        toast.success(`مورد با شناسه ${id} حذف شد`);
      },
      async () => {
        await setTableSelections([]);
        setItemsToRemove(null);
      },
      (id: number) => toast.error(`حذف برچسب با شناسه ${id} موفقیت آمیز نبود`),
    );
  };

  const columns: any[] = ["شناسه برچسب", "نام برچسب", "نوع برچسب", "فعالیت ها"];

  const data = tagsQuery?.data?.data?.data?.map((tag: any) => [
    // =====>> Table Columns <<=====
    tag?.id,
    tag?.name,
    tag?.type,
    <Container>
      {has(permissions, PermissionEnum.readTag) && (
        <Link href={`/tags/${tag?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.editTag) && (
        <Link href={`/tags/edit/${tag?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteTag) && (
        <Button status="Danger" onClick={() => setItemToRemove(tag)}>
          حذف
        </Button>
      )}
    </Container>,
  ]);

  return (
    <Layout title="برچسب ها">
      <h1>برچسب ها</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.addTag) && (
          <Link href="/tags/create">
            <a>
              <Button
                style={{
                  margin: "1rem 0 1rem 1rem",
                  display: "flex",
                }}
                status="Success"
                appearance="outline"
              >
                افزودن برچسب
                <Add />
              </Button>
            </a>
          </Link>
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteTag) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseTag) && (
        <>
          <SearchBar
            fields={(tagFields?.data as any)?.fields}
            entity="tags"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: "/tags/search",
                query: form,
              })
            }
          />

          {tagsQuery?.data && <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />}

          <PaginationBar
            totalPages={tagsQuery?.data?.data?.tags?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف برچسب <span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{" "}
          <span className="text-danger">{`${itemToRemove?.name}`}</span> اطمینان دارید؟
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
