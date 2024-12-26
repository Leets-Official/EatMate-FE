import { ThemeProvider } from 'styled-components';
import './App.css';
import Home from './page/Home';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  );
}

export default App;
