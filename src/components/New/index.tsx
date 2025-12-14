"use client"
import React, { useEffect, useRef, useState } from 'react';
import "./bundle.css";
import "./new_chunk.css";

const New = () => {
    // 自定义Hook：检测元素是否在视口中
    const useIntersectionObserver = (options = {}) => {
        const [isIntersecting, setIsIntersecting] = useState(false);
        const elementRef = useRef(null);

        useEffect(() => {
            const element = elementRef.current;
            if (!element) return;

            const observer = new IntersectionObserver(([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
                ...options
            });

            observer.observe(element);

            return () => {
                observer.unobserve(element);
            };
        }, [options]);

        return [elementRef, isIntersecting] as const;
    };

    // Hero组件
    const Hero = () => {
        return (
            <section className="hero">
                <h1>React下滑渐显效果</h1>
                <p>向下滚动页面，体验React实现的文字平滑浮现效果</p>
                <div className="scroll-indicator">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </section>
        );
    };

    // Section组件 - 带有渐显效果
    const Section = ({ title, children, delay = 0 } : { title?: string, children: React.ReactNode, delay?: number | string }) => {
        const [elementRef, isIntersecting] = useIntersectionObserver();

        return (
            <section
                ref={elementRef}
                className={`section ${isIntersecting ? 'visible' : ''}`}
                style={{ transitionDelay: isIntersecting ? `${delay}ms` : '0ms' }}
            >
                <h2>{title}</h2>
                {children}
            </section>
        );
    };

    // Card组件
    const Card = ({ title, content } : { title: string, content: string}) => {
        return (
            <div className="card">
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        );
    };

    // Footer组件
    const Footer = () => {
        return (
            <footer className="footer">
                <p>© 2023 React下滑渐显效果演示 | 使用React Hooks实现</p>
            </footer>
        );
    };
    useEffect(() => {

    }, []);
    return(
        <div className="root">
            <Hero />
            <div className="container">
                <Section title="关于React渐显效果">
                    <p>这种下滑渐显效果使用React函数组件和Hooks实现，展示了现代前端开发的最佳实践。</p>
                    <p>通过自定义Hook封装Intersection Observer API，我们可以轻松地为任何组件添加渐显效果。</p>
                </Section>

                <Section title="实现原理" delay="100">
                    <p>使用React的useRef和useState Hook，结合Intersection Observer API，检测组件是否进入视口。</p>
                    <p>当组件进入视口时，通过状态更新触发CSS过渡动画，实现平滑的渐显效果。</p>
                </Section>

                <Section title="技术优势" delay="200">
                    <div className="card-container">
                        <Card
                            title="组件化"
                            content="将渐显效果封装为可复用的React组件，提高代码的可维护性。"
                        />
                        <Card
                            title="性能优化"
                            content="使用Intersection Observer API，相比传统滚动事件监听性能更好。"
                        />
                        <Card
                            title="易于使用"
                            content="通过自定义Hook，可以轻松为任何组件添加渐显效果。"
                        />
                    </div>
                </Section>

                <Section title="使用示例" delay="300">
                    <p>要使用这个渐显效果，只需：</p>
                    <ol>
                        <li>导入useIntersectionObserver自定义Hook</li>
                        <li>在组件中使用该Hook获取ref和isIntersecting状态</li>
                        <li>根据isIntersecting状态添加相应的CSS类</li>
                        <li>定义合适的CSS过渡效果</li>
                    </ol>
                </Section>
            </div>
            <Footer />
        </div>
    )
}

export default New;