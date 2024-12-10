import React, {createContext, useContext, useState, useCallback, ReactNode} from 'react';

// 定义 EventContext 的类型
type EventContextType = {
    emit: (event: any) => void;
    on: (eventName: string, handler: Function) => void;
    off: (eventName: string, handler: Function) => void;
};

// 定义 EventProvider 接受 children 属性
interface EventProviderProps {
    children: ReactNode; // 或者 JSX.Element
}

const EventContext = createContext<EventContextType | undefined>(undefined);

// EventProvider 组件用于提供事件管理功能
export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
    const [events, setEvents] = useState<Map<string, Function[]>>(new Map());

    const emit = useCallback((event: any) => {
        events.forEach((handlers) => {
            handlers.forEach((handler) => handler(event));
        });
    }, [events]);

    const on = useCallback((eventName: string, handler: Function) => {
        setEvents((prevEvents) => {
            const updatedEvents = new Map(prevEvents);
            if (!updatedEvents.has(eventName)) {
                updatedEvents.set(eventName, []);
            }
            updatedEvents.get(eventName)?.push(handler);
            return updatedEvents;
        });
    }, []);

    const off = useCallback((eventName: string, handler: Function) => {
        setEvents((prevEvents) => {
            const updatedEvents = new Map(prevEvents);
            const handlers = updatedEvents.get(eventName);
            if (handlers) {
                updatedEvents.set(eventName, handlers.filter((h) => h !== handler));
            }
            return updatedEvents;
        });
    }, []);

    return (
        <EventContext.Provider value={{ emit, on, off }}>
            {children}
        </EventContext.Provider>
    );
};

// 自定义 Hook 用于访问 EventContext
export const useEventEmitter = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEventEmitter must be used within an EventProvider');
    }
    return context;
};
