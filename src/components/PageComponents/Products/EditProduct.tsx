import { admin, deleteProductMedia, editProduct, search_in, useStore } from 'utils';
import Layout from 'Layouts';
import {
  Card as _Card,
  CardBody as _CardBody,
  CardHeader as _CardHeader,
  Container,
  InputGroup,
  Modal,
  Select as _Select,
} from '@paljs/ui';
import { BasicEditor, Button, ProductImageCard, SearchBar } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Media, Product, ProductBrand, SearchForm } from 'types';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';

// TODO: add search brand mechanism

export const EditProductPage: React.FC = () => {
  const router = useRouter();

  const { product, brands, updateProductAfterMediaRemoval } = useStore((state: any) => ({
    product: state?.product,
    brands: state?.brands,
    updateProductAfterMediaRemoval: state?.updateProductAfterMediaRemoval,
  }));

  const brandsOptions = brands?.data?.data?.map((brand: ProductBrand) => ({
    label: brand?.name,
    value: brand,
  }));

  // const searchBrand = async (form: SearchForm) => {
  // const result = await search_in('brands', form, router.query, Cookies.get('token'));
  //   console.log(form);
  // };

  const { register, handleSubmit, control } = useForm({
    defaultValues: product,
  });

  const onSubmit = async (form: any) => {
    delete form?.brand;
    console.log({
      ...form,
      brand_id: form?.brand?.value.id,
    });
    // const response = await editProduct(product?.id, form);
    // if (response?.status === 'success') {
    //   toast.success('محصول بروز شد');
    // } else {
    //   toast.error('بروزرسانی محصول موفقیت آمیز نبود');
    // }
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }: any, status: any) => {
    console.log(file);
    if (status === 'done') {
      const formData = new FormData();
      formData.append('media[]', file);
      console.log(formData);
      axios
        .post(`${process.env.API}/admin/products/${product?.id}/image`, formData, {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        })
        .then((response) => {
          console.log(response);
          toast.success('تصویر با موفقیت آپلود شد');
        })
        .catch((error) => console.warn(error?.response?.data));
    }
  };

  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const removeProductMedia = async (media: Media) => {
    const response = await deleteProductMedia(
      router?.query?.product_id as string,
      media?.u,
      Cookies.get('token') ?? '',
    );
    if (response?.includes('operation done successfully')) {
      updateProductAfterMediaRemoval(media);
      setItemToRemove(null);
      toast.success('تصویر با موفقیت حذف شد');
    } else {
      toast.error('حذف تصویر موفیت آمیز نبود');
    }
  };

  return (
    <Layout title={`${product?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>محصول {product?.name}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>نام</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('name', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>کد</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('code')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>برند : {product?.brand?.name}</CardHeader>
          <CardBody>
            <InputGroup>
              <Controller
                name="brand"
                control={control}
                render={({ field }) => <Select options={brandsOptions} {...field} />}
              />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 style={{ marginBottom: '1rem' }}>
              تصاویر
              <span style={{ fontSize: '1rem' }}>
                ( برای اضافه کردن تصویر, از طریق ورودی زیر عکس مورد نظر را بارگذاری کنید )
              </span>
            </h3>
            <DropZoneWrapper>
              <Dropzone onChangeStatus={handleChangeStatus} accept="image/*,audio/*,video/*" inputContent="" />
            </DropZoneWrapper>
          </CardHeader>
          <CardBody
            style={{
              maxHeight: '100vh',
              overflow: 'scroll',
            }}
          >
            {[product?.site_main_picture, ...product?.media]?.map((media: Media, index: number) => (
              <ProductImageCard index={index} media={media} removalCallback={setItemToRemove} />
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>لینک محصول</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('url', { required: true })} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>عنوان</CardHeader>
          <CardBody>
            <InputGroup>
              <input {...register('title')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>قیمت</CardHeader>
          <CardBody>
            <InputGroup>
              <input type="number" {...register('price')} />
            </InputGroup>
          </CardBody>
        </Card>

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange } }) => (
            <BasicEditor initialValue={product?.description} callback={onChange} title="توضیحات محصول" />
          )}
        />

        <Card>
          <CardHeader>SEO</CardHeader>
          <CardBody></CardBody>
        </Card>

        <Button status="Info" type="submit" appearance="outline">
          بروزرسانی محصول
        </Button>
      </Form>

      {/* -===>>> Modals <<<===- */}
      <Modal on={!!itemToRemove} toggle={() => setItemToRemove((current: boolean) => !current)}>
        <Card>
          <CardHeader>
            آیا از حذف تصویر {<Image width="100px" height="100px" src={`${process.env.SRC}/${itemToRemove?.u}`} />}{' '}
            اطمینان دارید؟
          </CardHeader>
          <CardBody>
            <Button onClick={() => setItemToRemove(null)} status="Info">
              انصراف
            </Button>
            <Button onClick={() => removeProductMedia(itemToRemove)} status="Danger">
              بله، حذف شود
            </Button>
          </CardBody>
        </Card>
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
  overflow: ${(props) => props.overflow && 'initial'};
  overflow: initial;
`;

const CardBody = styled(_CardBody)<CardFamilyProps>`
  overflow: ${(props) => props.overflow && 'initial'};
  overflow: initial;
`;

const CardHeader = styled(_CardHeader)<CardFamilyProps>`
  overflow: ${(props) => props.overflow && 'initial'};
  overflow: initial;
`;

const DropZoneWrapper = styled.div`
  img {
    display: none;
  }
`;
