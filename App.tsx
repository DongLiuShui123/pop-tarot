import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import ReadingRoom from './pages/ReadingRoom';
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reading" element={<ReadingRoom />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<Profile />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
