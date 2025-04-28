import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Button, Card, Container, FloatingLabel, Form, Image, InputGroup, Stack } from "react-bootstrap";

import Layout from "@/components/Layout";
import Categories from "@/components/Categories";

import { getProducts } from "@/api/requests/products";
import { getAdditionalCategories } from "@/api/requests/additionalCategories";
import { ProductPlaceholder } from "@/components/Placeholders";
import { BagPlusFill } from "react-bootstrap-icons";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  // State and Effect
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [newOrder, setNewOrder] = useState({
    id: null,
    name: "",
    additionals: [],
    price: 0,
    quantity: 1,
    observation: "",
  });

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
    };

    const _order = localStorage.getItem("order");

  }, [id]);

  // Functions
  const updateQuantity = (action) => {
    if (action === "decrement" && newOrder.quantity > 1)
      setNewOrder({ ...newOrder, quantity: newOrder.quantity - 1 });
    else if (action === "increment")
      setNewOrder({ ...newOrder, quantity: newOrder.quantity + 1 });
  };

  // Handlers
  const handleAddToCart = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    for (let [key, value] of formData.entries()) {
      const [_id, _type] = key.split("__");
      if (_type === "add-on") {
        console.log("type:", _type, "additional.id:", _id, "value:", value);
      }
      else if (_type === "observation" || _type === "quantity") {
        console.log("type:", _type, "product.id:", _id, "value:", value);
      }
      else {
        console.log("type:", _type, "category.id:", _id, "additional.id:", value);
      }
    }
  };

  return (
    <Layout currentPage="products">
      <Container fluid>
        <Form onSubmit={handleAddToCart}>
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

          <Categories
            categories={categories}
            module="detail"
            loading={loading}
          />

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
                      name={`${product.id}__observation`}
                      style={{ height: '100px' }}
                      value={newOrder.observation}
                      onChange={(e) => setNewOrder({ ...newOrder, observation: e.target.value })}
                    />
                  </FloatingLabel>
                </Card.Body>
              </Card>

              <hr />

              <Stack direction="horizontal" gap={3} className="justify-content-between mb-3">
                <div className="d-flex justify-content-end">
                  <InputGroup className="shadow-lg">
                    <Button
                      variant="light"
                      onClick={() => updateQuantity("decrement")}>-</Button>
                    <Form.Control
                      type="number"
                      className="border-light text-center"
                      name={`${product.id}__quantity`}
                      value={newOrder.quantity}
                      readOnly
                    />
                    <Button
                      variant="primary"
                      onClick={() => updateQuantity("increment")}>+</Button>
                  </InputGroup>
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 shadow-lg d-flex justify-content-center align-items-center">
                  <BagPlusFill size={20} className="me-1" />
                  Adicionar
                </Button>
              </Stack>
            </>
          )}
        </Form>
      </Container>
    </Layout>
  )
}
