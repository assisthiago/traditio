import '@/styles/global.css';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if (pageProps.title) {
            document.title = pageProps.title;
        } else {
            document.title = 'Traditio';
        }
    }, [pageProps.title]);

    return <Component {...pageProps} />
}
