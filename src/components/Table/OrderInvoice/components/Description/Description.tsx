import { Divider, Text } from "@mantine/core";
import React from "react";
import { numeralize, useStore } from "utils";
import { Column, Row, Strong } from "../Details";
import { DescriptionComponent } from "./components";
import { DescriptionProps } from "./types";

export const Description: React.FC<DescriptionProps> = ({ order, payable, totalCount, isLastPage }) => {
  const { details } = useStore((state: any) => ({
    details: state?.orderDetails,
  }));

  return (
    <DescriptionComponent>
      <Row>
        <Column>
          <Strong>کد تخفیف :</Strong>
          {!!order?.coupon_id ? order?.coupon_id : "ندارد"}
        </Column>
      </Row>

      <Divider size="lg" variant="dashed" mb="md" />

      <Row>
        <Column>
          جمع کل پرداخت نقدی شما برای کل{" "}
          <Text fw="bolder" mx="sm" td="underline">
            {totalCount}
          </Text>{" "}
          مورد
          <Text fw="bolder" mx="sm" td="underline">
            {numeralize(order?.newprice ?? order?.price ?? payable)}
          </Text>{" "}
          تومان میباشد.
        </Column>
      </Row>

      <Divider size="lg" variant="dashed" mb="md" />

      <Row>
        <Column fullWidth>
          <Strong>توضیحات :</Strong>
          {details?.description ?? "ندارد"}
        </Column>
      </Row>

      <Divider size="lg" variant="dashed" mb="md" />

      <Row>
        <Column>
          <Strong>آدرس ایمیل :</Strong>
          {order?.user?.email ?? ""}
        </Column>
      </Row>

      <Row>
        <Column>
          <Strong>نحوه ارسال :</Strong>
          {order?.delivery ?? details.postMethod ?? "ندارد"}
        </Column>
      </Row>

      <Divider size="lg" variant="dashed" mb="md" />

      <Row>
        <Column>
          <Strong>توضیحات ارسال :</Strong>
          {details?.postDescription ?? "ندارد"}
        </Column>
      </Row>

      {details?.nextCoupon?.length > 0 && (
        <>
          <Divider size="lg" variant="dashed" mb="md" />

          <Row>
            <Column>
              <Strong>کد تخفیف خرید بعدی :</Strong>
              {details?.nextCoupon?.length > 0 ? details?.nextCoupon : "ندارد"}
            </Column>
          </Row>
        </>
      )}

      <Divider size="lg" variant="dashed" mb="md" />

      {isLastPage && (
        <>
          <Row>
            <Column fullWidth>
              <Strong>مهر و امضای خریدار :</Strong>
            </Column>

            <Column fullWidth>
              <Strong>مهر و امضای فروشنده :</Strong>
            </Column>
          </Row>

          <hr />

          <Divider size="lg" variant="dashed" mb="md" />
        </>
      )}

      <Row>
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

      <Divider size="lg" variant="dashed" mb="md" />

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
    </DescriptionComponent>
  );
};
