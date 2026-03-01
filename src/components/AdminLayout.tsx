import { ReactNode } from 'react';
import { Home, LogOut, BookOpen } from 'lucide-react';
import { useNavigation } from '@/contexts/NavigationContext';
import { useAdmin } from '@/contexts/AdminContext';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { currentPage, navigate } = useNavigation();
  const { logout } = useAdmin();

  const navItems = [
    { page: 'admin-dashboard' as const, label: 'Dashboard', icon: Home },
    { page: 'admin-bookings' as const, label: 'Bookings', icon: Home },
    { page: 'admin-blog' as const, label: 'Blog', icon: BookOpen },
  ];

  const handleLogout = () => {
    logout();
    navigate('admin-login');
  };

  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground border-r border-border">
        <div className="p-6 border-b border-primary-foreground/10">
          <button
            onClick={() => navigate('home')}
            className="font-display text-xl font-bold hover:text-accent transition-colors"
          >
            Wealth<span className="text-gradient-gold">Wise</span>
          </button>
          <p className="text-xs text-primary-foreground/60 mt-2">Admin Panel</p>
        </div>

        <nav className="p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => navigate(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-accent/20 text-accent'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 w-64 p-6 border-t border-primary-foreground/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
