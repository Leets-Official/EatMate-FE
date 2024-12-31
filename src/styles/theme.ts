const COLORS = {
  main: '#EB5916', // 메인 색상
  orange: {
    100: '#F8B116', // 채도가 더 낮은 주황색
    200: '#FF9D01', //        더 높은 주황색
  },
  yellow: '#F5F378', // 밝은 노란색
  red: '#FE4600', // 밝은 빨간색
  gray: {
    100: '#D4D4D4',
    200: '#D9D9D9',
    300: '#ACACAC',
  },
  white: '#FFFFFF',
  black: '#1A1A1A', // 검정색
  error: '#FF6D6D',
};

const FONT_FAMILY = {
  pretendard: 'Pretendard-Medium',
  SDG: 'AppleSDGothicNeoM',
};

const FONT_WEIGHT = {
  light: 400,
  regular: 500,
  semiBold: 600,
  bold: 700,
};

const FONT_SIZE = {
  xs: '8px',
  sm: '12px',
  smMd: '14px', // sm과 md 사이
  md: '16px',
  lg: '20px',
  xl: '24px',
};

const theme = {
  COLORS,
  FONT_FAMILY,
  FONT_WEIGHT,
  FONT_SIZE,
};

export default theme;
