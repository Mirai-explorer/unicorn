import React from "react";

const HomeMain = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => {
    return(
        <main className="main flex justify-center items-center bg-[#F8F9FA] p-5">
            {props.children}
        </main>
    )
}

export default HomeMain;