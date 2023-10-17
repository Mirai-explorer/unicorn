import type { Metadata } from 'next'

const NotFound = () => {
    return(
        <div>404 | Not Found</div>
    )
};

export const metadata: Metadata = {
    title: '404 | Not Found',
}

export default NotFound;