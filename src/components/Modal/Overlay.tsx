import {MouseEventHandler, TouchEventHandler, UIEventHandler} from "react";
import {Properties} from "csstype";

interface IModalOverlayProps {
    onClick?: MouseEventHandler,
    show: boolean,
    onTouchMove?: TouchEventHandler,
    onScroll?: UIEventHandler
}

export const ModalOverlay = ({ onClick, show, onTouchMove, onScroll }: IModalOverlayProps) =>
    <div onClick={onClick}
         onTouchMove={onTouchMove}
         onScroll={onScroll}
         style={{
             position: "fixed",
             top: 0,
             left: 0,
             bottom: 0,
             right: 0,
             background: "#000000",
             zIndex: `${show? 4 : -100}`,
             transition: "opacity .3s cubic-bezier(0.4, 0, 0.2, 1)",
             opacity: `${show? .32 : 0}`,
             touchAction: "none"
         }}
    />;