import axios from "axios";
import cookie from "react-cookies";

type Track = {
    title: string,
    subtitle: string,
    artist: string,
    src: string,
    cover: string,
    lyric: string,
    album_id: string,
    encode_audio_id: string,
    code: string,
    timestamp: number,
    unique_index: number,
    time_length: number
}

type sTrack = {
    code: string | undefined,
    album_id: string | undefined,
    encode_audio_id: string | undefined
}

const fetchMusicSource = async(data: Track | sTrack) => {
    return axios.get('https://bird.ioliu.cn/v1?url=https://wwwapi.kugou.com/yy/index.php', {
        params: {
            r: 'play/getdata',
            hash: data.code,
            album_id: data.album_id,
            dfid: '3x7DYT4HlRDu3PzEsJ09LEqh',
            mid: cookie.load('kg_mid'),
            platid: 4
        }
    })
} //[INVOLVE]获取歌曲源

const getTime = (type: number) => {
    let timeDisplay = Math.floor(type);
    let min = !Number.isNaN(timeDisplay) ? timeDisplay / 60 : -1;
    let mins: number | string = min | 0;
    if (mins >= 0 && mins < 10) {
        mins = "0" + mins;
    } else if (mins === -1) {
        mins = "--";
    }
    let sec = !Number.isNaN(timeDisplay) ? timeDisplay % 60 : -1;
    let secs: number | string = sec | 0;
    if (secs >= 0 && secs < 10) {
        secs = "0" + secs;
    } else if (secs === -1) {
        secs = "--";
    }
    return mins + ":" + secs;
};

export { fetchMusicSource, getTime };
export type { Track };
