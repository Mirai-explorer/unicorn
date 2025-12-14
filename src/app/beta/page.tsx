"use client"
import { Icons as Icon } from "@/components/Icons/index";
import dynamic from "next/dynamic";
import React, {useEffect, useState} from "react";
import { AsideProvider } from "@/components/Home/Header/AsideContext";
import { Tabs, Tab } from "@/components/Common/Page/Tabs";

const HomeHeader = dynamic(() => import("@/components/Home/Header"), {
    ssr: false
});

const App = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = 9; // Set the total number of pages

    const handleScroll = (event: { deltaY: number; }) => {
        const { deltaY } = event;
        if (deltaY > 0) {
            if (currentPage < totalPages) {
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
            }
        } else if (deltaY < 0) {
            if (currentPage > 0) {
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
            }
        }
    };
    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [currentPage]);

    return (
        <div className="" style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
            <AsideProvider>
                <HomeHeader></HomeHeader>

                {/* Pages */}
                <main
                    className="pages"
                    style={{
                        transform: `translateY(-${currentPage * 100}vh)`,
                        transition: 'transform 0.5s ease',
                    }}
                >
                    <div className="page flex justify-center items-center bg-gradient-to-br from-[#F8F9F0] to-[#F1FAEF]"
                         style={{height: '100vh'}}>
                        <div className="max-w-[1392px] w-full h-full pt-24!">
                            <div
                                className="grid min-[1025px]:grid-cols-[1fr_auto] grid-cols-1 grid-rows-[auto_1fr] gap-x-8 min-md:gap-x-16 gap-y-[clamp(1rem,2vw,4rem)] pt-[clamp(2rem,4vw,6rem)]! pb-8! pl-8! pr-8! min-md:pl-16! min-md:pr-16! w-full h-full">
                                <div className="main-part grid grid-cols-[1fr_auto] grid-rows-[1fr_auto] gap-x-12 gap-y-[clamp(2rem,8vh,6rem)]">
                                    <div className="intro-left flex flex-col justify-between">
                                        <div className="flex flex-col gap-6" style={{fontFamily: `HYWenHei`}}>
                                          <span className="leading-32 font-bold">
                                              <svg viewBox={"0 0 320 80"} className={"h-[clamp(4rem,8vw,72px)]"}>
                                                  <text x={"0"} y={"0"}
                                                        fontSize={"4rem"}
                                                        fill={"#B3CA39"}
                                                        stroke={"#FEFFEB"}
                                                        strokeWidth={8}
                                                        paintOrder={"stroke"}
                                                        dominantBaseline={"text-before-edge"}
                                                        textAnchor={"start"}
                                                  >
                                                      阿伟
                                                  </text>
                                              </svg>
                                          </span>
                                            <span className="text-[clamp(28px,4vw,36px)] text-[#CAB339]">Aubrey / 東海</span>
                                        </div>
                                        <div className="text-2xl flex flex-col gap-12 max-w-[320px] pb-4" style={{fontFamily: '"HYWenHei"'}}>
                                            <div
                                                className="w-full h-auto bg-[#FFFFFFBF] shadow-[0_0_2px_rgba(179,202,57,0.25)] px-2! py-4! flex justify-between items-center rounded-tl-2xl rounded-tr-4xl rounded-br-0 rounded-bl-2xl">
                                                <span className="text-[#CAB339] flex-[1] text-center">常居</span>
                                                <hr className="h-3 border-l-2 border-gray-200 rounded-full"/>
                                                <span className="text-[#B3CA39] flex-[2] text-center">上海·长宁</span>
                                            </div>
                                            <div
                                                className="w-full h-auto bg-[#FFFFFFBF] shadow-[0_0_2px_rgba(179,202,57,0.25)] px-2! py-4! flex justify-between items-center rounded-tl-2xl rounded-tr-4xl rounded-br-0 rounded-bl-2xl">
                                                <span className="text-[#CAB339] flex-[1] text-center">生日</span>
                                                <hr className="h-3 border-l-2 border-gray-200 rounded-full"/>
                                                <span className="text-[#B3CA39] flex-[2] text-center">2 / 26</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="intro-right flex items-end">
                                        <span>123</span>
                                    </div>
                                    <div className="col-span-2 flex flex-wrap items-end gap-y-[clamp(2rem,4vh,4rem)] gap-x-8 text-xl">
                                        <div className="bg-[#FFFFFFBF] rounded-lg border-2 border-[#FFFFFFBF]">
                                            <button className={"px-8! py-2!"}>自封的技术宅</button>
                                        </div>
                                        <div className="bg-[#FFFFFFBF] rounded-lg border-2 border-[#FFFFFFBF]">
                                            <button className={"px-8! py-2!"}>不富有的旅者</button>
                                        </div>
                                        <div className="bg-[#FFFFFFBF] rounded-lg border-2 border-[#FFFFFFBF]">
                                            <button className={"px-8! py-2!"}>半个二次元</button>
                                        </div>
                                        <div className="bg-[#FFFFFFBF] rounded-lg border-2 border-[#FFFFFFBF]">
                                            <button className={"px-8! py-2!"}>资深影迷</button>
                                        </div>
                                        <div className="bg-[#FFFFFFBF] rounded-lg border-2 border-[#FFFFFFBF]">
                                            <button className={"px-8! py-2!"}>孤独的美食家</button>
                                        </div>
                                        <div className="bg-[#FFFFFFBF] rounded-lg border-2 border-[#FFFFFFBF]">
                                            <button className={"px-8! py-2!"}>COS 只有〇和一万次</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="extra-part flex flex-col gap-y-12 justify-between">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex gap-4" style={{fontFamily: 'HYWenHei'}}>
                                            <h2 className="text-[clamp(24px,2vw,36px)] text-[#46A6A8] font-bold leading-12">
                                                一个比较随性的
                                                <del>二次元</del>
                                                技术宅
                                            </h2>

                                        </div>
                                        <div className="whitespace-pre-line"
                                             style={{fontFamily: '"方正兰亭圆简体_准"'}}>
                                            <h4 className="text-[clamp(18px,2vw,24px)] text-[#80B6B2] leading-16 tracking-widest!">
                                                {
                                                    `喜欢研究琢磨或尝试一些有趣的东西，
                                              细节上有着对完美近乎偏执的追求，
                                              好了随便码一段话看看显示效果，
                                              嗯……码了半天怎么才四行唔
                                              嗯！就是这样紫薯补丁^v^`
                                                }
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="flex gap-y-[clamp(2rem,4vh,4rem)] gap-x-8 flex-col items-start">
                                        <button
                                            className="bg-[#F7FEE3] border-[#B3CA39] border-2 py-2! px-8! rounded-full">
                                            <span className="text-xl text-[#B3CA39]">{'Ciallo～(∠・ω< )⌒★'}</span>
                                        </button>
                                        <button
                                            className="bg-[#E9FAF9] border-[#61BBB8] border-2 py-2! px-8! rounded-full">
                                            <span className="text-xl text-[#61BBB8]">{'萝莉赛高！！'}</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="text-xl col-span-full flex flex-col justify-center items-center tracking-wide gap-4">
                                  <span className="text-transparent bg-gradient-to-b from-[#61BBB8] from-30% to-[#9BDE68] bg-clip-text">
                                      滑动继续浏览
                                  </span>
                                    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24 15.6V20.4M24 4.80005C20.8174 4.80005 17.7652 6.01376 15.5147 8.17418C13.2643 10.3346 12 13.2648 12 16.32V31.68C12 34.7353 13.2643 37.6655 15.5147 39.8259C17.7652 41.9863 20.8174 43.2 24 43.2C27.1826 43.2 30.2348 41.9863 32.4853 39.8259C34.7357 37.6655 36 34.7353 36 31.68V16.32C36 13.2648 34.7357 10.3346 32.4853 8.17418C30.2348 6.01376 27.1826 4.80005 24 4.80005Z" stroke="url(#paint0_linear_151_48)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <defs>
                                            <linearGradient id="paint0_linear_151_48" x1="24" y1="4.80005" x2="24" y2="43.2" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#61BBB8"/>
                                                <stop offset="0.33" stopColor="#61BBB8"/>
                                                <stop offset="1" stopColor="#9BDE68"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="page flex justify-center items-center h-[100vh] bg-[#F3FAFFFF]"
                         style={{height: '100vh'}}>
                        <div className="max-w-[1392px] max-h-[982px] w-full h-full">
                            <div className="flex flex-col items-center justify-between pt-[96px]! w-full h-full">
                                <div className="lang-header text-center flex-[2] flex flex-col items-center justify-center gap-2">
                                    <div className="relative">
                                        <h1 className="z-1 text-[#4C749C] relative text-4xl tracking-wide">语言</h1>
                                    </div>
                                    <div className="divider w-full border-b-1 border-[#6D9CB0]"></div>
                                    <div className="text-[#6D9CB0] text-xl tracking-wide px-2">语言水平与研究</div>
                                </div>
                                <div className="lang-body flex-[7] w-full flex flex-col">
                                    <div className="wrap h-full bg-white border border-[#F2F2F2] rounded-4xl flex flex-col">
                                        <div className="header flex flex-2 border-b border-[#F0F0F0] !px-12 items-center justify-between">
                                            <div className="title text-2xl font-bold">English</div>
                                            <div className="tag text-xl">美式</div>
                                        </div>
                                        <div className="body flex flex-8 !px-12 !py-6 gap-4">
                                            <div className="section flex-1 text-xl">A</div>
                                            <div className="divider h-2/3 border-l-2 border-[#F0F0F0] self-center"></div>
                                            <div className="section flex-1">B</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="!pt-8 text-lg leading-6">English</div>
                                <div className="lang-tabs flex-[1] w-full flex justify-end items-center !pb-4">
                                    <div className="opea flex gap-8 items-start text-lg">
                                        <button className="!px-16 !py-2 rounded-full bg-green-700 text-amber-50">查看更多</button>
                                        <button className="!px-16 !py-2 rounded-full border-green-700 border text-green-700">扩展阅读 》</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="page flex justify-center items-center"
                         style={{height: '100vh', backgroundColor: '#FCFAF6'}}>
                        <div className="max-w-[1392px] max-h-[982px] w-full h-full">
                            <div className="flex flex-col items-center justify-between pt-[96px]! w-full h-full"
                                 style={{fontFamily: '"HYWenHei 85W"'}}>
                                <div
                                    className="lang-header text-center flex-[2] flex flex-col items-center justify-center gap-4">
                                    <div className="text-[#895F3B] text-[2.5rem] relative">
                                        <h1 className="z-1 relative">{'音乐'}</h1>
                                        <span className="absolute left-0 right-0 bottom-1 h-2 -mx-2! bg-[#E8DFB1] z-0"></span>
                                    </div>
                                    <div className="text-[#B0936D] text-[1.75rem]">
                                        音乐品味和创作分享
                                    </div>
                                </div>
                                <div className="lang-body flex-[8] w-full">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="page flex justify-center items-center"
                         style={{height: '100vh', backgroundColor: '#FEF7F9'}}>
                        <div className="max-w-[1392px] max-h-[982px] w-full h-full">
                            <div className="flex flex-col items-center justify-between pt-[96px]! w-full h-full"
                                 style={{fontFamily: '"HYWenHei 85W"'}}>
                                <div
                                    className="lang-header text-center flex-[2] flex flex-col items-center justify-center gap-4">
                                    <div className="text-[#893B67] text-[2.5rem] relative">
                                        <h1 className="z-1 relative">{'电影'}</h1>
                                        <span className="absolute left-0 right-0 bottom-1 h-2 -mx-2! bg-[#EEC7E3] z-0"></span>
                                    </div>
                                    <div className="text-[#B06D95] text-[1.75rem]">
                                        观影喜好和品鉴分享
                                    </div>
                                </div>
                                <div className="lang-body flex-[8] w-full">
                                    <Tabs>
                                        <Tab tabTitle="English">
                                            <div></div>
                                        </Tab>
                                        <Tab tabTitle="Français">
                                            <div></div>
                                        </Tab>
                                        <Tab tabTitle="日本語">
                                            <div></div>
                                        </Tab>
                                        <Tab tabTitle="粤语">
                                            <div></div>
                                        </Tab>
                                        <Tab tabTitle="上海话">
                                            <div></div>
                                        </Tab>
                                    </Tabs>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="page flex justify-center items-center"
                         style={{height: '100vh', backgroundColor: '#FBF2FE'}}>
                        <div className="max-w-[1392px] max-h-[982px] w-full h-full">
                            <div className="flex flex-col items-center justify-between pt-[96px]! w-full h-full"
                                 style={{fontFamily: '"HYWenHei 85W"'}}>
                                <div
                                    className="lang-header text-center flex-[2] flex flex-col items-center justify-center gap-4">
                                    <div className="text-[#843B89] text-[2.5rem] relative">
                                        <h1 className="z-1 relative">{'ACGN'}</h1>
                                        <span className="absolute left-0 right-0 bottom-1 h-2 -mx-2! bg-[#E0C7EE] z-0"></span>
                                    </div>
                                    <div className="text-[#A06DB0] text-[1.75rem]">
                                        动画·漫画·游戏·轻小说喜好及推荐
                                    </div>
                                </div>
                                <div className="lang-body flex-[8] w-full">
                                    <Tabs>
                                        <Tab tabTitle="动漫">
                                            <div></div>
                                        </Tab>
                                        <Tab tabTitle="漫画">
                                            <div></div>
                                        </Tab>
                                        <Tab tabTitle="游戏">
                                            <div></div>
                                        </Tab>
                                        <Tab tabTitle="轻小说">
                                            <div></div>
                                        </Tab>
                                    </Tabs>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="page flex justify-center items-center"
                         style={{height: '100vh', backgroundColor: '#F2FFF5'}}>
                        <div className="max-w-[1392px] max-h-[982px] w-full h-full">
                            <div className="flex flex-col items-center justify-between pt-[96px]! w-full h-full"
                                 style={{fontFamily: '"HYWenHei 85W"'}}>
                                <div
                                    className="lang-header text-center flex-[2] flex flex-col items-center justify-center gap-4">
                                    <div className="text-[#46893B] text-[2.5rem] relative">
                                        <h1 className="z-1 relative">{'旅行'}</h1>
                                        <span className="absolute left-0 right-0 bottom-1 h-2 -mx-2! bg-[#CAEEC7] z-0"></span>
                                    </div>
                                    <div className="text-[#6FB06D] text-[1.75rem]">
                                        分享旅途见闻及攻略分享
                                    </div>
                                </div>
                                <div className="lang-body flex-[8] w-full">

                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="page flex justify-center items-center"
                         style={{height: '100vh', backgroundColor: '#EFFCFC'}}>
                        <div className="max-w-[1392px] max-h-[982px] w-full h-full">
                            <div className="flex flex-col items-center justify-between pt-[96px]! w-full h-full"
                                 style={{fontFamily: '"HYWenHei 85W"'}}>
                                <div
                                    className="lang-header text-center flex-[2] flex flex-col items-center justify-center gap-4">
                                    <div className="text-[#3B6789] text-[2.5rem] relative">
                                        <h1 className="z-1 relative">{'科技数码'}</h1>
                                        <span className="absolute left-0 right-0 bottom-1 h-2 -mx-2! bg-[#C7E8EE] z-0"></span>
                                    </div>
                                    <div className="text-[#6DA9B0] text-[1.75rem]">
                                        感受科技第一线及好物推荐
                                    </div>
                                </div>
                                <div className="lang-body flex-[8] w-full">

                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="page flex justify-center items-center"
                         style={{height: '100vh', backgroundColor: '#FCF2F0'}}>
                        <div className="max-w-[1392px] max-h-[982px] w-full h-full">
                            <div className="flex flex-col items-center justify-between pt-[96px]! w-full h-full"
                                 style={{fontFamily: '"HYWenHei 85W"'}}>
                                <div
                                    className="lang-header text-center flex-[2] flex flex-col items-center justify-center gap-4">
                                    <div className="text-[#894D3B] text-[2.5rem] relative">
                                        <h1 className="z-1 relative">{'美食'}</h1>
                                        <span className="absolute left-0 right-0 bottom-1 h-2 -mx-2! bg-[#EED2C7] z-0"></span>
                                    </div>
                                    <div className="text-[#B07F6D] text-[1.75rem]">
                                        美食品鉴记录及推荐
                                    </div>
                                </div>
                                <div className="lang-body flex-[8] w-full">

                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div className="page flex justify-center items-center"
                         style={{height: '100vh', backgroundColor: '#F8F8F7'}}>
                        <div className="max-w-[1392px] max-h-[982px] w-full h-full">
                            <div className="flex flex-col items-center pt-[96px]! w-full h-full"
                                 style={{fontFamily: '"HYWenHei 85W"'}}>
                                <div
                                    className="lang-header text-center flex-[1] flex flex-col items-center justify-center gap-4">
                                    <div className="text-[#50545B] text-[2.5rem] relative">
                                        <h1 className="z-1 relative">{'更多'}</h1>
                                        <span className="absolute left-0 right-0 bottom-1 h-2 -mx-2! bg-[#DBE3E4] z-0"></span>
                                    </div>
                                    <div className="text-[#AFB5B6] text-[1.75rem]">
                                        更多技能点和涉猎领域概览
                                    </div>
                                </div>
                                <div className="lang-body w-full grid grid-cols-2 gap-x-24 gap-y-8">
                                    <div className="w-full h-max flex flex-row justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="flex text-2xl text-[#50545B] leading-12">信息加工</span>
                                            <span className="flex text-xl text-[#888C93]">{'> 数据发布 /'}</span>
                                        </div>
                                        <div className="flex">
                                            <button>
                                                <Icon className="icon-entry" name="Entry" height={32} width={32}
                                                      fill="#50545B"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full h-max flex flex-row justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="flex text-2xl text-[#50545B] leading-12">内容创作</span>
                                            <span
                                                className="flex text-xl text-[#888C93]">{'> 短片 / 摄影 / 平台作者 / 知乎er / UP主 /'}</span>
                                        </div>
                                        <div className="flex">
                                            <button>
                                                <Icon className="icon-entry" name="Entry" height={32} width={32}
                                                      fill="#50545B"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full h-max flex flex-row justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="flex text-2xl text-[#50545B] leading-12">交通爱好者</span>
                                            <span
                                                className="flex text-xl text-[#888C93]">{'> 公交 / 地铁 / 铁路 / 民航'}</span>
                                        </div>
                                        <div className="flex">
                                            <button>
                                                <Icon className="icon-entry" name="Entry" height={32} width={32}
                                                      fill="#50545B"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full h-max flex flex-row justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="flex text-2xl text-[#50545B] leading-12">阅读</span>
                                            <span
                                                className="flex text-xl text-[#888C93]">{'> 读书笔记 / '}</span>
                                        </div>
                                        <div className="flex">
                                            <button>
                                                <Icon className="icon-entry" name="Entry" height={32} width={32}
                                                      fill="#50545B"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full h-max flex flex-row justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="flex text-2xl text-[#50545B] leading-12">无线电</span>
                                            <span
                                                className="flex text-xl text-[#888C93]">{'> 业余无线电台通信 / '}</span>
                                        </div>
                                        <div className="flex">
                                            <button>
                                                <Icon className="icon-entry" name="Entry" height={32} width={32}
                                                      fill="#50545B"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full h-max flex flex-row justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="flex text-2xl text-[#50545B] leading-12">薅羊毛</span>
                                            <span
                                                className="flex text-xl text-[#888C93]">{'> 外卖红包 / 生活攻略 / 支付优惠 / 银行优惠'}</span>
                                        </div>
                                        <div className="flex">
                                            <button>
                                                <Icon className="icon-entry" name="Entry" height={32} width={32}
                                                      fill="#50545B"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full h-max flex flex-row justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="flex text-2xl text-[#50545B] leading-12">编程</span>
                                            <span
                                                className="flex text-xl text-[#888C93]">{'> 机器学习 / 技术栈'}</span>
                                        </div>
                                        <div className="flex">
                                            <button>
                                                <Icon className="icon-entry" name="Entry" height={32} width={32}
                                                      fill="#50545B"/>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full h-max flex flex-row justify-between items-center">
                                        <div className="flex flex-col">
                                            <span className="flex text-2xl text-[#50545B] leading-12">平面设计</span>
                                            <span
                                                className="flex text-xl text-[#888C93]">{'> 设计标准 / 色彩标准 / '}</span>
                                        </div>
                                        <div className="flex">
                                            <button>
                                                <Icon className="icon-entry" name="Entry" height={32} width={32} fill="#50545B"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="lang-bottom w-full flex-[1] flex flex-col justify-center gap-4">
                                    <div className="text-[#50545B] text-2xl">
                                        <h1 className="">{'探索中的未知领域'}</h1>
                                    </div>
                                    <div className="text-[#50545B] text-2xl flex flex-row gap-16">
                                        <div>天文</div>
                                        <div>历史</div>
                                        <div>地理&气象</div>
                                        <div>医学</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer
                    style={{
                        position: 'fixed',
                        bottom: currentPage === totalPages ? 0 : '-300px',
                        width: '100%',
                        height: '300px',
                        backgroundColor: '#1D3347',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        transition: 'bottom 0.5s ease',
                    }}
                >
                    <div>

                    </div>
                </footer>
            </AsideProvider>
        </div>
    )
}

export default App;