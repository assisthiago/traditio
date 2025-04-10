import { Button, Card, Col, Form, Image, InputGroup, Stack } from "react-bootstrap"

export default function Additional({ instance, type }) {
  return (
    <>
      <Col xs={12}>
        <Card border="light" className="shadow-lg">
          <Card.Body>
            <Stack direction="horizontal" gap={3} className="justify-content-between">

              {instance?.image && (
                <div className="position-relative">
                  <Image src={instance.image} alt={instance.name} rounded fluid />
                </div>
              )}

              <Stack direction="vertical" gap={0} className="w-90px">
                <h5 className="mb-0 small fw-bold">{instance.name}</h5>
                <span className="mb-0 small">R${instance.price}</span>

                {type === "add on" && (
                  <div className="d-flex justify-content-end">
                    <InputGroup className="w-90px">
                      <Button variant="light" size="sm">-</Button>
                      <Form.Control type="number" size="sm" className="border-light text-center" />
                      <Button variant="primary" size="sm">+</Button>
                    </InputGroup>
                  </div>
                )}

              </Stack>

              {type === "choose one" && (
                <>
                  <input type="radio" name="additional-choose-one" id={instance.id} value={instance.id} className="btn-check" />
                  <label className="btn btn-outline-primary btn-lg" for={instance.id}></label>
                </>
              )}

              {type === "select multiple" && (
                <>
                  <input type="checkbox" name="additional-select-multiple" id={instance.id} value={instance.id} className="btn-check" />
                  <label className="btn btn-outline-primary btn-lg" for={instance.id}></label>
                </>
              )}

            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}
