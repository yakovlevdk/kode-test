import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useUnit } from 'effector-react';
import { appMounted } from './store/users';
import { syncOnline } from './store/network';
import { $theme } from './store/theme';
import { TopAppBar } from './components/TopAppBar/TopAppBar';
import { HomePage } from './pages/HomePage/HomePage';
import { UserDetailPage } from './pages/UserDetailPage/UserDetailPage';
import styled from 'styled-components';
import { lightTheme, darkTheme } from './theme';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: ${(p) => p.theme.colors.bgPrimary};
`;

function MainLayout() {
  return (
    <Layout>
      <TopAppBar />
      <HomePage />
    </Layout>
  );
}

function App() {
  const theme = useUnit($theme);
  useEffect(() => {
    appMounted();
    syncOnline();
  }, []);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainLayout />}
          />
          <Route path="/user/:id" element={
            <Layout>
              <UserDetailPage />
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
