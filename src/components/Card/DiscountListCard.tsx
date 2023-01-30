import { Flex, Text } from "@mantine/core";
import { InputGroup as _InputGroup } from "@paljs/ui";
import { DatePickerButtonLike } from "components/Input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import _Select from "react-select";
import styled from "styled-components";
import { Product, Stock } from "types";
import { numeralize, truncateString } from "utils";

const percentageSelectOptions = [
  { label: "درصدی", value: "percent" },
  { label: "نقدی", value: "cash" },
];

export function DiscountListCard(props: DiscountListCardProps) {
  const [product, setProduct] = useState<Product | null>(props.stock.product);
  const fieldName = `${props.stock.id}:${props.stock.product_id}`;

  const formMethods = useFormContext();

  function discountMutationObserver(input: Date | number) {
    if (typeof input === "number") {
      formMethods.setValue(fieldName, {
        ...props.stock,
        ...formMethods.getValues(fieldName),
        discount_amout: input,
      });
    } else {
      formMethods.setValue(fieldName, {
        ...props.stock,
        ...formMethods.getValues(fieldName),
        discount_end: input,
      });
    }
  }

  function discountStartMutation(input: Date) {
    formMethods.setValue(fieldName, {
      ...props.stock,
      ...formMethods.getValues(fieldName),
      discount_start: input,
    });
  }

  function discountTypeMutationObserver(e: any) {
    formMethods.setValue(fieldName, { ...props.stock, ...formMethods.getValues(fieldName), discount_type: e.value });
  }

  return (
    <Li title={props.stock.product?.name}>
      <Flex direction="column" gap="md">
        <strong className="strong">
          <span className="product-id nowrap">محصول :‌ {props.stock.product_id}</span>
        </strong>
        <span className="product-id nowrap">انبار :‌ {props.stock.id}</span>
      </Flex>

      <ImageContainer>
        <ProductImage src={`${process.env.SRC}/${product?.site_main_picture?.u}`} />
      </ImageContainer>
      <Flex
        style={{ width: "8rem", height: "100%", alignSelf: "flex-start" }}
        title={product?.name}
        align="center"
        // justify="center"
      >
        <strong style={{ fontSize: "1.5rem" }}>{props.stock.size}</strong>
      </Flex>
      <div className="col price date">
        <Flex direction="column" style={{ width: "9rem" }} gap="xs">
          <Text>قیمت :</Text>{" "}
          <span>
            <strong>{numeralize(props.stock?.price ?? 0)}</strong> تومان
          </span>
        </Flex>
        <FlexBox col>
          <span className="mb-1">شروع : </span>
          <DatePickerButtonLike
            onChange={discountStartMutation}
            value={formMethods.watch(fieldName)?.discount_start ?? props.stock.discount_start ?? "-"}
          />
        </FlexBox>
        <FlexBox col>
          <span className="mb-1">پایان : </span>
          <DatePickerButtonLike
            onChange={discountMutationObserver}
            value={formMethods.watch(fieldName)?.discount_end ?? props.stock.discount_end ?? "-"}
          />{" "}
        </FlexBox>
      </div>
      <div className="col price discount">
        <FlexBox className="discount">
          <InputGroup column>
            <label>نوع :</label>
            <Select
              options={percentageSelectOptions}
              onChange={discountTypeMutationObserver}
              defaultValue={percentageSelectOptions.find((item) => item.value === props.stock.discount_type)}
            />
          </InputGroup>

          <InputGroup column>
            <label>مقدار :</label>
            <input
              defaultValue={props.stock?.discount_amout}
              type="number"
              onChange={(e) => discountMutationObserver(+e.target.value)}
            />
          </InputGroup>
        </FlexBox>
      </div>
    </Li>
  );
}

interface DiscountListCardProps {
  stock: Stock;
}

const Li = styled.li`
  width: 100%;
  height: 5rem;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;

  list-style: none;

  .col {
    &.info {
      max-width: 12rem;
    }
    &.price {
      &.date {
        display: flex;
        flex-direction: row;
        column-gap: 1rem;
      }

      &.discount {
        max-width: 20rem;
        height: 100%;
      }
    }
    flex-direction: column;
    display: inline-flex;
    justify-content: space-around;
  }
  .strong {
    font-size: 1rem;
    font-weight: 900;
    text-decoration: underline;
  }

  .nowrap {
    white-space: nowrap;
  }

  .product-id {
    display: inline-block;
  }

  .product-name {
    display: inline-block;

    max-width: 30%;
    margin-left: auto;
  }

  input[type="number"] {
    max-width: 10rem;
  }

  input[type="date"] {
    height: 1.5rem;
    padding: 0;
    margin-top: 0.125rem;
  }

  > * {
    flex: 1;
  }
`;

const ImageContainer = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 6rem;
  height: 100%;
  margin-left: 1rem;

  object-fit: cover;
`;

const Select = styled(_Select)`
  height: 2rem;
`;

const FlexBox = styled.div<{ col?: boolean }>`
  &.discount {
    min-width: 40rem;
  }

  &.price {
    white-space: nowrap;

    strong {
      margin: 0 0.25rem;
      font-weight: bolder;
    }
  }

  display: flex;
  flex-direction: ${(props) => props.col && "column"};
`;

const InputGroup = styled(_InputGroup)<{ column?: boolean }>`
  display: flex;
  flex-direction: ${(props) => props.column && "column"};
`;
