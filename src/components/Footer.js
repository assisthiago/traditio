import Link from "next/link";
const { Navbar, Container, Stack, Button } = require("react-bootstrap");
import { BagFill, HouseFill, InfoCircleFill, Clipboard2Fill, Bag } from "react-bootstrap-icons";

export default function Footer({ logged = false, currentPage = "home" }) {

    return (
        <Navbar fixed="bottom" className="bg-white flex-column py-0 shadow-lg">
            <Container fluid className="py-1">
                <Stack direction="horizontal" className="justify-content-around w-100">
                    <Button
                        variant="link"
                        size="sm"
                        className="text-decoration-none"
                        active={currentPage === 'home'}
                    >
                        <Link href="/" className="text-decoration-none">
                            <HouseFill size={20} className="mb-1" />
                            <small className="d-block fs-small text-black">Início</small>
                        </Link>
                    </Button>
                    <Button
                        variant="link"
                        size="sm"
                        className="text-decoration-none"
                        active={currentPage === 'orders'}
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
                        active={currentPage === 'chart'}
                        disabled={!logged}
                    >
                        <Link href="/chart" className="text-decoration-none">
                            <Bag size={20} className="mb-1" />
                            {/* <BagFill size={20} className="mb-1" /> */}
                            <small className="d-block fs-small text-black">Carrinho</small>
                        </Link>
                    </Button>
                    <Button
                        variant="link"
                        size="sm"
                        className="text-decoration-none"
                        active={currentPage === 'info'}
                    >
                        <Link href="/info" className="text-decoration-none">
                            <InfoCircleFill size={20} className="mb-1" />
                            <small className="d-block fs-small text-black">Info</small>
                        </Link>
                    </Button>
                </Stack>
            </Container>
        </Navbar>
    )
}
