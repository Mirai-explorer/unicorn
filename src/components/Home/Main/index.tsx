import React from "react";

const HomeMain = (props: { children: string | number | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    return(
        <main className="main">
            {props.children}
        </main>
    )
}

export default HomeMain;