import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Image, InputGroup, Stack } from "react-bootstrap";

export default function Additional({
  category,
  additional,
  additionals = [],
  setAdditionals = () => { },
}) {

  // State and Effect
  const [item, setItem] = useState({ id: "", value: false, quantity: 0 });

  useEffect(() => {
    // Update the item state with the additional's value
    if (item.id === "")
      setItem({
        ...additional,
        value: false,
        quantity: 0,
        category: category.id
      });
  }, [additional]);

  // Handlers
  const handleAddOn = (action) => {
    let quantity = item.quantity;

    // Update the item's quantity based on the action
    if (action === "decrement" && item.quantity >= 1) quantity -= 1;
    else if (action === "increment") quantity += 1;

    setItem({ ...item, value: quantity >= 1 ? true : false, quantity: quantity });

    // Update the additionals state
    setAdditionals([
      ...additionals.filter(_additional => _additional.id !== item.id),
      {
        ...additional,
        category: category.id,
        value: quantity >= 1 ? true : false,
        quantity: quantity,
      }
    ]);
  };

  const handleChooseOne = (e) => {
    const { checked } = e.target;

    // Update the item's value based on the radio button state
    setItem({ ...item, value: checked });

    // Update the additionals state
    setAdditionals([
      ...additionals.map(_additional => {
        if (_additional.id === item.id) {
          // Update the selected item
          return {
            ..._additional,
            category: category.id,
            value: checked,
            quantity: checked ? 1 : 0,
          }
        }
        else if (_additional.category === item.category) {
          // Reset other items in the same category
          return {
            ..._additional,
            value: false,
            quantity: 0,
          }
        }
        else {
          // Keep other items unchanged
          return { ..._additional }
        }
      })
    ])
  }

  const handleSelecMultiple = (e) => {
    const { checked } = e.target;

    // Update the item's value based on the checkbox state
    setItem({ ...item, value: checked });

    // Update the additionals state
    setAdditionals([
      ...additionals.filter(_additional => _additional.id !== item.id),  // Remove the current item
      {
        ...item,
        category: category.id,
        value: checked,
        quantity: checked ? 1 : 0,
      }
    ])
  };

  return (
    <>
      <Col xs={12}>
        <Card border="light" className="shadow-lg">
          <Card.Body>
            <Stack direction="horizontal" gap={3} className="justify-content-between">

              {additional?.image && (
                <div className="position-relative w-90px">
                  <Image src={additional.image} alt={additional.name} rounded fluid />
                </div>
              )}

              <Stack direction="vertical" gap={0} className="w-90px">
                <h5 className="mb-0 small fw-bold">{additional.name}</h5>
                <h5 className="mb-1 small fw-light">{additional.size}{additional.unit}.</h5>
                <span className="mb-0 small">R${additional.price}</span>

                <div className="d-flex justify-content-end">

                  {category.type === "add on" && (
                    <InputGroup className="w-90px">
                      <Button
                        variant="light"
                        size="sm"
                        className="z-1"
                        onClick={() => handleAddOn("decrement")}>-</Button>
                      <Form.Control
                        type="number"
                        size="sm"
                        className="border-light text-center"
                        value={item.quantity}
                        name={`${additional.id}__add-on-number`}
                        onChange={() => { }}
                        readOnly
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        className="z-1"
                        onClick={() => handleAddOn("increment")}>+</Button>
                    </InputGroup>
                  )}

                  {category.type === "choose one" && (
                    <Form.Check
                      type="switch"
                      className="d-flex justify-content-end"
                      name={`${category.id}__choose-one`}
                      id={additional.id}
                      value={additionals.find(_additional => _additional.id === item.id)?.value}
                      checked={additionals.find(_additional => _additional.id === item.id)?.value}
                      onChange={handleChooseOne}
                    />
                  )}

                  {category.type === "select multiple" && (
                    <Form.Check
                      type="switch"
                      name={`${category.id}__select-multiple`}
                      id={additional.id}
                      value={additionals.find(_additional => _additional.id === item.id)?.value}
                      checked={additionals.find(_additional => _additional.id === item.id)?.value}
                      onChange={handleSelecMultiple}
                    />
                  )}

                </div>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}
