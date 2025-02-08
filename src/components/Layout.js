import 'bootstrap/dist/css/bootstrap.min.css';

import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, logged, currentPage }) {
    return (
        <>
            <Header logged={logged} />
            {children}
            <Footer logged={logged} currentPage={currentPage} />
        </>
    );
}
