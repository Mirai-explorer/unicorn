import {MouseEventHandler} from "react";
import {Properties} from "csstype";

interface IModalOverlayProps {
    onClick?: MouseEventHandler;
    show: boolean
}

export const ModalOverlay = ({ onClick, show }: IModalOverlayProps) =>
    <div onClick={onClick}
         style={{
             position: "fixed",
             top: 0,
             left: 0,
             bottom: 0,
             right: 0,
             background: "#121212a6",
             zIndex: `${show? 999 : -100}`,
             transition: "opacity .15s ease-in-out",
             opacity: `${show? 1 : 0}`,
         }}
    />;