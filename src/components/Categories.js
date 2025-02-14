import { Accordion } from "react-bootstrap";

import Item from "./Item";

export default function Categories({ categories }) {
  return (
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
  );
}
