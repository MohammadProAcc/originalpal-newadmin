import { Autocomplete } from "@mantine/core";
import { Button, InputGroup } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import router from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Tag } from "types";
import { createTag, editTag, getTagsList } from "utils";

interface ITagFormProps {
  defaultValues?: Partial<Tag>;
}
export function TagForm(props: ITagFormProps) {
  const [loading, setLoading] = useState(false);

  const tagsQuery = useQuery(["tags"], () => getTagsList({ page: "total" }));
  const tagTypes: string[] = Array.from(new Set(tagsQuery?.data?.data?.data?.map((tag: Tag) => tag.type)));

  const { register, handleSubmit, reset, control } = useForm(
    props.defaultValues
      ? {
          defaultValues: props.defaultValues,
        }
      : {},
  );

  const onSubmit = async (form: any) => {
    setLoading(true);
    if (props.defaultValues) {
      delete form.id;
      delete form.created_at;
      delete form.updated_at;
      const response = await editTag(props.defaultValues?.id!, form);
      if (response?.status === "success") {
        toast.success("برچسب بروز شد");
        router.back();
      } else {
        toast.error("بروزرسانی برچسب موفقیت آمیز نبود");
      }
    } else {
      const response = await createTag(form, Cookies.get(process.env.TOKEN!));
      if (response?.status === "success") {
        toast.success("برچسب با موفقیت ساخته شد");
        reset();
        router.push("/tags");
      } else {
        toast.error("ساخت برچسب موفقیت آمیز نبود");
      }
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="type"
        control={control}
        render={({ field }) => <Autocomplete label="نوع برچسب" placeholder="نوع برچسب" data={tagTypes} {...field} />}
      />

      <InputGroup className="col" fullWidth>
        <label>نام برچسب</label>
        <input {...register("name", { required: true })} placeholder="نام" />
      </InputGroup>

      <InputGroup className="col mt-4" fullWidth>
        <label>عنوان</label>
        <input {...register("title", { required: true })} placeholder="عنوان" />
      </InputGroup>

      <InputGroup className="col mt-4" fullWidth>
        <label>توضیحات</label>
        <input {...register("description", { required: true })} placeholder="توضیحات" />
      </InputGroup>

      <InputGroup className="col mt-4" fullWidth>
        <label>عنوان متا</label>
        <input {...register("meta_title", { required: true })} placeholder="عنوان متا" />
      </InputGroup>

      <InputGroup className="col mt-4" fullWidth>
        <label>توضیحات متا</label>
        <input {...register("meta_description", { required: true })} placeholder="توصیحات متا" />
      </InputGroup>

      <Button disabled={loading} style={{ width: "10rem", marginTop: "3rem" }} status="Success" appearance="outline">
        {loading ? "..." : `${props.defaultValues ? "بروزرسانی" : "ساخت"} برچسب`}
      </Button>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
