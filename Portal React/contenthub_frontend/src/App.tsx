import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/common/ScrollToTop';
import AnchorScroll from './components/common/AnchorScroll';
import VideoPage from './pages/VideoPage';
import Video2Page from './pages/Video2Page';
import MusicPage from './pages/MusicPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CourseArticlePage from './pages/CourseArticlePage';
import GamesPage from './pages/GamesPage';
import GameDetailPage from './pages/GameDetailPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';

// Legal pages
import TermsOfServicePage from './pages/TermsOfServicePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import SubscriptionTermsPage from './pages/SubscriptionTermsPage';

import SimplifiedCoursesPage from './pages/SimplifiedCoursesPage';
import SimplifiedCourseDetailPage from './pages/SimplifiedCourseDetailPage';
import SimplifiedCourseArticlePage from './pages/SimplifiedCourseArticlePage';
import SubscriptionPage from './pages/SubscriptionPage';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

import './components/video/styles.css';
import './components/music/radio/styles.css';

const ConditionalRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <Layout><ArticlesPage /></Layout>;
  }
  
  return <LandingPage />;
};

const LoginRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <LoginPage />;
};

const RegisterRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <RegisterPage />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AnchorScroll />
        <Routes>
          
          <Route path="/" element={<ConditionalRoute />} />
          
          <Route path="/login" element={<LoginRoute />} />
          <Route path="/register" element={<RegisterRoute />} />

          {/* Legal Pages - Public Access */}
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/cookies" element={<CookiePolicyPage />} />
          <Route path="/refund" element={<RefundPolicyPage />} />
          <Route path="/subscription-terms" element={<SubscriptionTermsPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />

          <Route path="/video2" element={
            <ProtectedRoute>
              <VideoPage />
            </ProtectedRoute>
          } />
          
          <Route path="/video" element={
            <ProtectedRoute>
              <Video2Page />
            </ProtectedRoute>
          } />
          
          <Route path="/music" element={
            <ProtectedRoute>
              <MusicPage />
            </ProtectedRoute>
          } />
          
          <Route path="/articles" element={
            <ProtectedRoute>
              <Layout><ArticlesPage /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/articles/:id" element={
            <ProtectedRoute>
              <Layout><ArticleDetailPage /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/courses" element={
            <ProtectedRoute>
              <Layout><CoursesPage /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/courses/:id" element={
            <ProtectedRoute>
              <Layout><CourseDetailPage /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/courses/:courseId/modules/:moduleId/articles/:articleId" element={
            <ProtectedRoute>
              <Layout><CourseArticlePage /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/simplified-courses" element={
            <ProtectedRoute>
              <Layout><SimplifiedCoursesPage /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/simplified-courses/:id" element={
            <ProtectedRoute>
              <Layout><SimplifiedCourseDetailPage /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/simplified-courses/:courseId/modules/:moduleIndex/articles/:articleIndex" element={
            <ProtectedRoute>
              <Layout><SimplifiedCourseArticlePage /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/games" element={
            <ProtectedRoute>
              <Layout><GamesPage /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/games/:id" element={
            <ProtectedRoute>
              <Layout><GameDetailPage /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout><ProfilePage /></Layout>
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
