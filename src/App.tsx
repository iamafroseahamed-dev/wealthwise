import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdminProvider } from "@/contexts/AdminContext";
import { BlogProvider } from "@/contexts/BlogContext";
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext";

// Public pages
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import MutualFunds from "./pages/MutualFunds";
import Insurance from "./pages/Insurance";
import BookSession from "./pages/BookSession";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings";
import AdminBlog from "./pages/AdminBlog";

const queryClient = new QueryClient();

const AppContent = () => {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Index />;
      case 'about':
        return <About />;
      case 'products':
        return <Products />;
      case 'mutual-funds':
        return <MutualFunds />;
      case 'insurance':
        return <Insurance />;
      case 'book-session':
        return <BookSession />;
      case 'blog':
        return <Blog />;
      case 'admin-login':
        return <AdminLogin />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'admin-bookings':
        return <AdminBookings />;
      case 'admin-blog':
        return <AdminBlog />;
      case 'not-found':
      default:
        return <NotFound />;
    }
  };

  return renderPage();
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminProvider>
        <BlogProvider>
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </BlogProvider>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
