import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';

// Layout
import SiteLayout from '@/components/layout/SiteLayout';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/about/About';
import Leadership from '@/pages/leadership/Leadership';
import OfficerDetail from '@/pages/leadership/OfficerDetail';
import Membership from '@/pages/membership/Membership';
import Journal from '@/pages/publications/Journal';
import Conferences from '@/pages/conferences/Conferences';
import Colleges from '@/pages/community/Colleges';
import Chapters from '@/pages/community/Chapters';
import News from '@/pages/news/News';
import NewsDetail from '@/pages/news/NewsDetail';
import Bylaws from '@/pages/bylaws/Bylaws';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-display text-lg font-bold">IS</span>
          </div>
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/officer/:id" element={<OfficerDetail />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/conferences" element={<Conferences />} />
        <Route path="/colleges" element={<Colleges />} />
        <Route path="/chapters" element={<Chapters />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/bylaws" element={<Bylaws />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
