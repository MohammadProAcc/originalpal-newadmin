import { AggregateDiscountingPage } from "components"
import { GetServerSideProps } from "next"
import { admin } from "utils";

export default function Page() {
  return <AggregateDiscountingPage />
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const stocks = await admin(context?.req?.cookies?.token).get('/stock/select');

  return {
    props: {
      initialState: {
        stocks: stocks.data.data
      }
    }
  }

}
