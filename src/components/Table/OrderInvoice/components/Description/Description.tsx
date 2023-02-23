import { Flex, Group, Text } from "@mantine/core";
import React from "react";
import styled from "styled-components";
import { numeralize, useStore } from "utils";
import { Column, Row, Strong } from "../Details";
import { DescriptionProps } from "./types";

export const Description: React.FC<DescriptionProps> = ({ order, payable, totalCount, isLastPage }) => {
  const { details } = useStore((state: any) => ({
    details: state?.orderDetails,
  }));

  return (
    <$>
      <Flex className="main-child" direction="column">
        <Row>
          <Column>
            <Strong>کد تخفیف :</Strong>
            {!!order?.coupon_id ? order?.coupon_id : "ندارد"}
          </Column>
        </Row>

        <Row>
          <Column>
            جمع کل پرداخت نقدی شما مبلغ{" "}
            <Text fw="bolder" mx="sm" td="underline">
              {numeralize(order?.newprice ?? order?.price ?? payable)}
            </Text>{" "}
            تومان میباشد.
          </Column>
        </Row>
      </Flex>

      <Row className="main-child">
        <Column fullWidth>
          <Strong>توضیحات :</Strong>
          {details?.description ?? "ندارد"}
        </Column>
      </Row>

      <Row className="main-child">
        <Column>
          <Strong>آدرس ایمیل :</Strong>
          {order?.user?.email ?? ""}
        </Column>
      </Row>

      <Row className="main-child">
        <Column>
          <Strong>نحوه ارسال :</Strong>
          {order?.delivery ?? details.postMethod ?? "ندارد"}
        </Column>
      </Row>

      <Row className="main-child">
        <Column>
          <Strong>توضیحات ارسال :</Strong>
          {details?.postDescription ?? "ندارد"}
        </Column>
      </Row>

      {details?.nextCoupon?.length > 0 && (
        <>
          <Row className="main-child">
            <Column>
              <Strong>کد تخفیف خرید بعدی :</Strong>
              {details?.nextCoupon?.length > 0 ? details?.nextCoupon : "ندارد"}
            </Column>
          </Row>
        </>
      )}

      {isLastPage && (
        <Flex direction="column" className="main-child">
          <Row>
            <Column fullWidth>
              <Strong>مهر و امضای خریدار :</Strong>
            </Column>

            <Column fullWidth>
              <Strong>مهر و امضای فروشنده :</Strong>
            </Column>
          </Row>

          <hr />
        </Flex>
      )}

      <Row className="main-child">
        <Column>
          <Strong>اینستاگرام :</Strong>
          ORIGINAL.PAL
        </Column>

        <Column>
          <Strong>تلگرام :</Strong>
          ORIGINALPAL@
        </Column>

        <Column>
          <Strong>وبسایت :</Strong>
          www.originalpal.co.uk
        </Column>
      </Row>

      <Flex direction="column" className="main-child last-child">
        <Row>
          <Column fullWidth>
            <Strong>آدرس :</Strong>
            همدان - خیابان پاستور - نبش کوچه عزیزیان - ساختمان تلاش - پلاک ۸۲ - طبقه سوم - واحد ۶
          </Column>
        </Row>

        <Row>
          <Column fullWidth>
            <Strong>کد پستی :</Strong>
            6516643869
          </Column>
        </Row>

        <Row>
          <Column fullWidth>
            <Strong>تلفن های تماس :</Strong>
            ۰۲۱۲۶۳۲۲۳۴۸ - ۰۸۱۳۸۲۶۶۳۶۳۳
          </Column>
        </Row>

        <Row>
          <Column fullWidth>
            <Strong>پست الکترونیکی :</Strong>
            info@originalpal.com
          </Column>
        </Row>
      </Flex>
    </$>
  );
};

export const $ = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 297mm;
  margin: 0 auto;
  border: 1px solid black;
  border-top: none;
  padding-top: 0.5rem;

  .main-child {
    width: 100%;
    padding: 0 0.5rem 0.5rem 0.5rem;
    border-bottom: 1px solid black;
    margin: 0 0 0.5rem 0;
  }

  .last-child {
    border-bottom: none;
    margin-bottom: none;
    padding-bottom: none;
  }
`;
