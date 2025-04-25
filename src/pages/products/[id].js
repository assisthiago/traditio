import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Button, Card, Container, FloatingLabel, Form, Image, InputGroup, Placeholder, Stack } from "react-bootstrap";

import Layout from "@/components/Layout";
import Categories from "@/components/Categories";

import { getProducts } from "@/api/requests/products";
import { getAdditionalCategories } from "@/api/requests/additionalCategories";
import { ProductPlaceholder } from "@/components/Placeholders";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (id) {
      getProducts(id)
        .then(response => {
          setProduct(response.data);
          getAdditionalCategories({ query: { product: id } })
            .then(response => {
              setCategories(response.data);
            })
            .catch(error => console.error(error))
            .finally(() => {
              setLoading(false);
            });
        })
        .catch(error => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <Layout currentPage="products">
      <Container fluid>
        {loading ? (
          <ProductPlaceholder />
        ) : (
          <>
            <Image src={product.image} alt={product.name} rounded fluid className="shadow-sm" />
            <h1 className="my-2 display-5">{product.name}</h1>
            <p className="text-muted">{product.description}</p>
          </>
        )}

        <hr />
        <Categories categories={categories} module="detail" loading={loading} />

        {!loading && (
          <>
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
                <InputGroup className="shadow-lg" size="sm">
                  <Button variant="light">-</Button>
                  <Form.Control type="number" className="border-light text-center" />
                  <Button variant="primary">+</Button>
                </InputGroup>
              </div>
              <Button variant="primary" size="sm" className="w-100 shadow-lg">Adicionar ao carrinho</Button>
            </Stack>
          </>
        )}
      </Container>
    </Layout>
  )
}
