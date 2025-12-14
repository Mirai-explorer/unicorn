// components/MusicPlayer/components/Modals/SettingsModal.tsx
/**
 * 设置模态框
 */

import React from 'react';
import { usePlayer, useSettings, settingsPresets } from '@/contexts';
import { PlayerLayout, CoverSize, LyricLanguage, ThemeMode, PlaybackMode } from '@/types';

export const SettingsModal: React.FC = () => {
    const { ui } = usePlayer();
    const { settings, updateSettings, applyPreset } = useSettings();

    if (!ui.isSettingsVisible) return null;

    const SettingSection: React.FC<{
        title: string;
        children: React.ReactNode;
    }> = ({ title, children }) => (
        <div style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '8px'
        }}>
            <h3 style={{
                margin: '0 0 1rem 0',
                color: 'var(--text-primary)',
                fontSize: '1.1rem'
            }}>
                {title}
            </h3>
            {children}
        </div>
    );

    const SettingRow: React.FC<{
        label: string;
        children: React.ReactNode;
    }> = ({ label, children }) => (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
            padding: '0.5rem 0'
        }}>
            <label style={{
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
            }}>
                {label}
            </label>
            <div style={{ minWidth: '150px' }}>
                {children}
            </div>
        </div>
    );

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
        }}>
            <div className="settings-modal" style={{
                width: '90%',
                maxWidth: '800px',
                maxHeight: '90vh',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }} onClick={(e) => e.stopPropagation()}>
                {/* 标题和关闭按钮 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>播放器设置</h2>
                    <button
                        onClick={ui.hideSettings}
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

                {/* 设置内容 */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    paddingRight: '0.5rem'
                }}>
                    {/* 布局设置 */}
                    <SettingSection title="界面布局">
                        <SettingRow label="布局模式">
                            <select
                                value={settings.display?.layout}
                                onChange={(e) => updateSettings({
                                    display: { ...settings.display, layout: e.target.value as PlayerLayout }
                                })}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid var(--bg-secondary)',
                                    backgroundColor: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            >
                                <option value="classic">经典布局</option>
                                <option value="compact">紧凑布局</option>
                                <option value="minimal">极简布局</option>
                                <option value="theater">影院布局</option>
                                <option value="pc">PC布局</option>
                            </select>
                        </SettingRow>

                        <SettingRow label="封面尺寸">
                            <select
                                value={settings.display?.coverSize}
                                onChange={(e) => updateSettings({
                                    display: { ...settings.display, coverSize: e.target.value as CoverSize }
                                })}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid var(--bg-secondary)',
                                    backgroundColor: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            >
                                <option value="small">小</option>
                                <option value="default">默认</option>
                                <option value="large">大</option>
                                <option value="xlarge">特大</option>
                            </select>
                        </SettingRow>

                        <SettingRow label="主题">
                            <select
                                value={settings.display?.theme}
                                onChange={(e) => updateSettings({
                                    display: { ...settings.display, theme: e.target.value as ThemeMode }
                                })}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid var(--bg-secondary)',
                                    backgroundColor: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            >
                                <option value="auto">跟随系统</option>
                                <option value="light">浅色</option>
                                <option value="dark">深色</option>
                            </select>
                        </SettingRow>
                    </SettingSection>

                    {/* 音频设置 */}
                    <SettingSection title="音频设置">
                        <SettingRow label="播放模式">
                            <select
                                value={settings.playback?.repeatMode}
                                onChange={(e) => updateSettings({
                                    playback: { ...settings.playback, repeatMode: e.target.value as PlaybackMode }
                                })}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid var(--bg-secondary)',
                                    backgroundColor: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            >
                                <option value="sequential">列表循环</option>
                                <option value="repeat_one">单曲循环</option>
                                <option value="shuffle">随机播放</option>
                            </select>
                        </SettingRow>

                        <SettingRow label="自动播放">
                            <input
                                type="checkbox"
                                checked={settings.playback?.autoPlay}
                                onChange={(e) => updateSettings({
                                    playback: { ...settings.playback, autoPlay: e.target.checked }
                                })}
                                style={{
                                    transform: 'scale(1.2)'
                                }}
                            />
                        </SettingRow>

                        <SettingRow label="无缝播放">
                            <input
                                type="checkbox"
                                checked={settings.audio?.gaplessPlayback}
                                onChange={(e) => updateSettings({
                                    audio: { ...settings.audio, gaplessPlayback: e.target.checked }
                                })}
                                style={{
                                    transform: 'scale(1.2)'
                                }}
                            />
                        </SettingRow>
                    </SettingSection>

                    {/* 歌词设置 */}
                    <SettingSection title="歌词设置">
                        <SettingRow label="显示歌词">
                            <input
                                type="checkbox"
                                checked={settings.lyrics?.showLyrics}
                                onChange={(e) => updateSettings({
                                    lyrics: { ...settings.lyrics, showLyrics: e.target.checked }
                                })}
                                style={{
                                    transform: 'scale(1.2)'
                                }}
                            />
                        </SettingRow>

                        <SettingRow label="字体大小">
                            <input
                                type="range"
                                min="18"
                                max="32"
                                value={settings.lyrics?.fontSize}
                                onChange={(e) => updateSettings({
                                    lyrics: { ...settings.lyrics, fontSize: parseInt(e.target.value) }
                                })}
                                style={{
                                    width: '100%'
                                }}
                            />
                            <span style={{
                                marginLeft: '0.5rem',
                                color: 'var(--text-secondary)',
                                fontSize: '0.8rem'
                            }}>
                {settings.lyrics?.fontSize}px
              </span>
                        </SettingRow>

                        <SettingRow label="时间偏移">
                            <input
                                type="range"
                                min="-5000"
                                max="5000"
                                step="100"
                                value={settings.lyrics?.lyricOffset}
                                onChange={(e) => updateSettings({
                                    lyrics: { ...settings.lyrics, lyricOffset: parseInt(e.target.value) }
                                })}
                                style={{
                                    width: '100%'
                                }}
                            />
                            <span style={{
                                marginLeft: '0.5rem',
                                color: 'var(--text-secondary)',
                                fontSize: '0.8rem'
                            }}>
                {settings.lyrics?.lyricOffset}ms
              </span>
                        </SettingRow>

                        <SettingRow label="歌词语言">
                            <select
                                value={settings.lyrics?.lyricLanguage}
                                onChange={(e) => updateSettings({
                                    lyrics: { ...settings.lyrics, lyricLanguage: e.target.value as LyricLanguage }
                                })}
                                style={{
                                    width: '100%',
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid var(--bg-secondary)',
                                    backgroundColor: 'var(--bg-primary)',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }}
                            >
                                <option value="original">原文</option>
                                <option value="translated">翻译</option>
                                <option value="both">双语</option>
                            </select>
                        </SettingRow>
                    </SettingSection>

                    {/* 设置预设 */}
                    <SettingSection title="快速设置">
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem'
                        }}>
                            {settingsPresets.map((preset) => (
                                <button
                                    key={preset.id}
                                    onClick={() => applyPreset(preset)}
                                    style={{
                                        padding: '1rem',
                                        border: '1px solid var(--bg-secondary)',
                                        borderRadius: '8px',
                                        backgroundColor: 'var(--bg-primary)',
                                        color: 'var(--text-primary)',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent-color)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--bg-secondary)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{
                                        fontWeight: '600',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        {preset.name}
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.4
                                    }}>
                                        {preset.description}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </SettingSection>
                </div>
            </div>
        </div>
    );
};