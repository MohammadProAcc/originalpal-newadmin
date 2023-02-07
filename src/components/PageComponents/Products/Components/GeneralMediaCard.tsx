import { ActionIcon, Button, Card, Group, Image, LoadingOverlay, NumberInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNonInitialEffect } from "hooks";
import { ReactNode } from "react";
import { FreeMedia } from "types";
import { preppend } from "utils";

interface IGeneralMediaCardProps {
  media: FreeMedia;
  title: ReactNode;
  callback: {
    deletion?: (media: FreeMedia) => unknown;
    updation: (media: FreeMedia) => unknown;
    upload?: (media: FreeMedia) => unknown;
  };
  loading?: boolean;
}
export function GeneralMediaCard(props: IGeneralMediaCardProps) {
  const mediaForm = useForm<FreeMedia>({
    initialValues: props.media,
  });

  useNonInitialEffect(() => {
    mediaForm.resetDirty();
    mediaForm.resetTouched();
  }, [props.media]);

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder w="20rem" pos="relative">
      {props.loading && <LoadingOverlay visible={props.loading} />}
      <Card.Section sx={{ figure: { display: "flex", justifyContent: "center" }, position: "relative" }}>
        <Image src={preppend(props.media.url, "med")} height={160} alt="main picture" />

        {props.callback.deletion && (
          <ActionIcon
            color="red"
            variant="light"
            pos="absolute"
            top="0.5rem"
            left="0.75rem"
            sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            onClick={() => props.callback.deletion?.(props.media)}
          >
            ❌
          </ActionIcon>
        )}
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        {typeof props.title === "string" ? <Text weight={500}>{props.title}</Text> : props.title}
      </Group>

      <hr />

      <form onSubmit={mediaForm.onSubmit(props.callback.updation)}>
        <TextInput defaultValue={props.media?.meta?.a} label="alt" {...mediaForm.getInputProps("meta.a")} />
        <TextInput defaultValue={props.media?.meta?.t} label="title" {...mediaForm.getInputProps("meta.t")} />
        <NumberInput defaultValue={props.media?.meta?.p} label="ترتیب" {...mediaForm.getInputProps("meta.p")} />

        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          type="submit"
          disabled={!(mediaForm.isDirty("meta.a") || mediaForm.isDirty("meta.t") || mediaForm.isDirty("meta.p"))}
        >
          بروزرسانی اطلاعات
        </Button>
      </form>
    </Card>
  );
}
