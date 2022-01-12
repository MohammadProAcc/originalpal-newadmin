import { Button, Container } from '@paljs/ui';
import Cookies from 'js-cookie';
import Layout from 'Layouts';
import { NextPage } from 'next';
import Link from 'next/link';
import router from 'next/router';
import { useUserStore } from 'utils';

const Logout: NextPage = () => {
  const { setUser } = useUserStore((state) => ({ setUser: state?.setUser }));

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/auth/login');
  };

  return (
    <Layout title="خروج">
      <h1>آیا از خروج خود اطمینان دارید؟</h1>
      <Container fluid>
        <Link href="/">
          <Button style={{ margin: '0 0 0 1rem' }} status="Basic">
            خیر
          </Button>
        </Link>
        <Button onClick={logout} status="Danger">
          بله
        </Button>
      </Container>
    </Layout>
  );
};

export default Logout;
