import {ReactNode, ReactElement, Children, useState} from 'react';

interface TabProps {
    tabTitle: string;  // 每个 Tab 的标题
    children: ReactNode;  // Tab 的内容
}

interface TabsProps {
    children: ReactElement<TabProps>[];  // 传入的子元素，要求每个子元素都有 `tabTitle` 和 `children`
}

const Tabs = ({ children }: TabsProps) => {
    const [activeTab, setActiveTab] = useState<number>(0); // 默认为第一个 Tab

    // 处理 Tab 点击事件
    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div className="max-w-3xl mx-auto my-10 flex flex-col gap-4">
            {/* Tabs Navigation */}
            <div className="flex gap-16">
                {Children.map(children, (child, index) => {
                    return (
                        <button
                            key={index}
                            className={`px-4 py-2 text-[1.5rem] ${activeTab === index ? 'text-[#2B6189] border-b-2 border-[#2B6189]' : 'text-[#6D9CB0] hover:text-[#2B6189]'}`}
                            onClick={() => handleTabClick(index)}
                        >
                            {child.props.tabTitle} {/* 获取 Tab 标题 */}
                        </button>
                    );
                })}
            </div>

            {/* Tab Contents */}
            {Children.map(children, (child, index) => {
                return (
                    <div
                        key={index}
                        className={`tab-content ${activeTab === index ? 'block' : 'hidden'}`}
                    >
                        <div className="flex flex-col gap-16">
                            <div className="flex gap-4">
                                <div className="flex justify-center items-center rounded-[16px] w-[6rem] h-[6rem] bg-[#2B6189]">
                                    <span className="text-white text-[3rem]" style={{fontFamily:'"方正悠黑_GBK 512B"'}}>En</span>
                                </div>
                                <div className="flex flex-col justify-evenly gap-2">
                                    <span className="text-[#5684B2] text-[1.75rem]">美式 · 英式</span>
                                    <span className="text-[#2B6189] text-[2.5rem]">English</span>
                                </div>
                            </div>
                            <div>{'参考阅读 >'}</div>
                        </div>
                        {child.props.children} {/* 渲染 Tab 的内容 */}
                    </div>
                );
            })}
        </div>
    );
};

// 这是 Tab 组件本身的代码，确保它不会传递 `tabTitle` 到原生的 `div` 元素
const Tab = ({ tabTitle, children }: TabProps) => {
    return (
        <div className="">
            {/* 渲染 tabTitle 和内容 */}
            {children}
        </div>
    );
};

export { Tabs, Tab };
