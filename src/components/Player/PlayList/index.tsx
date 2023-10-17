import {styled} from "styled-components";
import React, {SetStateAction, useEffect, useState} from "react";
import {Track, getTime} from "@/components/Player/utils";
import { simpleConfirm, SimpleDialogContainer } from 'react-simple-dialogs'

const PlayListWrap =
    styled.div`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      display: block;
      transition: background-color .1s ease-out, visibility .1s ease;
      content-visibility: auto;

      &.show {
        visibility: visible;
        background-color: rgba(0, 0, 0, .3);
      }

      &.hidden {
        visibility: hidden;
        background-color: transparent;
      }
    `
const PlayListStack =
    styled.div`
      display: flex;
      width: 100%;
      height: 100%;
      align-items: flex-end;
      justify-content: center;
    `

const PlayListCard =
    styled.div`
      position: fixed;
      display: flex;
      flex-direction: column;
      font-size: 16px;
      border-radius: 2rem 2rem 0 0;
      background: #FFFFFF;
      height: 75vh;
      max-height: 600px;
      width: 100%;
      transition: bottom .2s ease;
      
      .show & {
        bottom: 0;
      }
      
      .hidden & {
        bottom: -75vh;
      }
    `
const PlayListCardTitle =
    styled.div`
      display: flex;
      align-items: center;
      width: 100%;
      padding: 24px;
      gap: 16px;
    `

const Control =
    styled.button`
        
    `

const PlayListGroup =
    styled.div`
      display: flex;
      width: 100%;
      position: relative;
      justify-content: center;
    `

const PlayListCardContent =
    styled.div`
      display: block;
      overflow: auto;
      flex: 1;
      padding: 0 12px;
    `

const PlayItem =
    styled.div`
      display: inline-flex;
      align-items: center;
      width: 100%;
      min-height: 48px;
      padding: 12px;
      border-radius: .75rem;
      transition: transform 200ms ease-out;

      &.highlight {
        background-color: #eceff1;
      }
      
      &.highlight span.play-item_title {
        color: #9b1442;
      }
    `

const PlayItemLabel =
    styled.div`
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      line-height: 24px;
      gap: 8px;
    `

const PlayList = ({tracks, setTracks, trackIndex, setTrackIndex, isShowing, setIsShowing, updates, setUpdate} : {
    tracks: Track[],
    setTracks: React.Dispatch<SetStateAction<Track[]>>,
    trackIndex: number,
    setTrackIndex: React.Dispatch<SetStateAction<number>>,
    isShowing: boolean,
    setIsShowing: React.Dispatch<SetStateAction<boolean>>,
    updates: number,
    setUpdate: React.Dispatch<SetStateAction<number>>
}) => {
    const [X, setX] = useState(0)
    const target = React.useRef<Array<HTMLDivElement | null >>([])
    const delConfirm = async (text: string, index: number) => {
        if (await simpleConfirm({
            title: '删除警告',
            message: text,
            confirmLabel: '确认',
            cancelLabel: '算了'
        })) {
            if (tracks.length > 1) {
                console.log(index+' deleted')
                const _tracks = tracks.filter((item, num) => {
                    return num !== index
                })
                _tracks.map((item, num) => {
                    item.unique_index = num + 1
                })
                console.log(_tracks)
                setTrackIndex(index >= trackIndex ? (trackIndex < _tracks.length ? trackIndex : 0) : --trackIndex)
                setTracks(_tracks)
                setUpdate(updates < 0 ? --updates : -1)
            } else {
                console.log('禁止删除')
            }
        } else {
            console.log('nothing to do')
        }
    }
    const clrConfirm = async () => {
        if (await simpleConfirm({
            title: '数据库清除警告',
            message: '确认要删除数据库吗？（此操作无法撤销，请谨慎操作）',
            confirmLabel: '确认',
            cancelLabel: '算了'
        })) {
            window.indexedDB.deleteDatabase("MiraiDB").onsuccess = () => {
                window.location.reload()
            }
        } else {
            console.log('nothing to do')
        }
    }

    useEffect(() => {
        target.current = target.current.slice(0, tracks.length)
    }, [tracks]);

    const handleClick = (i: number) => {
        setTrackIndex(i)
        setIsShowing(false)
    }

    const dragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        setX(e.clientX)
        console.log(index)
    }

    const touchStart = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
        setX(e.touches[0].clientX)
        console.log(index)
    }

    const onDrag = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        if (e.clientX - X > -240) {
            target.current[index]!.style.transform = `translateX(-60px)`;
        } else {
            target.current[index]!.style.transform = `translateX(-240px)`;
        }
    }

    const onTouch = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
        if (e.touches[0].clientX - X > -120) {
            target.current[index]!.style.transform = `translateX(-30px)`;
        } else {
            target.current[index]!.style.transform = `translateX(-120px)`;
        }
    }
    const dragEnd = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        target.current[index]!.style.transform = `translateX(0px)`;
        (e.clientX - X < -150) && delConfirm(`确认要删除 ${tracks[index].title} 吗？`, index)
    }

    const touchEnd = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
        target.current[index]!.style.transform = `translateX(0px)`;
        (e.changedTouches[0].clientX - X < -150) && delConfirm(`确认要删除 ${tracks[index].title} 吗？`, index)
    }

    return (
        <PlayListWrap className={`${isShowing?'show':'hidden'}`}>
            <PlayListStack>
                <PlayListCard>
                    <PlayListCardTitle>
                        <Control onClick={() => setIsShowing(false)}>×</Control>
                        <PlayListGroup>
                            <div className="text-[20px]">播放列表（{tracks.length}）</div>
                        </PlayListGroup>
                        <Control onClick={() => clrConfirm()}>-</Control>
                    </PlayListCardTitle>
                    <PlayListCardContent>
                        {tracks && (
                            tracks.map((item: Track, index: number) => {
                                return(
                                    <PlayItem
                                        key={index}
                                        className={index === trackIndex ? 'highlight' : 'normal'}
                                        onClick={() => handleClick(index)}
                                        onDragStart={e => dragStart(e, index)}
                                        onDragOver={e => onDrag(e, index)}
                                        onDragEnd={e => dragEnd(e, index)}
                                        onTouchStart={e => touchStart(e, index)}
                                        onTouchMove={e => onTouch(e, index)}
                                        onTouchEnd={e => touchEnd(e, index)}
                                        ref={ref => target.current[index] = ref}
                                        draggable
                                    >
                                        <PlayItemLabel>
                                            <img src={item.cover} className="w-12 h-12 rounded-xl" alt={item.title} />
                                            <div className="flex flex-col flex-grow overflow-hidden gap-0.5">
                                                <span className="play-item_title text-ellipsis whitespace-nowrap overflow-hidden text-[18px]">{item.title}</span>
                                                <span className="text-[14px]">{item.artist}</span>
                                            </div>
                                            <span>{getTime(item.time_length/1000)}</span>
                                        </PlayItemLabel>
                                    </PlayItem>
                                )
                            })
                        )}
                        {!tracks && (
                            <div>
                                歌单空空的，先去找找吧
                            </div>
                        )}
                    </PlayListCardContent>
                </PlayListCard>
            </PlayListStack>
            <SimpleDialogContainer />
        </PlayListWrap>
    )
}

export default PlayList;