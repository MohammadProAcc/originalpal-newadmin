import { Flex } from "@mantine/core";
import { Add } from "@material-ui/icons";
import { Button, Container, Modal } from "@paljs/ui";
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from "components";
import Layout from "Layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { PermissionEnum } from "types";
import { deleteCoupon, has, pluralRemove, useStore, useUserStore } from "utils";

export const CouponsPage = () => {
  const router = useRouter();

  // FIXME: need to fix after migrating domain
  function copyLinkToClipboard(text: any) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("پیوند با موفقیت رونوشت شد");
      })
      .catch(() => {
        toast.error("رونوشت از روی پیوند موفقیت آمیز نبود");
      });
  }

  const { coupons, clearList } = useStore((state) => ({
    coupons: state?.coupons,
    clearList: state?.clearList,
  }));
  const permissions = useUserStore().getPermissions();

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const [itemsToRemove, setItemsToRemove] = useState<any>(null);

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);

  const toggleModal = () => setItemToRemove(null);

  const togglePluralRemoveModal = () => setItemsToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await deleteCoupon(item?.id);
    if (response?.status === "success") {
      clearList("coupons", item?.id);
      setItemToRemove(null);
      toast.success("کوپن با موفقیت حذف شد");
    } else {
      toast.error("حذف کوپن موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      "coupons",
      selections,
      deleteCoupon,
      (entity: string, id: any) => {
        clearList(entity, id);
        toast.success(`مورد با شناسه ${id} حذف شد`);
      },
      () => {
        setTableSelections([]);
        setItemsToRemove(null);
      },
      (id: number) => toast.error(`حذف  کوپن با  شناسه ${id} موفقیت آمیز نبود`),
    );
  };

  const columns: any[] = ["شناسه کوپن", "کد", "نوع", "مقدار", "توضیحات", "فعالیت ها"];

  const data = coupons?.data?.data?.map((coupon: any) => [
    // =====>> Table Columns <<=====
    coupon?.id ?? "-",
    coupon?.code ?? "-",
    coupon?.type ?? "-",
    coupon?.amount ?? "-",
    coupon?.decription ?? "-",

    <Flex gap="0.25rem">
      {has(permissions, PermissionEnum.readCoupon) && (
        <Link href={`/coupons/${coupon?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.readCoupon) && (
        <Button
          style={{ marginLeft: "1rem" }}
          status="Info"
          onClick={() => copyLinkToClipboard(`https://originalpal.co.uk/cl/${coupon.id}`)}
        >
          رونوشت از پیوند استفاده از کد تخفیف
        </Button>
      )}
      {has(permissions, PermissionEnum.editCoupon) && (
        <Link href={`/coupons/edit/${coupon?.id}`}>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteCoupon) && (
        <Button status="Danger" onClick={() => setItemToRemove(coupon)}>
          حذف
        </Button>
      )}
    </Flex>,
  ]);

  return (
    <Layout title="کوپن ها">
      <h1>کوپن ها</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.editCoupon) && (
          <Link href="/coupons/create">
            <a>
              <Button
                style={{
                  margin: "1rem 0 1rem 1rem",
                  display: "flex",
                }}
                status="Success"
                appearance="outline"
              >
                افزودن کوپن
                <Add />
              </Button>
            </a>
          </Link>
        )}

        {has(permissions, PermissionEnum.editCoupon) && (
          <Link href="/coupons/aggregate">
            <a>
              <Button
                style={{
                  margin: "1rem 0 1rem 1rem",
                  display: "flex",
                }}
                status="Info"
                appearance="outline"
              >
                فهرست تخفیف محصولات
              </Button>
            </a>
          </Link>
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteCoupon) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseCoupon) && (
        <>
          <SearchBar
            fields={coupons.fields}
            entity="coupons"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: "/coupons/search",
                query: form,
              })
            }
          />

          <BasicTable getSelections={setTableSelections} columns={columns} rows={data} />
          <PaginationBar
            totalPages={coupons?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />
        </>
      )}

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف کوپن <span className="text-danger">{`${itemToRemove?.id}`}</span> با کد{" "}
          <span className="text-danger">{`${itemToRemove?.code}`}</span> اطمینان دارید؟
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
