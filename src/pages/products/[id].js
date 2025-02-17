import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { Button, Card, Container, FloatingLabel, Form, Image, InputGroup, Stack } from "react-bootstrap";

import Categories from "@/components/Categories";

import { CATEGORIES_PRODUCT } from '@/fixtures/categories';
import { ITEMS } from '@/fixtures/items';

export default function Product() {
    const router = useRouter();
    const { id } = router.query;
    const instance = ITEMS[0];
    const logged = true;

    return (
        <Layout logged={logged} currentPage="products">
            <Container fluid>
                <Image src="https://placehold.co/1000" alt={instance.name} rounded fluid className="shadow-sm" />
                <h1 className="my-2 display-5">{instance.name}</h1>
                <p className="text-muted">{instance.description}</p>
                <hr />
                <Categories categories={CATEGORIES_PRODUCT} type="product" />
                <Card>
                    <Card.Body>
                        <FloatingLabel
                            controlId="observation"
                            label="Alguma observação?"
                            className="shadow-lg rounded"
                        >
                            <Form.Control
                                as="textarea"
                                placeholder="Observação"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                    </Card.Body>
                </Card>
                <hr />
                <Stack direction="horizontal" gap={3} className="justify-content-between mb-3">
                    <div className="d-flex justify-content-end">
                        <InputGroup className="shadow-lg">
                            <Button variant="light">-</Button>
                            <Form.Control type="number" className="border-light text-center" />
                            <Button variant="primary">+</Button>
                        </InputGroup>
                    </div>
                    <Button variant="primary" className="w-100 shadow-lg">Adicionar ao carrinho</Button>
                </Stack>
            </Container>
        </Layout>
    )
}
