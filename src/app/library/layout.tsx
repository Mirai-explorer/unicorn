import React from "react";

export default function LibraryLayout({children,}: {
    children: React.ReactNode
}) {
    return <div className="library">{children}</div>
}