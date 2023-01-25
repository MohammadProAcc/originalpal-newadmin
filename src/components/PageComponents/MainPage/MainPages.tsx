import { Flex } from "@mantine/core";
import { Avatar } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Button, Container, Modal } from "@paljs/ui";
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from "components";
import Layout from "Layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { PermissionEnum } from "types";
import { has, pluralRemove, translator, useStore, useUserStore } from "utils";
import { deleteBanner } from "utils/api/REST/actions/banners";

export const MainPages = () => {
  const router = useRouter();

  const { mainPageBanners, clearList } = useStore((state) => ({
    mainPageBanners: state?.mainPageBanners,
    cache: state?.cache,
    setCache: state?.setCache,
    clearList: state?.clearList,
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
    const response = await deleteBanner(item?.id);
    if (response?.status === "success") {
      clearList("mainPageBanners", item?.id);
      setItemToRemove(null);
      toast.success("بنر صفحه اصلی با موفیت حذف شد");
    } else {
      toast.error("حذف محصول موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      "mainPageBanners",
      selections,
      deleteBanner,
      (entity: string, id: any) => {
        clearList(entity, id);
        toast.success(`مورد با شناسه ${id} حذف شد`);
      },
      async () => {
        setTableSelections([]);
        setItemsToRemove(null);
      },
      (id: number) => toast.error(`حذف  سقارش با  شناسه ${id} موفقیت آمیز نبود`),
    );
  };

  const columns = [
    "شناسه بنر",
    "تصویر",
    "عنوان بنر",
    "پلتفرم",
    "رنگ عنوان بنر",
    "توضیحات",
    "رنگ توضیحات",
    "وضعیت",
    <p style={{ margin: 0, textAlign: "center" }}>فعالیت ها</p>,
  ];

  const data = mainPageBanners?.data?.data?.map((banner: any) => [
    banner?.id,
    <Avatar src={`${process.env.SRC}/${banner?.media ? banner?.media[0]?.u : null}`} />,
    banner?.title,
    translator(banner?.platform),
    <div
      style={{
        backgroundColor: banner?.title_color,
        color: "#212121",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: "ltr",
        borderRadius: "0.5rem",
        padding: ".5rem 1rem",
      }}
    >
      {banner?.title_color}
    </div>,
    banner?.content,
    <div
      style={{
        backgroundColor: banner?.content_color,
        color: "#212121",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        direction: "ltr",
        borderRadius: "0.5rem",
        padding: ".5rem 1rem",
      }}
    >
      {banner?.content_color}
    </div>,
    banner?.active,
    <Flex gap="0.25rem">
      {has(permissions, PermissionEnum.readSlide) && (
        <Link href={`/main-page/${banner?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.editSlide) && (
        <Link href={`/main-page/edit/${banner?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteSlide) && (
        <Button status="Danger" onClick={() => setItemToRemove(banner)}>
          حذف
        </Button>
      )}
    </Flex>,
  ]);

  return (
    <Layout title="بنر های صفحه اصلی">
      <h1>بنر های صفحه اصلی سایت</h1>

      <FlexContainer>
        <Link href="/main-page/create">
          <a>
            <Button
              style={{
                margin: "1rem 0 1rem 1rem",
                display: "flex",
              }}
              status="Success"
              appearance="outline"
            >
              افزودن بنر
              <Add />
            </Button>
          </a>
        </Link>
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteMainPageSection) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseSlide) && (
        <>
          <SearchBar
            fields={mainPageBanners.fields}
            entity="banners"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: "/main-page/search",
                query: form,
              })
            }
          />

          <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />
          <PaginationBar
            totalPages={mainPageBanners?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف بنر شماره <span className="text-danger">{itemToRemove?.id}</span> با عنوان{" "}
          <span className="text-danger">{itemToRemove?.title}</span> اطمینان دارید؟
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
