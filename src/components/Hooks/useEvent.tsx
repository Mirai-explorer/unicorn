import React, { createContext, useReducer, ReactNode, useContext } from 'react';

// 定义事件类型
type EventType = {
    type: string;
    payload?: any;
};

// 定义初始状态
type EventState = {
    [key: string]: any;
};

const initialState: EventState = {};

// Reducer 函数
const eventReducer = (state: EventState, action: EventType): EventState => {
    return { ...state, [action.type]: action.payload };
};

// 创建 Context
const EventContext = createContext<{
    state: EventState;
    dispatch: React.Dispatch<EventType>;
}>({
    state: initialState,
    dispatch: () => {},
});

// 提供者组件
export const EventProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(eventReducer, initialState);

    return (
        <EventContext.Provider value={{ state, dispatch }}>
            {children}
        </EventContext.Provider>
    );
};

// 自定义 Hook
export const useEvent = () => {
    return useContext(EventContext);
};