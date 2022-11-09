import { Button } from "@paljs/ui";
import { useLoading } from "hooks";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Colors } from "styles";
import {
  $_create_category,
  $_edit_category,
  reqSucceed,
  toLocalDate,
  toLocalTime,
} from "utils";
import { InputGroup } from "..";
import { Form } from "../Form";

export function BlogCategoryForm(props: BlogCategoryFormProps) {
  const { register, handleSubmit, reset } = useForm(
    props.defaultValues && {
      defaultValues: {
        title: props.defaultValues.title,
        slug: props.defaultValues.slug,
        content: props.defaultValues.content,
        priority: props.defaultValues.priority,
      },
    },
  );

  const [loadingState, toggleLoading] = useLoading();

  async function onSubmit(form: any) {
    toggleLoading("submission");
    const response = await (props.defaultValues
      ? $_edit_category({ id: props.defaultValues.id, body: form })
      : $_create_category({ body: form }));
    if (reqSucceed(response)) {
      toast.success(
        `${
          props.defaultValues ? "ویرایش" : "ساخت"
        } دسته بندی با موفقیت انجام شد`,
      );
      reset();
      props.callback && props.callback();
    } else {
      toast.error(
        `${props.defaultValues ? "ویرایش" : "ساخت"} دسته بندی موفقیت آمیز نبود`,
      );
    }
    toggleLoading("submission");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTitle>
        {props.readOnly
          ? (
            <>
              مشاهده دسته بندی <Title>{props.defaultValues?.title}</Title>
            </>
          )
          : <>{props.defaultValues ? "ویرایش" : "ساخت"} دسته بندی مقاله</>}
      </FormTitle>
      <hr />

      {/* {props.readOnly && ( */}
      {/*   <InputGroup col> */}
      {/*     <label>رسانه</label> */}
      {/*     <CategoryMedia Src={props.defaultValues?.media} /> */}
      {/*   </InputGroup> */}
      {/* )} */}

      <InputGroup col>
        <label>عنوان</label>
        {props.readOnly
          ? <Value>{props.defaultValues?.title}</Value>
          : (
            <input
              {...register("title", { required: true })}
              placeholder="عنوان"
            />
          )}
      </InputGroup>
      <InputGroup col>
        <label>اسلاگ</label>
        {props.readOnly
          ? <Value>{props.defaultValues?.slug}</Value>
          : (
            <input
              {...register("slug", { required: true })}
              placeholder="اسلاگ"
            />
          )}
      </InputGroup>
      <InputGroup col>
        <label>محتوا</label>
        {props.readOnly
          ? <Value>{props.defaultValues?.content}</Value>
          : (
            <input
              {...register("content", { required: true })}
              placeholder="محتوا"
            />
          )}
      </InputGroup>
      <InputGroup col>
        <label>اولویت</label>
        {props.readOnly
          ? <Value>{props.defaultValues?.priority}</Value>
          : (
            <input
              {...register("priority", { required: true, valueAsNumber: true })}
              type="number"
              placeholder="اولویت"
            />
          )}
      </InputGroup>

      {props.readOnly && (
        <>
          <InputGroup col>
            <label>تعداد مقالات</label>
            <Value>{props.defaultValues?.blog?.length}</Value>
          </InputGroup>
          <InputGroup col>
            <label>تاریخ ایجاد</label>
            <Value>
              {toLocalDate(props.defaultValues?.created_at)} -{" "}
              {toLocalTime(props.defaultValues?.created_at)}
            </Value>
          </InputGroup>
          <InputGroup col>
            <label>تاریخ آخرین بروزرسانی</label>
            <Value>
              {toLocalDate(props.defaultValues?.updated_at)} -{" "}
              {toLocalTime(props.defaultValues?.updated_at)}
            </Value>
          </InputGroup>
        </>
      )}

      {!props.readOnly && (
        <SubmitButton
          status={props.defaultValues ? "Info" : "Success"}
          disabled={loadingState.includes("submission")}
        >
          {props.defaultValues ? "ویرایش" : "ساخت"}
        </SubmitButton>
      )}
    </Form>
  );
}

interface BlogCategoryFormProps {
  defaultValues?: any;
  readOnly?: boolean;
  callback?: any;
}

const FormTitle = styled.h4`
  text-align: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${Colors.grayBorderLight};
`;

const Title = styled.p`
  margin-top: 1rem;
`;

const Value = styled.span`
  display: inline-block;

  width: 100%;
  margin-right: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${Colors.grayBorder};

  text-align: center;
`;

const SubmitButton = styled(Button)`
  margin-top: 1rem;
`;

interface CategoryMediaProps {
  Src?: string;
}
const CategoryMedia = styled.img.attrs((props: any) => ({
  alt: "تصویر دسته بندی",
  src: props.Src ? `${process.env.MED_URL}/${props.Src}` : props.src,
}))<CategoryMediaProps>`
  max-width: 75%;
  border: 1px solid ${Colors.grayBorderLight};
  aspect-ratio: 16/9;

  object-fit: cover;
`;
