import { Form, InputGroup as _InputGroup } from "components";
import styled from "styled-components";
import { Button, InputGroup as __InputGroup } from "@paljs/ui";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { Badge as _Badge } from "@mantine/core";
import _Select from "react-select";
import { $_send_sms } from "utils/api/REST/actions/sms";
import { reqSucceed, translator } from "utils";
import { toast } from "react-toastify";
import { SMS_PATTERNS } from "constants/SMS_PATTERNS";
import { useNonInitialEffect } from "hooks";

const templateOptions = [
  { label: "بدون قالب", value: "" },
  ...SMS_PATTERNS.map((_pattern: any) => ({
    label: _pattern.title,
    value: _pattern.code
  }))
];

// TODO: test the functionality
export function SendSmsForm() {
  const [template, setTemplate] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState<any>([]);
  const inputRef = useRef<any>();

  function onInsertPhoneNumber() {
    const input = inputRef.current.value;
    if (input.length == 11 && !phoneNumbers.includes(input)) {
      setPhoneNumbers((_curr: any) => _curr.concat(input));
      inputRef.current.value = "";
    }
  }

  function removePhoneNumber(phoneNumber: string) {
    setPhoneNumbers((_curr: any) =>
      _curr.filter((_item: any) => _item !== phoneNumber)
    );
  }

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useNonInitialEffect(() => {
    reset();
  }, [template])

  async function onSendSms(form: any) {
    const type: any = template === "" ? "simple" : "template";
    const content = (!form.content || form.content === "") ? template : form.content;
    const tokens = form.tokens
      ? Object.entries(form.tokens).map(([key, value]) => ({ [key]: value }))
      : []
    const finalForm = {
      tokens,
      type,
      phone_numbers: phoneNumbers,
      content,
    };

    const response = await $_send_sms(finalForm as any);
    if (reqSucceed(response)) {
      toast.success("پیامک با موفیت ارسال شد");
      reset();
      setPhoneNumbers([]);
    } else {
      toast.error("ارسال پیامک موفیت آمیز نیود ");
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSendSms)}>
      <_InputGroup col>
        <label htmlFor="phone-number">شماره ها :</label>

        <BadgeList>
          {phoneNumbers?.length > 0
            ? phoneNumbers.map((_phoneNumber: any) => (
              <Badge color="blue">
                <Cross onClick={() => removePhoneNumber(_phoneNumber)}>
                  x
                </Cross>{" "}
                {_phoneNumber}
              </Badge>
            ))
            : <Badge color="red">شماره ای وارد نشده است</Badge>}
        </BadgeList>

        <InputGroup>
          <input
            id="phone-number"
            maxLength={11}
            placeholder="شماره جدید"
            ref={inputRef}
          />
          <Button type="button" status="Success" onClick={onInsertPhoneNumber}>+</Button>
        </InputGroup>
      </_InputGroup>

      <InputGroup fullWidth>
        <Select
          options={templateOptions}
          placeholder="قالب پیامک"
          onChange={(e: any) => setTemplate(e.value)}
        />
      </InputGroup>

      {template === "" ? (
        <_InputGroup col fullWidth>
          <label htmlFor="content">متن پیامک</label>
          <textarea
            id="content"
            placeholder="متن پیامک ..."
            {...register("content", { required: true })}
          />
        </_InputGroup>
      ) : SMS_PATTERNS.find((_pattern: any) => _pattern.code === template)
        ?.tokens.map((key: string) => (
          <InputGroup className="token">
            <label>{translator(key)} :</label>
            <input {...register(`tokens.${key}`)} />
          </InputGroup>
        ))
      }

      <SubmitButton status="Success" disabled={phoneNumbers.length < 1}>
        ارسال پیامک
      </SubmitButton>
    </Form>
  );
}

const Badge = styled(_Badge) <{ [key: string]: any }>`
  max-width: 15rem;
  height: 2rem;
  margin-bottom: 1rem;

  font-size: 1rem;
`;

const Cross = styled.strong`
  margin-left: 1rem;

  display: inline-block;

  font-size: 1.125rem;
  font-wight: 900;

  &:hover {
    cursor: pointer;
  }
`;

const BadgeList = styled.div`
  display: flex;
`;

const Select = styled(_Select)`
  min-width: 10rem;
  margin: 1rem 0;
`;

const SubmitButton = styled(Button).attrs({
  status: "Success",
})`
  max-width: 10rem;
  margin-top: 1rem;
`;

const InputGroup = styled(__InputGroup)`
  &.token {
    label {
      min-width: 5rem;
    }
  }
`
