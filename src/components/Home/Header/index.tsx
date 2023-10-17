import React from 'react';
import { useDispatch } from 'react-redux';
import { open } from './toggleSlice';
import HomeHeaderNav from "../Nav";

const navLinks = [{
    name: '主页',
    href: '/'
}, {
    name: '博客',
    href: '/blog'
}, {
    name: 'Mirai 云音乐播放器',
    href: '/music'
}]

const HomeHeader = () => {
    const dispatch = useDispatch()
    return(
        <header className="header sticky top-0 bg-[#ffffffdd] shadow flex items-center justify-center backdrop-saturate-[1.8] backdrop-blur-[5px]">
            <nav className="navbar flex justify-evenly h-[70px] w-full px-5 py-1 gap-4">
                <div className="flex justify-start items-center flex-1">
                    <button
                        className="block w-10 text-sm text-amber-700 bg-amber-100 rounded-xl"
                        aria-label="控制侧边栏显示"
                        onClick={() => dispatch(open())}
                    >+</button>
                </div>
                <div className="flex justify-center items-center grow-[2] overflow-auto">
                    <HomeHeaderNav navLinks={navLinks}></HomeHeaderNav>
                </div>
                <div className="flex justify-end items-center flex-1">RIGHT</div>
            </nav>
        </header>
    )
}

export default HomeHeader;