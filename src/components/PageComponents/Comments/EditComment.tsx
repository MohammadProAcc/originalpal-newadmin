import { Card, CardBody, CardHeader, InputGroup, Modal } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { Button, HeaderButton } from "components";
import { FlexContainer, ModalBox } from "components/Container";
import { AnswerCommentForm, Form as _Form } from "components/Form";
import Cookies from "js-cookie";
import Layout from "Layouts";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { PermissionEnum } from "types";
import { deleteComment, editComment, getSingleComment, has, removeItem, useStore, useUserStore } from "utils";

export const EditCommentPage: React.FC = () => {
  const router = useRouter();
  const commentQuery = useQuery(["comment", router.query], () =>
    getSingleComment(router.query?.comment_id as string, Cookies.get(process.env["TOKEN"]!)).then((res) => res.data),
  );

  const permissions = useUserStore().getPermissions();

  const {
    register,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: commentQuery?.data,
  });

  const onSubmit = async (form: any) => {
    setLoading(true);
    for (let key in form) {
      if (!dirtyFields[key]) {
        delete form[key];
      }
    }
    const response = await editComment(commentQuery.data?.id, form);
    if (response?.status === "success") {
      toast.success("نظر بروز شد");
    } else {
      toast.error("بروزرسانی نظر موفقیت آمیز نبود");
    }
    setLoading(false);
    router.back();
  };

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const remove = async (removeId: any) => {
    await removeItem("comments", removeId, deleteComment, () => router.push("/comments"), [
      `نظر ${removeId} با موفقیت حذف شد`,
      "حذف نظر موفقیت آمیز نبود",
    ]);
  };

  const checkToggle = async (commentId: number, admin_check: 1 | 0) => {
    setLoading(true);
    const response = await editComment(commentId, { admin_check });
    if (response?.status === "success") {
      const { data: updatedComment } = await getSingleComment(commentQuery.data?.id);
      commentQuery.refetch();
      toast.success(`نظر ${commentId} ${admin_check ? "تایید" : "سلب تایید"} شد`);
    } else {
      toast.error("بررسی وضعیت نظر موفیت آمیز نبود");
    }
    setLoading(false);
  };

  return (
    <Layout title={`${commentQuery.data?.id}`}>
      <h1 style={{ marginBottom: "4rem" }}>
        نظر {commentQuery.data?.id}, {commentQuery.data?.product_id ? "محصول " : "مقاله "}{" "}
        {commentQuery.data?.product_id ?? commentQuery.data?.blog_id}
        <FlexContainer style={{ display: "inline-flex" }}>
          {has(permissions, PermissionEnum.editComment) && commentQuery.data?.admin_check ? (
            <Button
              onClick={() => checkToggle(commentQuery.data?.id, 0)}
              className="mr-4"
              status="Warning"
              appearance="hero"
            >
              سلب تایید
            </Button>
          ) : (
            <Button
              onClick={() => checkToggle(commentQuery.data?.id, 1)}
              className="mr-4"
              status="Success"
              appearance="outline"
            >
              تایید نظر
            </Button>
          )}
          {has(permissions, PermissionEnum.readComment) && (
            <HeaderButton status="Info" href={`/comments/${commentQuery.data?.id}`}>
              مشاهده
            </HeaderButton>
          )}
          {has(permissions, PermissionEnum.deleteComment) && (
            <HeaderButton status="Danger" onClick={() => setItemToRemove(commentQuery.data)}>
              حذف
            </HeaderButton>
          )}
        </FlexContainer>
      </h1>

      {/* ....:::::: Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: "1rem" }}>
            آیا از حذف نظر
            <span className="mx-1">{itemToRemove?.id}</span>
            اطمینان دارید؟
          </div>
          <FlexContainer jc="space-between">
            <Button onClick={closeRemovalModal}>انصراف</Button>
            <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
              حذف
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>عنوان نظر</CardHeader>
          <CardBody>
            <InputGroup fullWidth>
              <input {...register("title", { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>متن نظر</CardHeader>
          <CardBody>
            <InputGroup fullWidth style={{ height: "16rem" }}>
              <textarea {...register("content", { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Button status="Info" type="submit" appearance="outline" disabled={loading}>
          بروزرسانی نظر
        </Button>
      </Form>

      {!commentQuery.data.parent_id && (
        <AnswerCommentForm comment={commentQuery.data} callback={() => commentQuery.refetch} />
      )}
    </Layout>
  );
};

const Form = styled(_Form)`
  margin-bottom: 3rem;
`;
