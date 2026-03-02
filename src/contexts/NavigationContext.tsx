import { createContext, useContext, useState, ReactNode } from 'react';

export type Page = 
  | 'home' 
  | 'about' 
  | 'mutual-funds' 
  | 'insurance' 
  | 'products'
  | 'book-session'
  | 'blog'
  | 'blog-post'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-bookings'
  | 'admin-blog'
  | 'not-found';

interface NavigationContextType {
  currentPage: Page;
  postSlug: string | null;
  navigate: (page: Page, postSlug?: string) => void;
  goHome: () => void;
  isAdmin: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [postSlug, setPostSlug] = useState<string | null>(null);
  const [isAdmin] = useState(false);

  const navigate = (page: Page, postSlug?: string) => {
    setCurrentPage(page);
    if (postSlug) {
      setPostSlug(postSlug);
    } else {
      setPostSlug(null);
    }
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    navigate('home');
  };

  return (
    <NavigationContext.Provider value={{ currentPage, postSlug, navigate, goHome, isAdmin }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
