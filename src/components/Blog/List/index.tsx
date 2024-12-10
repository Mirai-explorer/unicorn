import React, {ReactNode} from "react";
import {EventProvider} from "@/components/Hooks/EventContext";

const List = ({ children } : { children: ReactNode }) => {
    return(
        <EventProvider>
            <div className="article_list">
                {children}
            </div>
        </EventProvider>
    )
}

export default List;