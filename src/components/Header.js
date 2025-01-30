import { Button, Container, Navbar, Stack } from "react-bootstrap"
import { GeoAltFill, PersonFill } from "react-bootstrap-icons"

export default function Header() {
    return (
        <>
            <Stack className="bg-primary-subtle text-primary-emphasis p-3">
                <h1 className="display-5 text-center m-0">Logo Ipsum</h1>
                <Button variant="link" size="sm" className="text-decoration-none">@social.ipsum</Button>
            </Stack>
            <Navbar sticky="top" className="bg-white py-3 mb-3 shadow-lg">
                <Container fluid className="flex-column">
                    <Stack direction="horizontal" className="justify-content-between">
                        <Button
                            variant="link"
                            size="sm"
                            className="d-flex align-items-center text-decoration-none"
                        >
                            <GeoAltFill size={15} />
                            <span className="ms-1 fw-light">Lorem Ipsum Dolor Sit Amet, 9999</span>
                        </Button>
                        <Button variant="link" size="sm">
                            <PersonFill size={20} />
                        </Button>
                    </Stack>
                </Container>
            </Navbar>
        </>
    )
}
