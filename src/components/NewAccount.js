import { Form, Modal } from "react-bootstrap";
import { useState } from "react";

import Alert from "./Alert";
import ButtonSpinner from "./ButtonSpinner";
import { postUsers } from "@/api/requests/auth/users";
import { catchError } from "@/api/responses/auth/users";

export default function NewAccount({ show, setShow }) {

  // States and Effect
  const [loading, setLoading] = useState(false);
  const [btnSubmit, setBtnSubmitNewAccount] = useState(true);
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
  });

  // Functions
  function feedback(field, condition, message = null) {
    setNewAccount({
      ...newAccount,
      feedbacks: {
        ...newAccount.feedbacks,
        [field]: message ? message : condition
      }
    });
  }

  function validateFields(field, value) {
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

    // Check if all required fields are filled
    const requiredFields = [
      "password",
      "first_name",
      "last_name",
      "cpf",
      "phone",
      "email",
    ];
    const missingFields = requiredFields.filter(key => newAccount[key] === "");
    if (missingFields.length >= 1) setBtnSubmitNewAccount(true);
    else {
      setBtnSubmitNewAccount(false);
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
          message: "Sua conta foi criada com sucesso e está pronta para uso!",
          variant: "success",
          show: true,
        });

        setShow(false);
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
          title: "Ah não!",
          message: messages.join(" "),
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

      <Modal show={show} onHide={() => setShow(false)} centered>
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
                onBlur={(e) => validateFields("first_name", e.target.value)}
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
                onBlur={(e) => validateFields("last_name", e.target.value)}
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
                onBlur={(e) => validateFields("cpf", e.target.value)}
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
                onBlur={(e) => validateFields("phone", e.target.value)}
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
                onBlur={(e) => validateFields("email", e.target.value)}
                isInvalid={newAccount?.feedbacks?.email}
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
                value={newAccount?.password}
                onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
                onBlur={(e) => validateFields("password", e.target.value)}
                isInvalid={newAccount?.feedbacks?.password}
              />
              <Form.Text className="">Entre 8 a 20 caracteres.</Form.Text>
              <Form.Text className="">Não pode ser uma senha comumente utilizada.</Form.Text>
              <Form.Text className="">Não pode ser inteiramente numérica.</Form.Text>
              <Form.Text className="d-block">Não pode ser muito parecida com o resto das suas informações pessoais.</Form.Text>
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
    </>
  )
};
