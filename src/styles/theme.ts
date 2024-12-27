const COLORS = {
  primary: {
    main: '#EB5916', // 메인 색상
    orange: {
      100: '#F8B116', // 채도가 더 낮은 주황색
      200: '#FF9D01', //        더 높은 주황색
    },
    yellow: '#F5F378', // 밝은 노란색
    red: '#FE4600', // 밝은 빨간색
  },
  secondary: {
    ivory: '#FAF2DF', // 밝은 아이보리
    purple: '#DCC1FF', // 연한 보라색
    black: '#1A1A1A', // 검정색
  },
};

const FONT_FAMILY = {
  pretendard: 'Pretendard-Medium',
  SDG: 'AppleSDGothicNeoM',
};

const FONT_WEIGHT = {
  light: 300,
  regular: 400,
  semiBold: 500,
  bold: 700,
  extraBold: 800,
};

const theme = {
  COLORS,
  FONT_FAMILY,
  FONT_WEIGHT,
};

export default theme;
