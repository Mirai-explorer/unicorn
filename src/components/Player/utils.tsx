import axios from "axios";
import cookie from "react-cookies";
import md5 from "crypto-js/md5";
import JSONP from "fetch-jsonp";

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
    // a jsonp mode
    return JSONP(`https://wwwapi.kugou.com/yy/index.php?r=play/getdata&dfid=${cookie.load('kg_dfid') || '4FHbnb44LtSM2JrXpX3riltQ'}&mid=${cookie.load('kg_mid') || '50e0be703d34ee6401eedf772101571b'}&appid=1014&encode_album_audio_id=${data.encode_audio_id}&platid=4&_=${new Date().getTime()}`)
    /*
    // a proxy mode
    return axios.get('/get_song', {
        params: {
            r: 'play/getdata',
            dfid: cookie.load('kg_dfid') || '4FHbnb44LtSM2JrXpX3riltQ',
            mid: cookie.load('kg_mid') || '50e0be703d34ee6401eedf772101571b',
            appid: 1014,
            encode_album_audio_id: data.encode_audio_id,
            platid: 4,
            _: new Date().getTime()
        }
    })
    */
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

const syncMediaSession = (track: Track) => {
    navigator.mediaSession.metadata = new MediaMetadata({
        title: track.title,
        artist: track.artist,
        album: track.subtitle,
        artwork: [{ src: track.cover }]
    })
}

export { fetchMusicSource, syncMediaSession, getTime, sign };
export type { Track };