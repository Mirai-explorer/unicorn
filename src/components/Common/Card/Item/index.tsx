
import { Icons as Icon } from "@/components/Icons/index";

const Item = ({keyname, value, icon, name} : { keyname: string, value: string, icon?: boolean, name?: string }) => {
    return(
        <div className={`inline-flex items-center min-w-[50%] gap-2`}>
            {
                icon && (
                    <Icon className={`icon-${name}`} height={20} width={20} name={name!}></Icon>
                )
            }
            <div className={`primary inline-flex text-[#A89B92]`}>{keyname}</div>
            <div className={`secondary inline-flex pr-4`}>{value}</div>
        </div>
    )
}

export default Item;