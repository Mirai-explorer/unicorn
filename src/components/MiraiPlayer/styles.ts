// components/MusicPlayer/styles.ts
/**
 * 播放器样式组件（使用 styled-components）
 */

import styled from 'styled-components';

export const MiraiPlayer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", PingFang SC, Helvetica Neue, 
               Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  -webkit-overflow-scrolling: touch;
  
  *::selection {
    background-color: rgba(218, 218, 218, 0.1);
  }
  
  input {
    border-radius: 0;
    font-size: 15px;
    outline: none;
  }
  
  input, button, ul, li {
    -webkit-appearance: none;
  }
  
  &::after {
    background: linear-gradient(135deg, #3C8CE7 10%, #00EAFF 100%);
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }

  /* 主题变量 */
  &.dark {
    --bg-primary: rgba(0, 0, 0, 0.8);
    --bg-secondary: rgba(255, 255, 255, 0.1);
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --accent-color: #3C8CE7;
  }

  &.light {
    --bg-primary: rgba(255, 255, 255, 0.9);
    --bg-secondary: rgba(0, 0, 0, 0.1);
    --text-primary: #000000;
    --text-secondary: rgba(0, 0, 0, 0.7);
    --accent-color: #1976d2;
  }
`;

export const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0 max(32px, 5%);
  color: var(--text-primary);
  backdrop-filter: blur(64px) brightness(0.7);
  transition: all 0.3s ease-out;
  
  &.blurred {
    filter: blur(4px);
    opacity: 0.8;
  }
  
  &.full {
    scale: 1.0;
  }
  
  &.scale {
    scale: 0.9;
  }
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  flex: 1;
  overflow: hidden;
`;

export const ControlsArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0 2rem;
  gap: 1rem;
`;

export const HorizontalLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;

export const VerticalLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
  height: 100%;
`;