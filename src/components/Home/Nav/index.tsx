import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'
import logo from '@/assets/images/logo-full.png'

interface navLinksType {
    navLinks: {
        href: string,
        name: string
    }[]
}

const HomeHeaderNav = ({ navLinks }: navLinksType) => {
    const pathname = usePathname()
    return(
        <nav className="nav flex gap-4 whitespace-nowrap">
            <Image src={logo} alt="logo image" width={170} height={40}/>
        </nav>
    )
}

export default HomeHeaderNav;