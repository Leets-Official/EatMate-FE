import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import router from './routes/route';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
export default App;
