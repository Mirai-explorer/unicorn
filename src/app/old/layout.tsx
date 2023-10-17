import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: '旧版测试'
}

export default function OldLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <div className="old relative">{children}</div>
    )
}