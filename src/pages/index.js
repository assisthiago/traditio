import { Accordion, Container } from 'react-bootstrap';

import Item from '@/components/Item';
import Layout from '@/components/Layout';

import { ITEMS } from '@/fixtures/items';

export default function Index() {
    const logged = true;

    return (
        <Layout logged={logged} currentPage="products">
            <Container fluid>
                <Accordion defaultActiveKey={['0']} alwaysOpen className='shadow-sm mb-3'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className='bg-gradient sticky shadow z-3'>Header Ipsum 0</Accordion.Header>
                        <Accordion.Body>
                            {ITEMS.map((instance, index, row) => (
                                <div key={index} className={'mb-' + (index === row.length - 1 ? '0' : '3')}>
                                    <Item instance={instance} />
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header className='bg-gradient sticky shadow z-3'>Header Ipsum 1</Accordion.Header>
                        <Accordion.Body>
                            {ITEMS.map((instance, index, row) => (
                                <div key={index} className={'mb-' + (index === row.length - 1 ? '0' : '3')}>
                                    <Item instance={instance} />
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header className='bg-gradient sticky shadow z-3'>Header Ipsum 2</Accordion.Header>
                        <Accordion.Body>
                            {ITEMS.map((instance, index, row) => (
                                <div key={index} className={'mb-' + (index === row.length - 1 ? '0' : '3')}>
                                    <Item instance={instance} />
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header className='bg-gradient sticky shadow z-3'>Header Ipsum 3</Accordion.Header>
                        <Accordion.Body>
                            {ITEMS.map((instance, index, row) => (
                                <div key={index} className={'mb-' + (index === row.length - 1 ? '0' : '3')}>
                                    <Item instance={instance} />
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </Layout>
    );
}
