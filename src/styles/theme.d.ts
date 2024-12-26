declare module 'src/styles/theme' {
  interface Theme {
    color: {
      main: string;
      yellow: string;
      red: string;
      orange: string;
      ivory: string;
      purple: string;
      black: string;
    };
    font: {
      pretendard: string;
      SDG: string;
    };
  }

  const theme: Theme;
  export default theme;
}
