import { Flex, Text } from "@mantine/core";
import { InputGroup as _InputGroup } from "@paljs/ui";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import _Select from "react-select";
import styled from "styled-components";
import { Product, Stock } from "types";

export function PriceListCard(props: DiscountListCardProps) {
  const [product, setProduct] = useState<Product | null>(props.stock.product);
  const fieldName = `${props.stock.id}:${props.stock.product_id}`;

  const formMethods = useFormContext();

  function setNewPrice(e: any) {
    formMethods.setValue(fieldName, {
      ...props.stock,
      price: e.target.value,
    });
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
          <Text>قیمت :</Text> <input defaultValue={props.stock.price} onChange={setNewPrice} />
        </Flex>
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
