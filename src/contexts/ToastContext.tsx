export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
    duration?: number; // 毫秒
}

export interface ToastContextValue {
    toasts: Toast[];
    showToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
}

import { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

export const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (toast: Omit<Toast, "id">) => {
        const id = uuidv4();
        setToasts(prev => [...prev, { ...toast, id }]);
        if (toast.duration) {
            setTimeout(() => removeToast(id), toast.duration);
        }
    };

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
};
