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
  const [order, setOrder] = useState({
    name: "",
    price: 0,
    quantity: 1,
    additionals: [],
    observation: "",
  });
  const [additionals, setAdditionals] = useState([]);

  useEffect(() => {
    if (id) {
      getProducts(id)
        .then(response => {
          setProduct(response.data);
          setOrder({
            ...order,
            name: response.data.name,
            price: response.data.price,
          })
          getAdditionalCategories({ query: { products: id } })
            .then(response => {
              setCategories(response.data);
              setAdditionals(response.data.map(
                category => {
                  return category.additionals.map(
                    additional => {
                      return {
                        id: additional.id,
                        name: additional.name,
                        type: category.type,
                        category: category.id,
                        price: parseFloat(additional.price),
                        value: category.type === "add on" ? 0 : false,
                        quantity: 0,
                      }
                    })
                }).flat());
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
  }, [id]);

  // Functions
  const updateQuantity = (action) => {
    if (action === "decrement" && order.quantity > 1) setOrder({ ...order, quantity: order.quantity - 1 });
    else if (action === "increment") setOrder({ ...order, quantity: order.quantity + 1 });
  };

  const getOrderPrice = () => {
    let price = parseFloat(order.price);
    additionals.forEach(additional => {
      if (additional.value) price += parseFloat(additional.price) * additional.quantity;
    });
    price *= order.quantity;
    return parseFloat(price).toFixed(2)
  }

  // Handlers
  const handleAddToCart = (e) => {
    e.preventDefault();

    const orderData = {
      ...order,
      price: getOrderPrice(),
      additionals: additionals.filter(additional => additional.value),
    };

    let _order = localStorage.getItem("order");
    _order = JSON.parse(_order);
    _order.products = _order.products ? [..._order.products, orderData] : [orderData];
    localStorage.setItem("order", JSON.stringify(_order));

    router.push("/");
  };

  const handleAddToCartDisabled = () => {
    let requiredCategories = categories
      .filter(category => category.required)
      .map(category => { return { category: category.id, value: false } });

    const readyToAdd = requiredCategories.map(category => {
      return additionals
        .filter(additional => additional.category === category.category)
        .some(additional => additional.value)
        ? true : false;
    });

    return !readyToAdd.every(value => value === true);
  }

  return (
    <>
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
              additionals={additionals}
              setAdditionals={setAdditionals}
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
                        value={order.observation}
                        onChange={(e) => setOrder({ ...order, observation: e.target.value })}
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
                        value={order.quantity}
                        readOnly
                        onChange={() => { }}
                        min={1}
                      />
                      <Button
                        variant="primary"
                        onClick={() => updateQuantity("increment")}>+</Button>
                    </InputGroup>
                  </div>
                  <div className="input-group shadow-lg">
                    <span className="input-group-text text-muted">R$</span>
                    <span className="form form-control text-center fw-bold">{getOrderPrice()}</span>
                  </div>
                </Stack>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 shadow-lg d-flex justify-content-center align-items-center mb-3"
                  disabled={handleAddToCartDisabled()}
                >
                  <BagPlusFill size={20} className="me-1" />
                  Adicionar
                </Button>
              </>
            )}
          </Form>
        </Container>
      </Layout>
    </>
  )
}
