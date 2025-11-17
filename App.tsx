import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import type { Article } from './types';
// Temporarily using local mock data for realistic content as requested.
// To switch back to Contentful, uncomment the line below and the useEffect hook.
// import { contentfulService } from './services/contentfulService';
import { allArticles } from './data/mockArticles';


export type ViewState = {
  page: 'home' | 'category' | 'article' | 'contact' | 'privacy';
  data?: any;
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ page: 'home' });
  // The articles are now loaded from the local mock file.
  const [articles] = useState<Article[]>(allArticles);

  /*
  // --- To re-enable Contentful, uncomment this section ---
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
  */

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleNavigate = (page: ViewState['page'], data: any = null) => {
    setView({ page, data });
  };

  const renderPage = () => {
    /*
    // --- To re-enable Contentful, uncomment this section ---
    if (loading) {
      return <div className="flex justify-center items-center h-screen"><p className="text-2xl">Loading news...</p></div>;
    }
    if (error) {
      return <div className="flex justify-center items-center h-screen"><p className="text-2xl text-red-500">{error}</p></div>;
    }
    */

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