import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { PersonFillCheck, PersonFillExclamation } from "react-bootstrap-icons";

export default function Client() {

  const router = useRouter();
  const { segment } = router.query;
  const [_, uid, token] = segment || [];

  return (
    <Layout currentPage="client">
      <Container fluid className="pt-5 mt-5">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <PersonFillExclamation size={50} className="text-primary" />
            <h6 className="mt-2 mb-5">Ativar minha conta!</h6>
            <Button size="md" className="py-2 px-5 shadow-lg">
              <PersonFillCheck size={50} />
            </Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
