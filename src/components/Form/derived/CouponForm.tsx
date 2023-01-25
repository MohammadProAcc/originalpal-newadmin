import styled from "styled-components";
import { Flex } from "@mantine/core";
import { Button, Card, CardBody, CardHeader, InputGroup, Select } from "@paljs/ui";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createCoupon, editCoupon, toLocalDate, translator } from "utils";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { PersianDatePicker } from "components/Input";

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

interface ICouponFormProps {
  defaultValues?: any;
}
export function CouponForm(props: ICouponFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, control, watch } = useForm(
    props.defaultValues
      ? {
          defaultValues: {
            ...props.defaultValues,
            type: typeOptions.find((option) => option.value === props.defaultValues.type) ?? typeOptions[0],
          },
        }
      : {},
  );

  const onSubmit = async (form: any) => {
    setLoading(true);
    let response;
    if (props.defaultValues) {
      response = await editCoupon(props.defaultValues?.id, form);
    } else {
      response = await createCoupon(form, Cookies.get(process.env.TOKEN!));
    }
    if (response?.status === "success") {
      reset();
      toast.success(props.defaultValues ? "کوپن با موفقیت بروز شد" : "کوپن با موفقیت افزوده شد");
      router.push("/coupons");
    } else {
      toast.error(`${(props.defaultValues ? "بروزرسانی" : "افزودن") + " کوپن موفقیت آمیز نبود"}`);
    }
    setLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{ marginBottom: "3rem" }}>{props.defaultValues ? "بروزرسانی" : "افزودن"} کوپن</h1>

      <Card>
        <CardHeader>کد کوپن</CardHeader>
        <CardBody>
          <InputGroup fullWidth>
            <input {...register("code", { required: true })} placeholder="کد کوپن" />
          </InputGroup>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>توضیحات</CardHeader>
        <CardBody>
          <InputGroup fullWidth>
            <textarea {...register("decription", { required: true })} placeholder="توضیحات" />
          </InputGroup>
        </CardBody>
      </Card>

      {console.log()}
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="نوع تخفیف"
            options={typeOptions}
            style={{ minWidth: "100%" }}
            onChange={(v) => field.onChange(v)}
            value={watch("type")}
          />
        )}
      />
      <br />

      <Card>
        <CardHeader>مقدار تخفیف</CardHeader>
        <CardBody>
          <InputGroup fullWidth>
            <input {...register("amount", { required: true })} type="number" placeholder="مقدار" />
          </InputGroup>
        </CardBody>
      </Card>

      <Flex gap="lg" mb="lg">
        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <PersianDatePicker
              value={watch("start")}
              onSelect={field.onChange}
              title={
                <label>
                  تاریخ شروع : <span>{toLocalDate(watch("start")) ?? ""}</span>
                </label>
              }
            />
          )}
        />

        <Controller
          name="expiration"
          control={control}
          render={({ field }) => (
            <PersianDatePicker
              value={watch("expiration")}
              onSelect={field.onChange}
              title={
                <label>
                  تاریخ انقضاء : <span>{toLocalDate(watch("expiration")) ?? ""}</span>
                </label>
              }
            />
          )}
        />
      </Flex>

      <Card>
        <CardHeader>حداقل مبلغ برای اعمال کد تخفیف</CardHeader>
        <CardBody>
          <InputGroup fullWidth>
            <input {...register("min_to_execute", { required: true })} placeholder="حداقل مبلغ برای اعمال کد تخفیف" />
          </InputGroup>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>حداکثر مبلغ تخفیف (برای تخفیفات درصدی)</CardHeader>
        <CardBody>
          <InputGroup fullWidth>
            <input {...register("max", { required: true })} placeholder="حداکثر" />
          </InputGroup>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Controller
            name="deny_off"
            control={control}
            render={({ field }) => (
              <label>
                <input type="checkbox" {...field} /> به غیر از محصولات فروش ویژه
              </label>
            )}
          />
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>محدودیت استفاده</CardHeader>
        <CardBody>
          <InputGroup fullWidth>
            <input
              {...register("limit", { required: true, valueAsNumber: true })}
              placeholder="محدودیت"
              type="number"
            />
          </InputGroup>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>شناسه کاربر (برای اعمال کد تخفیف خصوصی)</CardHeader>
        <CardBody>
          <InputGroup fullWidth>
            <input {...register("user_id")} placeholder="شناسه کاربر" />
          </InputGroup>
        </CardBody>
      </Card>

      <Button disabled={loading} style={{ width: "10rem", marginTop: "3rem" }} status="Success" appearance="outline">
        {loading ? "..." : props.defaultValues ? "بروزرسانی" : "افزودن" + " کوپن"}
      </Button>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
