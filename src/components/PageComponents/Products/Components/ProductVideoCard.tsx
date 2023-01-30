import { ActionIcon, Badge, Button, Card, Group, LoadingOverlay, NumberInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Media } from "types";
import { preppend, editProductVideo, useStore } from "utils";

interface ProductVideoCardProps {
  media: Media;
  removalCallback: Function;
  index: number;
  updateCallback: () => Promise<any>;
  productId: number;
}
export const ProductVideoCard: React.FC<ProductVideoCardProps> = ({
  media,
  removalCallback,
  updateCallback,
  index,
  productId,
}) => {
  const [loading, setLoading] = useState(false);

  const videoForm = useForm({
    initialValues: {
      a: media?.a,
      t: media?.t,
      p: media?.p,
      s: media?.s,
      u: media?.u,
    },
  });

  const onSubmit = async (form: any) => {
    setLoading(true);

    let response: any;

    response = await editProductVideo(productId, form);

    if (response.status === "success") {
      updateCallback().then(() => {
        toast.success("اطلاعات ویدیو با موفقیت بروز شد");
        setLoading(false);
      });
    } else {
      toast.error("بروزرسانی اطلاعات ویدیو موفقیت آمیز نبود");
      setLoading(false);
    }
  };

  return (
    // <Card style={{ maxHeight: '40rem' }}>
    //   <CardHeader style={{ position: 'relative' }}>
    //     <Alert status="Info">ویدیو شماره {index}</Alert>
    //   </CardHeader>
    //   <CardBody style={{ display: 'flex', position: 'relative' }}>
    //     {media === null ? (
    //       <></>
    //     ) : (
    //       <>
    //         <Button
    //           style={{
    //             padding: '0.125rem',
    //             position: 'absolute',
    //             top: '1rem',
    //             left: '1rem',
    //           }}
    //           status="Danger"
    //           appearance="outline"
    //           onClick={() => removalCallback(media)}
    //         >
    //           <Close />
    //         </Button>
    //         <Container>
    //           <Form onSubmit={handleSubmit(onSubmit)}>
    //             <InputGroup>
    //               <label>وضعیت نمایش</label>
    //               <input {...register('s')} placeholder="وضعیت نمایش" />
    //             </InputGroup>

    //             <InputGroup>
    //               <label>اولویت</label>
    //               <input {...register('p')} placeholder="اولویت" />
    //             </InputGroup>

    //             <InputGroup>
    //               <label>تگ alt</label>
    //               <input {...register('a')} placeholder="تگ alt" />
    //             </InputGroup>

    //             <InputGroup>
    //               <label>تگ title</label>
    //               <input {...register('t')} placeholder="تگ title" />
    //             </InputGroup>

    //             <Button disabled={loading} type="submit" status="Info" appearance="outline">
    //               بروزرسانی تصویر
    //             </Button>
    //           </Form>
    //         </Container>
    //         <InputGroup
    //           style={{
    //             width: '100%',
    //             marginLeft: '3rem',
    //             display: 'flex',
    //             justifyContent: 'flex-end',
    //           }}
    //         >
    //           <ProductVideo controls src={`${process.env.VID_SRC}/${media?.u}`} />
    //         </InputGroup>
    //       </>
    //     )}
    //   </CardBody>
    // </Card>
    <Card shadow="sm" p="lg" pt="0" radius="md" withBorder w="20rem" pos="relative">
      <LoadingOverlay visible={loading} />
      <Card.Section sx={{ figure: { display: "flex", justifyContent: "center" }, position: "relative" }}>
        <ProductVideo controls src={preppend(media?.u, "vid")} />

        <ActionIcon
          color="red"
          variant="light"
          pos="absolute"
          top="0.5rem"
          left="0.75rem"
          sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          onClick={() => removalCallback(media)}
        >
          ❌
        </ActionIcon>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>ویدیو شماره {index}</Text>

        {index === 0 && (
          <Badge color="teal" variant="light">
            ویدیو اصلی
          </Badge>
        )}
      </Group>

      <hr />

      <form onSubmit={videoForm.onSubmit(onSubmit)}>
        <TextInput defaultValue={media?.a} label="alt ویدیو" {...videoForm.getInputProps("a")} />
        <TextInput defaultValue={media?.t} label="title ویدیو" {...videoForm.getInputProps("t")} />
        <NumberInput defaultValue={media?.p} label="ترتیب" {...videoForm.getInputProps("p")} />

        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          type="submit"
          disabled={!(videoForm.isDirty("a") || videoForm.isDirty("t") || videoForm.isDirty("p"))}
        >
          بروزرسانی اطلاعات ویدیو
        </Button>
      </form>
    </Card>
  );
};

const ProductVideo = styled.video`
  width: 20rem;
  height: 16rem;

  object-fit: contain;

  object-fit: cover;
`;
