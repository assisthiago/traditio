import { useEffect, useState } from "react";
import { Col, Form, Offcanvas, Row } from "react-bootstrap";
import { FloppyFill, Search } from "react-bootstrap-icons";

import Alert from "./Alert";
import ButtonSpinner from "./ButtonSpinner";

import { getZipCode } from '@/api/requests/addresses';

export default function Address({
  address,
  setAddress,
  show,
  setShow,
  logged = false
}) {

  // States and Effect
  const [loading, setLoading] = useState(false);
  const [btnSearchDisabled, setBtnSearchDisabled] = useState(true);
  const [btnSaveDisabled, setBtnSaveDisabled] = useState(true);
  const [formDisabled, setFormDisabled] = useState(true);
  const [alertOptions, setAlertOptions] = useState({
    title: "",
    message: "",
    variant: "",
    show: false,
  });

  useEffect(() => {
    if (address?.zip_code !== "" && btnSearchDisabled && btnSaveDisabled && formDisabled) {
      setBtnSearchDisabled(false);
      setBtnSaveDisabled(false);
      setFormDisabled(false);
    }
  }, [address]);

  // Functions
  function feedback(field, condition, message = null) {
    // Set feedback message
    setAddress({
      ...address,
      feedbacks: {
        ...address?.feedbacks,
        [field]: message !== null ? message : condition,
      },
    });
  }

  // Handlers
  function handleSubmitZipCode(e) {
    e.preventDefault();

    setLoading(true);
    setFormDisabled(true);

    getZipCode(address?.zip_code)
      .then(response => {
        const data = response.data;
        setAddress({
          ...address,
          zip_code: data.cep,
          street: data.street,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
        });
      })
      .catch(error => {
        console.error(error);
        setAlertOptions({
          title: "CEP inválido ou não encontrado.",
          message: "Por favor, preencha abaixo.",
          variant: "warning",
          show: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          setFormDisabled(false);
        }, 1000);
      });
  }

  function handleSubmitAddress(e) {
    e.preventDefault();

    if (!logged) {
      localStorage.setItem("address", JSON.stringify({ ...address }));
      setShow(false);
      return;
    }
  }

  // Validation
  function validateField(field, value, required = true) {
    if (required) feedback(field, value === "");
    switch (field) {
      case "zip_code":
        if (!feedback(field, !/^\d{8}$/.test(value))) {
          setBtnSearchDisabled(false);
        }
    }
    const requiredFields = ["zip_code", "street", "number", "neighborhood", "city", "state"];
    const missingFields = requiredFields.filter(key => address[key] === "");
    if (missingFields.length >= 1) setBtnSaveDisabled(true);
    else {
      setBtnSaveDisabled(false);
      setAddress({ ...address, feedbacks: {} });
    }
  }

  return (
    <>
      <Alert options={alertOptions} setOptions={setAlertOptions} />

      <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
        <Offcanvas.Header closeButton className="shadow-sm">
          <Offcanvas.Title className="text-uppercase">Endereço</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          {/* CEP */}
          <Form onSubmit={handleSubmitZipCode}>
            <Form.Group>
              <Form.Label className="required">CEP</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Digite apenas os 8 números"
                minLength={8}
                maxLength={8}
                value={address?.zip_code}
                onChange={(e) => setAddress({ ...address, zip_code: e.target.value })}
                onBlur={(e) => validateField("zip_code", e.target.value)}
                disabled={loading}
                isInvalid={address?.feedbacks?.zip_code ? true : false}
              />
              {address?.feedbacks?.zip_code && (
                <Form.Control.Feedback type="invalid">
                  {address?.feedbacks.zip_code}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <ButtonSpinner
              text="Pesquisar"
              icon={<Search className="me-2" />}
              loading={loading}
              customDisabled={btnSearchDisabled}
              variant="primary"
              type="submit"
              classes="mt-2 w-100 d-flex align-items-center justify-content-center shadow"
            />
          </Form>

          <hr />

          {/* Address */}
          <Form onSubmit={handleSubmitAddress}>
            <Form.Group className="mb-3">
              <Form.Label className="required">Endereço</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Endereço"
                value={address?.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                onBlur={(e) => validateField("street", e.target.value)}
                disabled={formDisabled || loading}
                isInvalid={address?.feedbacks?.street ? true : false}
              />
              {address?.feedbacks?.street && (
                <Form.Control.Feedback type="invalid">
                  {address?.feedbacks.street}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Row>
              <Col xs={4}>
                <Form.Group className="mb-3">
                  <Form.Label className="required">Número</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Número"
                    value={address?.number}
                    onChange={(e) => setAddress({ ...address, number: e.target.value })}
                    onBlur={(e) => validateField("number", e.target.value)}
                    disabled={formDisabled || loading}
                    isInvalid={address?.feedbacks?.number ? true : false}
                  />
                  {address?.feedbacks?.number && (
                    <Form.Control.Feedback type="invalid">
                      {address?.feedbacks.number}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="optional">Complemento</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="BL 00, APTO 0000"
                    value={address?.complement}
                    onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                    disabled={formDisabled || loading}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="required">Bairro</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Bairro"
                value={address?.neighborhood}
                onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                onBlur={(e) => validateField("neighborhood", e.target.value)}
                disabled={formDisabled || loading}
                isInvalid={address?.feedbacks?.neighborhood ? true : false}
              />
              {address?.feedbacks?.neighborhood && (
                <Form.Control.Feedback type="invalid">
                  {address?.feedbacks.neighborhood}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Row>
              <Col xs={8}>
                <Form.Group className="mb-3">
                  <Form.Label className="required">Cidade</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Cidade"
                    value={address?.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    onBlur={(e) => validateField("city", e.target.value)}
                    disabled={formDisabled || loading}
                    isInvalid={address?.feedbacks?.city ? true : false}
                  />
                  {address?.feedbacks?.city && (
                    <Form.Control.Feedback type="invalid">
                      {address?.feedbacks.city}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="required">Estado</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Estado"
                    minLength={2}
                    maxLength={2}
                    value={address?.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    onBlur={(e) => validateField("state", e.target.value)}
                    disabled={formDisabled || loading}
                    isInvalid={address?.feedbacks?.state ? true : false}
                  />
                  {address?.feedbacks?.state && (
                    <Form.Control.Feedback type="invalid">
                      {address?.feedbacks.state}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="optional">Referência</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Próximo ao mercado, ponto de ônibus, etc."
                value={address?.reference}
                onChange={(e) => setAddress({ ...address, reference: e.target.value })}
                disabled={formDisabled || loading}
              />
            </Form.Group>

            <ButtonSpinner
              text="Salvar"
              loading={loading}
              customDisabled={btnSaveDisabled}
              variant="primary"
              type="submit"
              classes="mt-2 w-100 d-flex align-items-center justify-content-center shadow"
            />
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
