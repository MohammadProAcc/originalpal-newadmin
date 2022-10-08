import { DiscountList } from 'components'
import Layout from 'Layouts'
import { useStore } from 'utils'

export function AggregateDiscountingPage() {
  const store = useStore((state) => ({
    stocks: state.stocks,
  }))

  const stocks = store.stocks.filter((_stock: any) => !!_stock.product)

  return (
    <Layout title="فهرست تخفیفات">
      <DiscountList stocks={stocks} />
    </Layout>
  )
}
