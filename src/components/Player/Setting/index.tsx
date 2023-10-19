import {styled} from "styled-components";
import React, {SetStateAction, useState} from "react";
import {Track} from "@/components/Player/utils";

const SettingWrap =
    styled.div`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -webkit-backdrop-filter: blur(8px) contrast(0.5);
      backdrop-filter: blur(8px) contrast(0.5);
      background: rgba(255,255,255,.3);
      z-index: 999;
      content-visibility: auto;

      &.show {
        display: block;
      }
    `

const SettingStack =
    styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    `

const SettingCard =
    styled.div`
      width: 90vw;
      background: #ffffff;
      height: 90vh;
      border-radius: 0.5rem;
      box-shadow: 1px 2px 4px rgba(0,0,0,.1);
      color: black;
      display: flex;
      flex-direction: column;
      padding: 24px;
      font-size: 16px;
      gap: 16px;
    `

const SettingCardTitle =
    styled.div`
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      gap: 16px;
    `

const SettingCardContent =
    styled.div`
      display: block;
      overflow: auto;
      flex: 1;
    `
const Setting = ({isShowing, setIsShowing, tracks, setTracks, trackIndex, setTrackIndex, setToastMessage} : {
    isShowing: boolean,
    setIsShowing: React.Dispatch<SetStateAction<boolean>>,
    tracks: Track[],
    setTracks: React.Dispatch<SetStateAction<Track[]>>,
    trackIndex: number,
    setTrackIndex: React.Dispatch<SetStateAction<number>>,
    setToastMessage: React.Dispatch<SetStateAction<{
        value: string,
        timestamp: number
    }>>
}) => {
    const [url, setURL] = useState('空白')
    const audioReader = (ref: React.ChangeEvent<HTMLInputElement>) => {
        /*
        const fs = new FileReader()
        ref.target.files && fs.readAsArrayBuffer(ref.target.files[0])
        fs.onload = () => {
            const arrBuffer = fs.result
            const audioCtx = new AudioContext()
            audioCtx.decodeAudioData(arrBuffer as ArrayBuffer, (audioBuffer) => {
                const source = audioCtx.createBufferSource()
                source.buffer = audioBuffer
                source.connect(audioCtx.destination)
                source.start()
            })
        }
        */
        if (ref.target.files) {
            const src = URL.createObjectURL(ref.target.files[0])
            let duration = 0
            let media: HTMLAudioElement | null = new Audio(src)
            media.onloadedmetadata = () => {
                if (media!.duration != Infinity) {
                    duration = media!.duration * 1000
                    media = null
                    tracks[tracks.length] = {
                        title: ref.target.files![0].name,
                        subtitle: '未知专辑',
                        artist: '未知歌手',
                        src: src,
                        cover: 'http://imge.kugou.com/commendpic/20160923/20160923162707215688.png',
                        lyric: '',
                        album_id: '',
                        encode_audio_id: '',
                        code: '',
                        timestamp: new Date().getTime() + 86400000,
                        unique_index: tracks.length + 1,
                        time_length: duration
                    }
                    setIsShowing(false)
                    setToastMessage({
                        value: `${ref.target.files![0].name} 已临时添加至歌单，当前页面重载前有效`,
                        timestamp: new Date().getTime()
                    })
                }
            }
            setURL(src)
            console.log(ref.target.files[0])
        }
    }
    return(
        <SettingWrap className={`${isShowing?'show':'hidden'}`}>
            <SettingStack>
                <SettingCard>
                    <SettingCardTitle>
                        <div onClick={() => {setIsShowing(false)}}>×</div>
                        <div>实验性选项</div>
                    </SettingCardTitle>
                    <SettingCardContent>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="file" className="text-sky-400">添加本地音频文件</label>
                            <input type="file" name="file" accept="audio/*" onChange={ref => audioReader(ref)} />
                            <div>

                            </div>
                        </div>
                    </SettingCardContent>
                </SettingCard>
            </SettingStack>
        </SettingWrap>
    )
}

export default Setting;