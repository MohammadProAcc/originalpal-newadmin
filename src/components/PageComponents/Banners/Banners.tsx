import { Badge, Flex, Text } from "@mantine/core";
import { Avatar } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Button, Container, Modal } from "@paljs/ui";
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from "components";
import Layout from "Layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { PermissionEnum } from "types";
import { has, pluralRemove, translator, useStore, useUserStore } from "utils";
import { deleteBanner } from "utils/api/REST/actions/banners";

export const Banners = () => {
  const router = useRouter();

  const { banners, clearList } = useStore((state) => ({
    banners: state?.banners,
    cache: state?.cache,
    setCache: state?.setCache,
    clearList: state?.clearList,
  }));

  const permissions = useUserStore().getPermissions();

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const [itemsToRemove, setItemsToRemove] = useState<any>(null);

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);
  const clearSelectionsRef = useRef<any>();

  const toggleModal = () => setItemToRemove(null);

  const togglePluralRemoveModal = () => setItemsToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await deleteBanner(item?.id);
    if (response?.status === "success") {
      clearList("banners", item?.id);
      setItemToRemove(null);
      toast.success("بنر با موفیت حذف شد");
    } else {
      toast.error("حذف محصول موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      "banners",
      selections,
      deleteBanner,
      (entity: string, id: any) => {
        clearList(entity, id);
        toast.success(`مورد با شناسه ${id} حذف شد`);
      },
      async () => {
        setTableSelections([]);
        clearSelectionsRef.current?.();
        setItemsToRemove(null);
      },
      (id: number) => toast.error(`حذف  بنر با  شناسه ${id} موفقیت آمیز نبود`),
    );
  };

  const columns = [
    "شناسه بنر",
    "عنوان بنر",
    "محتوا",
    "تصویر",
    "پلتفرم",
    "وضعیت",
    <p style={{ margin: 0, textAlign: "center" }}>فعالیت ها</p>,
  ];

  const data = banners?.data?.data?.map((banner: any) => [
    <Text>{banner?.id}</Text>,
    <p style={{ color: banner?.title_color, margin: 0 }}>{banner?.title}</p>,
    <p style={{ color: banner?.content_color, margin: 0 }}>{banner?.content}</p>,
    <Avatar src={`${process.env.SRC}/${banner?.media ? banner?.media[0]?.u : null}`} />,
    translator(banner?.platform),
    <Badge color={banner?.active ? "green" : "red"}>{banner?.active ? "فعال" : "غیر فعال"}</Badge>,
    <Flex gap="0.25rem">
      {has(permissions, PermissionEnum.readStand) && (
        <Link href={`/banners/${banner?.id}`} passHref>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.editStand) && (
        <Link href={`/banners/edit/${banner?.id}`} passHref>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteStand) && (
        <Button status="Danger" onClick={() => setItemToRemove(banner)}>
          حذف
        </Button>
      )}
    </Flex>,
  ]);

  return (
    <Layout title="بنر های ایستاده">
      <h1>بنر های ایستاده</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.addStand) && (
          <Link href="/banners/create" passHref>
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
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteStand) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseStand) && (
        <>
          <SearchBar
            fields={banners.fields}
            entity="banners"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: "/banners/search",
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
            totalPages={banners?.data?.last_page}
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
