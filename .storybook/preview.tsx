import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import theme from '../src/styles/theme';
import { RecoilRoot } from 'recoil';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    </ThemeProvider>
  ),
];

export default preview;
