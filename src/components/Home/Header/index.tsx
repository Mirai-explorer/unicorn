import React from 'react';
import HomeHeaderNav from "@/components/Home/Nav";
import { Icons as Icon } from "@/components/Icons/index";
import { GIcons as GIcon } from "@/components/Icons/index";
import {styled} from "styled-components";
import {useAside} from '@/components/Home/Header/AsideContext';

const navLinks = [
    {
        href: '/',
        name: '首页'
    },
    {
        href: '/blog',
        name: '博客'
    },
    {
        href: '/music',
        name: '云播放器'
    },
    {
        href: '/kit',
        name: '工具箱'
    },
    {
        href: '/new',
        name: '技术测试'
    },
    {
        href: '/new',
        name: '更多'
    }
]

const NavLeft =
    styled.div`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 1;

      @media screen and (min-width: 1024px) {
        display: none;
      }
    `

const NavRight =
    styled.div`
      display: flex;
      justify-content: flex-end;
      align-items: center;
    `

const HomeHeader = () => {
    const { state, dispatch } = useAside();
    return(
        <header
            className="header fixed top-0 w-full bg-[#ffffffc0] flex items-center justify-center z-[1000] backdrop-saturate-[2] backdrop-blur-[4px]">
            <nav
                className="navbar flex justify-evenly h-16 min-md:h-24 w-full gap-12 max-[1024px]:!px-8 max-[1520px]:!px-16 max-w-[1392px] min-[1024px]:justify-between">
                <NavLeft>
                    <button
                        className="block w-5 rounded-xl"
                        aria-label="控制侧边栏显示"
                        onClick={() => dispatch({type: 'OPEN'})}
                    >
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.0002 24H5.3335M26.6668 16H5.3335M26.6668 8H5.3335" stroke="url(#paint0_linear_255_245)" strokeWidth="2" strokeLinecap="round"/>
                            <defs>
                                <linearGradient id="paint0_linear_255_245" x1="16.0002" y1="8" x2="16.0002" y2="24" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#EB695B"/>
                                    <stop offset="1" stopColor="#F2ADA5"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </button>
                </NavLeft>
                <div className="flex justify-center min-[1024px]:justify-start items-center overflow-auto w-full">
                    <HomeHeaderNav navLinks={navLinks}></HomeHeaderNav>
                </div>
                <NavRight>
                    <button
                        className="block w-5 rounded-xl"
                        aria-label="搜索"
                        onClick={() => dispatch({type: 'OPEN'})}
                    >
                        <GIcon className="icon-search" name="Search" height={24} width={24} fill="url(#searchGradient)"/>
                    </button>
                </NavRight>
            </nav>
        </header>
    )
}

export default HomeHeader;