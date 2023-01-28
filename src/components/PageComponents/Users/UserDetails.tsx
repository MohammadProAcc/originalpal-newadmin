import { Badge, Collapse, Divider, Flex, Space, Text } from "@mantine/core";
import { Button, Card as _Card, CardBody, CardHeader } from "@paljs/ui";
import { Form, InputGroup } from "components";
import Layout from "Layouts";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import { UserDetails } from "types";
import { $_search_user_details, reqSucceed, translator } from "utils";

// TODO: complete the component
export function UserDetailsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();

  const { register, handleSubmit } = useForm();

  async function onSearch(form: any) {
    setLoading(true);
    const response = await $_search_user_details(form.q);
    if (reqSucceed(response)) {
      setResult((response as any).data.data);
    } else {
      toast.error("جستجو موفقیت آمیز نبود");
    }
    setLoading(false);
  }

  return (
    <Layout title="جزئیات کاربر">
      <Form onSubmit={handleSubmit(onSearch)}>
        <InputGroup fullWidth>
          <input placeholder="جستجو..." {...register("q")} />
          <Button disabled={loading} status="Success">
            جستجو
          </Button>
        </InputGroup>
      </Form>

      <UsersList>
        {result?.map((_user: UserDetails) => (
          <UserItem>
            <Card>
              <CardHeader>
                {_user.id} - <strong>{_user.name}</strong> - {_user.phone}
              </CardHeader>
              <Card>
                <CardHeader>سفارشات</CardHeader>
                <CardBody>
                  {_user.orders.length > 0 ? (
                    _user.orders.map((_order) => (
                      <Flex>
                        <Text>سفارش {_order.id}</Text>
                        <Space mx="md" />
                        <Link href={`/orders/${_order.id}`} passHref>
                          <a target="_blank">
                            <Badge color="cyan">مشاهده</Badge>
                          </a>
                        </Link>
                      </Flex>
                    ))
                  ) : (
                    <Badge color="red">سفارشی وجود ندارد </Badge>
                  )}
                </CardBody>
              </Card>

              <Card>
                <CardHeader>آدرس ها</CardHeader>
                <CardBody>
                  {_user.addresses.length > 0 ? (
                    _user.addresses.map((_address, index, array) => (
                      <>
                        <Flex>
                          <Text>نشانی {_address.id}</Text>
                          <Space mx="md" />
                          <Link href={`/addresses/${_address.id}`} passHref>
                            <a target="_blank">
                              <Badge color="cyan">مشاهده</Badge>
                            </a>
                          </Link>
                        </Flex>
                        {index < array.length - 1 && <Divider variant="dashed" my="md" />}
                      </>
                    ))
                  ) : (
                    <Badge color="red">آدرسی وجود ندارد</Badge>
                  )}
                </CardBody>
              </Card>
            </Card>
          </UserItem>
        ))}
      </UsersList>
    </Layout>
  );
}

const UsersList = styled.ul`
  margin-top: 1rem;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const UserItem = styled.li`
  padding-top: 0.5rem;

  display: flex;

  strong {
    font-size: 1.5rem;
    font-weight: 900;
  }
`;

const Card = styled(_Card)`
  width: 100%;
`;

const CollapseHeader = styled(CardHeader).attrs({
  status: "Info",
})`
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const CollapseCard = (props: { header: any; children: any }) => {
  // TODO: complete order item
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <CollapseHeader onClick={() => setOpen((_state) => !_state)}>{props.header}</CollapseHeader>
      <CardBody>
        <Collapse in={open}>{props.children}</Collapse>
      </CardBody>
    </Card>
  );
};
