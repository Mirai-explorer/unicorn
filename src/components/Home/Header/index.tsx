import React from 'react';
import HomeHeaderNav from "@/components/Home/Nav";
import { Icons as Icon } from "@/components/Icons/index";
import {styled} from "styled-components";
import {useAside} from '@/components/Home/Header/AsideContext';

const navLinks = [
    {
        href: '/',
        name: '首页'
    },
    {
        href: '/music',
        name: '云播放器'
    },
    {
        href: '/blog',
        name: '博客'
    },
    {
        href: '/kit',
        name: '工具箱'
    },
    {
        href: '/new',
        name: '新特性测试'
    }
]

const NavLeft =
    styled.div`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex: 1;

      @media screen and (min-width: 992px) {
        display: none;
      }
    `

const NavRight =
    styled.div`
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 1;
    `

const HomeHeader = () => {
    const { state, dispatch } = useAside();
    return(
        <header
            className="header sticky top-0 bg-[#ffffffdd] shadow flex items-center justify-center backdrop-saturate-[1.8] backdrop-blur-[5px]">
            <nav
                className="navbar flex justify-evenly h-[70px] w-full !px-5 !py-1 gap-4 max-w-[992px] min-[992px]:justify-between">
                <NavLeft>
                    <button
                        className="block w-5 rounded-xl"
                        aria-label="控制侧边栏显示"
                        onClick={() => dispatch({type: 'OPEN'})}
                    >
                        <Icon className="icon-menu" name="Menu" height={20} width={20} fill="#333333"/>
                    </button>
                </NavLeft>
                <div className="flex justify-center min-[992px]:justify-start items-center grow-[2] overflow-auto">
                    <HomeHeaderNav navLinks={navLinks}></HomeHeaderNav>
                </div>
                <NavRight>
                    <button
                        className="block w-5 rounded-xl"
                        aria-label="搜索"
                        onClick={() => dispatch({type: 'OPEN'})}
                    >
                        <Icon className="icon-search" name="Search" height={20} width={20} fill="#333333"/>
                    </button>
                </NavRight>
            </nav>
        </header>
    )
}

export default HomeHeader;