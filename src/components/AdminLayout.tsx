import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { LogOut, BookOpen, Home } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const { logout } = useAdmin();

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { to: '/admin/blog', label: 'Manage Blog', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen flex bg-secondary">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground border-r border-border">
        <div className="p-6 border-b border-primary-foreground/10">
          <Link to="/" className="font-display text-xl font-bold">
            Wealth<span className="text-gradient-gold">Wise</span>
          </Link>
          <p className="text-xs text-primary-foreground/60 mt-2">Admin Panel</p>
        </div>

        <nav className="p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-accent/20 text-accent'
                    : 'text-primary-foreground/70 hover:text-primary-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
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
