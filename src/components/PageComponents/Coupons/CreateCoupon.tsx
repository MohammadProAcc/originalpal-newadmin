import { Flex } from "@mantine/core";
import { Button, Card, CardBody, CardHeader, InputGroup } from "@paljs/ui";
import { CouponForm } from "components/Form";
import { PersianDatePicker } from "components/Input";
import Cookies from "js-cookie";
import Layout from "Layouts";
import router from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import styled from "styled-components";
import { createCoupon, toLocalDate } from "utils";

export function CreateCoupon() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, control, watch } = useForm();

  const typeOptions = [
    {
      label: "نقدی",
      value: "cash",
    },
    {
      label: "درصدی",
      value: "percent",
    },
  ];

  const onSubmit = async (form: any) => {
    setLoading(true);
    form.type = form.type.value;
    const response = await createCoupon(form, Cookies.get(process.env.TOKEN!));
    if (response?.status === "success") {
      reset();
      toast.success("کوپن با موفقیت افزوده شد");
      router.push("/coupons");
    } else {
      toast.error("افزودن کوپن موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  return (
    <Layout title="افزودن کوپن">
      <CouponForm />
    </Layout>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
