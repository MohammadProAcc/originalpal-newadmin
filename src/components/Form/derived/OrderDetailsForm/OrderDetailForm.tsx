import { Button, Form, InputGroup } from "components";
import { FlexContainer } from "./components";
import React from "react";
import { useForm } from "react-hook-form";
import { useStore } from "utils";
import { onOrderDetailsFormSubmit } from "./funtions";
import { OrderDetailsFormProps } from "./styles";
import { useRouter } from "next/router";

export const OrderDetailsForm: React.FC<OrderDetailsFormProps> = ({ close }) => {
  const router = useRouter();
  const { order_id } = router?.query;

  const { register, handleSubmit } = useForm();

  const { setOrderDetails } = useStore((state: any) => ({
    setOrderDetails: state?.setOrderDetails,
  }));

  return (
    <Form
      onSubmit={handleSubmit((form) =>
        onOrderDetailsFormSubmit(form as any, setOrderDetails, () => router.push(`/orders/${order_id}/invoice`)),
      )}
    >
      <InputGroup col>
        <label>توضیحات</label>

        <textarea {...register("description")} />
      </InputGroup>

      <InputGroup col>
        <label>توضیحات ارسال</label>

        <textarea {...register("postDescription")} />
      </InputGroup>

      <InputGroup col>
        <label>نحوه ارسال</label>

        <textarea {...register("postMethod")} />
      </InputGroup>

      <InputGroup col>
        <label>کد تخفیف خرید بعدی</label>

        <input {...register("nextCoupon")} />
      </InputGroup>

      <FlexContainer fullWidth jc="space-between">
        <Button type="button" onClick={close}>
          انصراف
        </Button>

        <Button status="Success">پرینت فاکتور</Button>
      </FlexContainer>
    </Form>
  );
};
