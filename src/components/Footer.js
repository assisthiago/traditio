import Link from "next/link";
import { BagFill, HouseFill, InfoCircleFill, Clipboard2Fill, Clipboard2, Bag } from "react-bootstrap-icons";

const { Navbar, Container, Stack, Button } = require("react-bootstrap");

export default function Footer() {
    const logged = false;

    return (
        <Navbar fixed="bottom" className="bg-white flex-column py-0 shadow-lg">
            <Container fluid className="py-1">
                <Stack direction="horizontal" className="justify-content-around w-100">
                    <Link href="/">
                        <Button
                            variant="link"
                            size="sm"
                            className="text-decoration-none"
                        >
                            <HouseFill size={20} className="mb-1" />
                            <small className="d-block fs-small text-black">Início</small>
                        </Button>
                    </Link>
                    <Button
                        variant="link"
                        size="sm"
                        className="text-decoration-none"
                        disabled={!logged}
                    >
                        <Link href="/orders" className="text-decoration-none">
                            <Clipboard2Fill size={20} className="mb-1" />
                            <small className="d-block fs-small text-black">Pedidos</small>
                        </Link>
                    </Button>
                    <Button
                        variant="link"
                        size="sm"
                        className="text-decoration-none"
                        disabled={!logged}
                    >
                        <Link href="/orders" className="text-decoration-none">
                            <Bag size={20} className="mb-1" />
                            {/* <BagFill size={20} className="mb-1" /> */}
                            <small className="d-block fs-small text-black">Carrinho</small>
                        </Link>
                    </Button>
                    <Link href="/orders">
                        <Button
                            variant="link"
                            size="sm"
                            className="text-decoration-none"
                        >
                            <InfoCircleFill size={20} className="mb-1" />
                            <small className="d-block fs-small text-black">Info</small>
                        </Button>
                    </Link>
                </Stack>
            </Container>
        </Navbar>
    )
}
