import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: '新特性测试'
}

export default function OldLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden h-full w-full">{children}</div>
    )
}