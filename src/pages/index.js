import { Container } from 'react-bootstrap';

import Layout from '@/components/Layout';
import Categories from '@/components/Categories';

import { CATEGORIES } from '@/fixtures/categories';

export default function Index() {
    const logged = true;

    return (
        <Layout logged={logged} currentPage="products">
            <Container fluid>
                <Categories categories={CATEGORIES} />
            </Container>
        </Layout>
    );
}
