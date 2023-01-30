import { Flex } from "@mantine/core";
import { Button, Container, Modal } from "@paljs/ui";
import { BasicTable, HeaderButton, PaginationBar } from "components";
import Layout from "Layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Payment, PermissionEnum } from "types";
import { deletePayment, has, pluralRemove, translator, useStore, useUserStore } from "utils";

export const PaymentsPage = () => {
  const router = useRouter();

  const { payments, clearList } = useStore((state) => ({
    payments: state?.payments,
    clearList: state?.clearList,
  }));
  const permissions = useUserStore().getPermissions();

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const [itemsToRemove, setItemsToRemove] = useState<any>(null);
  const togglePluralRemoveModal = () => setItemsToRemove(null);

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);
  const clearSelectionsRef = useRef<any>();

  const toggleModal = () => setItemToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await deletePayment(item?.id);
    if (response?.status === "success") {
      clearList("payments", item?.id);
      toggleModal();
      toast.success("پرداخت با موفقیت حذف شد");
    } else {
      toast.error("عملیات حذف موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      "payments",
      selections,
      deletePayment,
      (entity: string, id: any) => {
        clearList(entity, id);
        toast.success(`مورد با شناسه ${id} حذف شد`);
      },
      async () => {
        setTableSelections([]);
        clearSelectionsRef.current?.();
        setItemsToRemove(null);
      },
      // TODO: add a proper error callback
      () => {},
    );
  };

  const columns: any[] = [
    "شماره پرداخت",
    "وضعیت",
    "درگاه",
    "قیمت",
    "توضیحات",
    "شماره کارت",
    "تاریخ پرداخت",
    "فعالیت ها",
  ];

  const data = payments?.map((payment: Payment) => [
    payment?.id,
    translator(payment?.status),
    translator(payment?.port),
    payment?.price,
    payment?.description,
    payment?.payment_date,
    payment?.card_number,
    <Flex gap="0.25rem">
      {has(permissions, PermissionEnum.readPayment) && (
        <Link href={`/payments/${payment?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {/* {has(permissions, PermissionEnum.editPayment) && (
        <Link href={`/payments/edit/${payment?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deletePayment) && (
        <Button status="Danger" onClick={() => setItemToRemove(payment)}>
          حذف
        </Button>
      )} */}
    </Flex>,
  ]);

  return (
    <Layout title="پرداخت ها">
      <h1>
        پرداخت ها
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deletePayment) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </h1>

      {has(permissions, PermissionEnum.browsePayment) && (
        <>
          <BasicTable
            getSelections={setTableSelections}
            columns={columns}
            rows={data}
            clearSelectionTriggerRef={clearSelectionsRef}
          />

          <PaginationBar
            totalPages={payments?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف بنر مورد <span className="text-danger">{itemToRemove?.id}</span> با عنوان{" "}
          <span className="text-danger">{itemToRemove?.user?.name ?? "?"}</span> اطمینان دارید؟
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
          آیا از حذف موارد
          <span className="text-danger mx-1">{itemsToRemove?.join(" , ")}</span>
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
    </Layout>
  );
};

const ModalBox = styled(Container)`
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #fff;
`;

const ButtonGroup = styled.div`
  margin-top: 1rem;
  display: flex;
`;
