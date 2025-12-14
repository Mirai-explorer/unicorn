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
      @media screen and (min-width: 1024px) {
        display: flex;
        flex-direction: row;
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
        color: #91BEA2;

        &:hover {
            color: #6F9B80;
        }

        & a {
            display: flex;
            padding: 2rem;
            width: 100%;
            font-size: 1.125rem;
        }

        & a.highlight {
            color: #6F9B80;
        }
    `

const HomeHeaderNav = ({ navLinks }: navLinksType) => {
    const pathname = usePathname()
    return(
        <nav className="nav flex justify-between whitespace-nowrap min-[1024px]:w-full">
            <div className="flex items-center">
                <Image src={logo} alt="logo image" width={170} height={40} className={"rounded-2xl"}/>
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