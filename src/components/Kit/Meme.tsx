"use client"
import React, {useRef, useState} from 'react';
import ImageN from "next/image";
import axios from "axios";

const Meme = () => {
    const [qid, setQid] = useState('')
    const [qid2, setQid2] = useState('0')
    const [id, setId] = useState('请输入ID')
    const [msg, setMsg] = useState('请输入消息')
    const [pic, setPic] = useState('https://p6-pc-sign.douyinpic.com/tos-cn-i-0813/oc3AAq6C4IADTAUQv7duQtAWZghGbCzByEneAf~tplv-dy-aweme-images:q75.webp?biz_tag=aweme_images&from=3213915784&s=PackSourceEnum_SEO&sc=image&se=false&x-expires=1702375200&x-signature=yreNloWn56uMMLFgEgVWRpA19aU%3D')
    const [style, setStyle] = useState(0)
    const [layout, setLayout] = useState(0)
    const [width, setWidth] = useState(200)
    const [level, setLevel] = useState('100')
    const [levelDisplay, setLevelDisplay] = useState(true)
    const [dragonDisplay, setDragonDisplay] = useState(true)
    const [sparkDisplay, setSparkDisplay] = useState(true)
    const [emojiDisplay, setEmojiDisplay] = useState(true)
    const ref = useRef<HTMLDivElement>(null)

    const handleUpload = (target: EventTarget & HTMLInputElement) => {
        console.log(target)
        if (target.files) {
            const src = URL.createObjectURL(target.files[0])
            setPic(src)
        }
    }

    const switchStyle = (type: number) => {
        switch (type) {
            case 0:
                setStyle(0);
                break;
            case 1:
                setStyle(1);
                break;
        }
    }

    const switchLayout = (type: number) => {
        switch (type) {
            case 0:
                setLayout(0);
                break;
            case 1:
                setLayout(1);
                break;
            case 2:
                setLayout(2);
                break;
        }
    }

    const fetchBase64 = (url: string) => {
        axios.get(url).then(r => {
            const blob = new Blob([r.data], { type: 'image/jpg' })
            const source = URL.createObjectURL(blob)
            console.log(source)
        })
    }

    const convertToImage = () => {
        fetchBase64(`https://bird.ioliu.cn/v2/?url=https://q2.qlogo.cn/headimg_dl?dst_uin=${qid2}&spec=100`)

     }

    return(
        <div className={`flex flex-col gap-4`}>
            <div className={`flex gap-4 flex-col`}>
                <div className={`inline-flex gap-4 items-center`}>
                    <label htmlFor="qid">QQ账号</label>
                    <input type="number" id="qid" value={qid} minLength={5} maxLength={11} onChange={e => setQid(e.target.value)} />
                    <input type="button" id="get_avatar" value="设置头像" title="设置头像" onClick={() => setQid2(qid !== '' ? qid : '0')} />
                </div>
                <div className={`inline-flex gap-4 items-center`}>
                    <label htmlFor="qid">ID</label>
                    <input type="text" id="id" value={id} onChange={e => setId(e.target.value)} />
                </div>
                <div className={`inline-flex gap-4 items-center`}>
                    <label htmlFor="msg">编辑信息</label>
                    <textarea id="msg" value={msg} onChange={e => setMsg(e.target.value)} />
                </div>
                <div className={`inline-flex gap-4 items-center`}>
                    <label htmlFor="image">选择图片</label>
                    <input type="file" accept="image/*" name="image" id="image" onChange={e => handleUpload(e.target)} />
                </div>
            </div>
            <div className={`root`} ref={ref}>
                {style === 0 && (
                    <div className={`grid grid-flow-col-dense gap-x-[10px] gap-[8px] w-fit bg-[rgb(242,242,242)] p-1`}>
                        <ImageN alt="qq_avatar" src={`https://q2.qlogo.cn/headimg_dl?dst_uin=${qid2}&spec=100`} width={42} height={42} className={`rounded-full row-[1_/_3] col-[1_/_2]`}></ImageN>
                        <span className={`text-[rgb(153,153,153)] text-[14px] col-[2] row-[1] inline-grid`}>{id}</span>
                        {layout === 0 && (
                            <div className={`bg-white p-[10px] rounded-[8px] col-[2] row-[2] w-fit max-w-[320px] break-words leading-6`}>{msg}</div>
                        )}
                        {layout === 1 && (
                            <ImageN alt="qq_msg" src={pic} width={325} height={100} className={`rounded-[8px] col-[2] row-[2]`}></ImageN>
                        )}
                        {layout === 2 && (
                            <div className={`bg-white p-[10px] rounded-[8px] col-[2] row-[2] w-fit max-w-[320px] break-words leading-6 flex flex-col gap-y-2`}>
                                {msg}
                                <ImageN alt="qq_msg" src={pic} width={325} height={100} className={`rounded-[8px]`}></ImageN>
                            </div>
                        )}
                    </div>
                )}
                {style === 1 && (
                    <div className={`grid grid-flow-col-dense gap-x-[12px] gap-y-[8px] w-fit bg-[rgb(242,242,242)] p-1`}>
                        <ImageN alt="qq_avatar" src={`https://q2.qlogo.cn/headimg_dl?dst_uin=${qid2}&spec=100`} width={42} height={42} className={`rounded-full row-[1_/_3] col-[1_/_2]`}></ImageN>
                        <div className={`text-[rgb(153,153,153)] text-[12px] col-[2] row-auto inline-grid`}>
                        <span>
                            {levelDisplay && <i>LV.{level}</i>}
                            {id}
                            {dragonDisplay && <i>龙头</i>}
                            {sparkDisplay && <i>火花</i>}
                            {emojiDisplay && <i>表情</i>}
                        </span>
                        </div>
                        {layout === 0 && (
                            <div className={`bg-white px-[10px] py-[12px] rounded-[8px] col-[2] row-[2] w-fit max-w-[90vw] break-words leading-6`}>{msg}</div>
                        )}
                        {layout === 1 && (
                            <ImageN alt="qq_msg" src={pic} width={width} height={1} className={`rounded-[8px] col-[2] row-[2]`}></ImageN>
                        )}
                        {layout === 2 && (
                            <div className={`bg-white px-[10px] py-[12px] rounded-[8px] col-[2] row-[2] w-fit max-w-[90vw] break-words leading-6 flex flex-col gap-y-2`}>
                                {msg}
                                <ImageN alt="qq_msg" src={pic} width={width} height={1} className={`rounded-[8px]`}></ImageN>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div>
                <input type="radio" id="pc" name="style" onChange={() => switchStyle(0)} defaultChecked={true} />
                <label htmlFor="pc">PC端样式</label>
                <input type="radio" id="mobile" name="style" onChange={() => switchStyle(1)} />
                <label htmlFor="mobile">移动端样式</label>
            </div>
            <div>
                <input type="range" max={400} min={0} step={1} value={width} onChange={e => setWidth(Number(e.target.value))} />
            </div>
            <div>
                <input type="radio" id="text" name="message" onChange={() => switchLayout(0)} defaultChecked={true} />
                <label htmlFor="text">纯文本</label>
                <input type="radio" id="pic" name="message" onChange={() => switchLayout(1)} />
                <label htmlFor="pic">纯图片</label>
                <input type="radio" id="mix" name="message" onChange={() => switchLayout(2)} />
                <label htmlFor="mix">混排</label>
            </div>
            <ul>
                <li>
                    <input type="checkbox" id="level" defaultChecked={true} onChange={e => setLevelDisplay(e.target.checked)} />
                    <label htmlFor="level">显示群聊等级Lv.</label>
                    <input type="number" id="level_value" className={`w-[3em]`} value={level} onChange={e => setLevel(e.target.value)} />
                </li>
                <li>
                    <input type="checkbox" id="dragon" defaultChecked={true} onChange={e => setDragonDisplay(e.target.checked)} />
                    <label htmlFor="dragon">显示龙头</label>
                </li>
                <li>
                    <input type="checkbox" id="spark" defaultChecked={true} onChange={e => setSparkDisplay(e.target.checked)} />
                    <label htmlFor="spark">显示火花</label>
                </li>
                <li>
                    <input type="checkbox" id="emoji" defaultChecked={true} onChange={e => setEmojiDisplay(e.target.checked)} />
                    <label htmlFor="emoji">显示表情</label>
                </li>
            </ul>
            <input type="button" id="save" value="保存" title="保存" onClick={() => convertToImage()} />
        </div>
    )
}

export default Meme;