import { Accordion, Button, Divider, Flex, Modal, Text, Title } from "@mantine/core";
import { ConfirmButtons } from "components/Button";
import _ from "lodash";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { IMenu, TopSiteColumn, TopSiteMenu, TopSiteRow } from "types";
import { v4 } from "uuid";

interface ITopSiteMenuFormProps {
  menu: IMenu<TopSiteMenu>;
  callback: any;
  loading: boolean;
}
export function NewTopSiteMenuForm(props: ITopSiteMenuFormProps) {
  // <<<=====------ STATES ------=====>>>
  const [items, setItems] = useState(props.menu.items);
  const [itemToRemove, setItemToRemove] = useState<TopSiteMenu | null>(null);
  const [columnToRemove, setColumnToRemove] = useState<TopSiteColumn | null>(null);
  const [rowToRemove, setRowToRemove] = useState<TopSiteRow | null>(null);

  // <<<=====------ FUNCTIONS ------=====>>>
  function removeItem(itemToRemove: TopSiteMenu) {
    if (itemToRemove) {
      setItems((currentItems) => currentItems.filter((item) => !_.isEqual(item, itemToRemove)));
      toast.success(<Text>بخش "{itemToRemove.menuTitle}" حذف شد</Text>);
      setItemToRemove(null);
    }
  }

  // <<<=====------ JSX ------=====>>>
  return (
    <$>
      <Title>منوی بالای صفحه</Title>
      <Divider variant="dotted" size="lg" my="lg" />
      <Accordion>
        {/* <<<=====------ ITEMS ------=====>>> */}
        {items.map((item) => (
          <Accordion.Item value={v4()}>
            <AccordionControl title={item.menuTitle} deletionCallback={() => setItemToRemove(item)} />
            <Accordion.Panel>
              <Accordion>
                {/* <<<=====------ COLUMNS ------=====>>> */}
                {item.columns.map((column) => (
                  <Accordion.Item value={v4()}>
                    <AccordionControl
                      title={
                        <Text>
                          <strong>{item.menuTitle}</strong>
                          {" > "}
                          {column.columnTitle}
                        </Text>
                      }
                      deletionCallback={() => setColumnToRemove(column)}
                    />
                    <Accordion.Panel>
                      {/* <<<=====------ ROWS ------=====>>> */}
                      {column.rows.map((row) => (
                        <>
                          <Flex key={row.name} justify="space-between">
                            <a href={row.href} target="_blank">
                              {row.name}
                            </a>
                            <Flex>
                              <Button
                                type="button"
                                color="red"
                                variant="gradient"
                                gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                                onClick={() => setRowToRemove(row)}
                              >
                                حذف
                              </Button>
                            </Flex>
                          </Flex>
                          <Divider variant="dashed" my="md" color="dark" />
                        </>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* <<<=====------ MODALS ------=====>>> */}
      <Modal opened={!!itemToRemove} onClose={() => setItemToRemove(null)} centered>
        آیا از حذف بخش <strong>"{itemToRemove?.menuTitle}"</strong> اطمینان دارید؟
        <Divider size="xs" my="md" />
        <ConfirmButtons
          cancel={{ callback: () => setItemToRemove(null) }}
          confirm={{ callback: () => removeItem(itemToRemove!) }}
        />
      </Modal>
      <Divider variant="dotted" size="lg" my="lg" />
      <Button
        variant="gradient"
        onClick={() =>
          props.callback({
            ...props.menu,
            items,
          })
        }
      >
        اعمال تغییرات
      </Button>
    </$>
  );
}

interface IAccordionItemControlProps {
  title: ReactNode;
  deletionCallback: any;
}
function AccordionControl(props: IAccordionItemControlProps) {
  return (
    <Accordion.Control>
      <Flex justify="space-between">
        {props.title}
        <Flex gap="md">
          <Button
            color="red"
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            onClick={props.deletionCallback}
          >
            حذف
          </Button>
        </Flex>
      </Flex>
    </Accordion.Control>
  );
}

const $ = styled.div`
  width: 100%;
`;
