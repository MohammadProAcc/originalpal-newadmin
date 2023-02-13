import { Group, Space } from "@mantine/core";
import { Button, InputGroup } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { FIELDS } from "constants/FIELDS";
import { useFetchAll, useLoading, useNonInitialEffect } from "hooks";
import Layout from "Layouts";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import _Select from "react-select";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ProductBrand } from "types";
import {
  getAddressList,
  getBrandsList,
  getCouponsList,
  getOrdersList,
  getPayments,
  getProductsList,
  getStocksList,
  getUsersList,
  search_in,
  translator,
} from "utils";
import { utils, writeFile } from "xlsx";
import "./iransans";
import { TableForExport } from "./TableForExport";
import { useReactToPrint } from "react-to-print";

export function ExportPage() {
  const [result, setResult] = useState<any>(null);
  const [loadingList, toggleLoading] = useLoading();

  const brandsQuery = useQuery(["brands"], () => getBrandsList({ page: "total" }));

  const [exportType, setExportType] = useState(exportTypeOptions[0]);
  function exportTypeHandler(e: any) {
    setExportType(e ?? exportTypeOptions[0]);
  }

  const [entityToExport, setEntityToExport] = useState<any>(entityToExportOptions[0]);
  function entityToExportHandler(e: any) {
    setEntityToExport(e ?? entityToExportOptions[0]);
  }

  const [showPdfDoc, SetShowPdfDoc] = useState(false);

  const tableRef = useRef<any>(null);

  const { register: registerFields, handleSubmit: handleSubmitFields, getValues, control, reset } = useForm();

  function getFields() {
    return Object.entries(getValues())
      .filter(([, _value]) => _value)
      .map(([_key, _value]) => _key);
  }

  const xport = async () => {
    const table = document.getElementById("Table2XLSX");
    const wb = utils.table_to_book(table);

    writeFile(wb, "SheetJSTable.xlsx");
  };

  async function onExport() {
    toggleLoading("exporting");

    let response;

    switch (entityToExport.value) {
      case "user":
        response = await getUsersList({}, null, true);
        if (response && response.data) {
          const all = await useFetchAll(response.data.last_page, getUsersList);
          setResult(all);
        } else {
          toast.warn("گرفتن خروجی موفقیت آمیز نبود");
        }
        break;

      case "address":
        response = await getAddressList();
        if (response && response.data) {
          const allData = await useFetchAll(response.data.last_page, getAddressList);
          setResult(allData);
        } else {
          toast.warn("گرفتن خروجی موفقیت آمیز نبود");
        }
        break;

      case "order":
        response = await getOrdersList();
        if (response && response.data) {
          const allData = await useFetchAll(response.data.last_page, getOrdersList);
          setResult(allData);
        } else {
          toast.warn("گرفتن خروجی موفقیت آمیز نبود");
        }
        break;

      case "payment":
        response = await getPayments();
        if (response && response.data) {
          const allData = await useFetchAll(response.data.last_page, getPayments);
          setResult(allData);
        } else {
          toast.warn("گرفتن خروجی موفقیت آمیز نبود");
        }
        break;

      case "product":
        const brandId = getValues("brandToGet")?.value;
        if (brandId) {
          response = await search_in("products", { key: "brand_id", type: "contain", value: brandId }, { page: 1 });
        } else {
          response = await getProductsList();
        }
        if (response && response.data) {
          const allData = await useFetchAll(
            response.data.last_page,
            brandId
              ? ({ page }: any) =>
                  search_in(
                    "products",
                    {
                      key: "brand_id",
                      type: "contain",
                      value: brandId,
                    },
                    { page },
                  )
              : getProductsList,
          );
          allData.forEach((data) => {
            if (data.brand) {
              data.brand = data.brand.name;
            }
          });
          setResult(allData);
        } else {
          toast.warn("گرفتن خروجی موفقیت آمیز نبود");
        }
        break;

      case "stock":
        response = await getStocksList();
        if (response && response.data) {
          const allData = await useFetchAll(response.data.last_page, getStocksList);
          setResult(allData);
        } else {
          toast.warn("گرفتن خروجی موفقیت آمیز نبود");
        }
        break;

      case "coupon":
        response = await getCouponsList({});
        if (response && response.data) {
          const allData = await useFetchAll(response.data.last_page, getCouponsList);
          setResult(allData);
        } else {
          toast.warn("گرفتن خروجی موفقیت آمیز نبود");
        }
        break;

      default:
        break;
    }

    toggleLoading("exporting");
  }

  const exportToPDF = useReactToPrint({ content: () => tableRef.current });

  useNonInitialEffect(() => {
    manualExport();
  }, [result]);

  function manualExport() {
    if (result) {
      if (exportType.value === "xslx") {
        xport();
      } else {
        exportToPDF();
      }
    }
  }

  return (
    <Layout title="خروجی">
      <SelectionList>
        <SelectionItem>
          <InputGroup fullWidth>
            <label>نوع خروجی :</label>
            <Select options={exportTypeOptions} defaultValue={exportTypeOptions[0]} onChange={exportTypeHandler} />
          </InputGroup>
        </SelectionItem>

        <SelectionItem>
          <InputGroup fullWidth>
            <label>هدف خروجی :</label>
            <Select
              options={entityToExportOptions}
              defaultValue={entityToExportOptions[0]}
              onChange={(e) => {
                reset();
                entityToExportHandler(e);
              }}
            />
          </InputGroup>
        </SelectionItem>
      </SelectionList>

      <p>مولفه های خروجی :</p>
      <FieldsList>
        {FIELDS[entityToExport.value as "product"].map((_field) => (
          <FieldItem key={`${entityToExport.value}_${_field}`}>
            <FieldLabel>
              <input
                type="checkbox"
                {...registerFields(_field)}
                key={`${entityToExport}_${_field}`}
                defaultChecked={false}
              />
              {translator(_field)}
            </FieldLabel>
          </FieldItem>
        ))}
      </FieldsList>
      {/* TODO: add this for stock too */}
      {entityToExport.value === "product" && (
        <Group>
          <Controller
            name="brandToGet"
            control={control}
            render={({ field }) => (
              <Select
                isClearable
                options={brandsQuery.data?.data?.data?.map((brand: ProductBrand) => ({
                  label: brand?.name,
                  value: brand?.id?.toString(),
                }))}
                placeholder="برند مورد نظر را انتخاب کنید"
                {...field}
              />
            )}
          />
        </Group>
      )}
      <Space my="md" />
      <Button status="Success" onClick={onExport} disabled={loadingList.includes("exporting")}>
        گرفتن خروجی
      </Button>

      {result && (
        <>
          <Space mt="md" />
          <Button status="Info" onClick={manualExport} disabled={loadingList.includes("exporting")}>
            دانلود فایل
          </Button>
        </>
      )}

      <hr />

      {result && <TableForExport data={result} fields={getFields()} upperRef={tableRef} />}

      {/* {result && exportType.value === "pdf" && (
        <Renderer>
          <MyDocument result={result} fields={getFields()} />
        </Renderer>
      )} */}
    </Layout>
  );
}

const exportTypeOptions = [
  { label: "PDF", value: "pdf" },
  { label: "Excel", value: "xslx" },
];

const entityToExportOptions = [
  { label: "کاربران", value: "user" },
  { label: "سفارشات", value: "order" },
  { label: "آدرس ها", value: "address" },
  { label: "پرداخت ها", value: "payment" },
  { label: "محصولات", value: "product" },
  { label: "انبار", value: "stock" },
  { label: "کد های تخفیف", value: "coupon" },
];

const SelectionList = styled.ul`
  padding: 0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid gray;

  display: flex;
  gap: 1rem;
`;

const SelectionItem = styled.li`
  list-style: none;
`;

const Select = styled(_Select)`
  min-width: 10rem;
`;

const FieldsList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  width: 100%;
`;

const FieldItem = styled.li`
  list-style: none;
`;

const FieldLabel = styled.label`
  display: flex;

  gap: 0.5rem;
`;

const Hidden = styled.div`
  display: none;
`;
