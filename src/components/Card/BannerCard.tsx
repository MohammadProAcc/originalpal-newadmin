import { Badge, Button, Card, Divider, Group, Image, Space, Text } from "@mantine/core";
import { IBanner } from "types";
import { preppend } from "utils";

interface IBannerCardProps {
  banner: IBanner;
}
export function BannerCard(props: IBannerCardProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={preppend(props.banner.media.u)}
          width={480}
          height="auto"
          alt={props.banner.media.a}
          title={props.banner.media.t}
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text color={props.banner.title_color} weight={500}>
          {props.banner.title}
        </Text>
      </Group>

      <Text color={props.banner.content_color} size="sm">
        {props.banner.content}
      </Text>

      <Divider variant="dashed" my="md" />

      <Group position="apart" mt="md" mb="xs">
        <Text color={props.banner.button_bg_color} weight={500} fw="bolder">
          رنگ پس زمینه دکمه
        </Text>
        <Text color={props.banner.button_color} weight={500} fw="bolder">
          رنگ متن دکمه
        </Text>
      </Group>
    </Card>
  );
}
