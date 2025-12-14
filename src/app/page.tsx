"use client"
import HomeMain from "@/components/Home/Main";
import HomeFooter from "@/components/Home/Footer";
import Card from '@/components/Common/Card';
import CardProfile from '@/components/Common/Card/Profile';
import CardColumn from '@/components/Common/Card/Column';
import CardItem from '@/components/Common/Card/Item';
import CardList from '@/components/Common/Card/List';
import Tag from '@/components/Common/Tag';
import { Icons as Icon } from "@/components/Icons/index";
import dynamic from "next/dynamic";
import React, {useState} from "react";
import {AsideProvider} from "@/components/Home/Header/AsideContext";

const HomeHeader = dynamic(() => import("@/components/Home/Header"), {
    ssr: false
});

const HomeAside = dynamic(() => import("@/components/Home/Aside"), {
    ssr: false
});

const App = () => {
    const language = [{
        name: 'English',
        level: 'CET-4',
        aim: 'IELTS/7.0'
    }, {
        name: 'Français',
        level: 'Débutant',
        aim: 'Intermédiaire'
    }, {
        name: '日本語',
        level: 'N3',
        aim: 'N1'
    }, {
        name: '粤语·广州话',
        level: '能日常交流',
        aim: '能熟练运用'
    }, {
        name: '吴语·上海话',
        level: '能听懂并简单对话',
        aim: '能日常交流'
    }]
    const [lang, setLang] = useState(0);
    return (
        <div className="app text-[#333333] bg-white">
            <AsideProvider>
                <HomeHeader></HomeHeader>
                <HomeAside></HomeAside>
                <HomeMain>
                    <div className="main_layout flex flex-col gap-4 tracking-wide">
                        <Card direction="col">
                            <CardProfile title="阿伟" subtitle="Aubrey" avatar="/images/profile/avatar0001.jpg"
                                         status="技术宅一枚，多多关照~" direction="col"/>
                            <CardColumn>
                                <CardItem keyname="常住地" value="上海·杨浦" icon={true} name="Location"></CardItem>
                                <CardItem keyname="生日" value="2-26" icon={true} name="Birthday"></CardItem>
                            </CardColumn>
                        </Card>
                        <section className="flex flex-col gap-4">
                            <div className="inline-flex items-center text-[1rem] font-semibold text-[#977A5C] tracking-wide">
                                <i className="!ps-2 !pe-2">
                                    <Icon className="icon-interest" name="Interest" width={24} height={24} fill="#977A5C"/>
                                </i>
                                <span className="primary">兴趣爱好•技能特长</span>
                            </div>
                            <div className={`waterfall flex flex-row gap-5 flex-wrap max-w-[992px]`}>
                                <Card title="语言" icon="Language" color="#977A5C" direction="row" index={lang} action={setLang}
                                      data={language}>
                                    <div className="card_slot_node flex flex-col gap-3 !pt-6 !pb-6">
                                        <div className="card_section flex flex-col gap-y-4 !pl-2 border-l-[#f3f3f3] border-l-[1px]">
                                            <div
                                                className="card_section_title inline-flex text-[20px] font-semibold">{language[lang].name}</div>
                                            <div className="card_section_content flex flex-col gap-y-4">
                                                <div className={`flex flex-col gap-y-2`}>
                                                    <div>当前水平</div>
                                                    <div className={`text-[18px] text-[#977A5C] transition-all`}>{language[lang].level}</div>
                                                </div>
                                                <div className={`flex flex-col gap-y-2`}>
                                                    <div>学习目标</div>
                                                    <div className={`text-[18px] text-[#977A5C] transition-all`}>{language[lang].aim}</div>
                                                </div>
                                                <div className={`flex flex-col gap-y-2`}>
                                                    <div>学习笔记</div>
                                                    <div className={`text-[18px] text-[#977A5C]`}>暂缺</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="音乐" icon="Music" color="#bb338a" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">喜欢的音乐类型</div>
                                            <div className="card_part flex flex-wrap gap-2">
                                                <Tag name="古典"></Tag>
                                                <Tag name="交响"></Tag>
                                                <Tag name="流行"></Tag>
                                                <Tag name="电子"></Tag>
                                                <Tag name="OST"></Tag>
                                            </div>
                                        </div>
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">我的歌单</div>
                                            <CardList>
                                                <div className="flex flex-wrap gap-2">
                                                    <Tag name="酷狗音乐"></Tag>
                                                    <Tag name="网易云音乐"></Tag>
                                                    <Tag name="QQ音乐"></Tag>
                                                    <Tag name="Spotify"></Tag>
                                                    <Tag name="Apple Music"></Tag>
                                                    <Tag name="Sony Select"></Tag>
                                                </div>
                                                <div></div>
                                            </CardList>
                                        </div>
                                        <div className="card_part">
                                            ||尝试：音乐创作
                                        </div>
                                    </div>
                                </Card>
                                <Card title="电影 / Film" icon="Film" color="#cccccc" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">喜欢的电影类型</div>
                                            <div className="card_section_content flex flex-wrap gap-2">
                                                <Tag name="动画"></Tag>
                                                <Tag name="剧情"></Tag>
                                                <Tag name="音乐"></Tag>
                                                <Tag name="悬疑"></Tag>
                                                <Tag name="科幻"></Tag>
                                            </div>
                                            <div className="card_section flex flex-col gap-3">
                                                <div className="card_section_title inline-flex text-[1rem]">我的观影片单</div>
                                                <CardList>
                                                    <div className="flex flex-wrap gap-2">
                                                        <Tag name="豆瓣"></Tag>
                                                    </div>
                                                </CardList>
                                            </div>
                                        </div>
                                        <div className="card_part">
                                            -力荐<br/>
                                            -电影/观影场所挑选手册<br/>
                                            -我和电影的故事<br/>
                                            -尝试：电影剪辑<br/>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="ACG / Anime·Comic·Game" icon="Anime" color="#cccccc" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">喜欢的ACG·动漫画</div>
                                            <div className="card_section_content flex flex-col gap-2">
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]">EVA</span>
                                                    <span className="card_item_value text-[#FEBA8C]"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="BilibiliWorld"></Tag>
                                            <Tag name="ChinaJoy"></Tag>
                                            <Tag name="ComicUP"></Tag>
                                            <Tag name="初音未来"></Tag>
                                            <Tag name="迪士尼"></Tag>
                                            <Tag name="日漫"></Tag>
                                            <Tag name="国创"></Tag>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="哔哩哔哩"></Tag>
                                            <Tag name="漫音社"></Tag>
                                            <Tag name="天使动漫"></Tag>
                                        </div>
                                        <div className="card_part">
                                            -漫展/相关展会活动<br/>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="ACG / Anime·Comic·Game" icon="Game" color="#cccccc" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">喜欢的ACG·游戏类型</div>
                                            <div className="card_section_content flex flex-wrap gap-2">
                                                <Tag name="RPG"></Tag>
                                                <Tag name="ARPG"></Tag>
                                                <Tag name="ACT"></Tag>
                                                <Tag name="MSC"></Tag>
                                                <Tag name="PUZ"></Tag>
                                                <Tag name="TD"></Tag>
                                                <Tag name="TAB"></Tag>
                                                <Tag name="GAL"></Tag>
                                                <Tag name="TECH OTAKU SAVE THE WORLD"></Tag>
                                            </div>
                                        </div>
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">在玩/玩过哪些游戏？</div>
                                            <div className="card_section_content flex flex-wrap gap-2">
                                                <Tag name="原神"></Tag>
                                                <Tag name="崩坏3"></Tag>
                                                <Tag name="崩坏：星穹铁道"></Tag>
                                                <Tag name="プリンセスコネクト Re:Dive"></Tag>
                                                <Tag name="ウマ娘"></Tag>
                                                <Tag name="プロジェクト セカイ"></Tag>
                                                <Tag name="BanG Dream!"></Tag>
                                                <Tag name="ブルーアーカイブ"></Tag>
                                                <Tag name="碧蓝航线"></Tag>
                                                <Tag name="刺客信条系列"></Tag>
                                                <Tag name="GTA系列"></Tag>
                                                <Tag name="生化危机系列"></Tag>
                                            </div>
                                        </div>
                                        <div className="card_part">
                                            -漫展/相关展会活动<br/>
                                            -期望的游戏内容/模式/美术表现/音乐<br/>
                                            -尝试：游戏制作<br/>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="旅行 / Trip" icon="Trip" color="#cccccc" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">去过哪些地方</div>
                                            <div className="card_section_content flex flex-wrap gap-2">
                                                <Tag name="北京"></Tag>
                                                <Tag name="上海"></Tag>
                                                <Tag name="杭州"></Tag>
                                                <Tag name="嘉兴"></Tag>
                                                <Tag name="苏州"></Tag>
                                                <Tag name="无锡"></Tag>
                                                <Tag name="南京"></Tag>
                                                <Tag name="信阳"></Tag>
                                                <Tag name="武汉"></Tag>
                                                <Tag name="孝感"></Tag>
                                                <Tag name="鄂州"></Tag>
                                                <Tag name="咸宁"></Tag>
                                                <Tag name="长沙"></Tag>
                                                <Tag name="岳阳"></Tag>
                                                <Tag name="广州"></Tag>
                                                <Tag name="深圳"></Tag>
                                                <Tag name="东莞"></Tag>
                                                <Tag name="佛山"></Tag>
                                                <Tag name="珠海"></Tag>
                                                <Tag name="湛江"></Tag>
                                                <Tag name="香港"></Tag>
                                                <Tag name="海口"></Tag>
                                            </div>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="自然景观"></Tag>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="Google地图"></Tag>
                                            <Tag name="百度地图"></Tag>
                                            <Tag name="旅行雷达"></Tag>
                                        </div>
                                        <div className="card_part">
                                            -想去哪些地方<br/>
                                            -喜欢怎样的景色/景观/景物<br/>
                                            -酒店挑选指南<br/>
                                            -出行指南<br/>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="阅读 / Reading" icon="Reading" color="#cccccc" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">读过哪些好书</div>
                                            <div className="card_section_content flex flex-col gap-2">
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]"></span>
                                                    <span className="card_item_value text-[#FEBA8C]"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="经典文学"></Tag>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="豆瓣"></Tag>
                                        </div>
                                        <div className="card_part">
                                            -我的书单<br/>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="摄影•视频创作 / Creation" icon="Creation" color="#cccccc" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">喜欢的摄影/视频作品</div>
                                            <div className="card_section_content flex flex-col gap-2">
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]"></span>
                                                    <span className="card_item_value text-[#FEBA8C]"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="风光"></Tag>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="Adobe Lightroom"></Tag>
                                            <Tag name="Google相机"></Tag>
                                        </div>
                                        <div className="card_part">
                                            -摄影入门教程<br/>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="数码科技 / Digital & Tech." icon="Tech" color="#cccccc" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">喜欢的数码产品</div>
                                            <div className="card_section_content flex flex-col gap-2">
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]">耳机</span>
                                                    <span className="card_item_value text-[#FEBA8C]">Sony WH-1000XM系列（头戴式无线降噪耳机）</span>
                                                </div>
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]">便携式笔记本电脑</span>
                                                    <span className="card_item_value text-[#FEBA8C]">HP OMEN 影精灵系列（高性能游戏本）</span>
                                                </div>
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]">智能移动终端</span>
                                                    <span className="card_item_value text-[#FEBA8C]">Samsung Galaxy S系列（ULTRA）</span>
                                                </div>
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]">平板电脑</span>
                                                    <span className="card_item_value text-[#FEBA8C]">Apple iPad Pro系列</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="极致"></Tag>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="IT之家"></Tag>
                                            <Tag name="酷安"></Tag>
                                        </div>
                                        <div className="card_part">
                                            -数码产品怎么选<br/>
                                            -关注的数码品牌<br/>
                                            -喜欢的科技产品<br/>
                                            -关注的科技公司<br/>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="美食 / Delicious Food" icon="Delicious" color="#cccccc" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">喜欢的美食</div>
                                            <div className="card_section_content flex flex-col gap-2">
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]">麦当劳系列</span>
                                                    <span className="card_item_value text-[#FEBA8C]">巨无霸 麦麦脆汁鸡 麦旋风 菠萝派</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="麦当劳"></Tag>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="美团"></Tag>
                                        </div>
                                        <div className="card_part">
                                            -自制酸奶<br/>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="薅羊毛 / Coupon Clipping" icon="Coupon" color="#cccccc" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">薅羊毛的魔力</div>
                                            <div className="card_section_content flex flex-col gap-2">
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]">乐趣</span>
                                                    <span className="card_item_value text-[#FEBA8C]">越薅越快乐</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="立减金"></Tag>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="什么值得买"></Tag>
                                            <Tag name="羊毛撸啊撸（公众号）"></Tag>
                                        </div>
                                        <div className="card_part">
                                            -羊毛小贴士<br/>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="编程 / Programing" icon="Programing" color="#cccccc" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">薅走一根头发</div>
                                            <div className="card_section_content flex flex-col gap-2">
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]">上手</span>
                                                    <span className="card_item_value text-[#FEBA8C]">Next.js | React</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="GitHub"></Tag>
                                            <Tag name="StackFlow"></Tag>
                                        </div>
                                        <div className="card_part">
                                            <p>
                                                •&nbsp;技术探索<br/>
                                                •&nbsp;信息加工<br/>
                                                •&nbsp;平面设计<br/>
                                            </p>
                                            <p>
                                                •&nbsp;公交/地铁/火车/航空迷<br/>
                                                •&nbsp;天文<br/>
                                                •&nbsp;历史<br/>
                                            </p>

                                            <p>•&nbsp;编程<br/>
                                                Web开发方向&nbsp;[<br/>
                                                Next.js&nbsp;on&nbsp;React(Priority)<br/>
                                                Nuxt.js&nbsp;on&nbsp;Vue.js<br/>
                                                Vanilla&nbsp;JavaScript[ES2021]<br/>
                                                ]<br/>
                                                原生/桌面/服务器开发方向&nbsp;[<br/>
                                                Kotlin<br/>
                                                Swift<br/>
                                                C<br/>
                                                C#<br/>
                                                C++<br/>
                                                Java<br/>
                                                Python<br/>
                                                Golang<br/>
                                                Lua<br/>
                                                ]<br/>
                                                跨平台开发方向&nbsp;[<br/>
                                                Flutter<br/>
                                                React&nbsp;Native<br/>
                                                Electron<br/>
                                                ]<br/>
                                                常用IDE&nbsp;[<br/>
                                                WebStorm<br/>
                                                IDEA<br/>
                                                Visual&nbsp;Studio<br/>
                                                Android&nbsp;Studio<br/>
                                                VS&nbsp;Code<br/>
                                                ]</p>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="找到我 / Finding me" icon="Wave" color="#cccccc" direction="col">
                                    <div className="card_slot_node flex flex-col gap-3 !pl-4 !pr-4 !pt-2 !pb-2">
                                        <div className="card_section flex flex-col gap-3">
                                            <div className="card_section_title inline-flex text-[1rem]">欢迎一起探讨...</div>
                                            <div className="card_section_content flex flex-col gap-2">
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]">技术</span>
                                                    <span className="card_item_value text-[#FEBA8C]">前端技术</span>
                                                </div>
                                                <div className="card_item inline-flex gap-2">
                                                    <span className="card_item_name text-[#C2A896]">更多话题</span>
                                                    <span className="card_item_value text-[#FEBA8C]">兴趣 爱好...</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card_part flex flex-wrap gap-2">
                                            <Tag name="Github"></Tag>
                                            <Tag name="StackFlow"></Tag>
                                        </div>
                                        <div className="card_part">
                                            <p>Contact&nbsp;with&nbsp;me<br/>
                                                社交平台<br/>
                                                Facebook<br/>
                                                Instagram<br/>
                                                Telegram<br/>
                                                Discord<br/>
                                                Skype<br/>
                                                微博</p>

                                            <p>内容社区/创作平台<br/>
                                                微信公众号<br/>
                                                豆瓣<br/>
                                                知乎<br/>
                                                酷安<br/>
                                                百度贴吧<br/>
                                                YouTube<br/>
                                                GitHub<br/>
                                                Gitee<br/>
                                                电子邮箱<br/>
                                                QQ邮箱<br/>
                                                网易163邮箱<br/>
                                                Outlook<br/>
                                            </p>

                                            <p>游戏社区<br/>
                                                Steam<br/>
                                                Ubi</p>

                                            <p>欢迎赞助<br/>
                                                支付宝<br/>
                                                云闪付<br/>
                                                微信支付<br/>
                                                PayPal</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </section>
                    </div>
                </HomeMain>
                <HomeFooter></HomeFooter>
            </AsideProvider>
        </div>
    )
}

export default App;