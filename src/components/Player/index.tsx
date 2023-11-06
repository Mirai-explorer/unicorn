"use client";
// import dependencies/usages
import React, {useEffect, useRef, useState} from "react";
import {initDB, useIndexedDB} from "react-indexed-db-hook";
import {Track, fetchMusicSource, getTime, syncMediaSession, fetchLyric} from "./utils";
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { simpleConfirm, SimpleDialogContainer } from 'react-simple-dialogs'
// import components
import Title from "@/components/Player/Title";
import Cover from "@/components/Player/Cover";
import Lyric from "@/components/Player/Lyric";
import Progress from "@/components/Player/Progress";
import Controller from "@/components/Player/Controller";
import Search from "@/components/Player/Search";
import PlayList from "@/components/Player/PlayList";
import Setting from "@/components/Player/Setting";
// import styles
import "../bundle.css";
import 'react-toastify/dist/ReactToastify.css';
// import extra data/config
import tracks0 from "@/assets/data/tracks";
import {DBConfig} from "@/app/IDBConfig";

// Initialize indexDB database
initDB(DBConfig);

// Define the type of item to fetch on update
type itemType = {
    play_url: string,
    song_name: string,
    album_name: string,
    author_name: string,
    img: string,
    lyrics: string,
    album_id: string,
    encode_album_audio_id: string,
    hash: string,
    is_free_part: boolean,
    timelength: number,
    trans_param: {
        hash_offset: {
            end_ms: number
        }
    }
}

type itemType2 = {
    al: {
        id: number,
        name: string,
        picUrl: string
    },
    alia: string[],
    ar: {
        id: number,
        name: string,
    }[],
    dt: number,
    mp3: {
        id: number,
        md5: string,
        time: number,
        url: string
    },
    name: string
}

// Define the styles by 'styled-components'
const MiraiPlayer =
    styled.div.attrs((/* props */) => ({ tabIndex: 0 }))`
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: -apple-system,BlinkMacSystemFont,"SF Pro Text",PingFang SC,Helvetica Neue,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
      scroll-behavior: smooth;
      /* 非标准属性：提供字体抗锯齿效果 */
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      /* 非标准属性：设置点击链接的时候出现的高亮颜色，transparent 为移除 */
      -webkit-tap-highlight-color: transparent;
      /* 非标准属性： */
      -webkit-overflow-scrolling: touch;
      
      *::selection {
        background-color: rgba(218,218,218,.1);
      }
      
      input {
        border-radius: 0;
        font-size: 15px;
        outline: none;
      }
      
      input, button, ul, li {
        -webkit-appearance: none;
      } 
      
      &::after {
          background: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%);
          width: 100%;
          height: 100%;
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: -1;
        }
    `

const Layout =
    styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0 max(32px, 5%);
      color: white;
      -webkit-backdrop-filter: blur(32px) brightness(0.8);
      backdrop-filter: blur(32px) brightness(0.8);
      transition: scale .25s cubic-bezier(.42,.19,.62,1);
      
      &.full {
        scale: 1.0;
      }
      
      &.scale {
        scale: 0.9;
      }
    `

const Layout1 =
    styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      gap: 1rem;
      padding-top: 2rem;
    `

const Layout2 =
    styled.div`
      display: flex;
      align-items: center;
      gap: 1rem;
      width: 100%;
    `

const Layout3 =
    styled.div`

    `

// Player
const Player = () => {
    const { deleteRecord, update, getAll } = useIndexedDB("playlist");
    // State
    const [tracks, setTracks] = useState(tracks0);
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [rotate, setRotate] = useState("paused");
    const [size, setSize] = useState("default");
    const [reload, setReload] = useState(false);
    const [updates, setUpdate] = useState(0);
    const [isShowing, setIsShowing] = useState(false);
    const [settingShowing, setSettingShowing] = useState(false);
    const [playListShowing, setPlayListShowing] = useState(false);
    const [loopMode, setLoopMode] = useState(0);
    const [offset, setOffset] = useState(-0.6);
    const [toastMessage, setToastMessage] = useState({
        value: '',
        timestamp: new Date().getTime()
    });
    const [reduce, setReduce] = useState('');
    const [layout, setLayout] = useState(1);
    const [otherLyric, setOtherLyric] = useState(['']);

    // Destructure for conciseness
    const {title, subtitle, artist, cover, src, time_length} = tracks[trackIndex];

    // Refs
    const audioRef = useRef<HTMLAudioElement | null>(
        typeof Audio !== "undefined" ? new Audio() : null
    );
    const progress = useRef({
        trackHash: '',
        trackProgress: ''
    })

    const isReady = useRef(false);

    // Destructure for conciseness
    const {duration} = audioRef.current || {duration: 0};

    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%";
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, wheat), color-stop(${currentPercentage}, rgba(255,255,255,.5)))
  `;

    const onScrub = (value: number) => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => null;
            reduce !== 'reduce' && setReduce('reduce');
            setTrackProgress(value);
        }
    };

    const onScrubEnd = (value: number) => {
        // If not already playing, start
        if (audioRef.current) {
            setReduce('')
            if (value < time_length / 1000) {
                audioRef.current.currentTime = value
            } else {
                setToastMessage({
                    value: '超出试听时长',
                    timestamp: new Date().getTime()
                })
            }
            if (audioRef.current?.paused) {
                toPlay(true);
            }
            audioRef.current.ontimeupdate = () => {
                setTrackProgress(audioRef.current?.currentTime as number);
            }
        }
    };

    const toPrevTrack = () => {
        let index = trackIndex - 1 < 0 ? tracks.length - 1 : trackIndex - 1;
        setTrackIndex(index);
        setReload(true);
    };

    const toNextTrack = () => {
        let index = trackIndex < tracks.length - 1 ? trackIndex + 1 : 0;
        setTrackIndex(index);
        setReload(true);
    };

    const toRandomTrack = () => {
        let index = Math.round(Math.random() * (tracks.length - 1));
        setTrackIndex(index);
        setReload(true);
    }

    const notify = (string: string) => toast(string);

    const setUpdatedTracks = () => {
        getAll().then((_tracks: Track[]) => {
            console.log('tracks check once again:',_tracks)
            if (_tracks.length > 0) {
                setTracks(_tracks);
                let hash = localStorage.getItem('trackHash');
                let index = _tracks.findIndex(track => track.code === hash)
                if (hash && index > -1) {
                    setTrackIndex(index);
                    setReload(true);
                    setTimeout(() => {
                        audioRef.current!.currentTime = Number(localStorage.getItem('trackProgress') || 0)
                    }, 100)
                } else {
                    setTrackIndex(0);
                    setReload(true);
                }
            }
        });
    }

    const switchSearch = () => {
        setIsShowing(true);
    }

    const handleAllUpdates = (tracks: Track[]) => {
        const time = new Date().getTime();
        let queue: number[] = [];
        let updated: number[] = [];
        // a jsonp mode
        Promise.all(
            // 逐个比对 timestamp，判断 track 是否需要更新，比对结果返回到下一阶段处理
            tracks.map((item: Track) => {
                if (item.timestamp > time) {
                    console.log('skipped',item.unique_index)
                    return null
                } else {
                    console.log('ready to update',item.unique_index)
                    queue.push(item.unique_index)
                    return isNaN(Number(item.encode_audio_id)) ? fetchMusicSource(0, item) : fetchMusicSource(1, item)
                }
            })
        ).then(tasks => {
            // 待更新项不为 0 时给出更新提示，并逐个比对返回结果，按统一标准格式存入数据库
            tasks.map(async (res, i) => {
                if (res) {
                    if (res.err_code === 0) {
                        let item: itemType = res.data;
                        let regex = /^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
                        if (regex.test(item.play_url)) {
                            update({
                                title: item.song_name,
                                subtitle: item.album_name,
                                artist: item.author_name,
                                src: item.play_url,
                                cover: item.img.replaceAll('http:', 'https:'),
                                lyric: item.lyrics,
                                album_id: item.album_id,
                                encode_audio_id: item.encode_album_audio_id,
                                code: item.hash,
                                timestamp: new Date().getTime() + 86400000,
                                unique_index: i + 1,
                                time_length: !item.is_free_part ? item.timelength : item.trans_param.hash_offset.end_ms
                            }).then(() => updated.push(i + 1))
                        } else {
                            throw new Error("Can't fetch the source")
                        }
                    } else if (res.data.status.code) {
                        let item: itemType2 = res.data.data;
                        let tempar: string[] = [];
                        item.ar.map((item: any) => tempar.push(item.name));
                        if (item.mp3.url.length > 0) {
                            update({
                                title: item.name,
                                subtitle: item.al.name,
                                artist: tempar.join('、'),
                                src: `https://music.163.com/song/media/outer/url?id=${item.mp3.id}.mp3`,
                                cover: item.al.picUrl.replaceAll('http:', 'https:'),
                                lyric: await fetchLyric(item.mp3.id).then(data => data.lyric),
                                album_id: item.al.id,
                                encode_audio_id: String(item.mp3.id),
                                code: item.mp3.md5,
                                timestamp: new Date().getTime() + 86400000,
                                unique_index: i + 1,
                                time_length: item.mp3.time
                            }).then(() => updated.push(i + 1))
                        } else {
                            throw new Error("Can't fetch the source")
                        }
                    }
                }
            })
        }).then(() => {
            console.log(queue, updated)
            if (updated.length !== queue.length) {
                setToastMessage({
                    value: '数据更新中，请稍候...',
                    timestamp: new Date().getTime()
                })
                setTimeout(() => {
                    console.log(queue.filter(i => !updated.includes(i)).join('~'),'is timeout')
                    setUpdatedTracks()
                }, 3000)
            } else {
                setUpdatedTracks()
            }
        }).catch(err => {
            console.log(err)
        })
        /*
        //a proxy mode
        axios.all(
            tracks.map((item: Track, id: number) => {
                if (item.timestamp > time) {
                    console.log('skipped',id)
                } else {
                    console.log('ready to update',id)
                    queue.push(item.unique_index)
                    return fetchMusicSource(item)
                }
            })
        ).then(axios.spread((...tasks) => {
            queue.length > 0 && setToastMessage({
                value: '数据更新中，请稍候...',
                timestamp: new Date().getTime()
            })
            tasks.map((res, i) => {
                if (!res.data.err_code) {
                    let item: itemType = res.data.data;
                    let regex = /^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
                    if (typeof item.play_url === 'string' && regex.test(item.play_url)) {
                        update({
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
                            unique_index: i + 1,
                            time_length: !item.is_free_part ? item.timelength : item.trans_param.hash_offset.end_ms
                        }).then(() => {
                            console.log(i,'saved')
                        })
                    } else {
                        throw new Error("Can't fetch the source")
                    }
                }
            })
            setUpdatedTracks()
        }))
        */
    }

    const toPlay = (flag: boolean) => {
        if (flag) {
            setIsPlaying(true)
            setIsRotating(true)
            audioRef.current?.play()
                .then()
                .catch(error => {
                    toPlay(false)
                    handlePlayError(error)
                })
        } else {
            setIsPlaying(false)
            setIsRotating(false)
            audioRef.current?.pause()
        }
    }

    const handleDelete = async (text: string, index: number) => {
        const isConfirmed = await simpleConfirm({
            title: '删除警告',
            message: text,
            confirmLabel: '确认',
            cancelLabel: '算了'
        })
        if (isConfirmed) {
            if (tracks.length > 1) {
                console.log(index+' deleted')
                let isLocal = tracks[index].unique_index < 0
                const _tracks = tracks.filter((item, num) => num !== index)
                _tracks.forEach((item, num) => {
                    item.unique_index = item.unique_index > 0 ? num + 1 : -1
                })
                console.log(_tracks)
                setTracks(_tracks)
                if (trackIndex === index) {
                    setTrackIndex(trackIndex < _tracks.length ? trackIndex : 0)
                    setReload(true)
                } else {
                    setTrackIndex(trackIndex < index ? trackIndex : trackIndex - 1)
                }
                !isLocal && setUpdate(updates < 0 ? updates - 1 : -1)
            } else {
                window.indexedDB.deleteDatabase("MiraiDB").onsuccess = () => {
                    window.location.reload()
                }
            }
        } else {
            console.log('nothing to do')
        }
    }

    const handleUpdate = async (text: string, index: number) => {
        const isConfirmed = await simpleConfirm({
            title: '确认更新',
            message: text,
            confirmLabel: '确认',
            cancelLabel: '算了'
        })
        if (isConfirmed) {
            let id = tracks[trackIndex].encode_audio_id
            if (isNaN(Number(id))) {
                fetchMusicSource(0, tracks[trackIndex])
                    .then(res => {
                        if (res) {
                            if (res.err_code === 0) {
                                let item: itemType = res.data;
                                let regex = /^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
                                if (regex.test(item.play_url)) {
                                    return update({
                                        title: item.song_name,
                                        subtitle: item.album_name,
                                        artist: item.author_name,
                                        src: item.play_url,
                                        cover: item.img.replaceAll('http:','https:'),
                                        lyric: item.lyrics,
                                        album_id: item.album_id,
                                        encode_audio_id: item.encode_album_audio_id,
                                        code: item.hash,
                                        timestamp: new Date().getTime() + 86400000,
                                        unique_index: trackIndex + 1,
                                        time_length: !item.is_free_part ? item.timelength : item.trans_param.hash_offset.end_ms
                                    })
                                } else {
                                    throw new Error("Can't fetch the source")
                                }
                            }
                        }
                    })
                    .then(() => {
                        setUpdatedTracks()
                    })
            } else {
                fetchMusicSource(1, tracks[trackIndex])
                    .then(async res => {
                        if (res) {
                            if (res.data.status.code) {
                                let item: itemType2 = res.data.data;
                                let tempar: string[] = [];
                                item.ar.map((item: any) => tempar.push(item.name));
                                console.log(await fetchLyric(item.mp3.id))
                                if (item.mp3.url.length > 0) {
                                    console.log(item.mp3.url)
                                    return update({
                                        title: item.name,
                                        subtitle: item.al.name,
                                        artist: tempar.join('、'),
                                        src: `https://music.163.com/song/media/outer/url?id=${item.mp3.id}.mp3`,
                                        cover: item.al.picUrl,
                                        lyric: await fetchLyric(item.mp3.id).then(data => data.lyric),
                                        album_id: item.al.id,
                                        encode_audio_id: String(item.mp3.id),
                                        code: item.mp3.md5,
                                        timestamp: new Date().getTime() + 86400000,
                                        unique_index: trackIndex + 1,
                                        time_length: item.mp3.time
                                    })
                                } else {
                                    throw new Error("Can't fetch the source")
                                }
                            }
                        }
                    })
                    .then(() => {
                        setUpdatedTracks()
                    })
            }
        } else {
            console.log('nothing to do')
        }
    }

    const handlePlayError = (e: Error) => {
        let value: string;
        if (e.message.includes('no supported source')) {
            value = '播放源出错';
        } else if (e.message.includes('user didn\'t interact') || e.message.includes('user denied permission')) {
            value = '当前浏览器禁止自动播放，请手动点击播放';
        } else {
            value = '出现不可预知的错误，错误信息：'+e.message;
        }
        setToastMessage({
            value: value,
            timestamp: new Date().getTime()
        });
        /*
        // try to update the track
        let id = tracks[trackIndex].encode_audio_id;
        let name = tracks[trackIndex].title;
        let isExpired = (tracks[trackIndex].timestamp >= new Date().getTime());
        if (isExpired) {
            if (id === '') {
                handleDelete(name+' 为本地导入现已失效，是否从歌单移除？（若为最后一首将初始化数据库）', trackIndex)
                    .then(() => console.log('manually removed.'))
            } else {
                handleUpdate(name+' 源链接已超出有效期，是否要尝试更新？', trackIndex)
                    .then(() => console.log('manually updated.'))
            }
        }
        */
        console.error(e.message)
    }

    const initActionHandler = () => {
        navigator.mediaSession.setActionHandler('play', () => null);
        navigator.mediaSession.setActionHandler('pause', () => null);
        navigator.mediaSession.setActionHandler('previoustrack', () => null);
        navigator.mediaSession.setActionHandler('nexttrack', () => null);
        navigator.mediaSession.setActionHandler('play', () => {
            toPlay(true)
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            toPlay(false);
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => {
            toPrevTrack();
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            toNextTrack();
        });
    }

    useEffect(() => {
        window.addEventListener('beforeunload', e => {
            audioRef.current?.pause();
            e.preventDefault();
            localStorage.setItem('trackHash', progress.current.trackHash);
            localStorage.setItem('trackProgress', progress.current.trackProgress);
            e.returnValue = "";
        })
        getAll().then((tracks: Track[]) => {
            console.log('1 >> get tracks and check whether it has expired:',tracks)
            // 若从数据库获取的音轨数等于 0 则启用预存数据并更新，否则检查获取音轨是否过期
            tracks.length > 0 ? handleAllUpdates(tracks.filter(track => track.code)) : handleAllUpdates(tracks0);
        });
        return(() => {
            window.removeEventListener('beforeunload', e => {
                e.preventDefault();
                localStorage.setItem('trackHash', progress.current.trackHash);
                localStorage.setItem('trackProgress', progress.current.trackProgress);
                e.returnValue = "";
            })
        })
    }, []);

    useEffect(() => {
        if (updates > 0) {
            tracks.map((data) => {
                data.unique_index > 0 && update(data).then(() => console.log('DATA UPDATED: a piece of data changed','+'))
            })
        }
        if (updates < 0) {
            deleteRecord(tracks.filter(item => item.unique_index > 0).length + 1).then(() => console.log('DATA UPDATED: a piece of data changed','-'))
        }
    }, [updates]);

    useEffect(() => {
        toastMessage.value !== '' && notify(toastMessage.value)
    }, [toastMessage]);

    useEffect(() => {
        if (isRotating) {
            setRotate("running");
        } else {
            setRotate("paused");
        }
    }, [isRotating]);

    useEffect(() => {
        if (audioRef.current && reload) {
            setReload(false);
            toPlay(false);
            audioRef.current.src = src;
            setTrackProgress(0);
            progress.current.trackHash = tracks[trackIndex].code;
            syncMediaSession(tracks[trackIndex]);
            initActionHandler();
            if (isReady.current) {
                toPlay(true);
            } else {
                // Set the isReady ref as true for the next pass
                isReady.current = true;
            }
        }
    }, [reload]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                setTrackProgress(audioRef.current?.currentTime as number);
                progress.current.trackProgress = String(audioRef.current?.currentTime);
            }
        }
    }, [audioRef.current?.readyState]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = loopMode === 1
        }
    }, [loopMode]);

    useEffect(() => {
        if (audioRef.current?.paused && (isPlaying || isRotating)) {
            setIsPlaying(false);
            setIsRotating(false);
        } else if (!audioRef.current?.paused && !(isPlaying || isRotating)) {
            setIsPlaying(true);
            setIsRotating(true);
        }
    }, [audioRef.current?.paused]);

    useEffect(() => {
        if (audioRef.current && audioRef.current.ended) {
            switch (loopMode) {
                case 0:
                    toNextTrack();
                    break;
                case 1:
                    break;
                case 2:
                    toRandomTrack();
                    break;
            }

        }
    }, [audioRef.current?.ended]);

    const past = getTime(trackProgress);
    const _duration = getTime(duration);

    return (
        <MiraiPlayer className={`bg-cover bg-center bg-no-repeat transition-all duration-300 ease-out`} style={{backgroundImage: `url(${tracks[trackIndex].cover})`}}>
            <Layout className={playListShowing ? 'scale' : 'full'}>
                {layout === 1 && (
                    <Layout1>
                        <Cover
                            rotate={rotate}
                            url={cover}
                            data-size={size}
                            desc={title}
                            onDoubleClick={switchSearch}
                        />
                        <Lyric
                            tracks={tracks}
                            trackIndex={trackIndex}
                            trackProgress={trackProgress}
                            reduce={reduce}
                            offset={offset}
                            layout={layout}
                            otherLyric={otherLyric}
                        />
                        <Title
                            title={title || "音乐感动生活"}
                            subtitle={subtitle || "Mirai 云端播放器"}
                            singer={artist || "未知歌手"}
                            trackIndex={trackIndex}
                        />
                    </Layout1>
                )}
                {layout === 2 && (
                    <Layout1>
                        <Layout2>
                            <Cover
                                rotate={rotate}
                                url={cover}
                                data-size={size}
                                desc={title}
                                onDoubleClick={switchSearch}
                            />
                            <Title
                                title={title || "音乐感动生活"}
                                subtitle={subtitle || "Mirai 云端播放器"}
                                singer={artist || "未知歌手"}
                                trackIndex={trackIndex}
                            />
                        </Layout2>
                        <Lyric
                            tracks={tracks}
                            trackIndex={trackIndex}
                            trackProgress={trackProgress}
                            reduce={reduce}
                            offset={offset}
                            layout={layout}
                            otherLyric={otherLyric}
                        />
                    </Layout1>
                )}
                {layout === 3 && (
                    <Layout3>
                        <Cover
                            rotate={rotate}
                            url={cover}
                            data-size={size}
                            desc={title}
                            onDoubleClick={switchSearch}
                        />
                        <Lyric
                            tracks={tracks}
                            trackIndex={trackIndex}
                            trackProgress={trackProgress}
                            reduce={reduce}
                            offset={offset}
                            layout={layout}
                            otherLyric={otherLyric}
                        />
                        <Title
                            title={title || "音乐感动生活"}
                            subtitle={subtitle || "Mirai 云端播放器"}
                            singer={artist || "未知歌手"}
                            trackIndex={trackIndex}
                        />
                    </Layout3>
                )}
                <Progress
                    past={past}
                    _duration={_duration}
                    trackProgress={trackProgress}
                    duration={duration}
                    onScrub={onScrub}
                    onScrubEnd={onScrubEnd}
                    trackStyling={trackStyling}
                />
                <Controller
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={toPlay}
                    onPlayListClick={setPlayListShowing}
                    setSettingShowing={setSettingShowing}
                    loopMode={loopMode}
                    setLoopMode={setLoopMode}
                />
                <Search
                    isShowing={isShowing}
                    setIsShowing={setIsShowing}
                    tracks={tracks}
                    setTracks={setTracks}
                    updates={updates}
                    setUpdate={setUpdate}
                    setToastMessage={setToastMessage}
                />
                <Setting
                    isShowing={settingShowing}
                    setIsShowing={setSettingShowing}
                    tracks={tracks}
                    setTracks={setTracks}
                    trackIndex={trackIndex}
                    setTrackIndex={setTrackIndex}
                    setToastMessage={setToastMessage}
                    offset={offset}
                    setOffset={setOffset}
                    size={size}
                    setSize={setSize}
                    update={update}
                    layout={layout}
                    setLayout={setLayout}
                    setOtherLyric={setOtherLyric}
                />
            </Layout>
            <ToastContainer />
            <PlayList
                tracks={tracks}
                setTracks={setTracks}
                trackIndex={trackIndex}
                setTrackIndex={setTrackIndex}
                isShowing={playListShowing}
                setIsShowing={setPlayListShowing}
                updates={updates}
                setUpdate={setUpdate}
                setReload={setReload}
                toPlay={toPlay}
                playState={isPlaying}
            />
        </MiraiPlayer>
    )
}

export default Player;