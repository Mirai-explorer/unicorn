import {ReactNode} from "react";

const List = ({ children } : { children: ReactNode }) => {
    return(
        <div className="article_list">
            {children}
        </div>
    )
}

export default List;