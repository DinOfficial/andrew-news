import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import type { Article } from './types';
// The app will now fetch data from Contentful.
import { contentfulService } from './services/contentfulService';
// The local mock data is no longer needed.
// import { allArticles } from './data/mockArticles';


export type ViewState = {
  page: 'home' | 'category' | 'article' | 'contact' | 'privacy';
  data?: any;
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ page: 'home' });
  
  // --- This section is now active to fetch data from Contentful ---
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await contentfulService.getArticles();
        setArticles(fetchedArticles);
        setError(null);
      } catch (err) {
        setError('Failed to fetch articles. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleNavigate = (page: ViewState['page'], data: any = null) => {
    setView({ page, data });
  };

  const renderPage = () => {
    // --- Loading and Error states are now active for a better user experience ---
    if (loading) {
      return <div className="flex justify-center items-center h-screen"><p className="text-2xl">Loading news...</p></div>;
    }
    if (error) {
      return <div className="flex justify-center items-center h-screen"><p className="text-2xl text-red-500">{error}</p></div>;
    }

    switch (view.page) {
      case 'home':
        return <HomePage articles={articles} onNavigate={handleNavigate} />;
      case 'category':
        return <CategoryPage allArticles={articles} category={view.data} onNavigate={handleNavigate} />;
      case 'article':
        return <ArticlePage allArticles={articles} articleId={view.data} onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      default:
        return <HomePage articles={articles} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-white font-sans text-gray-800 flex flex-col min-h-screen">
      <Header onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
