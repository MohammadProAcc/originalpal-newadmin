import { Card, CardBody, CardHeader, InputGroup, Modal, Select } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { Button, FlexContainer, HeaderButton, ModalBox } from "components";
import Cookies from "js-cookie";
import Layout from "Layouts";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PermissionEnum } from "types";
import {
  $_get_roles_list,
  deleteUser,
  editUser,
  getSingleUser,
  has,
  removeItem,
  translator,
  useUserStore,
} from "utils";

export const EditUserPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const roles = useQuery(["roles"], () =>
    $_get_roles_list({}, Cookies.get(process.env.TOKEN!)).then((res: any) => {
      return res?.data?.map((_role: any) => ({
        label: _role.name,
        value: _role.id,
      }));
    }),
  );

  const userQuery = useQuery(["user"], () =>
    getSingleUser(String(router.query?.user_id), Cookies.get(process.env["TOKEN"]!)).then((res) => res.data),
  );

  const permissions = useUserStore().getPermissions();

  const {
    register,
    handleSubmit,
    control,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      email: userQuery.data?.email,
      name: userQuery.data?.name,
      lastname: userQuery.data?.lastname,
      password: userQuery.data?.password,
      phone: userQuery.data?.phone,
      points: userQuery.data?.points,
      role: userQuery.data?.role,
      status: userQuery.data?.status,
      roles: userQuery.data?.roles?.map((_item: any) => ({
        label: _item.name,
        value: _item.id,
      })),
    },
  });
  type UserForm = typeof dirtyFields;

  const onSubmit = async (form: UserForm) => {
    setLoading(true);
    
    delete form.phone;
    delete form.email;

    form.roles = form.roles?.map((_role: any) => _role.value);
    const response = await editUser(userQuery.data?.id, form);
    if (response?.status === "success") {
      const updatedUser = await getSingleUser(userQuery.data?.id);
      userQuery.refetch();
      toast.success("کاربر بروز شد");
      router.back();
    } else {
      toast.error("بروزرسانی کاربر موفقیت آمیز نبود");
    }
  
    setLoading(false);
  };

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const remove = async (removeId: any) => {
    await removeItem("users", removeId, deleteUser, () => router.push("/users"), [
      `کاربر ${removeId} با موفقیت حذف شد`,
      "حذف کاربر موفقیت آمیز نبود",
    ]);
  };

  return (
    <Layout title={`${userQuery?.data?.id}`}>
      <h1 style={{ marginBottom: "4rem" }}>
        کاربر "{userQuery.data?.name}"
        {has(permissions, PermissionEnum.readUser) && (
          <HeaderButton status="Info" href={`/users/${userQuery.data?.id}`}>
            مشاهده
          </HeaderButton>
        )}
        {has(permissions, PermissionEnum.deleteUser) && (
          <HeaderButton status="Danger" onClick={() => setItemToRemove(userQuery.data)}>
            حذف
          </HeaderButton>
        )}
      </h1>

      {/* ....:::::: Remove Modals :::::.... */}
      <Modal on={itemToRemove} toggle={closeRemovalModal}>
        <ModalBox>
          <div style={{ marginBottom: "1rem" }}>
            آیا از حذف برچسب
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

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>نام کاربر</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("name", { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نام خانوادگی</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("lastname")} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>ایمیل</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("email", { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>رمز عبور </CardHeader>
          <CardBody>
            <InputGroup>
              <input placeholder="تغییر رمز عبور" {...register("password")} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>نقش : {translator(userQuery.data?.role)}</CardHeader>
          <CardBody style={{ overflow: "initial" }}>
            <Controller
              control={control}
              name="roles"
              render={({ field }) => <Select options={roles.data} isMulti {...field} />}
            />
          </CardBody>
        </Card>
        <Button status="Info" type="submit" appearance="outline">
          بروزرسانی کاربر
        </Button>
      </form>
    </Layout>
  );
};
