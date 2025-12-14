import {usePlayer} from "@/contexts";

interface Props {
    position?: 'left' | 'right';
}

export function SideButtons({ position = 'left' }: Props) {
    const { audio, playlist, ui, actions } = usePlayer();
    return (
        <div className={position}>
            {position === 'left' && (
                <>
                    <button
                        className="icon_button loop"

                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                <path d="m16.388 3l1.003.976c.448.436.672.654.593.839C17.906 5 17.59 5 16.955 5h-7.76C5.22 5 2 8.134 2 12c0 1.487.477 2.866 1.29 4m4.322 5l-1.003-.976c-.448-.436-.672-.654-.593-.839C6.094 19 6.41 19 7.045 19h7.76C18.78 19 22 15.866 22 12a6.84 6.84 0 0 0-1.29-4"></path>
                                <path d="M13 15V9.316c0-.26-.282-.408-.48-.252l-1.52 1.2"></path>
                            </g>
                        </svg>
                    </button>
                    <button
                        className="icon_button playlist"
                        onClick={ui.showPlaylist}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                            <path fill="#fff" d="M32 64a8 8 0 0 1 8-8h176a8 8 0 0 1 0 16H40a8 8 0 0 1-8-8m8 72h120a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16m72 48H40a8 8 0 0 0 0 16h72a8 8 0 0 0 0-16m135.66-57.7a8 8 0 0 1-10 5.36L208 122.75V192a32.05 32.05 0 1 1-16-27.69V112a8 8 0 0 1 10.3-7.66l40 12a8 8 0 0 1 5.36 9.96M192 192a16 16 0 1 0-16 16a16 16 0 0 0 16-16"></path>
                        </svg>
                    </button>
                </>
            )}
            {position === 'right' && (
                <>
                    <button
                        className="icon_button setting"
                        onClick={ui.showSettings}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                            <g fill="none" stroke="#fff" strokeWidth="1.5">
                                <path
                                    d="M3.082 13.945c-.529-.95-.793-1.426-.793-1.945s.264-.994.793-1.944L4.43 7.63l1.426-2.381c.559-.933.838-1.4 1.287-1.66c.45-.259.993-.267 2.08-.285L12 3.26l2.775.044c1.088.018 1.631.026 2.08.286s.73.726 1.288 1.659L19.57 7.63l1.35 2.426c.528.95.792 1.425.792 1.944s-.264.994-.793 1.944L19.57 16.37l-1.426 2.381c-.559.933-.838 1.4-1.287 1.66c-.45.259-.993.267-2.08.285L12 20.74l-2.775-.044c-1.088-.018-1.631-.026-2.08-.286s-.73-.726-1.288-1.659L4.43 16.37z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </g>
                        </svg>
                    </button>
                </>
            )}
        </div>
    );
}