import Link from 'next/link';

const Layout = ({children})=> {
    return <div>
        <header>
            <nav>
                <Link href='/'>Products</Link>
                <Link href='/cart'>Cart</Link>
            </nav>
        </header>
        <div className='container'>{children}</div>
    </div>
}
export default Layout