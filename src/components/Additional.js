import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Image, InputGroup, Stack } from "react-bootstrap";

export default function Additional({
  category,
  instance,
}) {

  // State and Effect
  const [item, setItem] = useState({ id: "", value: "", quantity: 1 });

  useEffect(() => {
    if (!item.id) {
      setItem({
        id: instance.id,
        value: category.type === 'add on' ? 0 : "",
        quantity: 1,
      });
    }
  }, [instance]);

  // Functions
  const updateAddOnValue = (action) => {
    if (action === "decrement" && item.value >= 1)
      setItem({ ...item, value: item.value - 1 });
    else if (action === "increment")
      setItem({ ...item, value: item.value + 1 });
  };

  return (
    <>
      <Col xs={12}>
        <Card border="light" className="shadow-lg">
          <Card.Body>
            <Stack direction="horizontal" gap={3} className="justify-content-between">

              {instance?.image && (
                <div className="position-relative w-90px">
                  <Image src={instance.image} alt={instance.name} rounded fluid />
                </div>
              )}

              <Stack direction="vertical" gap={0} className="w-90px">
                <h5 className="mb-0 small fw-bold">{instance.name}</h5>
                <span className="mb-0 small">R${instance.price}</span>

                {category.type === "add on" && (
                  <div className="d-flex justify-content-end">
                    <input
                      type="radio"
                      name={`${instance.id}__add-on`}
                      id={instance.id}
                      value={item.value}
                      checked={item.value > 0}
                      required={category.required}
                      className="btn-check"
                      onChange={() => { }}  // Prevent default behavior
                    />
                    <label className="invisible" htmlFor={instance.id}></label>

                    <InputGroup className="w-90px">
                      <Button
                        variant="light"
                        size="sm"
                        onClick={() => updateAddOnValue("decrement")}>-</Button>
                      <Form.Control
                        type="number"
                        size="sm"
                        className="border-light text-center"
                        value={item.value}
                        name={`${instance.id}__add-on-number`}
                        readOnly
                        onChange={() => { }}  // Prevent default behavior
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => updateAddOnValue("increment")}>+</Button>
                    </InputGroup>
                  </div>
                )}

              </Stack>

              {category.type === "choose one" && (
                <>
                  <input
                    type="radio"
                    name={`${category.id}__choose-one`}
                    id={instance.id}
                    value={instance.id}
                    required={category.required}
                    className="btn-check"
                  />
                  <label className="btn btn-outline-primary btn-lg" htmlFor={instance.id}></label>
                </>
              )}

              {category.type === "select multiple" && (
                <>
                  <input
                    type="checkbox"
                    name={`${category.id}__select-multiple`}
                    id={instance.id}
                    value={instance.id}
                    required={category.required}
                    className="btn-check"
                  />
                  <label className="btn btn-outline-primary btn-lg" htmlFor={instance.id}></label>
                </>
              )}

            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}
