"use client"
import React from 'react';

const Old = () => {
    const target = React.useRef<Array<HTMLDivElement | null >>([])
    const [currentNode, setCurrentNode] = React.useState(0)
    const scrollToView = (direct: number) => {
        if (!direct) {
            setCurrentNode(currentNode - 1 < 0 ? 0 : currentNode - 1)
            target.current[currentNode]?.scrollIntoView()
        } else {
            setCurrentNode(currentNode + 1 < 2 ? currentNode + 1 : 2)
            target.current[currentNode]?.scrollIntoView()
        }
    }
    return(
        <div className="old absolute top-0 right-0 left-0 right-0 w-full h-full overflow-auto scroll-smooth snap-y snap-mandatory">
            <div className="flex justify-center items-center w-full h-full bg-sky-100 snap-center" ref={ref => target.current[0] = ref}>1</div>
            <div className="flex justify-center items-center w-full h-full bg-amber-100 snap-center" ref={ref => target.current[1] = ref}>2</div>
            <div className="flex justify-center items-center w-full h-full bg-green-100 snap-center" ref={ref => target.current[2] = ref}>3</div>
            <div className="fixed w-[80px] h-[80px] z-50 bottom-8 right-8 flex flex-col justify-evenly items-center bg-white shadow-[#00000016] rounded-xl">
                <button className="w-full h-[50%]" onClick={() => scrollToView(0)}>up</button>
                <button className="w-full h-[50%]" onClick={() => scrollToView(1)}>down</button>
            </div>
        </div>
    )
}

export default Old;