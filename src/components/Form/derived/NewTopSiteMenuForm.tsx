import {
  Accordion,
  ActionIcon,
  Box,
  Button,
  ButtonProps,
  Divider,
  Flex,
  Loader,
  LoadingOverlay,
  Modal,
  Radio,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { ConfirmButtons } from "components/Button";
import { useNonInitialEffect } from "hooks";
import _ from "lodash";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  FreeMedia,
  IMenu,
  initialTopSiteMenu,
  initialTopSiteMenuColumn,
  TopSiteColumn,
  TopSiteMenu,
  TopSiteRow,
} from "types";
import { deleteMedia, preppend, updateMedia, uploadMediaFile } from "utils";
import { v4 } from "uuid";

interface ITopSiteMenuFormProps {
  menu: IMenu<TopSiteMenu>;
  callback: any;
  loading: boolean;
}
export function NewTopSiteMenuForm(props: ITopSiteMenuFormProps) {
  // <<<=====------ STATES ------=====>>>
  const [items, setItems] = useState<TopSiteMenu[]>(props.menu.items);
  const [innerLoading, setInnerLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState<TopSiteMenu | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<TopSiteColumn | null>(null);
  const [selectedRow, setSelectedRow] = useState<TopSiteRow | null>(null);

  const [activeForm, setActiveForm] = useState<"item" | "column" | "row" | null>(null);

  const [itemToRemove, setItemToRemove] = useState<TopSiteMenu | null>(null);
  const [columnToRemove, setColumnToRemove] = useState<TopSiteColumn | null>(null);
  const [rowToRemove, setRowToRemove] = useState<TopSiteRow | null>(null);

  // <<<=====------ FORMS ------=====>>>
  const itemForm = useForm();

  const columnForm = useForm();

  const rowForm = useForm();

  // <<<=====------ FUNCTIONS ------=====>>>
  function resetAll() {
    setActiveForm(null);
    setSelectedItem(null);
    setSelectedColumn(null);
    setSelectedRow(null);
    itemForm.reset();
    columnForm.reset();
    rowForm.reset();
  }

  async function changeColumnMedia(file: File | undefined) {
    if (file) {
      setInnerLoading(true);
      try {
        const response = await uploadMediaFile(file);
        columnForm.setValue("thumb", response?.data.data);
        toast.success("تصویر ستون بروز شد");
      } catch (err) {
        toast.error("بروزرسانی تصویر ستون موفقیت آمیز نبود");
      } finally {
        setInnerLoading(false);
      }
    }
  }

  async function removeColumnMedia(media: FreeMedia) {
    setInnerLoading(true);
    try {
      await deleteMedia(media.id);
      setItems((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          columns: item.columns.map((column) => ({
            ...column,
            thumb: _.isEqual(column, selectedColumn) ? null : column.thumb,
          })),
        })),
      );
      columnForm.setValue("thumb", null);
      // FIXME:
      toast.success(
        <Text>
          تصویر ستون <strong>"{selectedColumn?.columnTitle}"</strong>حذف شد
        </Text>,
      );
    } catch (err) {
      // FIXME:
      toast.error("حذف تصویر ستون موفقیت آمیز نبود");
    } finally {
      setInnerLoading(false);
    }
  }

  async function updateColumnMedia(media: FreeMedia) {
    setInnerLoading(true);
    try {
      const response = await updateMedia(media.id, media);
      setItems((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          columns: item.columns.map((column) => ({
            ...column,
            thumb: _.isEqual(column, selectedColumn) ? response?.data.data : column.thumb,
          })),
        })),
      );
      // FIXME:
      toast.success("تصویر ستون بروزرسانی شد");
    } catch (err) {
      // FIXME:
      toast.error("حذف تصویر ستون موفقیت آمیز نبود");
    } finally {
      setInnerLoading(false);
    }
  }

  function onSubmitItem(form: TopSiteMenu) {
    if (selectedItem) {
      setItems((currentItems) => currentItems.map((item) => (item.menuTitle === selectedItem.menuTitle ? form : item)));
      toast.success(<Text>بخش {selectedItem.menuTitle} بروزرسانی شد</Text>);
    } else {
      setItems((currentItems) => [...currentItems, { ...initialTopSiteMenu, ...form }]);
      toast.success(<Text>بخش {form.menuTitle} افزوده شد</Text>);
    }
    resetAll();
  }

  function onSubmitColumn(form: TopSiteColumn) {
    const { footerExistance, ...finalForm } = form as any;
    if (footerExistance === "false") {
      finalForm.footer = false;
    } else {
      finalForm.footer = form.footer;
    }

    if (selectedColumn) {
      setItems((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          columns: item.columns.map((column) => (_.isEqual(column, selectedColumn) ? finalForm : column)),
        })),
      );
      // FIXME:
      toast.success(<Text>ستون {selectedColumn.columnTitle} بروزرسانی شد</Text>);
    } else {
      setItems((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          columns: [...item.columns, { ...initialTopSiteMenuColumn, ...finalForm }],
        })),
      );
      // FIXME:
      toast.success(<Text>ستون {finalForm.columnTitle} افزوده شد</Text>);
    }
    resetAll();
  }
  function onSubmitRow(form: TopSiteRow) {
    if (selectedRow) {
      setItems((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          columns: item.columns.map((column) => ({
            ...column,
            rows: column.rows.map((row) => (_.isEqual(row, selectedRow) ? form : row)),
          })),
        })),
      );
      toast.success(
        <Text>
          لینک <strong>"{selectedRow.name}"</strong>بروز شد
        </Text>,
      );
    } else {
      setItems((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          columns: item.columns.map((column) => ({
            ...column,
            rows: [...column.rows, form],
          })),
        })),
      );
      toast.success(
        <Text>
          لینک <strong>"{form.name}"</strong> افزوده شد
        </Text>,
      );
    }
    resetAll();
  }

  function removeItem(itemToRemove: TopSiteMenu) {
    if (itemToRemove) {
      setItems((currentItems) => currentItems.filter((item) => !_.isEqual(item, itemToRemove)));
      toast.success(<Text>بخش "{itemToRemove.menuTitle}" حذف شد</Text>);
      setItemToRemove(null);
    }
  }

  function removeColumn(columnToRemove: TopSiteColumn) {
    if (columnToRemove) {
      setItems((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          columns: item.columns.filter((column) => !_.isEqual(column, columnToRemove)),
        })),
      );
      toast.success(
        <Text>
          ستون "{columnToRemove.columnTitle}" از بخش "{selectedItem?.menuTitle}" حذف شد
        </Text>,
      );
      setSelectedItem(null);
      setColumnToRemove(null);
    }
  }

  function removeRow(rowToRemove: TopSiteRow) {
    if (rowToRemove) {
      setItems((currentItems) =>
        currentItems.map((item) => ({
          ...item,
          columns: item.columns.map((column) => ({
            ...column,
            rows: column.rows.filter((row) => !_.isEqual(row, rowToRemove)),
          })),
        })),
      );
      toast.success(
        <Text>
          لینک{" "}
          <strong>
            "<a>{rowToRemove?.name}</a>"
          </strong>
          از ستون
          <strong>
            "<a>{selectedColumn?.columnTitle}</a>"
          </strong>
          از بخش
          <strong>
            "<a>{selectedItem?.menuTitle}</a>"
          </strong>
          حذف شد
        </Text>,
      );
      setSelectedItem(null);
      setSelectedColumn(null);
      setRowToRemove(null);
    }
  }

  // <<<=====------ Effects ------=====>>>
  useNonInitialEffect(() => {
    if (!activeForm) {
      resetAll();
    }
  }, [activeForm]);

  // <<<=====------ JSX ------=====>>>
  return (
    <$>
      <LoadingOverlay visible={props.loading} />
      <Flex align="center" gap="md">
        <Title>منوی بالای صفحه</Title>
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          onClick={() => setActiveForm("item")}
        >
          افزودن بخش
        </Button>
      </Flex>
      <Divider variant="dotted" size="lg" my="lg" />
      <Accordion>
        {/* <<<=====------ ITEMS ------=====>>> */}
        {items.map((item) => (
          <Accordion.Item value={v4()}>
            <AccordionControl
              title={item.menuTitle}
              buttonProps={{
                variant: "outline",
                color: "indigo",
              }}
              deletionCallback={() => setItemToRemove(item)}
              updationCallback={() => {
                setSelectedItem(item);
                Object.entries(item).forEach(([key, value]) => {
                  itemForm.setValue(key, value);
                });
                setActiveForm("item");
              }}
              creation={{
                title: "افزودن ستون",
                callback: () => {
                  setSelectedItem(item);
                  setActiveForm("column");
                },
              }}
            />
            <Accordion.Panel>
              <Accordion>
                {/* <<<=====------ COLUMNS ------=====>>> */}
                {item.columns.map((column) => (
                  <Accordion.Item value={v4()}>
                    <AccordionControl
                      title={<Text>{column.columnTitle}</Text>}
                      buttonProps={{
                        variant: "outline",
                      }}
                      deletionCallback={() => {
                        setSelectedItem(item);
                        setColumnToRemove(column);
                      }}
                      updationCallback={() => {
                        setSelectedItem(item);
                        setSelectedColumn(column);
                        Object.entries(column).forEach(([key, value]) => {
                          columnForm.setValue(key, value);
                        });
                        columnForm.setValue("footerExistance", String(!!columnForm.getValues("footer")));
                        setActiveForm("column");
                      }}
                      creation={{
                        title: "افزودن لینک",
                        callback: () => {
                          setSelectedItem(item);
                          setSelectedColumn(column);
                          setActiveForm("row");
                        },
                      }}
                    />
                    <Accordion.Panel>
                      {/* <<<=====------ ROWS ------=====>>> */}
                      {column.rows.map((row, index) => (
                        <>
                          {index === 0 && <Space mt="sm" />}
                          <Flex key={row.name} justify="space-between">
                            <a href={row.href} target="_blank">
                              {row.name}
                            </a>
                            <Flex gap="md">
                              <Button
                                type="button"
                                variant="outline"
                                color="teal"
                                onClick={() => {
                                  setSelectedItem(item);
                                  setSelectedColumn(column);
                                  setRowToRemove(row);
                                }}
                              >
                                حذف
                              </Button>
                              <Button
                                variant="outline"
                                color="teal"
                                onClick={() => {
                                  setSelectedItem(item);
                                  setSelectedColumn(column);
                                  setSelectedRow(row);
                                  Object.entries(row).forEach(([key, value]) => {
                                    rowForm.setValue(key, value);
                                  });
                                  setActiveForm("row");
                                }}
                              >
                                ویرایش
                              </Button>
                              <Divider ml="2.5rem" />
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
      {/* REMOVE ITEM */}
      <Modal
        opened={!!itemToRemove}
        onClose={() => setItemToRemove(null)}
        centered
        styles={{ root: { width: "75vw" } }}
      >
        آیا از حذف بخش <strong>"{itemToRemove?.menuTitle}"</strong> اطمینان دارید؟
        <Divider size="xs" my="md" />
        <ConfirmButtons
          cancel={{ callback: () => setItemToRemove(null) }}
          confirm={{ callback: () => removeItem(itemToRemove!) }}
        />
      </Modal>

      {/* REMOVE COLUMN */}
      <Modal
        opened={!!columnToRemove}
        onClose={() => setColumnToRemove(null)}
        centered
        styles={{ root: { width: "75vw" } }}
      >
        آیا از حذف ستون <strong>"{columnToRemove?.columnTitle}"</strong> از بخش{" "}
        <strong>"{selectedItem?.menuTitle}"</strong> اطمینان دارید؟
        <Divider size="xs" my="md" />
        <ConfirmButtons
          cancel={{
            callback: () => {
              setSelectedItem(null);
              setColumnToRemove(null);
            },
          }}
          confirm={{
            callback: () => {
              removeColumn(columnToRemove!);
            },
          }}
        />
      </Modal>

      {/* REMOVE ROW */}
      <Modal opened={!!rowToRemove} onClose={() => setRowToRemove(null)} centered styles={{ root: { width: "75vw" } }}>
        آیا از حذف لینک{" "}
        <strong>
          "
          <a href={rowToRemove?.href} target="_blank">
            {rowToRemove?.name}
          </a>
          "
        </strong>{" "}
        از ستون <strong>"{selectedColumn?.columnTitle}"</strong> از بخش <strong>"{selectedItem?.menuTitle}"</strong>{" "}
        اطمینان دارید؟
        <Divider size="xs" my="md" />
        <ConfirmButtons
          cancel={{
            callback: () => {
              setSelectedItem(null);
              setSelectedColumn(null);
              setRowToRemove(null);
            },
          }}
          confirm={{
            callback: () => {
              removeRow(rowToRemove!);
            },
          }}
        />
      </Modal>

      {/* UPDATE ITEM */}
      <Modal
        opened={activeForm === "item"}
        onClose={() => setActiveForm(null)}
        centered
        styles={{ root: { width: "75vw" } }}
      >
        <Text>
          {selectedItem ? (
            <Text>
              ویرایش بخش <strong>"{selectedItem.menuTitle}"</strong>
            </Text>
          ) : (
            <Text>افزودن بخش جدید</Text>
          )}
        </Text>
        <Divider variant="dashed" my="md" />
        {activeForm === "item" && (
          <Form onSubmit={itemForm.handleSubmit(onSubmitItem)}>
            <label>
              عنوان بخش :
              <input {...itemForm.register("menuTitle", { required: true })} />
            </label>
            <label>
              لینک عنوان بخش :
              <input {...itemForm.register("href", { required: true })} />
            </label>
            <label>
              برجسته :
              <input {...itemForm.register("bold")} type="checkbox" />
            </label>
            <label>
              دارای پاورقی :
              <input {...itemForm.register("footer")} type="checkbox" />
            </label>
            <Button variant="light" type="submit">
              {selectedItem ? "بروزرسانی" : "افزودن"} بخش
            </Button>
          </Form>
        )}
      </Modal>

      {/* UPDATE COLUMN */}
      <Modal opened={activeForm === "column"} onClose={() => setActiveForm(null)} centered size="auto">
        <Text>
          {selectedColumn ? (
            <Text>
              ویرایش ستون <strong>"{selectedColumn.columnTitle}"</strong> از بخش{" "}
              <strong>"{selectedItem?.menuTitle}"</strong>
            </Text>
          ) : (
            <Text>
              افزودن ستون جدید به بخش <strong>"{selectedItem?.menuTitle}"</strong>
            </Text>
          )}
        </Text>
        <Divider variant="dashed" my="md" />
        <Form onSubmit={columnForm.handleSubmit(onSubmitColumn)} style={{ width: "50vw" }}>
          <label>
            عنوان ستون :
            <input {...columnForm.register("columnTitle", { required: true })} />
          </label>
          <label>
            لینک عنوان ستون :
            <input {...columnForm.register("href", { required: true })} />
          </label>
          <label>
            ستون برگزیده :
            <input {...columnForm.register("highlight")} type="checkbox" />
          </label>

          <Divider label="تصویر ستون" variant="dashed" />

          <label>
            <input onChange={(e) => changeColumnMedia(e.target.files?.[0])} type="file" placeholder="بارگذاری تصویر" />
            {innerLoading && <Loader />}
          </label>
          {columnForm.watch("thumb") && (
            <Flex direction="column" gap="xs">
              <Box sx={{ position: "relative" }}>
                <ActionIcon
                  color="red"
                  variant="light"
                  pos="absolute"
                  top="0.5rem"
                  left="0.75rem"
                  sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  onClick={
                    // () => columnForm.setValue("thumb", null)
                    () => removeColumnMedia(columnForm.getValues("thumb"))
                  }
                >
                  ❌
                </ActionIcon>

                <img
                  src={preppend(columnForm.watch("thumb")?.url, "med")}
                  width="192"
                  height="108"
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <label style={{ justifyContent: "flex-start", alignItems: "center" }}>
                <input {...columnForm.register("thumb.meta.a")} /> <Space mx="md" /> alt
              </label>
              <label style={{ justifyContent: "flex-start", alignItems: "center" }}>
                <input {...columnForm.register("thumb.meta.t")} /> <Space mx="md" /> title
              </label>
            </Flex>
          )}

          <Divider label="پاورقی" variant="dashed" />

          <Controller
            name="footerExistance"
            control={columnForm.control}
            render={({ field }) => (
              <Radio.Group {...field} defaultValue={String(!!columnForm.getValues("footer"))}>
                <Radio value="false" label="پاورقی ندارد" />
                <Radio value="true" label="پاورقی دارد" />
              </Radio.Group>
            )}
          />

          {columnForm.watch("footerExistance") === "true" && (
            <>
              <label>
                عنوان لینک پاورقی :
                <input {...columnForm.register("footer.name", { required: true })} />
              </label>
              <label>
                لینک پاورقی :
                <input {...columnForm.register("footer.href", { required: true })} />
              </label>
              <label>
                پاورقی برجسته :
                <input {...columnForm.register("footer.bold")} type="checkbox" />
              </label>
            </>
          )}
          <Button variant="light" type="submit">
            {selectedItem ? "بروزرسانی" : "افزودن"} ستون
          </Button>
        </Form>
      </Modal>

      {/* UPDATE ROW */}
      <Modal
        opened={activeForm === "row"}
        onClose={() => setActiveForm(null)}
        centered
        styles={{ root: { width: "75vw" } }}
      >
        <Text>
          {selectedRow ? (
            <Text>
              ویرایش لینک <strong>"{selectedRow.name}"</strong> از ستون <strong>"{selectedColumn?.columnTitle}"</strong>{" "}
              بخش <strong> "{selectedItem?.menuTitle}"</strong>
            </Text>
          ) : (
            <Text>
              افزودن لینک جدید به ستون <strong>"{selectedColumn?.columnTitle}"</strong> بخش{" "}
              <strong>"{selectedItem?.menuTitle}"</strong>
            </Text>
          )}
        </Text>
        <Divider variant="dashed" my="md" />
        <Form onSubmit={rowForm.handleSubmit(onSubmitRow)}>
          <label>
            عنوان لینک :
            <input {...rowForm.register("name", { required: true })} />
          </label>
          <label>
            لینک :
            <input {...rowForm.register("href", { required: true })} />
          </label>
          <label>
            برجسته :
            <input {...rowForm.register("bold", { required: true })} type="checkbox" />
          </label>
          <Button variant="light" type="submit">
            {selectedRow ? "بروزرسانی" : "افزودن"} لینک
          </Button>
        </Form>
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
  updationCallback: any;
  creation?: {
    title: string;
    callback: any;
  };
  buttonProps?: ButtonProps;
}
function AccordionControl(props: IAccordionItemControlProps) {
  return (
    <Accordion.Control>
      <Flex justify="space-between">
        {props.title}
        <Flex gap="md">
          <Button
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            onClick={props.deletionCallback}
            {...props.buttonProps}
          >
            حذف
          </Button>
          {!!props.creation && (
            <Button
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              onClick={props.creation.callback}
              {...props.buttonProps}
            >
              {props.creation.title}
            </Button>
          )}
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
            onClick={props.updationCallback}
            {...props.buttonProps}
          >
            ویرایش
          </Button>
        </Flex>
      </Flex>
    </Accordion.Control>
  );
}

const $ = styled.div`
  width: 100%;

  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    justify-content: space-between;
  }
`;
