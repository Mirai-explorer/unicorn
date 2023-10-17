export const DBConfig = {
    name: "MiraiDB",
    version: 1,
    objectStoresMeta: [
        {
            store: "playlist",
            storeConfig: { keyPath: "unique_index", autoIncrement: false },
            storeSchema: [
                { name: "title", keypath: "title", options: { unique: false } },
                { name: "subtitle", keypath: "subtitle", options: { unique: false } },
                { name: "src", keypath: "src", options: { unique: false } },
                { name: "code", keypath: "code", options: { unique: false } },
                { name: "album_id", keypath: "album_id", options: { unique: false } },
                { name: "encode_audio_id", keypath: "encode_audio_id", options: { unique: false } },
                { name: "timestamp", keypath: "timestamp", options: { unique: false } },
                { name: "time_length", keypath: "time_length", options: { unique: false } },
                { name: "unique_index", keypath: "unique_index", options: { unique: false } },
                { name: "cover", keypath: "cover", options: { unique: false } },
                { name: "artist", keypath: "artist", options: { unique: false } },
                { name: "lyric", keypath: "lyric", options: { unique: false } },
            ],
        },
    ],
};