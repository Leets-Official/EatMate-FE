import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import router from './routes/route';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import { RecoilRoot } from 'recoil';
function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
export default App;
