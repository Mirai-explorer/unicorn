const Tag = ({ name }:{name: string}) => {
    return(
        <div className="common-tag_framework">
            <div className="common-tag_wrap">
                <div className="common-tag_wrap_layout inline-flex items-center px-2 py-1 text-[16px] bg-[#F2F2F2] gap-2 rounded-full">
                    <div className="common-tag_symbol w-4 h-4 text-white text-sm bg-[#A89B92] rounded-full flex justify-center items-center">
                        <span>#</span>
                    </div>
                    <span className="common-tag_tag-name">{name}</span>
                </div>
            </div>
        </div>
    )
}

export default Tag;