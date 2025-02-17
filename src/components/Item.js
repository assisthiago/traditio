import Link from "next/link"
import { Card, Col, Image, Stack } from "react-bootstrap"

export default function Item({ instance }) {
    return (
        <>
            <Col xs={12}>
                <Link href={`/products/${instance.id}`} className="text-decoration-none">
                    <Card border="light" className="shadow-lg">
                        <Card.Body>
                            <Stack direction="horizontal" gap={3} className="justify-content-between">
                                <div className="position-relative">
                                    <Image src={instance.image} alt={instance.name} rounded fluid />
                                </div>
                                <Stack direction="vertical" className="justify-content-around">
                                    <h5 className="mb-0 small fw-bold">{instance.name}</h5>
                                    <span className="d-inline-block text-truncate small" style={{ width: '150px' }}>
                                        {instance.description}
                                    </span>
                                    <span className="mb-0 small">A partir de R${instance.price}</span>
                                </Stack>
                            </Stack>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
        </>
    )
}
