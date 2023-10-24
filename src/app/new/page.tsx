"use client"
import React from 'react';
import {keyframes, styled} from "styled-components";

const Container =
    styled.div`
      width: 100%;
      height: 100%;
      overflow-y: auto;
      scroll-behavior: smooth;
      scroll-snap-type: y mandatory;
      scroll-snap-stop: always;
      scroll-timeline: --dotTimeline y;
      
      &::-webkit-scrollbar {
        display: none;
      }
    `

const PageCard =
    styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      scroll-snap-align: center;
      overflow: hidden;
      
      &:nth-child(1) {
        background-color: rgb(224, 242, 254);
      }

      &:nth-child(2) {
        background-color: rgb(254, 243, 199);
      }

      &:nth-child(3) {
        background-color: rgb(220, 252, 231);
      }
    `

const progress =
    keyframes`
      0% {
        left: 0;
      }
      
      50% {
        left: calc(50% - 8px);
      }
      
      
      100% {
        left: calc(100% - 16px);
      }
    `

const TimeLine =
    styled.div`
      position: relative;
      width: 16px;
      height: 16px;
      border-radius: 8px;
      background-color: #00b0ff;
      animation-name: ${progress};
      animation-duration: 1ms;
      animation-timing-function: ease;
      animation-range: 0 100%;
      animation-timeline: --dotTimeline;
    `

const Old = () => {
    const target = React.useRef<HTMLDivElement>(null)
    const scrollToView = (direct: number) => {
        console.log(target.current!.scrollTop)
        if (!direct) {
            target.current!.scrollTop -= target.current!.clientHeight
        } else {
            target.current!.scrollTop += target.current!.clientHeight
        }
    }
    return(
        <Container className="old" ref={target}>
            <PageCard>

            </PageCard>
            <PageCard>

            </PageCard>
            <PageCard>

            </PageCard>
            <div className="fixed w-[160px] h-[16px] z-50 bottom-4 left-8 bg-white shadow-[#00000016] rounded-xl">
                <TimeLine></TimeLine>
            </div>
            <div className="fixed w-[80px] h-[80px] z-50 bottom-8 right-8 flex flex-col justify-evenly items-center bg-white shadow-[#00000016] rounded-xl">
                <button className="w-full h-[50%]" onClick={() => scrollToView(0)}>up</button>
                <button className="w-full h-[50%]" onClick={() => scrollToView(1)}>down</button>
            </div>
        </Container>
    )
}

export default Old;