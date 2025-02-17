import { Accordion, Badge, Stack } from "react-bootstrap";

import Item from "./Item";
import Additional from "./Additional";

export default function Categories({ categories, type }) {
  return (
    <>
      {type === 'products' && (
        <Accordion defaultActiveKey={[0, 1]} alwaysOpen className='shadow-sm mb-3'>
          {categories.map((category, i) => (
            <Accordion.Item eventKey={i} key={i}>
              <Accordion.Header className='bg-gradient sticky shadow z-3'>{category.name}</Accordion.Header>
              <Accordion.Body>
                {category.items.map((instance, j, row) => (
                  <div key={j} className={'mb-' + (j === row.length - 1 ? '0' : '3')}>
                    <Item instance={instance} />
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}

      {type === 'product' && (
        <Accordion defaultActiveKey={[0, 1]} alwaysOpen className='shadow-sm mb-3'>
          {categories.map((category, i) => (
            <Accordion.Item eventKey={i} key={i}>
              <Accordion.Header className='bg-gradient sticky shadow z-3'>
                <Stack direction="horizontal" gap={3} className="justify-content-between">
                  <Stack direction='vertical' gap={0}>
                    <span className="small fw-bold">{category.title}</span>
                    <span className='text-muted small'>{category.subtitle}</span>
                  </Stack>
                  {category.required && (
                    <Badge
                      bg="warning"
                      className="small position-absolute top-50 end-50px translate-middle-y text-black shadow"
                    >
                      Obrigatório
                    </Badge>
                  )}
                  {!category.required && (
                    <Badge
                      bg="light"
                      className="small position-absolute top-50 end-50px translate-middle-y text-black shadow"
                    >
                      Opcional
                    </Badge>
                  )}
                </Stack>
              </Accordion.Header>
              <Accordion.Body>
                {category.items.map((item, j, row) => (
                  <div key={j} className={'mb-' + (j === row.length - 1 ? '0' : '3')}>
                    <Additional instance={item} type={category.type} />
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </>
  );
}
