// TODO: add editting functionality
import { Divider, Flex, Title, Tooltip } from "@mantine/core";
import { Button, Card, CardBody, CardHeader } from "@paljs/ui";
import { SendAndReturnInvoice } from "components/Table/OrderInvoice/SendAndReturnInvoice";
import { MutableRefObject, ReactNode, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import styled from "styled-components";

interface ISendAndReturnInvoiceFormProps {
  details: {
    reciever_name: string;
    address: string;
    postalcode: string;
    tel: string;
    phone: string;
  };
  return?: boolean;
  forwardingRef: MutableRefObject<any>;
  callback: (details: any) => void;
  buttonTitle: ReactNode;
}
export function SendAndReturnInvoiceForm(props: ISendAndReturnInvoiceFormProps) {
  const [details, setDetails] = useState({
    ...props.details,
    return: !!props.return,
    vendor_name: "همدان - اورجینال پَل",
    vendor_address: "1519_65155",
    vendor_tel: "38263633 081 - 38283237 081",
    vendor_phone: "09120387302",
  });
  const [showEditForm, setShowEditForm] = useState(false);

  const form = useForm({
    defaultValues: details,
  });

  function onSubmit(form: typeof details) {
    setDetails(form);
  }

  return (
    <Flex direction="column">
      <Flex gap="md" mb="md">
        <Tooltip
          label="پس از رفتن به صفحه پرینت، برای دیدن فاکتور یکبار صفحه را ریلود (f5) کنید"
          color="pink"
          position="bottom-start"
          withArrow
        >
          <Button type="button" status="Info" appearance="hero" onClick={() => props.callback(details)}>
            {props.buttonTitle}
          </Button>
        </Tooltip>
        <Button type="button" appearance="hero" onClick={() => setShowEditForm((o) => !o)}>
          ویرایش
        </Button>
        {form.formState.isDirty && (
          <Button type="button" status="Warning" appearance="hero" onClick={() => form.reset()}>
            بازگردانی
          </Button>
        )}
      </Flex>

      {showEditForm && <Form formMethods={form} onSubmit={onSubmit} />}

      <SendAndReturnInvoice forwardingRef={props.forwardingRef} details={details} />
    </Flex>
  );
}

function Form(props: { formMethods: UseFormReturn<any>; onSubmit: any }) {
  return (
    <Card>
      <CardHeader>فرم ویرایش</CardHeader>
      <CardBody>
        <$Form onSubmit={props.formMethods.handleSubmit(props.onSubmit)}>
          <Title>مشتری</Title>
          <Divider variant="dashed" my="md" />
          <Flex className="form-group">
            <label htmlFor="address">آدرس : </label>
            <input {...props.formMethods.register("address")} id="address" />
          </Flex>

          <Flex className="form-group">
            <label htmlFor="reciever_name">نام گیرنده : </label>
            <input {...props.formMethods.register("reciever_name")} id="reciever_name" />
          </Flex>

          <Flex className="form-group">
            <label htmlFor="postalcode">کد پستی : </label>
            <input {...props.formMethods.register("postalcode")} id="postalcode" />
          </Flex>

          <Flex className="form-group">
            <label htmlFor="phone">شماره همراه : </label>
            <input {...props.formMethods.register("phone")} id="phone" />
          </Flex>

          <Flex className="form-group">
            <label htmlFor="tel">تلفن ثابت : </label>
            <input {...props.formMethods.register("tel")} id="tel" />
          </Flex>

          <Title>فروشنده</Title>
          <Divider variant="dashed" my="md" />

          <Flex className="form-group">
            <label htmlFor="vendor_name">نام فروشنده : </label>
            <input {...props.formMethods.register("vendor_name")} id="vendor_name" />
          </Flex>

          <Flex className="form-group">
            <label htmlFor="vendor_address">آدرس صندوق پستی فروشنده : </label>
            <input {...props.formMethods.register("vendor_address")} id="vendor_address" />
          </Flex>

          <Flex className="form-group">
            <label htmlFor="vendor_tel">تلفن فروشنده : </label>
            <input {...props.formMethods.register("vendor_tel")} id="vendor_tel" />
          </Flex>

          <Flex className="form-group">
            <label htmlFor="vendor_phone">موبایل فروشنده : </label>
            <input {...props.formMethods.register("vendor_phone")} id="vendor_phone" />
          </Flex>

          <Button status="Success" appearance="hero" type="submit">
            اعمال تغییرات
          </Button>
        </$Form>
      </CardBody>
    </Card>
  );
}

const $Form = styled.form`
  display: flex;
  flex-direction: column;

  .form-group {
    width: 100%;
    display: flex;

    label {
      width: 12rem;
    }

    input,
    textarea {
      width: 100%;
    }
  }
`;
