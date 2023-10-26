import React from "react";

const Column = ({children} : { children?: React.ReactNode }) => {
    return(
        <div className={`flex flex-wrap gap-y-2`}>
            {children}
        </div>
    )
}

export default Column;