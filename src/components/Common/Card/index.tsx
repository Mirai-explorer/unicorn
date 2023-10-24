import {ReactNode} from "react";
import { Icons as Icon } from "@/components/Icons/index";

const Card = ({title, collapsed, children, icon, color} : {title: string, collapsed: boolean, children: ReactNode, icon: string, color?: string}) => {
    return(
        <div className="common-card_framework flex-1 bg-white">
            <div className="common-card_wrap flex shadow rounded px-3 py-5 gap-3">
                <div className="common-card_part">
                    <div className="common-card_icon flex w-12 h-12 rounded-full justify-center items-center">
                        <Icon className={`icon-${icon?.toLowerCase()}`} name={icon} width={36} height={36} fill={color} />
                    </div>
                </div>
                <div className="common-card_part flex flex-col justify-between gap-2">
                    <div className={`common-card_title text-[#A89B92] font-semibold ${collapsed ? 'inline-flex text-[16px]' : 'flex text-[20px] h-12 items-center'}`}>{title}</div>
                    <div className="common-card_content flex text-[#6F727D]">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;