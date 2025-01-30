import 'bootstrap/dist/css/bootstrap.min.css';

import { Accordion, Container } from 'react-bootstrap';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Item from '@/components/Item';

import { ITEMS } from '@/fixtures/items';

export default function Index() {
    return (
        <>
            <Header />
            <Container fluid>
                <Accordion defaultActiveKey={['0']} alwaysOpen className='shadow-sm mb-3'>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className='sticky shadow z-3'>Header Ipsum 0</Accordion.Header>
                        <Accordion.Body>
                            {ITEMS.map((instance, index, row) => (
                                <div key={index} className={'mb-' + (index === row.length - 1 ? '0' : '3')}>
                                    <Item instance={instance} />
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header className='sticky shadow z-3'>Header Ipsum 1</Accordion.Header>
                        <Accordion.Body>
                            {ITEMS.map((instance, index, row) => (
                                <div key={index} className={'mb-' + (index === row.length - 1 ? '0' : '3')}>
                                    <Item instance={instance} />
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header className='sticky shadow z-3'>Header Ipsum 2</Accordion.Header>
                        <Accordion.Body>
                            {ITEMS.map((instance, index, row) => (
                                <div key={index} className={'mb-' + (index === row.length - 1 ? '0' : '3')}>
                                    <Item instance={instance} />
                                </div>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header className='sticky shadow z-3'>Header Ipsum 3</Accordion.Header>
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
            <Footer />
        </>
    );
}
