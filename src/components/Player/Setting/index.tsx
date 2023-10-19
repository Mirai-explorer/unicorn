import {styled} from "styled-components";
import React, {SetStateAction, useRef, useState} from "react";
import {fetchMusicSource, syncMediaSession, Track} from "@/components/Player/utils";

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
      display: flex;
      flex-direction: column;
      gap: 2rem;
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
    const [text, setText] = useState('')
    const textRef = useRef<HTMLInputElement>(null)
    const [disable, setDisable] = useState(false)
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

    const readClipboard = () => {
        if (!navigator.clipboard) {
            setToastMessage({
                value: `粘贴失败，您当前的访问环境不支持自动粘贴，请手动复制ID到文本框内`,
                timestamp: new Date().getTime()
            })
            return 0
        }
        navigator.clipboard
            .readText()
            .then(text => {
                textRef.current!.value = text
                setText(text)
            })
            .catch((error) => {
                setToastMessage({
                    value: `粘贴失败，请手动复制ID到文本框内，错误信息：${error}`,
                    timestamp: new Date().getTime()
                })
            });
    }

    const syncInfo = () => {
        setDisable(true)
        let track = {
            code: '',
            album_id: '',
            encode_audio_id: text
        }
        fetchMusicSource(track).then(res => {
            // a jsonp mode
            let promise = res.json()
            promise.then(data => {
                console.log(data)
                setDisable(false)
                if (!data.err_code) {
                    let item = data.data;
                    let track_new: Track = {
                        title: item.song_name,
                        subtitle: item.album_name,
                        artist: item.author_name,
                        src: item.play_url,
                        cover: item.img,
                        lyric: item.lyrics,
                        album_id: item.album_id,
                        encode_audio_id: item.encode_album_audio_id,
                        code: item.hash,
                        timestamp: new Date().getTime() + 86400000,
                        unique_index: tracks.length + 1,
                        time_length: !item.is_free_part ? item.timelength : item.trans_param.hash_offset.end_ms
                    };
                    console.log([...tracks, track_new])
                    tracks[trackIndex] = {
                        title: track_new.title,
                        subtitle: track_new.subtitle,
                        artist: track_new.artist,
                        src: tracks[trackIndex].src,
                        cover: track_new.cover,
                        lyric: track_new.lyric,
                        album_id: track_new.album_id,
                        encode_audio_id: track_new.encode_audio_id,
                        code: '',
                        timestamp: tracks[trackIndex].timestamp,
                        unique_index: tracks[trackIndex].unique_index,
                        time_length: tracks[trackIndex].time_length
                    }
                    syncMediaSession(tracks[trackIndex])
                    setToastMessage({
                        value: item.song_name+' 更新成功',
                        timestamp: new Date().getTime()
                    })
                } else {
                    throw new Error('an unexpected behavior occurred.')
                }
            })
            /*
            // a proxy mode
            console.log(res)
            if (!res.data.err_code) {
                let item = res.data.data;
                let track_new: Track = {
                    title: item.song_name,
                    subtitle: item.album_name,
                    artist: item.author_name,
                    src: item.play_url,
                    cover: item.img,
                    lyric: item.lyrics,
                    album_id: item.album_id,
                    encode_audio_id: item.encode_album_audio_id,
                    code: item.hash,
                    timestamp: new Date().getTime() + 86400000,
                    unique_index: tracks.length + 1,
                    time_length: !item.is_free_part ? item.timelength : item.trans_param.hash_offset.end_ms
                };
                console.log([...tracks, track_new])
                setIsShowing(false)
                setTracks([...tracks, track_new])
                setUpdate(updates > 0 ? ++updates : 1)
                setToastMessage({
                    value: item.song_name+' 已加入歌单，可在歌单选取播放',
                    timestamp: new Date().getTime()
                })
            } else {
                throw new Error('an unexpected behavior occurred.')
            }
            */
        }).catch(err => {
            setToastMessage({
                value: '发生不可预知的行为，错误信息：'+err.message,
                timestamp: new Date().getTime()
            })
            console.error('Please try again later:',err.message)
        })
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
                        </div>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="text" className="text-sky-400">同步信息</label>
                            <div className="flex gap-4">
                                <input type="text" name="audio" className="text-[14px] placeholder:text-[14px]" minLength={6} maxLength={10} placeholder="请输入audio_id" onChange={e => setText(e.target.value)} ref={textRef} />
                                <button onClick={() => readClipboard()}>粘贴</button>
                                <button onClick={() => syncInfo()} disabled={disable}>同步</button>
                            </div>
                        </div>
                    </SettingCardContent>
                </SettingCard>
            </SettingStack>
        </SettingWrap>
    )
}

export default Setting;