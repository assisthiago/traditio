import { useEffect, useState } from "react";
import { Badge, Button, Container, Navbar, Stack } from "react-bootstrap"
import { GeoAlt, GeoAltFill, Person, PersonFill } from "react-bootstrap-icons"

import Account from "./Account";
import Address from "./Address";

export default function Header({ logged = false }) {
  const opened = true;

  const [showAccount, setShowAccount] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState({
    zip_code: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    reference: "",
    feedbacks: {},
  });

  useEffect(() => {
    if (logged) {
      // Chamar a API
    }
    else if (!address?.zip_code && !logged) {
      const _address = localStorage.getItem("address");
      if (address) setAddress(JSON.parse(_address));
    }
  }, [address]);

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
            <Button
              variant="link"
              size="sm"
              className="d-flex align-items-center text-decoration-none"
              onClick={() => setShowAddress(true)}
            >
              {!address?.zip_code ? (<GeoAlt size={15} />) : (<GeoAltFill size={15} />)}
              <span className="ms-1 fw-light text-truncate">
                {!address?.zip_code ? ("Encontre seu endereço") : (`${address.neighborhood}, ${address.city}`)}
              </span>
            </Button>
            <Button variant="link" size="sm" onClick={() => setShowAccount(true)}>
              <Person size={20} />
            </Button>
          </Stack>
        </Container>
      </Navbar>

      <Account show={showAccount} setShow={setShowAccount} />
      <Address
        address={address}
        setAddress={setAddress}
        show={showAddress}
        setShow={setShowAddress}
        logged={logged}
      />
    </>
  )
}
