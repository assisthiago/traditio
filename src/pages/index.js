import { Container } from 'react-bootstrap';

import Layout from '@/components/Layout';
import Categories from '@/components/Categories';

import { CATEGORIES_PRODUCTS } from '@/fixtures/models';

export default function Index() {
  const logged = true;

  return (
    <Layout logged={logged} currentPage="products">
      <Container fluid>
        <Categories categories={CATEGORIES_PRODUCTS} module="index" />
      </Container>
    </Layout>
  );
}
