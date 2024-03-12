"use client"
import dynamic from "next/dynamic";
import {store} from "@/app/store";
import {Provider} from "react-redux";
import HomeMain from "@/components/Home/Main";

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
        <Provider store={store}>
            <div>
                <HomeHeader></HomeHeader>
                <HomeAside></HomeAside>
                <HomeMain>
                    <div className="main_layout flex flex-col gap-4 tracking-wide">
                        <Meme></Meme>
                    </div>
                </HomeMain>
            </div>
        </Provider>
    )
}

export default MemePage;