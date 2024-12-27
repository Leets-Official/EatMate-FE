import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
const GlobalStyle = createGlobalStyle`
  ${reset}

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    font-family: 'Pretendard-Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  html {
    font-size: 100%;
    -webkit-text-size-adjust: 100%; /* 텍스트 크기 조정 비활성화 (iOS 대응) */
  }

  body {
    font-family: 'Pretendard-Medium', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #fff;
    color: #000;
    margin: 0;
    line-height: 1.5;
    overflow-x: hidden; /* 수평 스크롤 방지 */
  }

  body, #root {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
  }

  @font-face {
  font-family: 'Pretendard-Medium';
  font-display: swap;
  src: url('/font/Pretendard-Medium.woff') format('woff');
}

@font-face {
  font-family: 'AppleSDGothicNeoM';
  font-display: swap;
  src: url('/font/AppleSDGothicNeoM.ttf') format('ttf');
}

`;

export default GlobalStyle;
