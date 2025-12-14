// components/MusicPlayer/components/KeyboardHelp.tsx
/**
 * 键盘快捷键帮助
 */
import React from 'react';
import { usePlayer } from '@/contexts';

export const KeyboardHelp: React.FC = () => {
    const { ui } = usePlayer();
    const [isVisible, setIsVisible] = React.useState(false);

    const shortcuts = [
        { key: '空格键', action: '播放/暂停' },
        { key: '→', action: '下一首' },
        { key: '←', action: '上一首' },
        { key: '↑', action: '音量增加' },
        { key: '↓', action: '音量减少' },
        { key: 'M', action: '静音' },
        { key: 'F', action: '全屏' },
        { key: 'L', action: '显示/隐藏歌词' },
        { key: 'ESC', action: '关闭所有弹窗' }
    ];

    if (!isVisible) return null;

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }} onClick={() => setIsVisible(false)}>
            <div className="keyboard-help-modal" style={{
                width: '90%',
                maxWidth: '500px',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }} onClick={(e) => e.stopPropagation()}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>键盘快捷键</h2>
                    <button
                        onClick={() => setIsVisible(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)',
                            padding: '0.5rem',
                            borderRadius: '4px'
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}>
                    {shortcuts.map((shortcut, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.75rem 1rem',
                                backgroundColor: 'var(--bg-secondary)',
                                borderRadius: '6px'
                            }}
                        >
                            <kbd style={{
                                padding: '0.25rem 0.5rem',
                                backgroundColor: 'var(--bg-primary)',
                                borderRadius: '4px',
                                border: '1px solid var(--text-secondary)',
                                fontSize: '0.8rem',
                                fontFamily: 'monospace',
                                color: 'var(--text-primary)'
                            }}>
                                {shortcut.key}
                            </kbd>
                            <span style={{ color: 'var(--text-primary)' }}>
                {shortcut.action}
              </span>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--bg-secondary)',
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '0.8rem'
                }}>
                    提示：在输入框中时快捷键不会生效
                </div>
            </div>
        </div>
    );
};

// 在 PlaybackControls 中添加帮助按钮
export const HelpButton: React.FC = () => {
    const [showHelp, setShowHelp] = React.useState(false);

    return (
        <>
            <button
                onClick={() => setShowHelp(true)}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.25rem',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    padding: '0.5rem',
                    borderRadius: '4px'
                }}
                title="键盘快捷键"
            >
                ⌨️
            </button>

            {showHelp && <KeyboardHelp />}
        </>
    );
};