import React from 'react';
import { useDispatch } from 'react-redux';
import { open } from './toggleSlice';
import HomeHeaderNav from "@/components/Home/Nav";
import { Icons as Icon } from "@/components/Icons/index";
import {styled} from "styled-components";

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
      justify-content: center;
      align-items: center;
      flex: 1;

      @media screen and (min-width: 992px) {
        display: none;
      }
    `

const NavRight =
    styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    `

const HomeHeader = () => {
    const dispatch = useDispatch()
    return(
        <header className="header sticky top-0 bg-[#ffffffdd] shadow flex items-center justify-center backdrop-saturate-[1.8] backdrop-blur-[5px]">
            <nav className="navbar flex justify-evenly h-[70px] w-full px-5 py-1 gap-4">
                <NavLeft>
                    <button
                        className="block w-5 rounded-xl"
                        aria-label="控制侧边栏显示"
                        onClick={() => dispatch(open())}
                    >
                        <Icon className="icon-menu" name="Menu" height={20} width={20} fill="#333333"/>
                    </button>
                </NavLeft>
                <div className="flex justify-center items-center grow-[2] overflow-auto">
                    <HomeHeaderNav navLinks={navLinks}></HomeHeaderNav>
                </div>
                <NavRight>
                    <button
                        className="block w-5 rounded-xl"
                        aria-label="搜索"
                        onClick={() => dispatch(open())}
                    >
                        <Icon className="icon-search" name="Search" height={20} width={20} fill="#333333"/>
                    </button>
                </NavRight>
            </nav>
        </header>
    )
}

export default HomeHeader;