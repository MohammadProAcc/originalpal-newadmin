import {
  Box,
  Button,
  CSSObject,
  Divider,
  Input,
  LoadingOverlay,
  NumberInput,
  Select,
  Space,
  Tabs,
  Text,
  Textarea,
} from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import Layout from "Layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck, FaPen } from "react-icons/fa";
import { toast } from "react-toastify";
import { Address, IStockForCreation, Stock } from "types";
import { addAddressToOrder, admin, applyCouponOnOrder, createOrder, getOwnAddresses, getOwnOrders } from "utils";
import { OrderStockCard } from "./components/OrderStockCard";
import { SelectAddressCard } from "./components/SelectAddressCard";

export function CreateOrderPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const selectProductRef = useRef<HTMLInputElement>(null);

  const {
    data: { data: stocks },
  }: any = useQuery(["stocks"], async () => (await admin().get("/stock/select")).data);

  const { data: addresses }: any = useQuery(["addresses"], () => getOwnAddresses());
  const stockOptions = stocks.map((_stock: Stock) => ({
    label: `محصول ${_stock.product_id} - سایز ${_stock.size} - شناسه انبار ${_stock.id}`,
    value: _stock.id,
  }));

  const [orderStocks, setOrderStocks] = useState<{ stocks: IStockForCreation[] }>({ stocks: [] });

  const [orderAddress, setOrderAddress] = useState<Address | { address_id: number } | null>(null);
  const [addressFormLock, setAddressFormLock] = useState(false);
  const addressForm = useForm();
  function onAddressFormSubmit(form: any) {
    setOrderAddress(form);
  }

  const [couponCode, setCouponCode] = useState<string | null>(null);

  const submittedOrderId = useRef<null | number>(null);

  useEffect(() => {
    if (!!orderAddress) {
      setAddressFormLock(true);
    } else {
      setAddressFormLock(false);
    }
  }, [orderAddress]);

  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [orderCount, setOrderCount] = useState<number>(0);

  function addItemToOrder() {
    if (selectedStock && orderCount) {
      if (orderStocks.stocks.findIndex((_) => _.id === +selectedStock) >= 0) {
        setOrderStocks((curr) => ({
          stocks: [
            ...curr.stocks.map((_stock) =>
              _stock.id === +selectedStock
                ? {
                    id: +selectedStock,
                    quantity: _stock.quantity + orderCount,
                  }
                : _stock,
            ),
          ],
        }));
        setSelectedStock(null);
        setOrderCount(0);
      } else {
        setOrderStocks((curr) => ({
          stocks: [
            ...curr.stocks,
            {
              id: +selectedStock,
              quantity: orderCount,
            },
          ],
        }));
        setSelectedStock(null);
        setOrderCount(0);
      }
    }
  }

  function removeOrderStock(stockId: number) {
    setOrderStocks((_curr) => ({
      stocks: _curr.stocks.filter((__stock) => __stock.id !== stockId),
    }));
  }

  function reductionCallback(stockId: number) {
    setOrderStocks((_curr) => ({
      stocks: _curr.stocks
        .map((__stock) =>
          __stock.id === stockId
            ? {
                id: stockId,
                quantity: __stock.quantity - 1,
              }
            : __stock,
        )
        .filter((_stock) => _stock.quantity > 0),
    }));
  }

  function navigateToSubmittedOrderEditingPage() {
    if (submittedOrderId.current) {
      toast.success("سفارش با موفقیت ثبت شد");
      router.push(`/orders/edit/${submittedOrderId.current}`);
    }
    setOrderStocks({ stocks: [] });
  }

  const applyCouponCodeToOrder = useMutation({
    mutationFn: applyCouponOnOrder,
    onError() {
      setLoading(false);
    },
    onSuccess(data) {
      if (data.status === "success") {
        navigateToSubmittedOrderEditingPage();
      }
      setLoading(false);
    },
  });

  const addAddressToOrderCallback = useMutation({
    mutationFn: addAddressToOrder,

    onError() {
      toast.error("ثبت آدرس موفقیت آمیز نبود");
      setLoading(false);
    },

    onSuccess(data) {
      if (data?.status === "success") {
        if (couponCode) {
          applyCouponCodeToOrder.mutate({
            orderId: submittedOrderId.current!,
            code: couponCode,
          });
        } else {
          setLoading(false);
          navigateToSubmittedOrderEditingPage();
        }
      }
    },
  });

  const orderCreation = useMutation({
    mutationFn: createOrder,
    onError(err: any) {
      const errMessage = err.response.data.message;
      const openOrderId = err.response.data.data.order?.id;
      if (errMessage === "User Has open Order") {
        toast.warn(
          <Box>
            شما یک سفارش باز به شناسه <Link href={`/orders/edit/${openOrderId}`} passHref>{`${openOrderId}`}</Link>{" "}
            دارید
          </Box>,
        );
      } else if (errMessage === "product is sold") {
        toast.warn(
          <Box>
            <Text>{err.response.data?.data?.stock?.count}</Text> عدد از محصول{" "}
            <Text>{err.response?.data?.data?.stock?.product_id}</Text> موجود است
          </Box>,
        );
      } else {
        toast.error("ثبت سفارش موفقیت آمیز نبود");
      }
      setLoading(false);
    },
    onSuccess() {
      getOwnOrders().then(([lastOrder]) => {
        submittedOrderId.current = lastOrder.id;
        addAddressToOrderCallback.mutate({
          address: orderAddress!,
          orderId: lastOrder.id,
        });
      });
    },
  });

  async function submitOrder() {
    setLoading(true);
    await orderCreation.mutateAsync(orderStocks);
  }

  return (
    <Layout title="ثبت سفارش">
      <h1>ثبت سفارش</h1>

      <LoadingOverlay visible={loading} sx={{ position: "fixed" }} />

      <hr />

      <Box>
        {/* FIXME: add reset to default value logic */}
        <Select
          ref={selectProductRef}
          label="انتخاب محصول"
          data={stockOptions}
          searchable
          onChange={(e) => setSelectedStock(e)}
        />
        {selectedStock && (
          <NumberInput placeholder="تعداد سفارش..." label="تعداد سفارش" onChange={(e) => setOrderCount(e ?? 0)} />
        )}
        {orderCount > 0 ? (
          <Button
            variant="filled"
            color="cyan"
            onClick={addItemToOrder}
            sx={{
              marginTop: "1rem",
            }}
          >
            افزودن به سفارش
          </Button>
        ) : null}
      </Box>
      {orderStocks.stocks.length ? (
        <>
          <hr />
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            {orderStocks?.stocks.map((_stock) => (
              <OrderStockCard stock={_stock} removeCallback={removeOrderStock} reductionCallback={reductionCallback} />
            ))}
          </Box>
          <hr />
          <div>
            <Tabs defaultValue="add-address" variant="pills">
              <Tabs.List>
                <Tabs.Tab value="add-address">ثبت نشانی جدید</Tabs.Tab>
                <Tabs.Tab value="select-address">انتخاب از بین نشانی های ثبت شده ({addresses.length})</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="add-address">
                <Box
                  sx={{
                    display: "flex",
                    ".address-form": {
                      minWidth: "24rem",
                      marginTop: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "1rem",
                    },
                    ".address-cards": {
                      flex: "4",
                    },
                  }}
                >
                  <form className="address-form" onSubmit={addressForm.handleSubmit(onAddressFormSubmit)}>
                    <Input
                      placeholder="استان"
                      disabled={addressFormLock}
                      {...addressForm.register("province", { required: true })}
                    />
                    <Input
                      placeholder="شهر"
                      disabled={addressFormLock}
                      {...addressForm.register("city", { required: true })}
                    />
                    <Textarea
                      placeholder="نشانی"
                      disabled={addressFormLock}
                      {...addressForm.register("address", { required: true })}
                    />
                    <Input
                      placeholder="کد پستی"
                      disabled={addressFormLock}
                      {...addressForm.register("postalcode", { required: true })}
                    />
                    {addressFormLock ? (
                      <Button
                        type="button"
                        onClick={() => {
                          setOrderAddress(null);
                        }}
                        color="green"
                      >
                        <FaPen />
                        <Space mx="xs" />
                        ویرایش نشانی
                      </Button>
                    ) : (
                      <Button type="submit" color="cyan">
                        <FaCheck />
                        <Space mx="xs" />
                        ثبت نشانی
                      </Button>
                    )}
                  </form>
                </Box>
              </Tabs.Panel>

              <Tabs.Panel value="select-address">
                <Box sx={panelCardsContainerStyles}>
                  {addresses?.map((_address: Address) => (
                    <SelectAddressCard
                      address={_address}
                      selectionCallback={setOrderAddress}
                      active={
                        ((orderAddress as Address)?.id ?? (orderAddress as { address_id: number })?.address_id) !==
                        _address.id
                      }
                    />
                  ))}
                </Box>
              </Tabs.Panel>
            </Tabs>
          </div>
          <hr />
          {orderAddress ? (
            <Box>
              <Input
                placeholder="کد تخفیف..."
                sx={{ maxWidth: "24rem" }}
                onChange={(e: any) => setCouponCode(e.target.value)}
              />
              <hr />
              <Button variant="default" color="green" onClick={submitOrder}>
                ثبت سفارش
              </Button>
            </Box>
          ) : null}
        </>
      ) : null}
    </Layout>
  );
}

const panelCardsContainerStyles: CSSObject = {
  marginTop: "0.5rem",
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem",
};
