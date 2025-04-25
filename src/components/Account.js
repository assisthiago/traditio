import { useEffect, useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Offcanvas, Row } from "react-bootstrap";

import ButtonSpinner from "./ButtonSpinner";
import Alert from "./Alert";

import { postLogin } from "@/api/requests/auth/token";
import { catchError } from "@/api/responses/auth/token";
import NewAccount from "./NewAccount";

export default function Settings({ show, setShow }) {

  // States and Effect
  const [loading, setLoading] = useState(false);
  const [btnSubmit, setBtnSubmit] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [alertOptions, setAlertOptions] = useState({
    title: "",
    message: "",
    variant: "",
    show: false,
  });
  const [user, setUser] = useState({
    id: "",
    email: "",
    username: "",
    password: "",
    feedbacks: {}
  });

  useEffect(() => {
    if (user?.id === "") {
      const _user = localStorage.getItem("user");
      setUser({ ...user, ...JSON.parse(_user) });
    }
  })

  // Functions
  function feedback(field, condition, message = null) {
    // Set feedback message
    setUser({
      ...user,
      feedbacks: {
        ...user.feedbacks,
        [field]: message ? message : condition
      }
    });
  }

  // Validation
  function validateFields(field, value) {
    feedback(field, value === "");

    switch (field) {
      case "email":
        feedback(field, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        break;
    }

    const requiredFields = ["email", "password"];
    const missingFields = requiredFields.filter(key => user[key] === "");
    if (missingFields.length >= 1) setBtnSubmit(true);
    else {
      setBtnSubmit(false);
      setUser({ ...user, feedbacks: {} });
    }
  }

  // Handlers
  function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setBtnSubmit(true);

    postLogin(user)
      .then((response) => {
        localStorage.setItem("auth_token", response.data.auth_token);
        setShow(false);
      })
      .catch((err) => {
        const messages = catchError(err);
        setAlertOptions({
          title: "Ah não!",
          message: messages.join(" "),
          variant: "danger",
          show: true,
        });
      })
      .finally(() => {
        setLoading(false);
        setBtnSubmit(false);
      });
  }

  return (
    <>
      <Alert options={alertOptions} setOptions={setAlertOptions} />

      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton className="shadow-sm">
          <Offcanvas.Title className="text-uppercase">Minha conta</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label className="required">E-mail</Form.Label>
              <Form.Control
                required
                disabled={loading}
                type="email"
                placeholder="Digite seu e-mail"
                value={user?.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value, username: e.target.value });
                }}
                onBlur={(e) => validateFields("email", e.target.value)}
                isInvalid={user?.feedbacks?.email}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="required">Senha</Form.Label>
              <Form.Control
                required
                disabled={loading}
                type="password"
                placeholder="Digite sua senha"
                minLength={8}
                maxLength={20}
                value={user?.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                onBlur={(e) => validateFields("password", e.target.value)}
                isInvalid={user?.feedbacks?.password}
              />
            </Form.Group>
            <ButtonSpinner
              text="Entrar"
              loading={loading}
              customDisabled={btnSubmit}
              variant="primary"
              type="submit"
              classes="mt-2 w-100 d-flex align-items-center justify-content-center shadow"
            />
          </Form>

          <hr />

          <Button
            variant="outline-primary"
            className="w-100 shadow-sm"
            onClick={() => setShowCreateAccount(true)}
          >
            Criar conta
          </Button>

          <Button
            variant="outline-secondary"
            className="w-100 mt-2 shadow-sm"
            onClick={() => setShowForgotPassword(true)}
          >
            Esqueci minha senha
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Criar conta */}
      <NewAccount show={showCreateAccount} setShow={setShowCreateAccount} />

      {/* Esqueci minha senha */}
      <Modal show={showForgotPassword} onHide={() => setShowForgotPassword(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-uppercase">Esqueci minha senha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="E-mail"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="E-mail" />
            </FloatingLabel>
            <Button variant="primary" type="submit" className="w-100 shadow">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
