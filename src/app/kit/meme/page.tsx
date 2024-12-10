"use client"
import dynamic from "next/dynamic";
import HomeMain from "@/components/Home/Main";
import React from 'react'
import {AsideProvider} from "@/components/Home/Header/AsideContext";

const HomeHeader = dynamic(() => import("@/components/Home/Header"), {
    ssr: false
});

const HomeAside = dynamic(() => import("@/components/Home/Aside"), {
    ssr: false
});

const Meme = dynamic(() => import("@/components/Kit/Meme"), {
    ssr: false
});

const MemePage = () => {
    return(
        <div>
            <AsideProvider>
                <HomeHeader></HomeHeader>
                <HomeAside></HomeAside>
                <HomeMain>
                    <div className="main_layout flex flex-col gap-4 tracking-wide">
                        <Meme></Meme>
                    </div>
                </HomeMain>
            </AsideProvider>
        </div>
    )
}

export default MemePage;