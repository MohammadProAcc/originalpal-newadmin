import { Divider, Flex, Input, LoadingOverlay, MultiSelect, Text } from "@mantine/core";
import { Button, InputGroup as _InputGroup, Modal, Select as _Select } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { HeaderButton, ModalBox } from "components";
import { FlexContainer } from "components/Container/FlexContainer";
import Cookies from "js-cookie";
import Layout from "Layouts";
import { isNumber } from "lodash";
import router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled, { css } from "styled-components";
import { IBanner, PermissionEnum, ProductBrand, Tag } from "types";
import {
  deleteMainPageSection,
  editMainPageSection,
  getAllBrands,
  getSingleMainPageSection,
  getTagsList,
  has,
  removeItem,
  search_in,
  translator,
  useUserStore,
} from "utils";

const sectionTypeOptions = [
  { label: "محصول", value: "product" },
  { label: "لینک", value: "link" },
  { label: "بنر", value: "banner" },
];

export const EditMainPageSectionPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const brandsQuery = useQuery(["brands"], () => getAllBrands());
  const tagsQuery = useQuery(["tags"], () => getTagsList({ page: "total" }));
  const bannersQuery = useQuery(["banners"], () =>
    search_in("banners", { key: "type", type: "=", value: "stand" }, router.query, Cookies.get(process.env.TOKEN!)),
  );

  const tagsOptions: {
    label: string;
    value: string;
  }[] = tagsQuery?.data?.data?.data?.map((tag: Tag) => ({
    label: tag?.name,
    value: tag?.id?.toString(),
  }));

  const brandsOptions = brandsQuery?.data?.data?.map((brand: ProductBrand) => ({
    label: brand?.name,
    value: brand?.id,
  }));

  const bannersOptions = bannersQuery?.data?.data?.data?.map((banner: IBanner) => ({
    label: banner?.title,
    value: banner?.id,
  }));

  const mainPageSectionQuery = useQuery(["main-page-section"], () =>
    getSingleMainPageSection(router.query?.main_page_section_id as string, Cookies.get(process.env["TOKEN"]!)!),
  );

  const permissions = useUserStore().getPermissions();

  const [insertedLinks, setInsertedLinks] = useState<any>(mainPageSectionQuery?.data?.parameter);

  useEffect(() => {
    if (mainPageSectionQuery?.data?.type === "link") {
      linkTitleRef.current.value = "";
      linkLinkRef.current.value = "";
    }
  }, [insertedLinks]);

  const linkTitleRef = useRef<any>(null);
  const linkLinkRef = useRef<any>(null);

  const addLink = () => {
    setInsertedLinks((current: any) =>
      current?.length > 0
        ? [
            ...current,
            {
              title: linkTitleRef?.current?.value,
              link: linkLinkRef?.current?.value,
            },
          ]
        : [
            {
              title: linkTitleRef?.current?.value,
              link: linkLinkRef?.current?.value,
            },
          ],
    );
  };

  const removeLink = (linkTitle: string) => {
    setInsertedLinks((current: any) => current?.filter((item: any) => item?.title !== linkTitle));
  };

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const remove = async (removeId: any) => {
    await removeItem("mainPageSection", removeId, deleteMainPageSection, () => router.back(), [
      `بخش صقحه اصلی ${removeId} با موفقیت حذف شد`,
      "حذف mainPageر موفقیت آمیز نبود",
    ]);
  };

  const [selectedType, setSelectedType] = useState<any>(mainPageSectionQuery?.data?.type);

  const { register, handleSubmit, control, reset, getValues, watch } = useForm({
    defaultValues: {
      ...mainPageSectionQuery?.data,
      active: mainPageSectionQuery?.data?.active == 0 ? false : true,
      parameter: {
        ...mainPageSectionQuery?.data?.parameter,
        inStock: mainPageSectionQuery?.data?.parameter?.inStock == 0 ? false : true,
      },
    },
  });

  const onSubmit = async (form: any) => {
    setLoading(true);
    let final;
    if (form.type === "link") {
      final = {
        ...form,
        links: insertedLinks,
      };
    }
    if (form.type === "banner") {
      const { links, parameter, ...rest } = form;
      let banners: any = [];
      for (let key in parameter) {
        if (!isNaN(Number(key))) {
          banners.push(parameter[key]);
        }
      }
      final = { ...rest, banners };
    } else {
      let { parameter, ...rest } = form;
      final = {
        ...rest,
        brands: parameter.brand,
        tags: parameter.tag,
        product_count: parameter.product_count,
      };
    }

    const response = await editMainPageSection(mainPageSectionQuery?.data?.id, final, Cookies.get(process.env.TOKEN!));
    if (response?.status === "success") {
      toast.success("بخش صفحه اصلی  با موفقیت بروز شد");
      router.back();
      reset();
    } else {
      toast.error("بروزرسانی بخش صفحه اصلی  موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  return (
    <Layout title={`ویرایش بخش صفحه اصلی - ${mainPageSectionQuery?.data?.id}`}>
      <h1 style={{ marginBottom: "4rem" }}>
        ویرایش بخش صفحه اصلی - {mainPageSectionQuery?.data?.id}
        <FlexContainer style={{ display: "inline-flex" }}>
          {has(permissions, PermissionEnum.readMainPageSection) && (
            <HeaderButton status="Info" href={`/mainPageSection/${mainPageSectionQuery?.data?.id}`}>
              مشاهده
            </HeaderButton>
          )}

          {has(permissions, PermissionEnum.deleteMainPageSection) && (
            <HeaderButton status="Danger" onClick={() => setItemToRemove(mainPageSectionQuery?.data)}>
              حذف
            </HeaderButton>
          )}
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          آیا از حذف mainPageر {itemToRemove?.id} اطمینان دارید؟
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <LoadingOverlay visible={loading} />
        <InputGroup>
          <label>نوع</label>
          <Text display="flex" style={{ alignItems: "center" }}>
            {translator(getValues("type"))}
          </Text>
          {/* <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                options={sectionTypeOptions}
                onChange={(e: any) => {
                  setSelectedType(e?.value);
                  field.onChange(e?.value);
                }}
                placeholder="محصول، لینک، بنر..."
                value={sectionTypeOptions.find((option) => option.value === field.value)}
              />
            )}
          /> */}
        </InputGroup>

        <InputGroup>
          <label>عنوان</label>
          <input {...register("title")} placeholder="عنوان" />
        </InputGroup>

        <InputGroup>
          <label>اولویت</label>
          <input {...register("priority")} type="number" placeholder="اولویت" />{" "}
        </InputGroup>

        <Flex>
          <label>
            <input type="checkbox" {...register("active")} /> فعال
          </label>
        </Flex>

        {selectedType === "product" ? (
          <>
            <H3>جزییات بخش محصول</H3>

            <Input {...register("parameter.product_count")} placeholder="تعداد محصولات" title="تعداد محصولات" />

            <Controller
              name="parameter.brand"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  selectOnBlur
                  title="برچسب ها"
                  data={brandsOptions as any}
                  placeholder="برند های مورد نظر را انتخاب کنید"
                  {...field}
                />
              )}
            />

            <Controller
              name="parameter.tag"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  selectOnBlur
                  title="برچسب ها"
                  data={tagsOptions as any}
                  placeholder="برچسب های مورد نظر را انتخاب کنید"
                  {...field}
                />
              )}
            />

            <Flex>
              <input type="checkbox" {...register("parameter.inStock")} /> <label>فقط محصولات موجود</label>
            </Flex>
          </>
        ) : selectedType === "banner" ? (
          <>
            <H3>جزییات بخش بنر</H3>

            <Controller
              name="parameter"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  selectOnBlur
                  title="بنر ها"
                  data={bannersOptions as any}
                  placeholder="بنر های مورد نظر را انتخاب کنید"
                  {...field}
                  value={(() => {
                    let parameters = watch("parameter");
                    let values: string[] = [];
                    for (let key in parameters) {
                      if (!isNaN(Number(key))) {
                        values.push(parameters[key]);
                      }
                    }
                    return values;
                  })()}
                />
              )}
            />
            <Divider my="md" />
          </>
        ) : (
          <>
            <H3>جزییات بخش لینک</H3>

            <InputGroup col>
              <label>لینک ها</label>

              <input placeholder="عنوان لینک" ref={linkTitleRef} style={{ marginBottom: "0.5rem" }} />

              <input ref={linkLinkRef} placeholder="مسیر لینک" />

              <AddLinkButton
                onClick={() => {
                  addLink();
                }}
              >
                افزودن لینک
              </AddLinkButton>

              <LinksContainer>
                {insertedLinks?.length > 0 ? (
                  <>
                    {insertedLinks?.map((link: any) => (
                      <LinkEx title={link?.link} onClick={() => removeLink(link?.title)}>
                        {link?.title}
                      </LinkEx>
                    ))}
                  </>
                ) : (
                  <strong>لینکی وارد نکرده اید</strong>
                )}
              </LinksContainer>
            </InputGroup>
          </>
        )}

        <Button disabled={loading} type="submit" status="Info" appearance="outline">
          بروزرسانی بخش
        </Button>
      </Form>
    </Layout>
  );
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    min-width: 4rem;
  }
`;

interface IInputGroupProps {
  col?: boolean;
}
const InputGroup = styled(_InputGroup)<IInputGroupProps>`
  margin: 0 0 1rem 0;
  ${(p) =>
    p?.col &&
    css`
      display: flex;
      flex-direction: column;
    `}
`;

const Select = styled(_Select)`
  width: 100%;
`;

const H3 = styled.h3`
  margin: 0 0 2rem 0;
`;

const LinksContainer = styled.div`
  display: flex;
`;

const AddLinkButton = styled.a`
  max-width: 10rem;

  padding: 0.5rem;
  border: 1px solid #00d68f;
  border-radius: 0.5rem;
  margin: 0.75rem 0;

  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: rgba(0, 214, 143, 0.5);
  }
`;

const LinkEx = styled.a`
  max-width: 10rem;

  padding: 0.5rem;
  border: 1px solid #222b45;
  border-radius: 0.5rem;
  margin: 0.75rem 0.25rem;

  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 0, 0, 0.25);
    border-color: transparent;
  }
`;
