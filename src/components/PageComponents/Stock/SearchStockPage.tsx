import { Flex } from "@mantine/core";
import { Add } from "@material-ui/icons";
import { Button, Container, Modal } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { BasicTable, FlexContainer, HeaderButton, PaginationBar, SearchBar } from "components";
import Cookies from "js-cookie";
import Layout from "Layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { PermissionEnum } from "types";
import { deleteStock, has, numeralize, search_in, useUserStore } from "utils";

export const SearchStockPage = () => {
  const router = useRouter();

  const stocksQuery = useQuery(["stocks", router.query], () =>
    search_in("stock", router.query, Cookies.get(process.env["TOKEN"]!)),
  );
  const stockFieldsQuery = useQuery(
    ["stockFields"],
    async () =>
      await new Promise((resolve) =>
        resolve({
          fields: [
            "code",
            "count",
            "created_at",
            "disc",
            "discount_amout",
            "discount_end",
            "discount_start",
            "discount_type",
            "id",
            "price",
            "product_id",
            "size",
            "updated_at",
          ],
        }),
      ),
  );
  const permissions = useUserStore().getPermissions();

  const [loading, setLoading] = useState(false);

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const [itemsToRemove, setItemsToRemove] = useState<any>(null);

  const [tableSelections, setTableSelections] = useState<number[] | []>([]);
  const clearSelectionsRef = useRef<any>();

  const toggleModal = () => setItemToRemove(null);
  const togglePluralRemoveModal = () => setItemsToRemove(null);

  const removeItem = async (item: any) => {
    setLoading(true);
    const response = await deleteStock(item?.id);
    if (response?.status === "success") {
      stocksQuery?.refetch();
      setItemToRemove(null);
      toast.success("انبار با موفقیت حذف شد");
    } else {
      toast.error("حذف انبار موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const pluralRemoveTrigger = async (selections: any[]) => {
    setLoading(true);

    if (selections?.length > 0) {
      const deletions = await selections?.map(async (id) => {
        const response = await deleteStock(id);

        if (response?.status === "success") {
          stocksQuery.refetch();
          toast.success(`مورد با شناسه ${id} حذف شد`);
        }
      });

      await setTableSelections([]);
      clearSelectionsRef.current?.();
      await setItemsToRemove(null);
    }

    setLoading(false);
  };

  const columns: any[] = ["شناسه انبار", "شناسه محصول انبار", "کد", "سایز", "تعداد", "قیمت", "قیمت با تخفیف", "فعالیت"];

  const data = stocksQuery?.data?.data?.data?.map((stock: any) => [
    // =====>> Table Columns <<=====
    stock?.id,
    stock?.product_id,
    stock?.code,
    stock?.size,
    stock?.count,
    `${numeralize(stock?.price)} تومان`,
    `${numeralize(stock?.priceAfterDiscount)} تومان`,
    <Flex gap=".25rem">
      <Link href={`/stock/${stock?.id}`}>
        <a>
          <Button style={{ marginLeft: "1rem" }} status="Info">
            مشاهده
          </Button>
        </a>
      </Link>
      <Link href={`/stock/edit/${stock?.id}`}>
        <a>
          <Button style={{ marginLeft: "1rem" }} status="Primary">
            ویرایش
          </Button>
        </a>
      </Link>
      <Button status="Danger" onClick={() => setItemToRemove(stock)}>
        حذف
      </Button>
    </Flex>,
  ]);

  return (
    <Layout title="انبار">
      <h1>انبار</h1>

      <FlexContainer>
        {has(permissions, PermissionEnum.editStock) && (
          <Link href="/stock/create">
            <a>
              <Button
                style={{
                  margin: "1rem 0 1rem 1rem",
                  display: "flex",
                }}
                status="Success"
                appearance="outline"
              >
                افزودن انبار
                <Add />
              </Button>
            </a>
          </Link>
        )}
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.deleteStock) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      {has(permissions, PermissionEnum.browseStock) && (
        <>
          <SearchBar
            fields={(stockFieldsQuery?.data as any)?.fields}
            entity="stocks"
            params={router.query}
            callback={(form: any) =>
              router.push({
                pathname: "/stock/search",
                query: form,
              })
            }
          />

          {stocksQuery.data && (
            <BasicTable
              getSelections={setTableSelections}
              columns={columns}
              rows={data}
              clearSelectionTriggerRef={clearSelectionsRef}
            />
          )}

          <PaginationBar
            totalPages={stocksQuery?.data?.data?.last_page}
            activePage={router.query.page ? Number(router.query.page) : 1}
            router={router}
          />

          <Modal on={itemToRemove} toggle={toggleModal}>
            <ModalBox fluid>
              آیا از حذف انبار <span className="text-danger">{`${itemToRemove?.id} `}</span> برای محصول{" "}
              <span className="text-danger">{`${itemToRemove?.product_id} `}</span> اطمینان دارید؟
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
        </>
      )}
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
