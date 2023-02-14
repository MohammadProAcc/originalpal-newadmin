import { Divider, Flex, Input, LoadingOverlay, MultiSelect } from "@mantine/core";
import { Button, Checkbox, InputGroup as _InputGroup, Select as _Select } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Layout from "Layouts";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled, { css } from "styled-components";
import { IBanner, ProductBrand, Tag } from "types";
import { createMainPageSection, getAllBrands, getTagsList, search_in } from "utils";

const sectionTypeOptions = [
  { label: "محصول", value: "product" },
  { label: "لینک", value: "link" },
  { label: "بنر", value: "banner" },
];

export function CreateMainPageSection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const brandsQuery = useQuery(["brands"], () => getAllBrands());
  const tagsQuery = useQuery(["tags"], () => getTagsList({ q: "total" }));
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

  const [selectedType, setSelectedType] = useState<any>(null);

  const [insertedLinks, setInsertedLinks] = useState<any>([]);

  useEffect(() => {
    linkTitleRef.current.value = "";
    linkLinkRef.current.value = "";
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

  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit = async (form: any) => {
    setLoading(true);
    const final = {
      ...form,
      links: insertedLinks,
    };

    const response = await createMainPageSection(final, Cookies.get(process.env.TOKEN!));
    if (response?.status === "success") {
      toast.success("بخش صفحه اصلی  با موفقیت ساخته شد");
      router.push("/main-page-sections");
      reset();
    } else {
      toast.error("ساخت بخش صفحه اصلی  موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  return (
    <Layout title="ساخت بخش صفحه اصلی  صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <InputGroup>
          <label>نوع</label>
          <Controller
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
              />
            )}
          />
        </InputGroup>
        <InputGroup>
          <label>عنوان</label>
          <input {...register("title")} placeholder="عنوان" />
        </InputGroup>
        <InputGroup>
          <label>اولویت</label>
          <input {...register("priority")} type="number" placeholder="اولویت" />{" "}
        </InputGroup>
        <label>
          <input type="checkbox" style={{ color: "transparent" }} {...register("active")} /> فعال
        </label>
        {selectedType === "product" ? (
          <>
            <H3>جزییات بخش محصول</H3>

            <Input {...register("parameter.product_count")} placeholder="تعداد محصولات" title="تعداد محصولات" />

            <Controller
              name="brands"
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
              name="tags"
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

            <InputGroup>
              <label>فقط محصولات موجود</label>
              <Controller
                name="inStock"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    style={{ color: "transparent" }}
                    checked={field?.value}
                    onChange={field?.onChange}
                  ></Checkbox>
                )}
              />
            </InputGroup>
          </>
        ) : selectedType === "banner" ? (
          <>
            <H3>جزییات بخش بنر</H3>

            <Controller
              name="banners"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  selectOnBlur
                  title="بنر ها"
                  data={bannersOptions as any}
                  placeholder="بنر های مورد نظر را انتخاب کنید"
                  {...field}
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
        <Button type="submit" status="Success">
          ساخت بخش
        </Button>
      </Form>
    </Layout>
  );
}

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
