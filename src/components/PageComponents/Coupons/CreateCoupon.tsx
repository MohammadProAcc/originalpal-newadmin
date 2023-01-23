import { Button, Card, CardBody, CardHeader, InputGroup } from "@paljs/ui";
import Cookies from "js-cookie";
import Layout from "Layouts";
import router from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import styled from "styled-components";
import { createCoupon } from "utils";

export function CreateCoupon() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, control } = useForm();

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
      toast.success("کوپن با موفقیت ساخته شد");
      router.push("/coupons");
    } else {
      toast.error("ساخت کوپن موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  return (
    <Layout title="ساخت کوپن صفحه اصلی">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ marginBottom: "3rem" }}>ساخت کوپن</h1>

        <Card>
          <CardHeader>کد کوپن</CardHeader>
          <CardBody>
            <InputGroup>
              <input
                {...register("code", { required: true })}
                placeholder="کد کوپن"
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>توضیحات</CardHeader>
          <CardBody>
            <InputGroup fullWidth>
              <textarea
                {...register("decription", { required: true })}
                placeholder="توضیحات"
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <InputGroup fullWidth>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder="نوع تخفیف"
                    options={typeOptions}
                    {...field}
                  />
                )}
              />
            </InputGroup>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>مقدار تخفیف</CardHeader>
          <CardBody>
            <InputGroup>
              <input
                {...register("amount", { required: true })}
                type="number"
                placeholder="مقدار"
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>شروع</CardHeader>
          <CardBody>
            <InputGroup>
              <input
                type="date"
                {...register("start", { required: true })}
                placeholder="شروع"
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>تاریخ انقضاء</CardHeader>
          <CardBody>
            <InputGroup>
              <input
                type="date"
                {...register("expiration", { required: true })}
                placeholder="تاریخ انقضاء"
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>حداقل مبلغ برای اعمال کد تخفیف</CardHeader>
          <CardBody>
            <InputGroup>
              <input
                {...register("min_to_execute", { required: true })}
                placeholder="حداقل مبلغ برای اعمال کد تخفیف"
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>حداکثر مبلغ تخفیف به ریال (برای تخفیفات درصدی)</CardHeader>
          <CardBody>
            <InputGroup>
              <input
                {...register("max", { required: true })}
                placeholder="حداکثر"
              />
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
                  <input type="checkbox" {...field} />
                  {" "} به غیر از محصولات فروش ویژه
                </label>
              )}
            />
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>محدودیت استفاده</CardHeader>
          <CardBody>
            <InputGroup>
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
            <InputGroup>
              <input
                {...register("user_id")}
                placeholder="شناسه کاربر"
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Button
          disabled={loading}
          style={{ width: "10rem", marginTop: "3rem" }}
          status="Success"
          appearance="outline"
        >
          {loading ? "..." : "ساخت کوپن"}
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
