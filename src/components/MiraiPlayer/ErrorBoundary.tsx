// components/ErrorBoundary.tsx
/**
 * 错误边界组件
 */
import React from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
    ErrorBoundaryState
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('播放器错误:', error, errorInfo);

        // 可以在这里上报错误到监控系统
        if (typeof window !== 'undefined' && (window as any).trackJs) {
            (window as any).trackJs.track(error);
        }
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback;
                return <FallbackComponent error={this.state.error!} />;
            }

            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '2rem',
                    textAlign: 'center',
                    color: 'var(--text-primary)'
                }}>
                    <h2>😵 播放器遇到问题</h2>
                    <p>请刷新页面重试</p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: 'var(--accent-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        刷新页面
                    </button>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                            <summary>错误详情 (开发模式)</summary>
                            <pre style={{
                                background: 'var(--bg-secondary)',
                                padding: '1rem',
                                borderRadius: '4px',
                                overflow: 'auto',
                                fontSize: '0.8rem'
                            }}>
                {this.state.error.stack}
              </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}