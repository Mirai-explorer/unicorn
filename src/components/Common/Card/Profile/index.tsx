const Profile = ({title, subtitle, avatar, status, direction} : {title: string, subtitle: string, avatar?: string, status?: string, direction?: string}) => {
    const params = {
        title: title,
        subtitle: subtitle,
        avatar: avatar || '',
        status: status || '没有个性签名',
        direction: direction || 'row'
    }
    return(
        <div className={`flex flex-${params.direction==='row'?'row':'col'} gap-4`}>
            <div className={`grid grid-rows-2 grid-cols-[5rem_auto] gap-x-4`}>
                <div className={`place-self-start row-span-2`}>
                    <img src={params.avatar} alt="avatar" className={`image w-full h-full rounded-full`} />
                </div>
                <div className={`primary text-[#977A5C] inline-grid items-end text-[20px] row-span-1 col-span-1`}>
                    {params.title}
                </div>
                <div className={`secondary inline-grid items-center text-[16px] col-span-1`}>
                    {params.subtitle}
                </div>
            </div>
            <div className={`text flex items-center text-[14px] leading-6`}>
                {params.status}
            </div>
        </div>
    )
}

export default Profile;