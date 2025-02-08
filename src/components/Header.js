import { useState } from "react";
import { Badge, Button, Container, Navbar, Stack } from "react-bootstrap"
import { GeoAlt, GeoAltFill, Person, PersonFill } from "react-bootstrap-icons"

import Account from "./Account";
import Address from "./Address";

export default function Header({ logged = false }) {
    const opened = true;

    const [showAccount, setShowAccount] = useState(false);
    const [showAddress, setShowAddress] = useState(false);

    return (
        <>
            <Stack className="bg-primary-subtle bg-gradient text-primary-emphasis p-3">
                <h1 className="display-5 text-center m-0">Logo Ipsum</h1>
                <Button variant="link" size="sm" className="text-decoration-none">@social.ipsum</Button>
                {!opened
                    ? (<Badge bg="danger" className="d-block mx-auto">Fechada</Badge>)
                    : (<Badge bg="success" className="d-block mx-auto">Aberta</Badge>)
                }
            </Stack>
            <Navbar sticky="top" className="bg-white py-3 mb-3 shadow-lg">
                <Container fluid className="flex-column">
                    <Stack direction="horizontal" className="justify-content-between">
                        {!logged ? (
                            <>
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="d-flex align-items-center text-decoration-none"
                                    onClick={() => setShowAddress(true)}
                                >
                                    <GeoAlt size={15} />
                                    <span className="ms-1 fw-light">Encontre seu endereço</span>
                                </Button>
                                <Button variant="link" size="sm" onClick={() => setShowAccount(true)}>
                                    <Person size={20} />
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="d-flex align-items-center text-decoration-none"
                                    onClick={() => setShowAddress(true)}
                                >
                                    <GeoAltFill size={15} />
                                    <span className="ms-1 fw-light">Lorem Ipsum Dolor Sit Amet, 9999</span>
                                </Button>
                                <Button variant="link" size="sm" onClick={() => setShowAccount(true)}>
                                    <PersonFill size={20} />
                                </Button>
                            </>
                        )}
                    </Stack>
                </Container>
            </Navbar>

            <Account show={showAccount} setShow={setShowAccount} />
            <Address show={showAddress} setShow={setShowAddress} />
        </>
    )
}
