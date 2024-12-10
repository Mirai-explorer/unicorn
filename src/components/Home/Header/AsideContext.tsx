// AsideContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// 定义 AsideState 类型
export interface AsideState {
    action: boolean;
}

// 定义初始状态
const initialState: AsideState = {
    action: false,
};

// 定义 Action 类型
type Action = { type: 'OPEN' } | { type: 'CLOSE' };

// reducer 函数
const asideReducer = (state: AsideState, action: Action): AsideState => {
    switch (action.type) {
        case 'OPEN':
            return { action: true };
        case 'CLOSE':
            return { action: false };
        default:
            return state;
    }
};

// 创建 Context
interface AsideContextType {
    state: AsideState;
    dispatch: React.Dispatch<Action>;
}

const AsideContext = createContext<AsideContextType | undefined>(undefined);

// 提供状态和 dispatch 函数
export const AsideProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(asideReducer, initialState);

    return (
        <AsideContext.Provider value={{ state, dispatch }}>
            {children}
        </AsideContext.Provider>
    );
};

// 自定义 Hook 用于访问 Context
export const useAside = (): AsideContextType => {
    const context = useContext(AsideContext);
    if (!context) {
        throw new Error('useAside must be used within an AsideProvider');
    }
    return context;
};