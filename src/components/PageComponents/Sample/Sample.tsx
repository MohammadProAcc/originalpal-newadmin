import { useStore } from 'utils';
import Layout from 'Layouts';

export const Sample: React.FC = () => {
  const { sample } = useStore((state: any) => ({
    sample: state?.sample,
  }));

  return <Layout title={`${sample?.id}`}>{Object.keys(sample)}</Layout>;
};
