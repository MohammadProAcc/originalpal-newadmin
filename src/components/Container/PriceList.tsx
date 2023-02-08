import { Flex } from "@mantine/core";
import { Button, InputGroup as _InputGroup } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { PriceListCard } from "components";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Stock } from "types";
import { admin, pluralEditStock } from "utils";

export function PriceList() {
  const router = useRouter();
  const formMethods = useForm();

  const [loading, setLoading] = useState(false);
  const [lockSubmittion, setLockSubmittion] = useState(false);

  const stocksListQuery = useQuery(["stocks-list"], () =>
    admin(Cookies.get(process.env.TOKEN!))
      .get("/stock/select")
      .then((res) => res.data?.data?.filter((stock: Stock) => !!stock?.product_id)),
  );
  const [stocks, setStocks] = useState(stocksListQuery.data);

  async function onSubmitPriceForm(form: any) {
    if (!lockSubmittion) {
      setLoading(true);
      const stocks = [];
      for (let item in form) {
        delete form[item].priceAfterDiscount;
        delete form[item].product;
        stocks.push(form[item]);
      }
      // FIXME: handle potential error
      await pluralEditStock(stocks);
      toast.info("تغییرات اعمال شدند");
      router.back();
      setLoading(false);
    }
  }

  async function searchCallback(e: any) {
    if (e.target.value.length === 0) {
      setStocks(stocksListQuery.data);
    } else {
      function validate(entry: [any, any], target: string): any {
        if (!entry || !entry[1]) return false;
        if (typeof entry[1] === "object") {
          return Object.entries(entry[1]).some((entries) => validate(entries, target));
        }
        return String(entry[1]).includes(target);
      }

      setStocks(
        stocksListQuery.data?.filter((_item: any) =>
          Object.entries(_item).some((entries) => validate(entries, e.target.value)),
        ),
      );
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmitPriceForm)}>
        <Flex style={{ position: "fixed", top: "6rem" }}>
          <InputGroup>
            <Button type="submit" disabled={loading}>
              اعمال تغییرات
            </Button>
            <input
              placeholder="جستجو"
              onChange={searchCallback}
              onFocus={() => setLockSubmittion(true)}
              onBlur={() => setLockSubmittion(false)}
            />
          </InputGroup>
        </Flex>
        <br />
        <br />
        <Ul>
          {stocks
            .filter((_stock: any) => !!_stock.product)
            .map((_stock: any) => (
              <PriceListCard key={_stock.id} stock={_stock} />
            ))}
        </Ul>
      </form>
    </FormProvider>
  );
}

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled(_InputGroup)`
  margin-bottom: 2rem;
  margin-right: 2.5rem;

  input {
    width: 100%;
    margin-right: 1rem;
  }
`;

const FlexBox = styled.div`
  display: flex;
`;
