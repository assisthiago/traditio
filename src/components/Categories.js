import { Accordion, Badge, Stack } from "react-bootstrap";

import Additional from "./Additional";
import Product from "./Product";
import { CategoriesPlaceholder } from "./Placeholders";

export default function Categories({
  categories,
  module,
  loading,
}) {

  // Functions
  const translateType = (type) => {
    switch (type) {
      case 'choose one':
        return 'Escolha uma opção.';
      case 'select multiple':
        return 'Selecione várias opções.';
      case 'add on':
        return 'Adicione mais.';
      default:
        return '';
    }
  }


  return (
    <>
      {loading && (<CategoriesPlaceholder />)}

      {!loading && categories.length > 0 && (
        <>
          {module === 'index' && (
            <Accordion defaultActiveKey={
              categories.map(category => { if (category.show) return category.id })
            } alwaysOpen className='shadow-sm mb-3'>
              {categories.map((category, i) => (
                <Accordion.Item eventKey={category.id} key={i}>
                  <Accordion.Header className='bg-gradient sticky shadow z-3'>{category.title}</Accordion.Header>
                  <Accordion.Body>
                    {category.products.map((product, j, row) => (
                      <div key={j} className={'mb-' + (j === row.length - 1 ? '0' : '3')}>
                        <Product instance={product} />
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}

          {module === 'detail' && (
            <Accordion defaultActiveKey={
              categories.filter(category => category.show).map(c => c.id)
            } alwaysOpen className='shadow-sm mb-3'>
              {categories.map((category, i) => (
                <Accordion.Item eventKey={category.id} key={i}>
                  <Accordion.Header className='bg-gradient sticky shadow z-3'>
                    <Stack direction="horizontal" gap={3} className="justify-content-between">
                      <Stack direction='vertical' gap={0}>
                        <span className="small fw-bold">{category.title}</span>
                        <span className='text-muted small'>{category.subtitle}</span>
                        <span className='text-muted small mt-2'>{translateType(category.type)}</span>
                      </Stack>
                      {category.required && (
                        <Badge
                          bg={category.required ? "warning" : "light"}
                          className="small position-absolute top-0 end-0 translate-middle-y text-black shadow"
                        >Obrigatório</Badge>
                      )}
                    </Stack>
                  </Accordion.Header>
                  <Accordion.Body>
                    {category.additionals.map((additional, j, row) => (
                      <div key={j} className={'mb-' + (j === row.length - 1 ? '0' : '3')}>
                        <Additional
                          category={{
                            id: category.id,
                            type: category.type,
                            required: category.required,
                          }}
                          instance={additional}
                        />
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </>
      )}
    </>
  );
}
