import { Alert, Badge, Flex } from "@mantine/core";
import { Button, Card, CardBody, CardHeader, Modal } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { BannerCard, HeaderButton, ModalBox } from "components";
import { DatesCard } from "components/Card/DatesCard";
import { FlexContainer } from "components/Container/FlexContainer";
import Cookies from "js-cookie";
import Layout from "Layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import { IBanner, PermissionEnum } from "types";
import {
  deleteMainPageSection,
  getAllBrands,
  getSingleMainPageSection,
  getTagsList,
  has,
  removeItem,
  search_in,
  translator,
  useUserStore,
} from "utils";

export const SingleMainPageSectionPage: React.FC = () => {
  const router = useRouter();
  const permissions = useUserStore().getPermissions();

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const remove = async (removeId: any) => {
    await removeItem("mainPageSection", removeId, deleteMainPageSection, () => router.push("/main-page-sections"), [
      `بخش صقحه اصلی ${removeId} با موفقیت حذف شد`,
      "حذف بخش صقحه اصلی موفقیت آمیز نبود",
    ]);
  };

  const brandsQuery = useQuery(["brands"], () => getAllBrands());
  const tagsQuery = useQuery(["tags"], () => getTagsList({ q: "total" }));
  const bannersQuery = useQuery(["banners"], () =>
    search_in("banners", { key: "type", type: "=", value: "stand" }, router.query),
  );
  const mainPageSectionQuery = useQuery(["main-page-section"], () =>
    getSingleMainPageSection(router.query.main_page_section_id as string, Cookies.get(process.env["TOKEN"]!)),
  );

  return (
    <Layout title={`بخش صفحه اصلی ${mainPageSectionQuery.data?.id}`}>
      <h1 style={{ marginBottom: "4rem" }}>
        مشاهده بخش صفحه اصلی {mainPageSectionQuery.data?.id}
        {has(permissions, PermissionEnum.editMainPageSection) && (
          <HeaderButton status="Info" href={`/main-page-sections/edit/${mainPageSectionQuery.data?.id}`}>
            ویرایش
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteMainPageSection) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(mainPageSectionQuery.data)}>
            حذف
          </HeaderButton>
        )}
      </h1>

      <Card>
        <CardHeader>نوع</CardHeader>
        <CardBody>{translator(mainPageSectionQuery.data?.type)}</CardBody>
      </Card>

      <Card>
        <CardHeader>عنوان</CardHeader>
        <CardBody>{mainPageSectionQuery.data?.title}</CardBody>
      </Card>

      <Card>
        <CardHeader>وضعیت</CardHeader>
        <CardBody>
          <Badge color={mainPageSectionQuery.data?.active === "1" ? "green" : "red"}>
            {mainPageSectionQuery.data?.active === "1" ? "فعال" : "غیر فعال"}
          </Badge>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>اولویت</CardHeader>
        <CardBody>{mainPageSectionQuery.data?.priority}</CardBody>
      </Card>

      <Card>
        <CardHeader>{mainPageSectionQuery.data?.type === "banner" ? "بنر ها" : "پارامتر ها"}</CardHeader>
        <CardBody>
          {mainPageSectionQuery.data?.parameter instanceof Array ? (
            <Flex gap="md" wrap="wrap">
              {(bannersQuery.data?.data?.data as IBanner[])
                ?.filter((banner) => mainPageSectionQuery.data?.parameter?.includes(banner.id))
                .map((banner) => (
                  <BannerCard banner={banner} />
                ))}
            </Flex>
          ) : mainPageSectionQuery.data?.parameter ? (
            Object.entries(mainPageSectionQuery.data?.parameter).map(([key, value]) => (
              <Card key={key}>
                <CardHeader>{translator(key)}</CardHeader>
                <CardBody>
                  {value instanceof Array
                    ? key === "brand"
                      ? brandsQuery.data?.data
                          ?.filter((brand: any) => mainPageSectionQuery.data?.parameter[key].includes(brand.id))
                          .map((brand: any) => brand.name)
                          .join(" - ")
                      : key === "tag" &&
                        (() => {
                          console.log();
                          console.log();
                          return tagsQuery.data?.data?.data
                            .filter((tag: any) => mainPageSectionQuery.data?.parameter[key].includes(tag.id.toString()))
                            .map((tag: any) => tag.name)
                            .join(" - ");
                        })()
                    : translator(String(value))}
                </CardBody>
              </Card>
            ))
          ) : (
            <Alert>پارامتری وجود ندارد</Alert>
          )}
        </CardBody>
      </Card>

      <DatesCard createdAt={mainPageSectionQuery.data?.created_at} updatedAt={mainPageSectionQuery.data?.updated_at} />

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: "1rem" }}>آیا از حذف بخش صفحه اصلی {itemToRemove?.id} اطمینان دارید؟</div>
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>
    </Layout>
  );
};
