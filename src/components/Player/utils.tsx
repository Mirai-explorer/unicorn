import axios from "axios";
import cookie from "react-cookies";
import md5 from "crypto-js/md5"

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

const sign = (params: [string, number | string][]) => {
    let source: string[] = [];
    params.forEach((v,i)=>{source[i]=v.join('=')});
    return md5('NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt'+source.join('')+'NVPh5oo715z5DIWAeQlhMDsWXXQV4hwt').toString()
}

const fetchMusicSource = async(data: Track | sTrack) => {
    return axios.get('/getsong1', {
        params: {
            r: 'play/getdata',
            dfid: cookie.load('kg_dfid') || '3x7DYT4HlRDu3PzEsJ09LEqh',
            mid: cookie.load('kg_mid') || '25c7d487da516f05cea717f9deef0fb3',
            appid: 1014,
            encode_album_audio_id: data.encode_audio_id,
            platid: 4,
            _: new Date().getTime()
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

export { fetchMusicSource, getTime, sign };
export type { Track };