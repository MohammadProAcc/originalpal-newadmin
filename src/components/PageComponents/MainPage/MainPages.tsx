import { Badge, Flex, Text } from "@mantine/core";
import { Avatar } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Button, Container, Modal } from "@paljs/ui";
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from "components";
import Layout from "Layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
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
  const clearSelectionsRef = useRef<any>();

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
        clearSelectionsRef.current?.();
        setItemsToRemove(null);
      },
      (id: number) => toast.error(`حذف  سقارش با  شناسه ${id} موفقیت آمیز نبود`),
    );
  };

  const columns = [
    "شناسه بنر",
    "عنوان",
    "عنوان 2",
    "تصویر",
    "پلتفرم",
    "وضعیت",
    <p style={{ margin: 0, textAlign: "center" }}>فعالیت ها</p>,
  ];

  const data = mainPageBanners?.data?.data?.map((banner: any) => [
    banner?.id,
    <Text style={{ color: banner?.title_color }}>
      <strong>{banner?.title}</strong>
    </Text>,
    <Text style={{ color: banner?.title_color }}>
      <strong>{banner?.content}</strong>
    </Text>,
    <Avatar src={`${process.env.SRC}/${banner?.media ? banner?.media[0]?.u : null}`} />,
    translator(banner?.platform),
    banner?.active === "0" ? <Badge color="red">غیرفعال</Badge> : <Badge color="green">فعال</Badge>,
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
            fields={mainPageBanners.fields
              .filter((f: string) => !["created_at", "updated_at", "deleted_at", "start", "expiration"].includes(f))
              .map((field: string) => {
                if (field === "platform") {
                  return `پلتفرم: mobile یا desktop`;
                } else if (field === "content") {
                  return "عنوان 2";
                } else if (field === "content_color") {
                  return `رنگ عنوان 2`;
                }
                return field;
              })}
            entity="banners"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: "/main-page/search",
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
