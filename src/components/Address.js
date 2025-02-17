import { Button, Col, FloatingLabel, Form, Offcanvas, Row } from "react-bootstrap";
import { GeoAltFill, Search } from "react-bootstrap-icons";

export default function Address({ show, setShow }) {
    return (
        <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
            <Offcanvas.Header closeButton className="shadow-sm">
                <Offcanvas.Title className="text-uppercase">Endereço</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Row>
                        <Col xs={8}>
                            <FloatingLabel controlId="cep" label="CEP">
                                <Form.Control type="text" placeholder="99999-999" />
                            </FloatingLabel>
                        </Col>
                        <Col xs={4}>
                            <Button variant="primary" className="w-100 h-100 shadow-sm" type="submit">
                                <Search size={25} />
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Button variant="outline-primary"
                    className="w-100 mt-3 d-flex align-items-center justify-content-center shadow-sm">
                    <GeoAltFill className="me-1" /> Usar minha localização
                </Button>
                <hr />
                <Form>
                    <FloatingLabel controlId="address" label="Endereço" className="mb-2">
                        <Form.Control type="text" placeholder="Endereço" />
                    </FloatingLabel>
                    <FloatingLabel controlId="complement" label="Complemento" className="mb-2">
                        <Form.Control type="text" placeholder="Complemento" />
                    </FloatingLabel>
                    <FloatingLabel controlId="district" label="Bairro" className="mb-2">
                        <Form.Control type="text" placeholder="Bairro" />
                    </FloatingLabel>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="city" label="Cidade">
                                <Form.Control type="text" placeholder="Cidade" />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="state" label="Estado">
                                <Form.Control type="text" placeholder="Estado" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Button variant="primary" className="mt-3 shadow w-100">Salvar</Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
