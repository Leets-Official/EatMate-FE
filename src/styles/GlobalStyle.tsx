import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
    -webkit-text-size-adjust: 100%; /* 텍스트 크기 조정 비활성화 (iOS 대응) */
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #fff; /* 배경색 설정 */
    color: #000; /* 기본 텍스트 색상 */
    margin: 0;
    line-height: 1.5;
    overflow-x: hidden; /* 수평 스크롤 방지 */
  }

  body, #root {
    width: 100%;
    max-width: 390px;
    margin: 0 auto;
  }

`;

export default GlobalStyle;
