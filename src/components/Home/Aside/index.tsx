import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import {ModalOverlay} from "@/components/Modal/Overlay";
import { useDispatch } from 'react-redux';
import { close } from '@/components/Home/Header/toggleSlice';
import Link from 'next/link';

interface navLinksType {
    navLinks: {
        href: string,
        name: string
    }[]
}

const HomeAside = ({ navLinks }: navLinksType) => {
    const toggle = useSelector((state: RootState) => state.toggle.action)
    const dispatch = useDispatch()
    return(
        <aside>
            <div className={`aside fixed top-0 ${toggle?'left-0':'left-[-300px]'} transition-all bg-white shadow h-full w-[300px] flex justify-center items-center z-[1000]`}>
                <div className={`w-full h-full p-4 flex flex-col gap-4`}>
                    <Link href="/">首页</Link>
                    <Link href="/music">云播放器</Link>
                </div>
            </div>
            <ModalOverlay show={toggle} onClick={() => dispatch(close())}></ModalOverlay>
        </aside>
    )
}

export default HomeAside;