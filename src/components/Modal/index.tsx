import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import {styled} from "styled-components";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => Promise<void>;
    onCancel?: () => void;
}

const ModalWrap =
    styled.div`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000; /* 保证弹窗在页面最上层 */
    `

const ModalTitle =
    styled.div`
        margin-top: 0;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        padding: 1rem;
    `

const ModalContent =
    styled.div`
        background: #fff;
        padding: 20px;
        border-radius: 8px;
        width: 400px;
        max-width: 90%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: relative;
    `

const BtnConfirm =
    styled.button`
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        background-color: #4CAF50;
        color: white;
    `

const BtnCancel =
    styled.button`
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        background-color: #ccc;
    `

const ModalBody =
    styled.div`
        margin-bottom: 1rem;
        line-height: 2rem;
    `

const ModalFooter =
    styled.div`
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
    `

const Modal: React.FC<ModalProps> = ({
                                         isOpen,
                                         onClose,
                                         title,
                                         children,
                                         confirmText = '确认',
                                         cancelText = '取消',
                                         onConfirm,
                                         onCancel,
                                     }) => {
    if (!isOpen) return null; // 如果未打开，直接返回 null 不渲染

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose(); // 点击背景关闭弹窗
        }
    };

    const handleConfirm = async () => {
        if (onConfirm) {
            try {
                await onConfirm(); // 执行异步操作
                onClose(); // 关闭弹窗
            } catch (error) {
                console.error('操作失败', error);
            }
        }
    };

    return ReactDOM.createPortal(
        <ModalWrap className="" onClick={handleOverlayClick}>
            <ModalContent className="">
                <ModalTitle>{title}</ModalTitle>
                <ModalBody className="">
                    {children}
                </ModalBody>
                <ModalFooter className="modal-footer">
                    {onCancel && (
                        <BtnCancel className="modal-btn modal-cancel" onClick={onCancel}>
                            {cancelText}
                        </BtnCancel>
                    )}
                    {onConfirm && (
                        <BtnConfirm className="modal-btn modal-confirm" onClick={handleConfirm}>
                            {confirmText}
                        </BtnConfirm>
                    )}
                </ModalFooter>
            </ModalContent>
        </ModalWrap>,
        document.body // 将 Modal 渲染到 body 元素上
    );
};

export default Modal;