import { Button, InputGroup, Select } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Layout from "Layouts";
import router from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { $_get_roles_list, createUser } from "utils";

export function CreateUser() {
  const [loading, setLoading] = useState(false);

  const roles = useQuery(["roles"], () =>
    $_get_roles_list({}, Cookies.get(process.env.TOKEN!)).then((res: any) => {
      return res?.data?.map((_role: any) => ({
        label: _role.name,
        value: _role.id,
      }));
    }),
  );

  const { register, handleSubmit, control, reset } = useForm();

  const onSubmit = async (form: any) => {
    setLoading(true);
    form.roles = form.roles.map((role: any) => role.value);
    const response = await createUser(form, Cookies.get(process.env.TOKEN!));
    if (response?.status === "success") {
      reset();
      router.push("/users");
      toast.success("کاربر با موفقیت افزوده شد");
    } else {
      toast.error("افزودن کاربر موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  return (
    <Layout title="افزودن کاربر صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>افزودن کاربر</h1>

        <InputGroup className="col">
          <label>نام کاربر</label>
          <input {...register("name", { required: true })} placeholder="نام" />
        </InputGroup>

        <InputGroup className="col">
          <label>نام خانوادگی</label>
          <input {...register("lastname", { required: true })} placeholder="نام خانوادگی" />
        </InputGroup>

        <InputGroup className="col">
          <label>ایمیل</label>
          <input type="email" {...register("email", { required: true })} placeholder="ایمیل" />
        </InputGroup>

        <InputGroup className="col">
          <label>رمز عبور</label>
          <input type="password" {...register("password", { required: true })} placeholder="رمز عبور" />
        </InputGroup>

        <InputGroup fullWidth style={{ display: "flex", flexDirection: "column" }}>
          <label>نقش</label>
          <Controller
            control={control}
            name="roles"
            render={({ field }) => <Select options={roles?.data} isMulti {...field} />}
          />
        </InputGroup>

        <Button disabled={loading} style={{ width: "10rem", marginTop: "3rem" }} status="Success" appearance="outline">
          {loading ? "..." : "افزودن کاربر"}
        </Button>
      </Form>
    </Layout>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
