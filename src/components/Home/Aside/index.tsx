import React from "react";
import {ModalOverlay} from "@/components/Modal/Overlay";
import { useAside } from '@/components/Home/Header/AsideContext';
import Link from 'next/link';
import Image from "next/image";
import { styled } from "styled-components";
import logo from '@/assets/images/logo-full.png'
import { CIcons as Icon } from "@/components/Icons/index";

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

const Drawer =
    styled.div`
      display: flex;
      width: 100%;
      height: 100%;
    `

const Aside =
    styled.aside`
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 5;
      width: 320px;
      height: 100%;
      border-radius: 0 1rem 1rem 0;
      background: #ffffff;
      transition-property: transform, box-shadow;
      transition-duration: 300ms;
      transition-timing-function: cubic-bezier(0.2, 0, 0, 1);
      will-change: transform;
      

      &.aside {
        box-shadow: none;
        transform: translateX(-320px);
      }
      
      &.open {
        box-shadow: none;
        transform: translateX(0);
      }
    `

const Content =
    styled.div`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 1rem;
      gap: 1rem;
    `

const List =
    styled.ul`
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow-y: auto;
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
    `

const Section =
    styled.section`
      display: flex;
      justify-content: center;
      align-items: center;
      
      .header {
        
      }
      
      &.footer {
        flex-direction: column;
        gap: 2rem;
      }
    `

const Contacts =
    styled.span`
      display: inline-flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;

      & a {
        transition: color;
      }
      
      & a:hover {
        
      }
    `

const HomeAside = () => {
    const { state, dispatch } = useAside();
    return(
        <Drawer>
            <Aside className={`aside ${state.action ? 'open' : ''}`}>
                <Content>
                    <Section className={`header`}>
                        <button onClick={() => dispatch({ type: 'CLOSE' })}>

                        </button>
                        <Image src={logo} alt="logo" width={170} height={40}></Image>
                    </Section>
                    <List>
                        {navLinks.map((item, id) => (
                            <ListItem key={id}>
                                <Link href={item.href}>{item.name}</Link>
                            </ListItem>
                        ))}
                    </List>
                    <Section className={`footer`}>
                        <Contacts>
                            <a href="https://wpa.qq.com/msgrd?v=3&uin=1150963042&site=qq&menu=yes&jumpflag=1" aria-label="1150963042">
                                <Icon className={`icon-qq`} name="QQ" width={26} height={26} />
                            </a>
                            <a href="https://space.bilibili.com/198506128">
                                <Icon className={`icon-bilibili`} name="Blibili" width={24} height={24} />
                            </a>
                            <a href="https://activity.kugou.com/share/v-c7b4da67/index.html?id=635cf9b017476c2bbda98869376f1f91">
                                <Icon className={`icon-kugou`} name="Kugou" width={24} height={24} />
                            </a>
                            <a href="https://www.miyoushe.com/ys/accountCenter/postList?id=170593161">
                                <Icon className={`icon-miyoushe`} name="miHoYo" width={24} height={24} />
                            </a>
                            <a href="https://x.com/tokai_nahida">
                                <Icon className={`icon-twitter`} name="Twitter" width={26} height={26} />
                            </a>
                            <a href="https://github.com/Mirai-explorer">
                                <Icon className={`icon-github`} name="GitHub" width={24} height={24} />
                            </a>
                            <a href="mailto:tangjw0226@gmail.com" aria-label="tangjw0226@gmail.com">
                                <Icon className={`icon-gmail`} name="GMail" width={24} height={24} />
                            </a>
                        </Contacts>
                        <span>by Aubrey</span>
                    </Section>
                </Content>
            </Aside>
            <ModalOverlay
                show={state.action}
                onClick={() => dispatch({ type: 'CLOSE' })}
            ></ModalOverlay>
        </Drawer>
    )
}

export default HomeAside;