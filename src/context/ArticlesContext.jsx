import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext'; // 

// ⚠️ SECURITY FIX: Saved articles are now user-specific
const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const { user } = useAuth(); // Current logged-in user
  const [savedArticlesByUser, setSavedArticlesByUser] = useState({}); // { username: [articles] }

  // Get the current user's saved articles
  const getUserSavedArticles = () => {
    if (!user) return [];
    return savedArticlesByUser[user.username] || [];
  };

  // Get all users' saved articles (for admin)
  const getAllUserArticles = () => savedArticlesByUser;

  // Save an article for the current user
  const saveArticle = (article) => {
    if (!user) return;

    setSavedArticlesByUser((prev) => {
      const userArticles = prev[user.username] || [];

      // Prevent duplicates
      if (userArticles.find(a => a.url === article.url)) return prev;

      return {
        ...prev,
        [user.username]: [...userArticles, article],
      };
    });
  };

  // Remove an article for the current user
  const removeArticle = (url) => {
    if (!user) return;

    setSavedArticlesByUser((prev) => {
      const userArticles = prev[user.username] || [];
      return {
        ...prev,
        [user.username]: userArticles.filter(a => a.url !== url),
      };
    });
  };

  // Check if an article is saved for the current user
  const isArticleSaved = (url) => {
    if (!user) return false;
    const userArticles = savedArticlesByUser[user.username] || [];
    return userArticles.some(a => a.url === url);
  };

  return (
    <ArticlesContext.Provider 
      value={{ 
        saveArticle, 
        removeArticle, 
        isArticleSaved, 
        getUserSavedArticles,    
        getAllUserArticles       
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};