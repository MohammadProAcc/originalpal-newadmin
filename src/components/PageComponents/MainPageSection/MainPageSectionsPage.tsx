import React, { useState } from "react";
import styled from "styled-components";
import { useStore, deleteMainPageSection, translator, useUserStore, has } from "utils";
import Layout from "Layouts";
import { Button, Container, Modal } from "@paljs/ui";
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from "components";
import Link from "next/link";
import { useRouter } from "next/router";
import { Add } from "@material-ui/icons";
import { toast } from "react-toastify";
import { PermissionEnum } from "types";
import { Flex } from "@mantine/core";

export const MainPageSectionPage = () => {
  const router = useRouter();

  const { mainPageSections, fields, clearList } = useStore((state) => ({
    mainPageSections: state?.mainPageSections,
    clearList: state?.clearMainPageSectionsList,
  }));

  const permissions = useUserStore().getPermissions();

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const [itemsToRemove, setItemsToRemove] = useState<any>(null);

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);

  const toggleModal = () => setItemToRemove(null);
  const togglePluralRemoveModal = () => setItemsToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await deleteMainPageSection(item?.id);
    if (response?.status === "success") {
      clearList(item?.id);
      setItemToRemove(null);
      toast.success("بخش های  صفحه اصلی با موفقیت حذف شد");
    } else {
      toast.error("حذف بخش های  صفحه اصلی موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const pluralRemoveTrigger = async (selections: any[]) => {
    setLoading(true);

    if (selections?.length > 0) {
      const deletions = selections?.map(async (id) => {
        const response = await deleteMainPageSection(id);

        if (response?.status === "success") {
          clearList(id);

          toast.success(`مورد با شناسه ${id} حذف شد`);
        }
      });

      setTableSelections([]);
      setItemsToRemove(null);
    }

    setLoading(false);
  };

  const columns: any[] = ["شناسه بخش ", "نوع بخش ", "عنوان", "اولویت", "فعالیت"];

  const data = mainPageSections?.data?.map((mainPageSection: any) => [
    // =====>> Table Columns <<=====
    mainPageSection?.id,
    translator(mainPageSection?.type),
    mainPageSection?.title,
    mainPageSection?.priority,
    <Flex gap="0.25rem">
      {has(permissions, PermissionEnum.readMainPageSection) && (
        <Link href={`/main-page-sections/${mainPageSection?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.editMainPageSection) && (
        <Link href={`/main-page-sections/edit/${mainPageSection?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteMainPageSection) && (
        <Button status="Danger" onClick={() => setItemToRemove(mainPageSection)}>
          حذف
        </Button>
      )}
    </Flex>,
  ]);

  return (
    <Layout title="بخش های  صفحه اصلی">
      <h1>بخش های صفحه اصلی</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.editMainPageSection) && (
          <Link href="/main-page-sections/create">
            <a>
              <Button
                style={{
                  margin: "1rem 0 1rem 1rem",
                  display: "flex",
                }}
                status="Success"
                appearance="outline"
              >
                افزودن بخش های صفحه اصلی
                <Add />
              </Button>
            </a>
          </Link>
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteMainPageSection) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseMainPageSection) && (
        <>
          <SearchBar
            fields={["id", "type", "title"]}
            entity="mainPageSections"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: "/main-page-sections/search",
                query: form,
              })
            }
          />

          <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />

          <PaginationBar
            totalPages={mainPageSections?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف بخش های صفحه اصلی <span className="text-danger">{`${itemToRemove?.id} `}</span> با عنوان{" "}
          <span className="text-danger">{`${itemToRemove?.title} `}</span> اطمینان دارید؟
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
