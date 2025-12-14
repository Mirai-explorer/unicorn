// components/MusicPlayer/components/Modals/SearchModal.tsx
/**
 * 搜索模态框
 */

import React, { useState, useRef, useEffect } from 'react';
import { usePlayer, useToast } from '@/contexts';

export const SearchModal: React.FC = () => {
    const { ui, actions } = usePlayer();
    const { showError } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ui.isSearchVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [ui.isSearchVisible]);

    const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            // 模拟搜索 - 实际项目中这里应该调用真实的搜索 API
            const mockResults = [
                {
                    id: '1',
                    title: `搜索结果: ${query}`,
                    artist: '示例艺术家',
                    album: '示例专辑',
                    cover: 'https://via.placeholder.com/150',
                    audioUrl: 'https://example.com/audio.mp3',
                    duration: 180000
                }
            ];

            setSearchResults(mockResults);

            // 实际搜索代码示例:
            // const response = await NetworkUtils.get(`/api/search?q=${encodeURIComponent(query)}`);
            // if (response.success) {
            //   setSearchResults(response.data);
            // } else {
            //   showError('搜索失败');
            // }
        } catch (error) {
            showError('搜索过程中发生错误');
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);

        // 防抖搜索
        clearTimeout((window as any).searchTimeout);
        (window as any).searchTimeout = setTimeout(() => {
            handleSearch(value);
        }, 300);
    };

    const handleResultClick = (track: any) => {
        actions.addAndPlay(track);
        ui.hideSearch();
        setSearchQuery('');
        setSearchResults([]);
    };

    if (!ui.isSearchVisible) return null;

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
            <div className="search-modal" style={{
                width: '90%',
                maxWidth: '600px',
                maxHeight: '80vh',
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            }} onClick={(e) => e.stopPropagation()}>
                {/* 搜索标题和关闭按钮 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ margin: 0, color: 'var(--text-primary)' }}>搜索音乐</h2>
                    <button
                        onClick={ui.hideSearch}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)',
                            padding: '0.5rem',
                            borderRadius: '4px'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* 搜索输入框 */}
                <div style={{ position: 'relative' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="搜索歌曲、歌手、专辑..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{
                            width: '100%',
                            padding: '1rem 1rem 1rem 3rem',
                            fontSize: '1.1rem',
                            border: '2px solid var(--bg-secondary)',
                            borderRadius: '8px',
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--accent-color)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--bg-secondary)';
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-secondary)',
                        fontSize: '1.2rem'
                    }}>
            🔍
          </span>
                </div>

                {/* 搜索结果 */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    maxHeight: '400px'
                }}>
                    {isSearching ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '2rem',
                            color: 'var(--text-secondary)'
                        }}>
                            搜索中...
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {searchResults.map((track) => (
                                <div
                                    key={track.id}
                                    onClick={() => handleResultClick(track)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    <img
                                        src={track.cover}
                                        alt={track.title}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius: '4px',
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            color: 'var(--text-primary)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {track.title}
                                        </div>
                                        <div style={{
                                            fontSize: '0.9rem',
                                            color: 'var(--text-secondary)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {track.artist} • {track.album}
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // 添加到播放列表的逻辑
                                        }}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            fontSize: '1.2rem',
                                            cursor: 'pointer',
                                            color: 'var(--text-secondary)',
                                            padding: '0.5rem',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        ➕
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : searchQuery ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '2rem',
                            color: 'var(--text-secondary)'
                        }}>
                            未找到相关结果
                        </div>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '2rem',
                            color: 'var(--text-secondary)'
                        }}>
                            输入关键词搜索音乐
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};