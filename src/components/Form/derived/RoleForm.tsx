import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { $_create_role, $_edit_role, reqSucceed } from "utils";
import { toast } from "react-toastify";
import { Form } from "components";
import { Button, InputGroup as _InputGroup } from "@paljs/ui"
import { PERMISSIONS } from "types";

export function RoleForm(props: RoleFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset
  } = useForm({
    defaultValues: props.defaultValues ? {
      name: props.defaultValues.name,
      permissions: Object.fromEntries(props.defaultValues.permissions.map((key: string) => [key, true]))
    } : {}
  });

  async function onSubmit(form: any) {
    setLoading(true);
    const permissions: any = [];
    for (let key in form.permissions) {
      if (form.permissions[key]) permissions.push(key);
    }
    form.permissions = permissions;

    const response = await (
      props.defaultValues
        ? $_edit_role({
          id: props.defaultValues.id, form
        })
        : $_create_role(form)
    );
    if (reqSucceed(response)) {
      if (!props.defaultValues) reset();
      if (typeof props.callback === "function") await props.callback("ok");
      toast.success(`نقش ${form.name} با موفقیت افزوده شد`);
    } else {
      if (typeof props.callback === "function") await props.callback("err");
      toast.error("افزودن نقش موفقیت آمیز نبود");
    }
    setLoading(false);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <InputGroup>
        <label>نام نقش‌</label>
        <input placeholder="نام نقش" {...register("name", { required: true })} />
      </InputGroup>

      {
        PERMISSIONS.map(_role => (
          <div>
            <label htmlFor={_role}>{_role}</label>
            <input type="checkbox" id={_role} value={_role} {...register(`permissions.${_role}`)} />
          </div>
        ))
      }

      <Button status={props.defaultValues ? "Info" : "Success"} disabled={loading}>
        {props.defaultValues ? "ویرایش" : "ساخت"} نقش
      </Button>
    </Form>
  )
}

interface RoleFormProps {
  defaultValues?: any
  callback?: any
}

const InputGroup = styled(_InputGroup)`
  margin-bottom: 1rem;

  label {
    min-width: 6rem;
  }
`

