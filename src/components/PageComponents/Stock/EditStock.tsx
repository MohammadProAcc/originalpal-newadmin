import { useStore } from 'utils';
import Layout from 'Layouts';
import React from 'react';
import { StockItem } from 'components';

export const EditStockPage: React.FC = () => {
  const { stock } = useStore((state: any) => ({
    stock: state?.stock,
  }));

  return (
    <Layout title={`${stock?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>انبار {stock?.id}</h1>
      <StockItem stock={stock} />
    </Layout>
  );
};
