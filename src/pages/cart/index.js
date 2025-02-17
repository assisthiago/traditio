import { Container, Card, Stack, Button } from "react-bootstrap";

import Layout from "@/components/Layout";
import { PencilFill, Trash2Fill } from "react-bootstrap-icons";

export default function Cart() {
  const logged = true;

  return (
    <Layout logged={logged} currentPage="cart">
      <Container fluid>
        <Card border="light" className="shadow-lg mb-3">
          <Card.Header>
            <Stack direction="horizontal" gap={2} className="justify-content-end">
              <Button variant="outline-danger" size="sm">
                <Trash2Fill size={15} />
              </Button>
              <Button variant="outline-primary" size="sm">
                <PencilFill size={15} />
              </Button>
            </Stack>
          </Card.Header>
          <Card.Body>
          </Card.Body>
          <Card.Footer>
          </Card.Footer>
        </Card>
      </Container>
    </Layout>
  );
}
