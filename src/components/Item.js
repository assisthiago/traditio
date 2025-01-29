import { Card, Col, Image, Stack } from "react-bootstrap"

export default function Item({ instance }) {
    return (
        <>
            <Col sm={12}>
                <Card border="light" className="shadow-lg">
                    <Card.Body>
                        <Stack direction="horizontal" gap={3} className="justify-content-between">
                            <div className="position-relative">
                                <Image src={instance.image} alt={instance.name} rounded fluid />
                            </div>
                            <Stack direction="vertical" className="justify-content-around">
                                <h5 className="mb-0 fw-light fs-6">{instance.name}</h5>
                                <h5 className="mb-0 fw-bold fs-6">R$ {instance.price}</h5>
                            </Stack>
                        </Stack>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}
