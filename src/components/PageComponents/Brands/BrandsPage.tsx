import React, { useState, useRef } from "react";
import styled from "styled-components";
import { has, pluralRemove, useStore, useUserStore } from "utils";
import Layout from "Layouts";
import { Button, Container, Modal } from "@paljs/ui";
import { BasicTable, deleteBrand, FlexContainer, HeaderButton, PaginationBar, SearchBar } from "components";
import Link from "next/link";
import { useRouter } from "next/router";
import { Add } from "@material-ui/icons";
import { toast } from "react-toastify";
import { PermissionEnum } from "types";
import { Flex } from "@mantine/core";

export const BrandsPage = () => {
  const router = useRouter();

  const { brands, clearList } = useStore((state) => ({
    brands: state?.brands,
    clearList: state?.clearList,
  }));
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
    const response = await deleteBrand(item?.id);
    if (response?.status === "success") {
      clearList("brands", item?.id);
      setItemToRemove(null);
      toast.success("برند با موفقیت حذف شد");
      router.back();
    } else {
      toast.error("حذف برند موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const pluralRemoveTrigger = async (selections: any[]) => {
    await pluralRemove(
      "brands",
      selections,
      deleteBrand,
      (entity: string, id: any) => {
        clearList(entity, id);
        toast.success(`مورد با شناسه ${id} حذف شد`);
      },
      async () => {
        await setTableSelections([]);
        clearSelectionsRef.current?.();
        setItemsToRemove(null);
      },
      (id: number) => toast.error(`حذف  برند با  شناسه ${id} موفقیت آمیز نبود`),
    );
  };

  const columns: any[] = ["شناسه برند", "نام برند", "فعالیت ها"];

  const data = brands?.data?.data?.map((brand: any) => [
    // =====>> Table Columns <<=====
    brand?.id,
    brand?.name,
    <Flex gap="0.25rem">
      {has(permissions, PermissionEnum.readBrand) && (
        <Link href={`/brands/${brand?.id}`} passHref>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Info">
              مشاهده
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.editBrand) && (
        <Link href={`/brands/edit/${brand?.id}`} passHref>
          <a>
            <Button style={{ marginLeft: "1rem" }} status="Primary">
              ویرایش
            </Button>
          </a>
        </Link>
      )}
      {has(permissions, PermissionEnum.deleteBrand) && (
        <Button status="Danger" onClick={() => setItemToRemove(brand)}>
          حذف
        </Button>
      )}
    </Flex>,
  ]);

  return (
    <Layout title="برند ها">
      <h1>برند ها</h1>

      <FlexContainer>
        <Link href="/brands/create" passHref>
          <a>
            {has(permissions, PermissionEnum.editBrand) && (
              <Button
                style={{
                  margin: "1rem 0 1rem 1rem",
                  display: "flex",
                }}
                status="Success"
                appearance="outline"
              >
                افزودن برند
                <Add />
              </Button>
            )}
          </a>
        </Link>
        {tableSelections?.length > 0 && has(permissions, PermissionEnum.browseBrand) && (
          <HeaderButton status="Danger" appearance="outline" onClick={() => setItemsToRemove(tableSelections)}>
            حذف موارد انتخاب شده
          </HeaderButton>
        )}
      </FlexContainer>

      <SearchBar
        fields={brands.fields}
        entity="brands"
        params={router.query}
        callback={(form: any) =>
          router.push({
            pathname: "/brands/search",
            query: form,
          })
        }
      />

      <BasicTable
        getSelections={setTableSelections}
        columns={columns}
        rows={data}
        clearSelectionTriggerRef={clearSelectionsRef}
      />
      <PaginationBar
        totalPages={brands?.data?.last_page}
        activePage={router.query.page ? Number(router.query.page) : 1}
        router={router}
      />

      <Modal on={itemToRemove} toggle={toggleModal}>
        <ModalBox fluid>
          آیا از حذف بنر برند <span className="text-danger">{`${itemToRemove?.id}`}</span> با عنوان{" "}
          <span className="text-danger">{`${itemToRemove?.name}`}</span> اطمینان دارید؟
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
