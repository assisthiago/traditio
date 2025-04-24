import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Offcanvas, Row } from "react-bootstrap";

import ButtonSpinner from "./ButtonSpinner";
import Alert from "./Alert";

import { postUsers } from "@/api/requests/auth/users";
import { catchError } from "@/api/responses/auth/users";

export default function Settings({ show, setShow }) {

  // States
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
  const [newAccount, setNewAccount] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    cpf: "",
    phone: "",
    email: "",
    feedbacks: {},
  })

  // Functions
  function feedback(field, condition, message = null) {
    // Set feedback message
    setNewAccount({
      ...newAccount,
      feedbacks: {
        ...newAccount.feedbacks,
        [field]: condition
      }
    });
  }

  // Validation
  function validateField(field, value) {
    feedback(field, value === "");

    switch (field) {
      case "cpf":
      case "phone":
        feedback(field, !/^\d{11}$/.test(value))
        break;
      case "email":
        feedback(field, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        break;
      case "password":
        feedback(field, value.length < 8 || value.length > 20);
        break;
    }

    const requiredFields = [
      "password",
      "first_name",
      "last_name",
      "cpf",
      "phone",
      "email",
    ];
    const missingFields = requiredFields.filter(key => newAccount[key] === "");
    if (missingFields.length >= 1) setBtnSubmit(true);
    else {
      setBtnSubmit(false);
      setNewAccount({ ...newAccount, feedbacks: {} });
    }
  }

  // Handlers
  function handleSubmitCreateNewAccount(e) {
    e.preventDefault();
    setLoading(true);

    postUsers(newAccount)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify({ ...response.data }));

        setAlertOptions({
          title: "Bem-vindo!",
          message: "Um e-mail foi enviado para confirmar a criação da sua conta.",
          variant: "success",
          show: true,
        });

        setShowCreateAccount(false);
        setNewAccount({
          username: "",
          password: "",
          first_name: "",
          last_name: "",
          cpf: "",
          phone: "",
          email: "",
          feedbacks: {},
        });
      })
      .catch((err) => {
        const messages = catchError(err);
        setAlertOptions({
          message: messages.join(", "),
          variant: "danger",
          show: true,
        });
      })
      .finally(() => {
        setLoading(false);
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
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="E-mail"
              className="mb-2"
            >
              <Form.Control type="text" placeholder="E-mail" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Senha"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Senha" />
            </FloatingLabel>
            <Button variant="primary" type="submit" className="w-100 shadow">
              Entrar
            </Button>
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
      <Modal show={showCreateAccount} onHide={() => setShowCreateAccount(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-uppercase">Nova conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitCreateNewAccount}>
            <Form.Group className="mb-2">
              <Form.Label className="required">Nome</Form.Label>
              <Form.Control
                required
                disabled={loading}
                type="text"
                placeholder="Digite seu nome"
                value={newAccount?.first_name}
                onChange={(e) => setNewAccount({ ...newAccount, first_name: e.target.value })}
                onBlur={(e) => validateField("first_name", e.target.value)}
                isInvalid={newAccount?.feedbacks?.first_name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="required">Sobrenome</Form.Label>
              <Form.Control
                required
                disabled={loading}
                type="text"
                placeholder="Digite seu sobreome"
                value={newAccount?.last_name}
                onChange={(e) => setNewAccount({ ...newAccount, last_name: e.target.value })}
                onBlur={(e) => validateField("last_name", e.target.value)}
                isInvalid={newAccount?.feedbacks?.last_name}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="required">CPF</Form.Label>
              <Form.Control
                required
                disabled={loading}
                type="text"
                placeholder="Digite seu CPF"
                minLength={11}
                maxLength={11}
                value={newAccount?.cpf}
                onChange={(e) => setNewAccount({ ...newAccount, cpf: e.target.value })}
                onBlur={(e) => validateField("cpf", e.target.value)}
                isInvalid={newAccount?.feedbacks?.cpf}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="required">Telefone</Form.Label>
              <Form.Control
                required
                disabled={loading}
                type="text"
                placeholder="Digite seu telefone"
                minLength={11}
                maxLength={11}
                value={newAccount?.phone}
                onChange={(e) => setNewAccount({ ...newAccount, phone: e.target.value })}
                onBlur={(e) => validateField("phone", e.target.value)}
                isInvalid={newAccount?.feedbacks?.phone}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="required">E-mail</Form.Label>
              <Form.Control
                required
                disabled={loading}
                type="email"
                placeholder="Digite seu e-mail"
                value={newAccount?.email}
                onChange={(e) => {
                  setNewAccount({ ...newAccount, email: e.target.value, username: e.target.value });
                }}
                onBlur={(e) => validateField("email", e.target.value)}
                isInvalid={newAccount?.feedbacks?.email}
              />
              <Form.Text className="lh-1">
                Um e-mail será enviado para confirmar a criação da sua conta.
              </Form.Text>
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
                value={newAccount?.password}
                onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
                onBlur={(e) => validateField("password", e.target.value)}
                isInvalid={newAccount?.feedbacks?.password}
              />
              <Form.Text className="lh-1">
                Entre 8-20 caracteres.
              </Form.Text>
            </Form.Group>

            <ButtonSpinner
              text="Criar"
              loading={loading}
              customDisabled={btnSubmit}
              variant="primary"
              type="submit"
              classes="mt-2 w-100 d-flex align-items-center justify-content-center shadow"
            />
          </Form>
        </Modal.Body>
      </Modal>

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
