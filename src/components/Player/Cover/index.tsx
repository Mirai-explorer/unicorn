import { styled, keyframes } from "styled-components";
import React from "react";

interface propsType extends React.InputHTMLAttributes<HTMLInputElement> {
    rotate: string,
    url: string,
    ['data-size']: string,
    desc: string
}

const rotate = keyframes`
      from { transform: rotate(0deg) }
      to { transform: rotate(360deg) }
    `

const CoverWrap = styled.div`
    
`

const CoverShell = styled.div`
      border-radius: 50%;
      box-shadow: 0 3px 6px rgba(0,0,0,.16);
      animation: ${rotate} 15s linear infinite;
      animation-play-state: paused;
      transition: box-shadow 1s ease-out;
      
      .source {
        max-width: 320px;
        max-height: 320px;
        border-radius: inherit;
      }

      .source[data-size="large"] {
        width: 50vw;
        height: 50vw;
      }

      .source[data-size="default"] {
        width: 30vw;
        height: 30vw;
        min-width: 160px;
        min-height: 160px;
      }

      .source[data-size="mini"] {
        width: 10vw;
        height: 10vw;
        min-width: 80px;
        min-height: 80px;
      }
    `

const Cover = (props: propsType) => {
    return (
        <CoverWrap>
            <CoverShell style={{ animationPlayState: `${props.rotate}`}} onDoubleClick={props.onDoubleClick}>
                <img
                    className="source"
                    src={props.url}
                    data-size={props["data-size"]}
                    alt={props.desc}
                    width="320px"
                    height="320px"
                />
            </CoverShell>
        </CoverWrap>
    )
};

export default Cover;
