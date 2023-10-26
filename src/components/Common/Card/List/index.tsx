import React from 'react';

const List = ({children} : {children: React.ReactNode}) => {
    return(
        <div className={`flex flex-wrap gap-2`}>{children}</div>
    )
}

export default List;