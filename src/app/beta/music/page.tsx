"use client"
import './page.css';

const MusicPlayer = () => {
    return (
        <div className="player_container">
            <div className="player_wrapper">
                <section className="info">
                    {/* 播放列表卡片 */}
                    <div
                        className="playlist_card"
                        id="playlistCard"
                        style={{ display: "none" }}
                    >
                        <div className="playlist_header">
                            <h3>播放列表</h3>
                            <div className="playlist_count">1 / 6</div>
                        </div>
                        <div className="playlist_content" id="playlistContent">
                            {/* 当前播放歌曲 */}
                            <div className="playlist_item current_playing">
                                <div className="playlist_item_cover">
                                    <img
                                        src="https://imgessl.kugou.com/stdmusic/20250417/20250417090950647300.jpg"
                                        alt="童言无忌"
                                    />
                                </div>
                                <div className="playlist_item_info">
                                    <h4 className="playlist_item_title">童言无忌</h4>
                                    <p className="playlist_item_artist">HOYO-MiX</p>
                                </div>
                                <div className="playlist_item_volume">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="white"
                                            d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {/* 播放列表数据将通过JavaScript动态生成 */}
                        </div>
                    </div>
                    <div className="aside">
                        <div className="cover">
                            <img
                                src="https://imgessl.kugou.com/stdmusic/20250417/20250417090950647300.jpg"
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                    <div className="core">
                        <div className="meta">
                            <div className="title">童言无忌</div>
                            <div className="artists">HOYO-MiX</div>
                        </div>
                        <div className="lyrics">
                            <div className="lyrics_viewport">
                                <div className="lyrics_container" id="lyricsContainer">
                                    {/* 歌词将通过JavaScript动态生成 */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="controls">
                    <div className="progress_bar">
                        <div className="track_unit" role="slider">
                            <div className="progress_buffered" />
                            <div className="progress_completed" />
                            <div className="progress_handle" />
                            {/* 时间预览元素 */}
                            <div className="time_preview" id="timePreview">
                                --:--
                            </div>
                        </div>
                        <div className="time_unit">
                            <div className="time_display current">--:--</div>
                            <div className="time_display duration">--:--</div>
                        </div>
                    </div>
                    <div className="control_area">
                        <div className="left">
                            <button className="icon_button loop">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={32}
                                    height={32}
                                    viewBox="0 0 24 24"
                                >
                                    <g
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                    >
                                        <path d="m16.388 3l1.003.976c.448.436.672.654.593.839C17.906 5 17.59 5 16.955 5h-7.76C5.22 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4m4.322 5l-1.003-.976c-.448-.436-.672-.654-.593-.839C6.094 19 6.41 19 7.045 19h7.76C18.78 19 22 15.866 22 12a6.84 6.84 0 0 0-1.29-4" />
                                        <path d="M13 15V9.316c0-.26-.282-.408-.48-.252l-1.52 1.2" />
                                    </g>
                                </svg>
                            </button>
                            <button className="icon_button playlist">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={32}
                                    height={32}
                                    viewBox="0 0 256 256"
                                >
                                    <path
                                        fill="#fff"
                                        d="M32 64a8 8 0 0 1 8-8h176a8 8 0 0 1 0 16H40a8 8 0 0 1-8-8m8 72h120a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16m72 48H40a8 8 0 0 0 0 16h72a8 8 0 0 0 0-16m135.66-57.7a8 8 0 0 1-10 5.36L208 122.75V192a32.05 32.05 0 1 1-16-27.69V112a8 8 0 0 1 10.3-7.66l40 12a8 8 0 0 1 5.36 9.96M192 192a16 16 0 1 0-16 16a16 16 0 0 0 16-16"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="center">
                            <button className="button_control prev">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={48}
                                    height={48}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.25"
                                        d="M6 7v10M17.028 5.267a.6.6 0 0 1 .972.471v12.524a.6.6 0 0 1-.972.47l-7.931-6.261a.6.6 0 0 1 0-.942z"
                                    />
                                </svg>
                            </button>
                            <button className="button_control play">
                                <svg
                                    className="play-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={64}
                                    height={64}
                                    viewBox="0 0 24 24"
                                >
                                    <g fill="none">
                                        <circle
                                            cx={12}
                                            cy={12}
                                            r={10}
                                            stroke="#fff"
                                            strokeWidth={1}
                                        />
                                        <path
                                            fill="#fff"
                                            d="M9.5 11.2v1.6c0 1.52 0 2.28.456 2.586s1.079-.032 2.326-.712l1.468-.8C15.25 13.056 16 12.647 16 12s-.75-1.056-2.25-1.874l-1.469-.8c-1.246-.68-1.87-1.02-2.325-.712C9.5 8.92 9.5 9.68 9.5 11.2"
                                        />
                                    </g>
                                </svg>
                                <svg
                                    className="pause-icon"
                                    style={{ display: "none" }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={64}
                                    height={64}
                                    viewBox="0 0 24 24"
                                >
                                    <g fill="none" stroke="#fff" strokeWidth={1}>
                                        <circle cx={12} cy={12} r={10} />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.5 9v6m5-6v6"
                                        />
                                    </g>
                                </svg>
                            </button>
                            <button className="button_control next">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={48}
                                    height={48}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="none"
                                        stroke="#fff"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.25"
                                        d="M18 7v10M6.972 5.267A.6.6 0 0 0 6 5.738v12.524a.6.6 0 0 0 .972.47l7.931-6.261a.6.6 0 0 0 0-.942z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="right">
                            <button className="icon_button setting">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={32}
                                    height={32}
                                    viewBox="0 0 24 24"
                                >
                                    <g fill="none" stroke="#fff" strokeWidth="1.5">
                                        <path d="M3.082 13.945c-.529-.95-.793-1.426-.793-1.945s.264-.994.793-1.944L4.43 7.63l1.426-2.381c.559-.933.838-1.4 1.287-1.66c.45-.259.993-.267 2.08-.285L12 3.26l2.775.044c1.088.018 1.631.026 2.08.286s.73.726 1.288 1.659L19.57 7.63l1.35 2.426c.528.95.792 1.425.792 1.944s-.264.994-.793 1.944L19.57 16.37l-1.426 2.381c-.559.933-.838 1.4-1.287 1.66c-.45.259-.993.267-2.08.285L12 20.74l-2.775-.044c-1.088-.018-1.631-.026-2.08-.286s-.73-.726-1.288-1.659L4.43 16.37z" />
                                        <circle cx={12} cy={12} r={3} />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
                <section className="expand">
                    <button className="icon_button setting">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={32}
                            height={32}
                            viewBox="0 0 24 24"
                        >
                            <g
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                            >
                                <path d="m16.388 3l1.003.976c.448.436.672.654.593.839C17.906 5 17.59 5 16.955 5h-7.76C5.22 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4m4.322 5l-1.003-.976c-.448-.436-.672-.654-.593-.839C6.094 19 6.41 19 7.045 19h7.76C18.78 19 22 15.866 22 12a6.84 6.84 0 0 0-1.29-4" />
                                <path d="M13 15V9.316c0-.26-.282-.408-.48-.252l-1.52 1.2" />
                            </g>
                        </svg>
                    </button>
                    <button className="icon_button setting">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={32}
                            height={32}
                            viewBox="0 0 24 24"
                        >
                            <g
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                            >
                                <path d="m16.388 3l1.003.976c.448.436.672.654.593.839C17.906 5 17.59 5 16.955 5h-7.76C5.22 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4m4.322 5l-1.003-.976c-.448-.436-.672-.654-.593-.839C6.094 19 6.41 19 7.045 19h7.76C18.78 19 22 15.866 22 12a6.84 6.84 0 0 0-1.29-4" />
                                <path d="M13 15V9.316c0-.26-.282-.408-.48-.252l-1.52 1.2" />
                            </g>
                        </svg>
                    </button>
                    <button className="icon_button setting">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={32}
                            height={32}
                            viewBox="0 0 24 24"
                        >
                            <g
                                fill="none"
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                            >
                                <path d="m16.388 3l1.003.976c.448.436.672.654.593.839C17.906 5 17.59 5 16.955 5h-7.76C5.22 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4m4.322 5l-1.003-.976c-.448-.436-.672-.654-.593-.839C6.094 19 6.41 19 7.045 19h7.76C18.78 19 22 15.866 22 12a6.84 6.84 0 0 0-1.29-4" />
                                <path d="M13 15V9.316c0-.26-.282-.408-.48-.252l-1.52 1.2" />
                            </g>
                        </svg>
                    </button>
                </section>
            </div>
            {/* 音频元素 */}
            <audio
                id="audioPlayer"
                src="https://webfs.tx.kugou.com/202512140131/c439f42850acb814f81c38ffe324bbeb/v3/87cac94a7789830710812782c46c8d77/yp/full/ap1014_us0_mi8d30fb80663def66732ae55baae976f4_pi406_mx742378647_s1902822278.mp3"
                preload="metadata"
            />
        </div>
    )
}

export default MusicPlayer;