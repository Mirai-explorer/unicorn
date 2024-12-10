import React, { useState, useCallback } from 'react';
import Modal from './index'; // 引入 Modal 组件

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState<{
        title: string;
        content: React.ReactNode;
        onConfirm?: () => Promise<void>;
        onCancel?: () => void;
        confirmText?: string;
        cancelText?: string;
    } | null>(null);

    // Promise 用来返回 Modal 结果
    const [resolve, setResolve] = useState<(() => void) | null>(null);
    const [reject, setReject] = useState<((reason?: unknown) => void) | null>(null);

    const showModal = useCallback((config: {
        title: string;
        content: React.ReactNode;
        onConfirm?: () => Promise<void>;
        onCancel?: () => void;
        confirmText?: string;
        cancelText?: string;
    }) => {
        return new Promise<void>((modalResolve, modalReject) => {
            // 设置弹窗配置
            setModalConfig(config);
            setIsOpen(true);

            // 设置 resolve 和 reject 来处理用户操作
            setResolve(() => modalResolve);
            setReject(() => modalReject);
        });
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setModalConfig(null); // 清空配置
    }, []);

    const handleConfirm = async () => {
        try {
            if (modalConfig?.onConfirm) {
                await modalConfig.onConfirm();
            }
            resolve?.(); // 用户确认操作后，resolve Promise
            closeModal();
        } catch (error) {
            console.error('操作失败', error);
            reject?.(error); // 如果操作失败，reject Promise
            closeModal();
        }
    };

    const handleCancel = () => {
        reject?.('用户取消操作'); // 用户取消操作时，reject Promise
        closeModal();
    };

    // 返回 Modal 组件和 showModal 函数
    return {
        ModalComponent: (
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                title={modalConfig?.title || ''}
                confirmText={modalConfig?.confirmText}
                cancelText={modalConfig?.cancelText}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            >
                {modalConfig?.content}
            </Modal>
        ),
        showModal,
        closeModal,
    };
}