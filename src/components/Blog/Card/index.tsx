import React, {useState} from 'react';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import Image from "next/image";

interface articleProps {
    post: {
        game_id: number,
        post_id: string,
        f_forum_id: number,
        uid: string,
        subject: string,
        content: string,
        cover: string,
        view_type: number,
        created_at: number,
        images: string[],
        post_status: {
            is_top: boolean,
            is_good: boolean,
            is_official: boolean
        },
        topic_ids: number[],
        view_status: number,
        max_floor: number,
        is_original: number,
        republish_authorization: number,
        reply_time: string,
        is_deleted: number,
        is_interactive: boolean,
        score: number,
        is_mentor: boolean
    },
    forum: {
        id: number,
        name: string
    },
    topics: {
        id: number,
        name: string,
        cover: string,
        content_type: number
    }[],
    user: {
        uid: string,
        nickname: string,
        introduce: string,
        avatar: string,
        gender: number,
        certification: {
            type: number,
            label: string
        },
        level_exp: {
            level: number,
            exp: number
        },
        avatar_url: string,
        pendant: string,
        is_following: boolean,
        is_followed: boolean,
        certifications: {
            type: number,
            label: string
        }[],
        is_creator: boolean
    },
    self_operation: null,
    stat: {
        reply_num: number,
        view_num: number,
        like_num: number,
        bookmark_num: number,
        post_upvote_stat: number[]
    },
    cover: {
        url: string,
        height: number,
        width: number,
        format: string,
        size: string,
        crop: {
            x: number,
            y: number,
            w: number,
            h: number,
            url: string
        } | null,
        is_user_set_cover: boolean,
        image_id: string,
        entity_type: string,
        entity_id: string
    } | null,
    image_list: {
        url: string,
        height: number,
        width: number,
        format: string,
        size: string,
        crop: string | null,
        is_user_set_cover: boolean,
        image_id: string,
        entity_type: string,
        entity_id: string
    }[],
    is_official_master: boolean,
    is_user_master: boolean,
    help_sys: {
        top_up: null
    },
    vote_count: number,
    last_modify_time: number,
    recommend_type: string,
    collection: null,
    vod_list: string[],
    recommend_reason: string | null,
    is_mentor: boolean
}[]

const links = {
    user: {
        ACCOUNT_LINK_PREFIX: 'https://www.miyoushe.com/ys/accountCenter/postList?id=',
    }
}

const parseTime: Function = (timestamp: number) => {
    timestamp = timestamp * 1000.0
    let time = new Date().getTime()
    let condition = time - timestamp
    let l = new Date(timestamp).getMonth() + 1
    let r = new Date(timestamp).getDate()
    return condition > 86400000 ? (l>9?l:'0'+l)+'-'+(r>9?r:'0'+r) : (Math.floor(condition/3600000))+'小时前'
}

const gameType = ["崩坏3", "原神", "崩坏学园2", "未定事件簿", "米游社", "崩坏：星穹铁道"]

const Card = ({ article, event$ } : { article: articleProps, event$: EventEmitter<any> }) => {
    const [viewed, setViewed] = useState(false);
    const Viewer = () => {
        !viewed && setViewed(true);
        event$.emit({ viewed: viewed, images: article.image_list });
    }
    return(
        <div className="card flex flex-col px-6 py-8 relative">
            <div className="card_header flex flex-grow items-center mb-3.5 relative">
                <div className="card__userinfo flex items-center">
                    <div className="card__user flex items-center">
                        <a href={links.user.ACCOUNT_LINK_PREFIX+article.user.uid} className="card__link inline-flex items-center text-gray-600">
                            <div className="card__avatar flex-shrink-0 w-6 h-6">
                                <Image src={article.user.avatar_url} alt="a blog image" className="avatar__img align-top rounded-full w-full h-full" width={300} height={300} loading={"lazy"} />
                            </div>
                        </a>
                    </div>
                    <div className="card__info inline-block ml-2.5 flex-grow overflow-hidden">
                        <a href={links.user.ACCOUNT_LINK_PREFIX+article.user.uid} className="card__link inline-block leading-[14px] align-top accent-gray-600 hover:text-sky-500">
                            <span className="text-xs ">{article.user.nickname}</span>
                            <span className="ml-1.5 px-1 leading-[9px] text-[9px] text-white bg-yellow-400">LV{article.user.level_exp.level}</span>
                        </a>
                    </div>
                    <div className={`card__follow absolute right-0 top-0 bg-[#00c3ff] text-sm/[26px] text-white text-center w-[70px] h-[26px] rounded-[13px] hover:bg-[#00d5ff] cursor-pointer ${article.user.is_followed?'hidden':'follow_btn'}`}>
                        <span>{article.user.is_followed?'已关注':'关注'}</span>
                    </div>
                </div>
                <span className="ml-2.5 text-xs text-[#cccccc]">{parseTime(article.post.created_at)} • {article.forum.name}</span>
                <span className="ml-2.5 text-xs text-[#cccccc]">{gameType[article.post.game_id-1]}</span>
            </div>
            <div className="card_body">
                <div className="card__title">{article.post.subject}</div>
                <div className="card__content whitespace-nowrap text-ellipsis overflow-hidden">{article.post.content}</div>
                <div className="card__preview flex gap-1.5">
                    {article.post.images.map((url, index) => (
                        <div className="card__img inline-block w-[120px] h-[120px] rounded-[6px] relative cursor-pointer" style={{
                            backgroundImage: `url(${url})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: '50%'
                        }} onClick={Viewer} key={index}></div>
                    ))}
                </div>
            </div>
            <div className="card_footer">

            </div>
        </div>
    )
};

export default Card;