import { useState } from "react";
import { Button, FloatingLabel, Form, Modal, Offcanvas } from "react-bootstrap";

export default function Settings({ show, setShow }) {
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    return (
        <>
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
                    <Form>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Nome"
                            className="mb-2"
                        >
                            <Form.Control type="text" placeholder="Nome" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="CPF"
                            className="mb-2"
                        >
                            <Form.Control type="text" placeholder="CPF" />
                        </FloatingLabel>
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
                            className="mb-2"
                        >
                            <Form.Control type="text" placeholder="Senha" />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Telefone"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Telefone" />
                            <Form.Text>Um código SMS será enviado para seu número para confirmação da nova conta.</Form.Text>
                        </FloatingLabel>
                        <Button variant="primary" type="submit" className="w-100 shadow">
                            Criar
                        </Button>
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
