import { Divider, Flex, LoadingOverlay } from "@mantine/core";
import { Button, Checkbox, InputGroup, Select } from "@paljs/ui";
import { FlexContainer } from "components";
import Cookies from "js-cookie";
import Layout from "Layouts";
import router from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { admin, search_in } from "utils";
import { createBanner, uploadBannerImage } from "utils/api/REST/actions/banners";

export function CreateMainPage() {
  const platformOptions = [
    { label: "دسکتاپ", value: "desktop" },
    { label: "موبایل", value: "mobile" },
  ];

  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(false);

  const { register, handleSubmit, control, reset, watch } = useForm();

  const onSubmit = async (form: any) => {
    setLoading(true);

    const finalForm = {
      ...form,
      type: "slide",
    };
    delete finalForm?.image;

    try {
      await createBanner(finalForm, Cookies.get(process.env.TOKEN!));
      const result = await search_in(
        "banners",
        {
          key: "content",
          type: "=",
          value: form?.content,
        },
        router?.query,
      );
      const bannerId = result?.data?.data[result?.data?.total - 1]?.id;

      const formData = new FormData();
      formData.append("image", form?.image[0]);
      formData.append("a", form?.media?.a);
      formData.append("t", form?.media?.t);
      formData.append("p", form?.media?.p);

      const uploadResponse = await uploadBannerImage(bannerId, formData);

      const { data: response } = await admin().post(`/banners/image/${bannerId}`, formData);

      reset();

      toast.success("بنر با موفقیت ساخته شد");

      router.push("/main-page");
    } catch (err) {
      toast.error("بنر با موفقیت ساخته شد");
    }

    setLoading(false);
  };

  return (
    <Layout title="ساخت بنر صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <h1>ساخت بنر صفحه اصلی</h1>

        <InputGroup className="col">
          <label>عنوان</label>
          <InputGroup className="flex ali-end">
            <input {...register("title", { required: true })} placeholder="عنوان" />
            <input {...register("title_color", { required: true })} type="color" placeholder="عنوان" />
            <label style={{ color: watch("title_color") }}>رنگ عنوان</label>
          </InputGroup>
        </InputGroup>

        <InputGroup className="col mt-4">
          <label>محتوا</label>
          <InputGroup className="flex ali-end">
            <textarea className="w-100" {...register("content", { required: true })} placeholder="محتوا" />

            <input {...register("content_color", { required: true })} type="color" placeholder="رنگ محتوا" />
            <label style={{ color: watch("content_color") }}>رنگ محتوا</label>
          </InputGroup>

          <FlexContainer col style={{ marginTop: "1rem" }}>
            <InputGroup>
              <input {...register("button_bg_color", { required: true })} type="color" />
              <label style={{ color: watch("button_bg_color") }}>رنگ دکمه</label>
            </InputGroup>

            <InputGroup>
              <input {...register("button_color", { required: true })} type="color" />
              <label style={{ color: watch("button_color") }}>رنگ متن دکمه</label>
            </InputGroup>
          </FlexContainer>

          <InputGroup className="mt-4">
            <label>لینک</label>
            <input {...register("link", { required: true })} placeholder="لینک" />
          </InputGroup>

          <InputGroup className="mt-5">
            <label>پلتفرم بنر</label>

            <Controller
              name="platform"
              rules={{
                required: true,
              }}
              control={control}
              render={({ field }) => (
                <Select
                  options={platformOptions}
                  className="w-25"
                  onChange={({ value }: any) => field.onChange(value)}
                />
              )}
            />
          </InputGroup>
        </InputGroup>

        <InputGroup className="mt-4">
          <label>اولویت</label>
          <input type="number" {...register("priority", { required: true })} placeholder="اولویت" />
        </InputGroup>

        <InputGroup className="mt-4">
          <label>فعال بودن</label>
          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <Checkbox
                style={{ color: "transparent" }}
                checked={active}
                {...register("priority", { required: true })}
                onChange={(e: any) => {
                  setActive(e);
                  field.onChange(e);
                }}
              />
            )}
          />
        </InputGroup>

        <InputGroup className="col m-4">
          <InputGroup style={{ marginBottom: "1rem" }}>
            <label>تصویر بنر</label>
            <input type="file" {...register("image", { required: true })} />
          </InputGroup>

          <label style={{ width: "100%" }}>تگ alt تصویر</label>
          <InputGroup>
            <input {...register("media.a")} placeholder="a" />
          </InputGroup>

          <label style={{ width: "100%" }}>تگ title تصویر</label>
          <InputGroup>
            <input {...register("media.t")} placeholder="t" />
          </InputGroup>

          <label style={{ width: "100%" }}>اولویت تصویر</label>
          <InputGroup>
            <input {...register("media.p")} type="number" placeholder="p" />
          </InputGroup>
        </InputGroup>

        <InputGroup className="col m-4">
          <label>موقعیت متن بنر</label>

          <Flex gap="md">
            <InputGroup>
              <label style={{ width: "100%" }}>
                فاصله از <strong>بالا</strong>ی صفحه
              </label>
              <input {...register("position.top")} placeholder="top" defaultValue={"10%"} />
            </InputGroup>

            <InputGroup>
              <label style={{ width: "100%" }}>
                فاصله از <strong>پایین</strong> صفحه
              </label>
              <input {...register("position.bottom")} placeholder="bottom" defaultValue={"auto"} />
            </InputGroup>
          </Flex>

          <Divider variant="dashed" my="md" size="md" />

          <Flex gap="md">
            <InputGroup>
              <label style={{ width: "100%" }}>
                فاصله از سمت <strong>راست</strong> صفحه
              </label>
              <input {...register("position.right")} placeholder="right" defaultValue={"10%"} />
            </InputGroup>

            <InputGroup>
              <label style={{ width: "100%" }}>
                فاصله از سمت <strong>چپ</strong> صفحه
              </label>
              <input {...register("position.left")} placeholder="left" defaultValue={"auto"} />
            </InputGroup>
          </Flex>
        </InputGroup>

        <InputGroup status="Success">
          <Button disabled={loading} status="Success" type="submit">
            {loading ? "..." : "افزودن بنر"}
          </Button>
        </InputGroup>
      </Form>
    </Layout>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
