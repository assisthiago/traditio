import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { Container, Image } from "react-bootstrap";

import { ITEMS } from '@/fixtures/items';

export default function Product() {
    const router = useRouter();
    const { id } = router.query;
    const instance = ITEMS[0];
    const logged = true;

    return (
        <Layout logged={logged} currentPage="products">
            <Container fluid>
                <Image src="https://placehold.co/1000" alt={instance.name} rounded fluid className="shadow-sm" />
                <h1 className="my-2 display-5">{instance.name}</h1>
                <p className="text-muted">{instance.description}</p>
                <hr />
            </Container>
        </Layout>
    )
}
