import { Accordion, Card, Col, Placeholder, Stack } from "react-bootstrap";

export function CategoriesPlaceholder() {
  return (
    [1, 2].map((i) => (
      <Accordion defaultActiveKey={['0']} alwaysOpen className='shadow-sm mb-3' key={i}>
        <Accordion.Item eventKey="0">
          <Accordion.Header className='bg-gradient sticky shadow z-3'>
            <Placeholder as="h5" animation="glow" className="mb-0 small fw-bold" style={{ width: '100%' }}>
              <Placeholder xs={6} />
            </Placeholder>
          </Accordion.Header>
          <Accordion.Body>
            <ProductsPlaceholder />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    ))
  );
}

export function ProductsPlaceholder() {
  return (
    [1, 2].map((i) => (
      <Col xs={12} key={i}>
        <Card border="light" className="shadow-lg">
          <Card.Body>
            <Stack direction="horizontal" gap={3} className="justify-content-between">
              <div className="position-relative">
                <Placeholder as="div" animation="glow" className="rounded" style={{ width: '100px', height: '100px' }}>
                  <Placeholder xs={12} className="rounded" style={{ height: '100%' }} />
                </Placeholder>
              </div>
              <Stack direction="vertical" className="justify-content-around">
                <Placeholder as="h5" animation="glow" className="mb-0 small fw-bold">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as="span" animation="glow" className="d-inline-block small" style={{ width: '150px' }}>
                  <Placeholder xs={3} /> <Placeholder xs={6} /> <Placeholder xs={1} />
                </Placeholder>
                <Placeholder as="span" animation="glow" className="mb-0 small">
                  <Placeholder xs={6} /> <Placeholder xs={3} />
                </Placeholder>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    ))
  );
}

export function ProductPlaceholder() {
  return (
    <>
      <Placeholder
        as="div"
        animation="glow"
        className="rounded" style={{ width: '100%', height: '300px' }}
      >
        <Placeholder xs={12} className="rounded" style={{ height: '100%' }} />
      </Placeholder>
      <Placeholder as="h1" animation="glow" className="my-2">
        <Placeholder xs={6} size="lg" />
      </Placeholder>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={6} size="sm" />
        <Placeholder xs={3} size="sm" />
        <Placeholder xs={9} size="sm" />
        <Placeholder xs={6} size="sm" />
      </Placeholder>
    </>
  );
}
