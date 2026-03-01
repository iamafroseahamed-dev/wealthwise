import { createContext, useContext, useState, ReactNode } from 'react';

export type Page = 
  | 'home' 
  | 'about' 
  | 'mutual-funds' 
  | 'insurance' 
  | 'products'
  | 'book-session'
  | 'blog'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-bookings'
  | 'admin-blog'
  | 'not-found';

interface NavigationContextType {
  currentPage: Page;
  navigate: (page: Page) => void;
  goHome: () => void;
  isAdmin: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAdmin] = useState(false);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    navigate('home');
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigate, goHome, isAdmin }}>
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
