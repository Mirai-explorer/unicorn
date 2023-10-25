import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/images/logo-full.png';
import React from "react";
import {styled} from "styled-components";

interface navLinksType {
    navLinks: {
        href: string,
        name: string
    }[]
}

const List =
    styled.ul`
      @media screen and (min-width: 992px) {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        overflow: hidden;
      }
      
      display: none;
    `

const ListItem =
    styled.li`
      display: list-item;
      flex-shrink: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: color .1s linear;
      
      &:hover {
        color: #6CA37A;
      }
      
      & a {
        display: flex;
        padding: 1rem;
        width: 100%;
      }
      
      & a.highlight {
        color: #6CA37A;
      }
    `

const HomeHeaderNav = ({ navLinks }: navLinksType) => {
    const pathname = usePathname()
    return(
        <nav className="nav flex gap-4 whitespace-nowrap">
            <div className="flex items-center">
                <Image src={logo} alt="logo image" width={170} height={40}/>
            </div>
            <List>
                {navLinks.map((item, id) => (
                    <ListItem key={id}>
                        <Link href={item.href} className={item.href === pathname ? 'highlight':''}>{item.name}</Link>
                    </ListItem>
                ))}
            </List>
        </nav>
    )
}

export default HomeHeaderNav;