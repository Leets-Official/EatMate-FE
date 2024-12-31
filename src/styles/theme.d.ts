declare module 'src/styles/theme' {
  interface Theme {
    COLORS: {
      primary: {
        main: string;
        orange: {
          100: string;
          200: string;
        };
        yellow: string;
        red: string;
      };
      secondary: {
        ivory: string;
        purple: string;
        black: string;
      };
    };

    FONT_FAMILY: {
      pretendard: string;
      SDG: string;
    };

    FONT_WEIGHT: {
      light: number;
      regular: number;
      semiBold: number;
      bold: number;
      extraBold: number;
    };

    FONT_SIZE: {
      xs: string;
      sm: string;
      smMd: string;
      md: string;
      lg: string;
      xl: string;
    };
  }

  const theme: Theme;
  export default theme;
}
