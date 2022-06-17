import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

/*
 *  React-Router-Dom setup
 *  Docs: https://reactrouter.com/docs/en/v6/getting-started/overview
 */

// This is the main Layout.
import Layout from './components/layout/Layout';

// These are all the pages that use the main Layout.
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import ProfileView from './pages/ProfileView';
import Inflenser from './pages/Inflenser';
import Track from './pages/Track';
import RedirectView from './pages/RedirectView';

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

export default function Router() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" index element={<Home />} />
            <Route path="/:profileId" element={<Profile />} />
            <Route path="/profile/:profileHandle" element={<ProfileView />} />
            <Route path="redirect/:ipfshash" element={<RedirectView />} />
            <Route path="/inflenser" element={<Inflenser />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/track" element={<Track />} />
            <Route path="*" element={<NotFound />} /> {/* 404 like page*/}
          </Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}
