import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import {
  useStore,
  deleteUser,
  pluralRemove,
  $_delete_role,
  reqSucceed,
  useUserStore,
  has,
  $_get_roles_list,
} from "utils";
import Layout from "Layouts";
import { Button, Container, Modal } from "@paljs/ui";
import { BasicTable, FlexContainer, HeaderButton, InputGroup } from "components";
import { Add } from "@material-ui/icons";
import { toast } from "react-toastify";
import { CreateRoleModal, EditRoleModal } from "components";
import { PermissionEnum } from "types";
import { useQuery } from "@tanstack/react-query";
import { Flex } from "@mantine/core";

export const RolesPage = () => {
  const { data: roles, refetch: refetchRoles } = useQuery(["roles"], () => $_get_roles_list());

  const permissions = useUserStore().getPermissions();

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const [roleToEdit, setRoleToEdit] = useState<any>(null);

  const [showCreationModal, setShowCreationModal] = useState(false);

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);

  const toggleModal = () => setItemToRemove(null);
  const toggleRoleEditModal = () => setRoleToEdit(null);
  const toggleCreationModal = () => {
    setShowCreationModal((_curr) => !_curr);
  };

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await $_delete_role({ role_id: item.id });
    if (reqSucceed(response)) {
      await refetchRoles();
      toast.success(`نقش ${item.name} با موفقیت حذف شد`);
      setItemToRemove(null);
    } else {
      toast.error(`حذف نقش ${item.name} موفقیت آمیز نبود`);
    }
    setLoading(false);
  };

  const [itemsToRemove, setItemsToRemove] = useState<any>(null);
  const togglePluralRemoveModal = () => setItemsToRemove(null);

  const pluralRemoveTrigger = async (selections: any[]) => {
    setLoading(true);
    for (let item of selections) {
      await $_delete_role({ role_id: item });
    }
    setTableSelections([]);
    setItemsToRemove(null);
    await refetchRoles();
    toast.success("نقش های مورد نظر با موفقیت حذف شدند");
    setLoading(false);
  };

  const columns: any[] = ["شناسه نقش", "نام نقش", "فعالیت ها"];

  const data = roles?.map((role: any) => [
    // =====>> Table Columns <<=====
    role?.id,
    role?.name,
    <Flex gap="0.25rem">
      {has(permissions, PermissionEnum.editRole) && (
        <Button style={{ marginLeft: "1rem" }} status="Info" onClick={() => setRoleToEdit(role)}>
          ویرایش
        </Button>
      )}
      {has(permissions, PermissionEnum.deleteRole) && (
        <Button status="Danger" onClick={() => setItemToRemove(role)}>
          حذف
        </Button>
      )}
    </Flex>,
  ]);

  return (
    <Layout title="نقش ها">
      <h1>نقش ها</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.editRole) && (
          <Button
            style={{
              margin: "1rem 0 1rem 1rem",
              display: "flex",
            }}
            status="Success"
            appearance="outline"
            onClick={toggleCreationModal}
          >
            افزودن نقش
            <Add />
          </Button>
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteRole) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseRole) && (
        <BasicTable getSelections={setTableSelections} columns={columns} rows={data ?? []} />
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف نقش <span className="text-danger">{`${itemToRemove?.id}`}</span> با نام{" "}
          <span className="text-danger">{`${itemToRemove?.name} ${itemToRemove?.lastname ?? ""}`}</span> اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={toggleModal} style={{ marginLeft: "1rem" }}>
              خیر، منصرم شدم
            </Button>
            <Button onClick={() => removeItem(itemToRemove)} disabled={loading} status="Danger">
              بله، حذف شود
            </Button>
          </ButtonGroup>
        </ModalBox>
      </Modal>

      <Modal on={itemsToRemove} toggle={togglePluralRemoveModal}>
        <ModalBox fluid>
          آیا از حذف نقش های
          <span className="text-danger mx-1">
            {itemsToRemove
              ?.map((roleId: number) => roles?.find((_role: any) => _role.id === roleId)?.name)
              ?.join(" , ")}
          </span>
          اطمینان دارید؟
          <ButtonGroup>
            <Button onClick={togglePluralRemoveModal} style={{ marginLeft: "1rem" }}>
              خیر، منصرم شدم
            </Button>
            <Button onClick={() => pluralRemoveTrigger(tableSelections)} disabled={loading} status="Danger">
              بله، حذف شوند
            </Button>
          </ButtonGroup>
        </ModalBox>
      </Modal>

      <CreateRoleModal onClose={toggleCreationModal} opened={showCreationModal} callback={refetchRoles} />

      <EditRoleModal onClose={toggleRoleEditModal} opened={roleToEdit} defaultValues={roleToEdit} />
    </Layout>
  );
};

interface ModalBoxProps {
  mode?: string;
}
const ModalBox = styled(Container)<ModalBoxProps>`
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #fff;

  ${(props) =>
    props.mode === "permission-list" &&
    css`
      width: 90vw;
      height: 90vh;
    `}
`;

const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: flex;
`;
