import { useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';

import Layout from '@/components/Layout';
import Categories from '@/components/Categories';

import { getProductCategories } from '@/api/requests/productCategories';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categories.length == 0) {
      getProductCategories()
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    }
  }, [categories]);

  return (
    <Layout currentPage="products">
      <Container fluid>
        <Categories categories={categories} module="index" loading={loading} />
      </Container>
    </Layout>
  );
}
