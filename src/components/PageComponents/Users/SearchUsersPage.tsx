import { Flex } from "@mantine/core";
import { Add } from "@material-ui/icons";
import { Button, Container, Modal } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from "components";
import Cookies from "js-cookie";
import Layout from "Layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { PermissionEnum } from "types";
import { deleteUser, has, pluralRemove, search_in, translator, useUserStore } from "utils";

export const SearchUsersPage = () => {
  const router = useRouter();

  const usersQuery = useQuery(["users", router.query], () =>
    search_in("users", router.query, router.query, Cookies.get(process.env["TOKEN"]!)),
  );
  const fieldsQuery = useQuery(
    ["userFields"],
    () =>
      new Promise((resolve) =>
        resolve([
          "id",
          "name",
          "lastname",
          "email",
          "password",
          "phone",
          "points",
          "role",
          "status",
          "created_at",
          "updated_at",
        ]),
      ),
  );

  const permissions = useUserStore().getPermissions();

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);

  const toggleModal = () => setItemToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await deleteUser(item?.id);
    if (response?.status === "success") {
      usersQuery.refetch();
      setItemToRemove(null);
      toast.success("کاربر با موفقیت حذف شد");
    } else {
      toast.error("حذف کاربر موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const [itemsToRemove, setItemsToRemove] = useState<any>(null);
  const togglePluralRemoveModal = () => setItemsToRemove(null);

  const pluralRemoveTrigger = async (selections: any[]) => {
    setLoading(true);
    await pluralRemove(
      "users",
      selections,
      deleteUser,
      (entity: string, id: any) => {
        usersQuery.refetch();
        toast.success(`مورد با شناسه ${id} حذف شد`);
      },
      async () => {},
      (id: number) => toast.error(`حذف کاربر با شناسه ${id} موفقیت آمیز نبود`),
    );
    setLoading(false);
    setTableSelections([]);
    setItemsToRemove(null);
  };

  const columns: any[] = ["شناسه کاربر", "نام کاربر", "نام خانوادگی", "ایمیل", "شماره تلفن کاربر", "نقش", "فعالیت ها"];

  const data = usersQuery?.data?.data?.data?.map((user: any) => [
    // =====>> Table Columns <<=====
    user?.id,
    user?.name,
    user?.lastname ?? "-",
    user?.email,
    user?.phone,
    translator(user?.role),
    <Flex gap="0.25rem">
      {has(permissions, PermissionEnum.readUser) && (
        <Link href={`/users/${user?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.editUser) && (
        <Link href={`/users/edit/${user?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteUser) && (
        <Button status="Danger" onClick={() => setItemToRemove(user)}>
          حذف
        </Button>
      )}
    </Flex>,
  ]);

  return (
    <Layout title="کاربران">
      <h1>کاربران</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.editUser) && (
          <Link href="/users/create">
            <a>
              <Button
                style={{
                  margin: "1rem 0 1rem 1rem",
                  display: "flex",
                }}
                status="Success"
                appearance="outline"
              >
                افزودن کاربر
                <Add />
              </Button>
            </a>
          </Link>
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteUser) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseUser) && (
        <>
          <SearchBar
            fields={fieldsQuery?.data as any}
            entity="users"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: "/users/search",
                query: form,
              })
            }
          />

          {usersQuery.data && <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />}

          <PaginationBar
            totalPages={usersQuery?.data?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف کاربر <span className="text-danger">{`${itemToRemove?.id}`}</span> با نام{" "}
          <span className="text-danger">{`${itemToRemove?.name} ${itemToRemove?.lastname ?? ""}`}</span> اطمینان دارید؟
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
          <span className="text-danger mx-1">{tableSelections?.join(" , ")}</span>
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
