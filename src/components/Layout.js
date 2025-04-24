import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, currentPage }) {
    const logged = false;
    const productsInCart = 0;

    return (
        <>
            <Header logged={logged} />
            {children}
            <Footer logged={logged} currentPage={currentPage} productsInCart={productsInCart} />
        </>
    );
}
