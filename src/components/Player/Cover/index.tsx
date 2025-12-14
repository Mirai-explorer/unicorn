import React from "react";
import "./cover.css";

interface propsType extends React.InputHTMLAttributes<HTMLInputElement> {
    rotate: string,
    url: string,
    ['data-size']: string,
    desc: string,
    className?: string
}

const Cover = (props: propsType) => {
    return (
        <div className={"cover-wrap"}>
            <div className={`cover-shell ${props.className || 'normal'}`} style={{ animationPlayState: `${props.rotate}`}} onDoubleClick={props.onDoubleClick}>
                <img
                    className="source"
                    src={props.url}
                    data-size={props["data-size"]}
                    alt={props.desc}
                    width="320px"
                    height="320px"
                />
            </div>
        </div>
    )
};

export default Cover;
