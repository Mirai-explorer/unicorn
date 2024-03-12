import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: '表情包生成'
}

export default function MemeLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <>{children}</>
    )
}