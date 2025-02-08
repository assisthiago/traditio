import { useState } from "react";
import { Container, Tabs, Tab, ListGroup } from "react-bootstrap";

import Layout from "@/components/Layout";

export default function Info() {
    const logged = true;

    const [key, setKey] = useState('about');

    return (
        <Layout logged={logged} currentPage="info">
            <Container fluid>
                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    justify
                >
                    <Tab eventKey="about" title="Sobre">
                        <ListGroup className="mt-3 shadow">
                            <ListGroup.Item active className="bg-primary-subtle bg-gradient text-primary-emphasis border-primary-subtle">
                                Title Ipsum
                            </ListGroup.Item>
                            <ListGroup.Item>Rua Lorem Ipsum, 9999</ListGroup.Item>
                            <ListGroup.Item>Bairro Ipsum Dolor</ListGroup.Item>
                            <ListGroup.Item>Cidade, UF - 99999-999</ListGroup.Item>
                        </ListGroup>
                        <hr />
                        <ListGroup className="mb-3 shadow">
                            <ListGroup.Item active className="bg-primary-subtle bg-gradient text-primary-emphasis border-primary-subtle">
                                Contato
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Telefone: <a href="tel:+5599999999999" className="text-decoration-none">+55 99 999999999</a>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                E-mail: <a href="mailto:lorem@ipsum.com" className="text-decoration-none">lorem@ipsum.com</a>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                CNPJ: <a href="https://www.receita.fazenda.gov.br/PessoaJuridica/CNPJ/cnpjreva/Cnpjreva_Solicitacao.asp" target="_blank" rel="noreferrer" className="text-decoration-none">99.999.999/9999-99</a>
                            </ListGroup.Item>
                        </ListGroup>
                    </Tab>
                    <Tab eventKey="schedules" title="Horários">
                        <ListGroup className="mt-3 shadow">
                            <ListGroup.Item active className="bg-primary-subtle bg-gradient text-primary-emphasis border-primary-subtle">
                                Segunda até Sexta-feira
                            </ListGroup.Item>
                            <ListGroup.Item>
                                08:00 às 12:00
                            </ListGroup.Item>
                            <ListGroup.Item active className="bg-primary-subtle bg-gradient text-primary-emphasis border-primary-subtle">
                                Sábado
                            </ListGroup.Item>
                            <ListGroup.Item>
                                08:00 às 12:00
                            </ListGroup.Item>
                            <ListGroup.Item active className="bg-primary-subtle bg-gradient text-primary-emphasis border-primary-subtle">
                                Domingo e Feriados
                            </ListGroup.Item>
                            <ListGroup.Item>
                                08:00 às 12:00
                            </ListGroup.Item>
                        </ListGroup>
                    </Tab>
                </Tabs>
            </Container>
        </Layout>
    );
}
