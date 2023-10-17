import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: '博客'
}

export default function BlogLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <div className="blog relative">{children}</div>
    )
}