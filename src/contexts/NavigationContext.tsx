import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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

const pageToPath = (page: Page, slug?: string | null): string => {
  switch (page) {
    case 'home': return '/';
    case 'about': return '/about';
    case 'products': return '/products';
    case 'mutual-funds': return '/mutual-funds';
    case 'insurance': return '/insurance';
    case 'book-session': return '/book-session';
    case 'blog': return '/blog';
    case 'blog-post': return `/blog/${slug ?? ''}`;
    case 'admin-login': return '/admin';
    case 'admin-dashboard': return '/admin/dashboard';
    case 'admin-bookings': return '/admin/bookings';
    case 'admin-blog': return '/admin/blog';
    default: return '/';
  }
};

const pathToPage = (pathname: string): { page: Page; slug: string | null } => {
  if (pathname === '/' || pathname === '') return { page: 'home', slug: null };
  if (pathname === '/about') return { page: 'about', slug: null };
  if (pathname === '/products') return { page: 'products', slug: null };
  if (pathname === '/mutual-funds') return { page: 'mutual-funds', slug: null };
  if (pathname === '/insurance') return { page: 'insurance', slug: null };
  if (pathname === '/book-session') return { page: 'book-session', slug: null };
  if (pathname === '/blog') return { page: 'blog', slug: null };
  if (pathname.startsWith('/blog/')) return { page: 'blog-post', slug: pathname.slice(6) };
  if (pathname === '/admin' || pathname === '/admin/login') return { page: 'admin-login', slug: null };
  if (pathname === '/admin/dashboard') return { page: 'admin-dashboard', slug: null };
  if (pathname === '/admin/bookings') return { page: 'admin-bookings', slug: null };
  if (pathname === '/admin/blog') return { page: 'admin-blog', slug: null };
  return { page: 'not-found', slug: null };
};

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const initial = pathToPage(window.location.pathname);
  const [currentPage, setCurrentPage] = useState<Page>(initial.page);
  const [postSlug, setPostSlug] = useState<string | null>(initial.slug);
  const [isAdmin] = useState(false);

  const navigate = (page: Page, slug?: string) => {
    const resolvedSlug = slug ?? null;
    setCurrentPage(page);
    setPostSlug(resolvedSlug);
    window.history.pushState({ page, slug: resolvedSlug }, '', pageToPath(page, resolvedSlug));
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.page) {
        setCurrentPage(event.state.page);
        setPostSlug(event.state.slug ?? null);
      } else {
        const { page, slug } = pathToPage(window.location.pathname);
        setCurrentPage(page);
        setPostSlug(slug);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
