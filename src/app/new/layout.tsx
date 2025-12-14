import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: '新特性测试'
}

export default function OldLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <div className="">{children}</div>
    )
}