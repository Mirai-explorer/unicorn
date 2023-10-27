"use client"
import React, {useEffect, useRef, useState} from 'react';
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
      width: 100%;
      height: 100%;
      scroll-snap-align: center;
      overflow: hidden;
      
      &.blue {
        background-color: rgb(224, 242, 254);
      }

      &.yellow {
        background-color: rgb(254, 243, 199);
      }

      &.green {
        background-color: rgb(220, 252, 231);
      }
    `

const Typo =
    styled.div`
      position: relative;
      left: 20%;
      top: 20%;
      display: grid;
      max-height: 60%;
      max-width: 60%;
      width: auto;
      grid-auto-rows: 80px auto;
      grid-row-gap: 1rem;

      opacity: 0;
      transition: opacity .5s ease-in-out, transform .5s ease-in;
      transform: translateX(-1rem);
      visibility: hidden;
      &.show {
        opacity: 1;
        transform: translateX(0);
        visibility: visible;
      }
    `

const Headline =
    styled.div`
      font-size: 2rem;
      font-weight: 700;
      
      .blue & {
        color: #0f2b46;
      }
      
      .yellow & {
        color: #5d5020;
      }
      
      .green & {
        color: #225f49;
      }
    `

const Content =
    styled.div`
      font-size: 1.25rem;
      line-height: 2rem;
      
      .blue & {
        color: #006494;
      }

      .yellow & {
        color: #876708;
      }

      .green & {
        color: #1b7705;
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

const New = () => {
    const target = useRef<HTMLDivElement>(null)
    const eleRef = useRef<Array<HTMLDivElement | null >>([])
    const [show, setShow] = useState(false)
    const scrollToView = (direct: number) => {
        console.log(target.current!.scrollTop)
        if (!direct) {
            target.current!.scrollTop -= target.current!.clientHeight
        } else {
            target.current!.scrollTop += target.current!.clientHeight
        }
    }

    useEffect(() => {
        let items = eleRef.current
        let io = new IntersectionObserver(entries => {
            entries.forEach(item => {
                if (item.intersectionRatio === 1) {
                    setShow(true)
                } else {
                    setShow(false)
                }
            })
        }, {
            root: null,
            rootMargin: '0px 0px',
            threshold: 1
        })
        items.forEach(item => item && io.observe(item))

        return(() => {
            io.disconnect()
        })
    }, []);
    return(
        <Container className="old" ref={target}>
            <PageCard className="blue" ref={target => eleRef.current[0] = target}>
                <Typo className={show ? 'show':''}>
                    <Headline>这是标题</Headline>
                    <Content>这是一段文字</Content>
                </Typo>
            </PageCard>
            <PageCard className="yellow" ref={target => eleRef.current[1] = target}>
                <Typo className={show ? 'show':''}>
                    <Headline>这是标题</Headline>
                    <Content>这是一段文字</Content>
                </Typo>
            </PageCard>
            <PageCard className="green" ref={target => eleRef.current[2] = target}>
                <Typo className={show ? 'show':''}>
                    <Headline>这是标题</Headline>
                    <Content>这是一段文字</Content>
                </Typo>
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

export default New;