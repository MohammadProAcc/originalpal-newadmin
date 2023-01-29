import { Badge, Button as MantineButton, Collapse, Divider, Flex, Group, MultiSelect, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import {
  Alert,
  Card as _Card,
  CardBody as _CardBody,
  CardHeader as _CardHeader,
  InputGroup,
  Modal,
  Select as _Select,
} from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button, Editor, FlexContainer, ModalBox, ProductImageCard, ProductVideoCard, StockItem } from "components";
import { PersianDatePicker } from "components/Input";
import Cookies from "js-cookie";
import Layout from "Layouts";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Media, ProductBrand, Tag } from "types";
import {
  deleteProductMedia,
  deleteProductVideo,
  deleteStock,
  editProduct,
  getAllBrands,
  getSingleProduct,
  getTagsList,
  preppend,
  reqSucceed,
  toLocalDate,
} from "utils";
import { StockForm } from "../Stock/components";

// TODO: add search brand mechanism
export const EditProductPage: React.FC = () => {
  const router = useRouter();
  const productId = router.query.product_id as string;

  const { data: product, refetch: productRefetch } = useQuery(["product", productId], () =>
    getSingleProduct(productId),
  );
  const { data: brands, refetch: brandsRefetch } = useQuery(["brands"], () => getAllBrands());
  const { data: tags, refetch: tagsRefetch } = useQuery(["tags"], () => getTagsList({ pages: "total" }));

  // <<<=====------ States ------=====>>>
  const [loading, setLoading] = useState(false);

  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [removeAllImageModal, setRemoveAllImagesModal] = useState(false);
  const [openStocksCollapses, setOpenStocksCollapses] = useState<string[]>([]);

  const [stockToRemove, setStockToRemove] = useState<any>(null);
  const [imageToRemove, setImageToRemove] = useState<any>(null);
  const [videoToRemove, setVideoToRemove] = useState<any>(null);
  // <<<=====------ Select Options ------=====>>>
  const brandsOptions = brands?.data?.map((brand: ProductBrand) => ({
    label: brand?.name,
    value: brand?.id,
  }));

  const tagsOptions: {
    label: string;
    value: string;
  }[] = tags?.data?.data?.map((tag: Tag) => ({
    label: tag?.name,
    value: tag?.id?.toString(),
  }));

  const activationOptions = [
    { label: "فعال", value: "1" },
    { label: "غیرفعال", value: "0" },
  ];

  const onesizeOptions = [
    { label: "تک سایز", value: "1" },
    { label: "غیر تک سایز", value: "0" },
  ];

  const typeOptions = [
    { label: "جدید", value: "new" },
    { label: "دوباره موجود شده در انبار", value: "restock" },
    { label: "بزودی", value: "comingsoon" },
  ];

  const categoryOptions = [{ label: "کفش", value: "shoe" }];

  const { register, handleSubmit, control, watch } = useForm({
    defaultValues: {
      slug: product?.slug,
      Enable: product?.Enable,
      brand_id: product?.brand_id,
      code: product?.code,
      description: product?.description,
      discount_exp: product?.discount_exp,
      discount_price: product?.discount_price,
      meta_description: product?.meta_description,
      meta_keywords: product?.meta_keywords,
      meta_title: product?.meta_title,
      name: product?.name,
      price: product?.price,
      sold: product?.sold,
      state: product?.state,
      summary: product?.summary,
      title: product?.title,
      title_page: product?.title_page,
      trend: product?.trend,
      tags: product?.tags?.map((tag: any) => tag?.id?.toString()),
    },
  });

  // <<<=====------ Functions ------=====>>>
  function handleStocksCollapses(stockId: number) {
    setOpenStocksCollapses((current) => {
      if (current.includes(stockId.toString())) {
        return current.filter((id) => id !== stockId.toString());
      } else {
        return [...current, stockId.toString()];
      }
    });
  }

  function getImages() {
    let images: Media[] = [];
    if (product?.media?.length > 0) images = [...product?.media];

    if (product?.site_main_picture) images.unshift(product?.site_main_picture);
    return images;
  }

  async function onSubmit(form: any) {
    setLoading(true);

    delete form?.url;
    delete form?.color;

    const response = await editProduct(product?.id, form);

    if (response !== null) {
      await productRefetch();
      toast.success("محصول بروز شد");
      router.push("/products");
    } else {
      toast.error("بروزرسانی محصول موفقیت آمیز نبود");
    }

    setLoading(false);
  }

  async function afterStockCreation(response: any) {
    await productRefetch();
    setShowAddStockModal(false);
  }

  async function removeStock(stockId: number) {
    setLoading(true);

    const response = await deleteStock(stockId);
    if (response !== null) {
      await productRefetch();
      toast.success(`انبار شماره ${stockToRemove?.id} به سایز ${stockToRemove?.size} با موفقیت حذف شد`);
      setStockToRemove(null);
    } else {
      toast.success("حذف انبار موفقیت آمیز نبود");
    }

    setLoading(false);
  }

  async function removeProductImage(media: Media) {
    setLoading(true);
    const response = await deleteProductMedia(
      router?.query?.product_id as string,
      media?.u,
      Cookies.get(process.env.TOKEN!) ?? "",
    );
    if (response?.includes("operation done successfully")) {
      toast.success("تصویر با موفقیت حذف شد");
      setImageToRemove(null);
      productRefetch();
    } else {
      toast.error("حذف تصویر موفیت آمیز نبود");
    }
    setLoading(false);
  }

  // TODO: complete video remove process
  async function removeProductVideo(media: Media) {
    const response = await deleteProductVideo(product?.id, media?.u, Cookies.get(process.env.TOKEN!) ?? "");
    if (reqSucceed(response)) {
      productRefetch();
      toast.success("ویدیو با موفقیت حذف شد");
    } else {
      toast.error("حذف ویدیو موفقیت آمیز نبود");
    }
    setVideoToRemove(null);
  }

  async function removeAllImages() {
    setLoading(true);

    let images = getImages();

    for (let i = 0; i < images.length; i++) {
      await removeProductImage(images[i]);
    }

    setRemoveAllImagesModal(false);

    setLoading(false);
  }

  async function handleMainImageUpload(file: File[]) {
    setLoading(true);
    const formData = new FormData();
    formData?.append("site_main_picture", file[0]);

    await axios.post(`${process.env.API}/admin/products/${productId}/image`, formData, {
      headers: {
        Authorization: `Bearer ${Cookies.get(process.env.TOKEN!)}`,
        "Content-Type": "multipart/form-data",
      },
    });

    productRefetch();
    toast.success("تصویر اصلی با موفقیت تغییر کرد");

    setLoading(false);
  }

  async function handleImagesUpload(files: File[]) {
    const imagesToUpload = [];

    for (let file of files) {
      const formData = new FormData();
      formData?.append("media", file);
      imagesToUpload.push(formData);
    }

    setLoading(true);

    // VORTEX: why it's not working?
    // const imagesAsyncIterator = new AsyncIterator(
    //   imagesToUpload,
    //   (item: FormData) => {
    //     await axios.post(
    //       `${process.env.API}/admin/products/${productId}/image`,
    //       item,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${Cookies.get(process.env.TOKEN!)}`,
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       }
    //     )
    //   }
    // );

    let range = {
      items: imagesToUpload,

      [Symbol.asyncIterator]() {
        // (1)
        return {
          items: this.items,

          async next() {
            // (2)
            const item = this.items.pop();
            const response = item
              ? await axios.post(`${process.env.API}/admin/products/${productId}/image`, item, {
                  headers: {
                    Authorization: `Bearer ${Cookies.get(process.env.TOKEN!)}`,
                    "Content-Type": "multipart/form-data",
                  },
                })
              : null;

            if (item) {
              return { done: false, value: response };
            } else {
              return { done: true };
            }
          },
        };
      },
    };

    (async () => {
      for await (let response of range) {
        if (response?.status == 200) {
          toast.success("فایل تصویر با موفقیت بارگذاری شد");
        }
      }

      toast.info("بارگذاری تصاویر به اتمام رسید");
      productRefetch();
      setLoading(false);
    })();
  }

  async function handleVideosUpload(files: File[]) {
    const imagesToUpload = [];

    for (let file of files) {
      const formData = new FormData();
      formData?.append("product_video", file);
      imagesToUpload.push(formData);
    }

    setLoading(true);

    // VORTEX: why it's not working?
    // const imagesAsyncIterator = new AsyncIterator(
    //   imagesToUpload,
    //   (item: FormData) => {
    //     await axios.post(
    //       `${process.env.API}/admin/products/${productId}/image`,
    //       item,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${Cookies.get(process.env.TOKEN!)}`,
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       }
    //     )
    //   }
    // );

    let range = {
      items: imagesToUpload,

      [Symbol.asyncIterator]() {
        return {
          items: this.items,

          async next() {
            const item = this.items.pop();
            const response = item
              ? await axios.post(`${process.env.API}/admin/products/${productId}/video`, item, {
                  headers: {
                    Authorization: `Bearer ${Cookies.get(process.env.TOKEN!)}`,
                    "Content-Type": "multipart/form-data",
                  },
                })
              : null;

            if (item) {
              return { done: false, value: response };
            } else {
              return { done: true };
            }
          },
        };
      },
    };

    (async () => {
      for await (let response of range) {
        if (response?.status === 200) {
          toast.success("ویدیو با موفقیت بارگذاری شد");
        }
      }

      toast.info("بارگذاری ویدیو ها به اتمام رسید");

      productRefetch();
      setLoading(false);
    })();
  }

  // <<<=====------ JSX ------=====>>>
  return (
    <Layout title={`ویرایش محصول ${product?.id}`}>
      <h1 style={{ marginBottom: "4rem" }}>محصول "{product?.name}"</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>َUrl منحصر به فرد</CardHeader>
          <CardBody>
            <InputGroup>
              <input value={product?.url} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>H1 صفحه</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("title", { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>کد</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("code", { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>برند : {product?.brand?.name ?? "-"}</CardHeader>
          <CardBody>
            <InputGroup>
              <Controller
                name="brand_id"
                control={control}
                render={({ field }) => (
                  <Select
                    options={brandsOptions}
                    onChange={(e: any) => field.onChange(e?.value)}
                    placeholder="برای تغییر دادن برند ضربه بزنید"
                  />
                )}
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Flex direction="column">
          <Text mb="sm">
            <strong>برچسب ها</strong>
          </Text>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <MultiSelect
                selectOnBlur
                data={tagsOptions as any}
                placeholder="برچسب مورد نظر را انتخاب کنید"
                {...field}
              />
            )}
          />
        </Flex>

        <br />

        <Card>
          <CardHeader>نام</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("name", { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>قیمت</CardHeader>
          <CardBody>
            <InputGroup>
              <input placeholder="قیمت" type="number" {...register("price")} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>قیمت با تخفیف</CardHeader>
          <CardBody>
            <InputGroup>
              <input placeholder="قیمت با تخفیف" type="number" {...register("discount_price")} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>فعال یا غیرفعال کردن محصول : {product?.Enable ? "فعال" : "غیر فعال"}</CardHeader>
          <CardBody>
            <InputGroup>
              <Controller
                control={control}
                name="Enable"
                render={({ field }) => (
                  <Select options={activationOptions} onChange={(e: any) => field?.onChange(e?.value)} />
                )}
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>وضعیت</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("state")} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>SEO</CardHeader>
          <CardBody>
            <Card>
              <CardHeader>عنوان صفحه (tag title)</CardHeader>
              <CardBody>
                <InputGroup>
                  <input {...register("title_page")} />
                </InputGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>عنوان سئو (meta title)</CardHeader>
              <CardBody>
                <InputGroup>
                  <input {...register("meta_title")} placeholder="عنوان سئو (tag title)" />
                </InputGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>مترادف ها (meta_keywords)</CardHeader>
              <CardBody>
                <InputGroup>
                  <textarea style={{ minWidth: "100%", height: "8rem" }} {...register("meta_keywords")} />
                </InputGroup>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>توضیح متا (meta_description)</CardHeader>
              <CardBody>
                <InputGroup>
                  <textarea style={{ minWidth: "100%", height: "8rem" }} {...register("meta_description")} />
                </InputGroup>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
        {/*
        <Card>
          <CardHeader>نوع</CardHeader>
          <CardBody style={{ overflow: 'initial' }}>
            <InputGroup>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    options={typeOptions}
                    onChange={(e: any) => field.onChange(e?.value)}
                    placeholder="در صورتی که قصد تغییر دادن دارید کلیک کنید..."
                  />
                )}
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>دسته بندی</CardHeader>
          <CardBody style={{ overflow: 'initial' }}>
            <InputGroup>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    options={categoryOptions}
                    onChange={(e: any) => field.onChange(e?.value)}
                    placeholder="در صورتی که قصد تغییر دادن دارید کلیک کنید..."
                  />
                )}
              />
            </InputGroup>
          </CardBody>
        </Card> */}

        <Card>
          <CardHeader>خلاصه</CardHeader>
          <CardBody>
            <InputGroup>
              <textarea style={{ minWidth: "100%", height: "8rem" }} {...register("summary")} />
            </InputGroup>
          </CardBody>
        </Card>

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange } }) => (
            <Editor title={<h5>توضیحات</h5>} content={product?.description} callback={onChange} />
          )}
        />

        <br />

        <Card>
          <CardHeader>ترند</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("trend")} placeholder="ترند" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>میزان فروش</CardHeader>
          <CardBody>
            <InputGroup>
              <input type="number" {...register("sold")} placeholder="میزان فروش" />
            </InputGroup>
          </CardBody>
        </Card>

        {/* <Card>
          <CardHeader>تک سایز : {product?.onesize ? 'بله' : 'خیر'}</CardHeader>
          <CardBody>
            <InputGroup>
              <Controller
                name="onesize"
                control={control}
                render={({ field }) => (
                  <Select
                    options={onesizeOptions}
                    onChange={(e: any) => field.onChange(Number(e?.value))}
                    placeholder="در صورتی که قصد تغییر دادن دارید کلیک کنید..."
                  />
                )}
              />
            </InputGroup>
          </CardBody>
        </Card> */}

        <Card>
          <CardHeader>
            پایان تخفیف : {toLocalDate(product?.discount_exp) ?? "-"} (برای بروزرسانی تاریخ پایان تخفیف، تاریخ موردنظر
            خود را وارد کنید.)
          </CardHeader>
          <CardBody>
            <InputGroup>
              {/* <input type="date" {...register('discount_exp')} /> */}
              <Controller
                name="discount_exp"
                control={control}
                render={({ field }) => <PersianDatePicker onSelect={field.onChange} value={watch("discount_exp")} />}
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>اسلاگ</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register("slug")} />
            </InputGroup>
          </CardBody>
        </Card>

        <Button disabled={loading} className="mb-4" status="Warning" type="submit" appearance="hero">
          بروزرسانی اطلاعات محصول
        </Button>
      </Form>

      <Card>
        <CardHeader>
          <h3 style={{ marginBottom: "1rem" }}>تصاویر </h3>
          <Group sx={{ gap: "1rem" }}>
            <Dropzone accept={IMAGE_MIME_TYPE} multiple={false} onDrop={handleMainImageUpload} loading={loading}>
              <Text align="center">بارگذاری تصویر اصلی</Text>
            </Dropzone>

            <Dropzone accept={IMAGE_MIME_TYPE} onDrop={handleImagesUpload} loading={loading}>
              <Text align="center">بارگذاری تصاویر</Text>
            </Dropzone>

            {getImages()?.length > 0 && (
              <Button
                status="Danger"
                appearance="outline"
                style={{ display: "inline-block", marginRight: "0.5rem" }}
                onClick={() => setRemoveAllImagesModal(true)}
              >
                حذف تمام تصاویر
              </Button>
            )}
          </Group>
        </CardHeader>
        <CardBody
          style={{
            overflow: "scroll",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {product?.site_main_picture && (
            <ProductImageCard
              productId={product?.id}
              index={0}
              media={product?.site_main_picture}
              removalCallback={setImageToRemove}
              updateCallback={productRefetch}
            />
          )}
          {product?.media?.map((media: Media, index: number) => (
            <ProductImageCard
              productId={product?.id}
              index={index + 1}
              media={media}
              removalCallback={setImageToRemove}
              updateCallback={productRefetch}
            />
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 style={{ marginBottom: "1rem" }}>ویدیو ها</h3>

          <Group>
            <Dropzone accept={[MIME_TYPES.mp4]} onDrop={handleVideosUpload} loading={loading}>
              <Text align="center">بارگذاری فایل تصویری</Text>
            </Dropzone>
          </Group>
        </CardHeader>
        <CardBody
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {product?.video?.map((media: Media, index: number) => (
            <ProductVideoCard
              productId={product?.id}
              index={index + 1}
              media={media}
              removalCallback={setVideoToRemove}
              updateCallback={productRefetch}
            />
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex ali-center">
          انبار{" "}
          <Button className="mx-3" status="Success" appearance="hero" onClick={() => setShowAddStockModal(true)}>
            افزودن انبار
          </Button>
        </CardHeader>
        <CardBody>
          <Flex direction="column">
            {product?.stock?.length > 0 ? (
              product?.stock?.map((stock: any, index: number, stocks: any[]) => (
                <>
                  <Flex gap="1rem" align="center">
                    <Badge color="cyan" size="xl">
                      سایز :{stock?.size}{" "}
                    </Badge>

                    <MantineButton
                      onClick={() => {
                        handleStocksCollapses(stock?.id);
                      }}
                      className="mr-3"
                      variant="light"
                      color={openStocksCollapses.includes(stock?.id?.toString()) ? "orange" : "green"}
                    >
                      {openStocksCollapses.includes(stock?.id?.toString()) ? "بستن" : "باز کردن"}
                    </MantineButton>

                    <MantineButton onClick={() => setStockToRemove(stock)} className="mr-3" variant="light" color="red">
                      حذف انبار
                    </MantineButton>
                  </Flex>
                  <Collapse in={openStocksCollapses.includes(stock?.id?.toString())} transitionDuration={500}>
                    <StockItem callback={productRefetch} stock={stock} />
                  </Collapse>
                  {index !== stocks?.length - 1 && <Divider color="gray" my="md" />}
                </>
              ))
            ) : (
              <Alert status="Warning">این محصول در انبار موجود نیست</Alert>
            )}
          </Flex>
        </CardBody>
      </Card>

      {/* -===>>> Modals <<<===- */}
      <Modal on={!!imageToRemove} toggle={() => setImageToRemove(null)}>
        <Card>
          <CardHeader>آیا از حذف تصویر زیر اطمینان دارید؟</CardHeader>
          <CardBody className="flex">
            <div className="flex col justify-content-between">
              <Button onClick={() => removeProductImage(imageToRemove)} status="Danger" disabled={loading}>
                بله، حذف شود
              </Button>
              <Button onClick={() => setImageToRemove(null)} status="Info" disabled={loading}>
                انصراف
              </Button>
            </div>
            {<img className="mb-2" width="100px" height="100px" src={`${process.env.SRC}/${imageToRemove?.u}`} />}{" "}
          </CardBody>
        </Card>
      </Modal>

      <Modal on={!!videoToRemove} toggle={() => setVideoToRemove(null)}>
        <Card>
          <CardHeader>آیا از حذف ویدیو زیر اطمینان دارید؟</CardHeader>
          <CardBody className="flex col">
            <video
              controls
              className="mb-2 flex center"
              width="auto"
              height="auto"
              style={{
                objectFit: "contain",
                objectPosition: "center",
                maxWidth: "75vw",
                maxHeight: "75vh",
              }}
              src={preppend(videoToRemove?.u, "vid")}
            />

            <div style={{ display: "flex", gap: "1rem" }}>
              <Button onClick={() => setVideoToRemove(null)} status="Info">
                انصراف
              </Button>
              <Button onClick={() => removeProductVideo(videoToRemove)} status="Danger">
                بله، حذف شود
              </Button>
            </div>
          </CardBody>
        </Card>
      </Modal>

      <Modal on={showAddStockModal} toggle={() => setShowAddStockModal(false)}>
        <ModalBox style={{ width: "50vw", height: "90vh" }}>
          <StockForm callback={afterStockCreation} />
        </ModalBox>
      </Modal>

      <Modal on={stockToRemove} toggle={() => setStockToRemove(null)}>
        <ModalBox>
          آیا از حذف انبار شماره
          <Badge size="lg" mx="md">
            {stockToRemove?.id}
          </Badge>{" "}
          مربوط به محصول
          <Badge size="lg" mx="md">
            {product?.name}
          </Badge>{" "}
          با سایز
          <Badge size="lg" mx="md">
            {stockToRemove?.size}
          </Badge>
          اطمینان دارید؟
          <Flex gap="md" mt="md">
            <Button onClick={() => setStockToRemove(null)} disabled={loading}>
              انصراف
            </Button>
            <Button status="Danger" onClick={() => removeStock(stockToRemove?.id)} disabled={loading}>
              حذف
            </Button>
          </Flex>
        </ModalBox>
      </Modal>

      <Modal on={removeAllImageModal} toggle={() => setRemoveAllImagesModal(false)}>
        <ModalBox>
          آیا از حذف تمامی تصاویر محصول اطمینان دارید ؟
          <FlexContainer className="mt-3 flex justify-content-between">
            <Button onClick={() => setRemoveAllImagesModal(false)}>انصراف</Button>
            <Button status="Danger" onClick={removeAllImages}>
              بله، همگی حذف شوند
            </Button>
          </FlexContainer>
        </ModalBox>
      </Modal>
    </Layout>
  );
};
const Form = styled.form`
  input {
    min-width: 100%;
  }
`;

const Select = styled(_Select)`
  width: 100%;
`;

interface CardFamilyProps {
  overflow?: boolean;
}

const Card = styled(_Card)<CardFamilyProps>`
  overflow: ${(props) => props.overflow && "initial"};
  overflow: initial;
`;

const CardBody = styled(_CardBody)<CardFamilyProps>`
  overflow: initial;
`;

const CardHeader = styled(_CardHeader)<CardFamilyProps>`
  overflow: ${(props) => props.overflow && "initial"};
  overflow: initial;
`;
