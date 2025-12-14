import {usePlayer} from "@/contexts";

export function ControlButtons() {
    const { audio, playlist, actions } = usePlayer();

    return (
        <div className="center">
            <button
                className="button_control prev"
                onClick={playlist.previousTrack}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                    <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M6 7v10M17.028 5.267a.6.6 0 0 1 .972.471v12.524a.6.6 0 0 1-.972.47l-7.931-6.261a.6.6 0 0 1 0-.942z"></path>
                </svg>
            </button>
            <button
                className="button_control play"
                onClick={actions.togglePlayback}
            >
                {audio.isPlaying ? (
                    <svg className="pause-icon" xmlns="http://www.w3.org/2000/svg" width="64"
                         height="64" viewBox="0 0 24 24">
                        <g fill="none" stroke="#fff" strokeWidth="1">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9v6m5-6v6"></path>
                        </g>
                    </svg>
                ) : (
                    <svg className="play-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
                        <g fill="none">
                            <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1"></circle>
                            <path fill="#fff"
                                  d="M9.5 11.2v1.6c0 1.52 0 2.28.456 2.586s1.079-.032 2.326-.712l1.468-.8C15.25 13.056 16 12.647 16 12s-.75-1.056-2.25-1.874l-1.469-.8c-1.246-.68-1.87-1.02-2.325-.712C9.5 8.92 9.5 9.68 9.5 11.2"></path>
                        </g>
                    </svg>
                )}
            </button>
            <button
                className="button_control next"
                onClick={playlist.nextTrack}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                    <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25" d="M18 7v10M6.972 5.267A.6.6 0 0 0 6 5.738v12.524a.6.6 0 0 0 .972.47l7.931-6.261a.6.6 0 0 0 0-.942z"></path>
                </svg>
            </button>
        </div>
    );
}