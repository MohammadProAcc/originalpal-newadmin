import { Strong } from 'components'
import { Column as _Column } from 'components/Table/OrderInvoice/components/Details/components/Row/components/Column'
import { FlexContainer as _FlexContainer } from 'components/Container/FlexContainer'
import { Row as _Row } from 'components/Container/Row'
import styled from 'styled-components'
import { Colors } from 'styles'
import React, { useEffect } from 'react'
import {
  Table as _Table,
  TD as _TD,
  TH as _TH,
  TR,
} from 'components/Table/OrderInvoice/components/ItemsTable/components'

export const ReturnForm: React.FC = () => {
  useEffect(() => {
    window.print()
  }, [])

  return (
    <Component>
      <Header>
        <Logo src="/svg/logo.svg" />

        <FlexContainer>
          <Row>
            <Column>
              <Strong>نام و نام خانوادگی :</Strong>
            </Column>

            <Column>
              <Strong>شماره سفارش :</Strong>
            </Column>
          </Row>

          <Row>
            <Column>
              <Strong>تاریخ :</Strong>
            </Column>

            <Column>
              <Strong>پست الکترونیکی :</Strong>
            </Column>
          </Row>
        </FlexContainer>
      </Header>

      <Column className="description">
        اگر به هر دلیلی از خرید خود ناراضی هستید خوشحال میشویم ظرف ۲۵ ساعت علت نارضایتی خود را به شماره ۰۹۱۲۰۳۸۷۳۰۲
        اطلاع دهید و ظرف ۷ روز محصول را به ما بازگردانید.
      </Column>

      <Table>
        <TR>
          <TH>کد محصول</TH>
          <TH>توضیحات</TH>
          <TH>سایز</TH>
          <TH>تعداد</TH>
          <TH>برگشت / تعویض</TH>
          <TH>دلیل برگشت</TH>
          <TH>سایز جدید</TH>
          <TH>رنگ جدید</TH>
        </TR>
        {[1, 2, 3, 4, 5, 6, 7]?.map(() => (
          <TR>
            <TD />
            <TD />
            <TD />
            <TD />
            <TD />
            <TD />
            <TD />
          </TR>
        ))}
      </Table>

      <FlexContainer className="row mb-2" style={{ margin: '0 auto' }}>
        <Column className="hint">
          <Row className="title mb-4">نکات مهم</Row>

          <Row>
            <Row className="col">
              <p>
                ۱- لطفا از بسته بندی درست کالای برگشتی برای جلوگیری از هر گونه آسیب در حین انتقال، اطمینان حاصل کنید.
              </p>

              <p>
                ۲- لطفا اطمینان حاصل نمایید که جعبه کفش مورد نظر با یک لایه محافظ بیرونی پوشیده شده است. از چسباندن
                هرگونه برچسب یا اطلاعات مربوط به کالا، به طور مستقیم روی جعبه کفش، جدا خودداری کنید.
              </p>

              <p>
                ۳- لطفا رسید پستی را که نشانه میدهد شما کالا را پست کرده اید، تا زمانی که از OriginalPal اطلاعاتی دریافت
                کنید، همراه خود نگه دارید.
              </p>
            </Row>
          </Row>
        </Column>
        <Column className="hint">
          <Row className="mb-4 title">دلایل برگشت</Row>

          <Row className="col">
            <p>۱- اندازه مناسب نیست.</p>
            <p>۲- مناسب من نیست.</p>
            <p>۳- نظرم در مورد این کالا عوض شده.</p>
            <p>۴- کالا اشتباهی برای من فرستاده شده.</p>
            <p>۵- عکس های کالا که روی سایت قرار دارد با خود کالا از نزدیک فرق میکند.</p>
            <p>۶- مشکلات مربوط به کیفیت.</p>
            <p>۷- دیگر...</p>
          </Row>
        </Column>
      </FlexContainer>

      <Row className="comment">نظرات :</Row>
    </Component>
  )
}

export default ReturnForm

const Component = styled.div`
  max-height: 297mm;
`

const Header = styled.header`
  width: 100%;
  margin-bottom: 1rem;

  display: flex;
`

const Logo = styled.img`
  height: 4rem;
  margin-left: 1rem;
`

const FlexContainer = styled(_FlexContainer)`
  width: 100%;

  flex-direction: column;

  &.row {
    margin-top: 0;
    flex-direction: row;

    gap: 0.75rem;
  }
`

const Row = styled(_Row)`
  width: 100%;
  height: 3rem;
  margin: 0;

  flex: 1;

  &.comment {
    height: 4rem;
    padding: 0.5rem;
    border: 1px solid ${Colors.black};
  }

  &.title {
    max-height: 1.5rem;
    border-bottom: 1px solid ${Colors.black};
    flex: none;
  }

  &.col {
    flex-direction: column;

    p {
      text-align: right;
    }
  }
`

const Column = styled(_Column)`
  border: 1px solid ${Colors.black};
  padding: 0.25rem;
  margin: 0;

  flex: 1;

  display: flex;
  align-items: cetner;

  &.description {
    padding: 1rem 0.5rem;
    margin-bottom: 1rem;

    text-align: right;
  }

  &.hint {
    flex-direction: column;
  }
`

const Table = styled(_Table)`
  width: 100%;

  margin-bottom: 1rem;
`

const TH = styled(_TH)`
  padding: 1rem 0;
`

const TD = styled(_TD)`
  height: 2.5rem;
`
