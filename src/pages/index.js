import 'bootstrap/dist/css/bootstrap.min.css';

import { Accordion, Container } from 'react-bootstrap';

import Header from '@/components/Header';
import Item from '@/components/Item';

const ITEMS = [
    { id: 1, name: "Aliqua Ut", price: 234.56, image: "https://placehold.co/100" },
    { id: 2, name: "Lorem Ipsum", price: 1234.56, image: "https://placehold.co/100" },
    { id: 3, name: "Dolor Sit", price: 789.01, image: "https://placehold.co/100" },
    { id: 4, name: "Amet Consectetur", price: 2345.67, image: "https://placehold.co/100" },
    { id: 5, name: "Adipiscing Elit", price: 890.12, image: "https://placehold.co/100" }
]

export default function Index() {
    return (
        <>
            <Header />
            <Container fluid>
                <Accordion defaultActiveKey={['0']} alwaysOpen className='shadow-sm'>
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
        </>
    );
}
