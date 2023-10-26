import React, {ReactNode, SetStateAction, useState} from "react";
import { Icons as Icon } from "@/components/Icons/index";
    const Card = ({title, direction, children, icon, color, index, action, data} : {
        title?: string,
        direction: string,
        children: ReactNode,
        icon?: string,
        color?: string,
        index?: number,
        action?: React.Dispatch<SetStateAction<number>>,
        data?: any[]}) => {
        return(
            <div className="common-card_framework grid flex-1 bg-white">
                <div className={`common-card_wrap flex flex-${direction} shadow rounded p-5 gap-3`}>
                    {title && (
                        <div className={`common-card_part flex flex-${direction === 'col'?'row':'col'} justify-between min-w-[4rem]`}>
                            <div className={`common-card_icon flex flex-${direction === 'col'?'row':'col'} items-center gap-2`}>
                                {icon && (
                                    <Icon className={`icon-${icon?.toLowerCase()}`} name={icon} width={24} height={24} fill={color} />
                                )}
                                <div className={`common-card_title text-[#333333] text-[18px] font-semibold tracking-wider flex leading-8 items-center`}>{title}</div>
                            </div>
                            {(action && data && index !== undefined) && (
                                <div className={`flex flex-${direction === 'col'?'row':'col'} items-center gap-4`}>
                                    <button onClick={() => action(index - 1 < 0 ? data.length - 1 : index - 1)}>
                                        <Icon className={`icon-prev`} name={`Prev`} width={24} height={24} />
                                    </button>
                                    <button onClick={() => action(index + 1 < data.length ? index + 1 : 0)}>
                                        <Icon className={`icon-next`} name={`Next`} width={24} height={24} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="common-card_part flex flex-col gap-4">
                        <div className="common-card_content flex flex-col gap-4 text-[#473108]">{children}</div>
                    </div>
                </div>
            </div>
        )
}

export default Card;