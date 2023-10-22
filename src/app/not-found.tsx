"use client"
import type { Metadata } from 'next'
import {styled} from "styled-components";
import logo from '@/assets/images/logo-full.png'
import Image from "next/image";
import { Icons as Icon } from "@/components/Icons/index";
import React from "react";

const Page =
    styled.div`
      display: flex;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `
const Layout =
    styled.div`
      display: flex;
      flex-direction: column;
      flex: 1;
    `
const Section =
    styled.section`
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      gap: 2rem;
    `

const Block =
    styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      
      &.logo {
        gap: 1rem;
        font-size: 24px;
      }
      
      &.logo img {
        width: 50vw;
        max-width: 340px;
      }
      
      &.title {
        font-size: 20px;
      }

      &.guide {
        gap: 1rem;
      }
    `

const Link =
    styled.a`
        color: #6AB4F3;
    `

const Footer =
    styled.footer`
      min-height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
    `

const NotFound = () => {
    return(
        <Page>
            <Layout>
                <Section>
                    <Block className={`logo`}>
                        <Image src={logo} alt="logo image"/>
                        <div>|</div>
                        <div>404</div>
                    </Block>
                    <Block className={`title`}>
                        哎呀，这个网页走失啦
                    </Block>
                </Section>
                <Footer>
                    <Block className={`guide`}>
                        <span>来这里看看吧</span>
                        <Link href="https://github.com/Mirai-explorer/unicorn">
                            <Icon className={`icon-github`} name="GitHub" width={16} height={16} fill="#000000" />
                        </Link>
                    </Block>
                    <Block>© 2023 - Mirai 探索者</Block>
                </Footer>
            </Layout>
        </Page>
    )
};

export const metadata: Metadata = {
    title: '404 | Not Found',
}

export default NotFound;