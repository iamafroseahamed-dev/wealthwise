import { Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold font-display mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content and settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blog Management Card */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-xl font-bold mb-2 font-display">Blog Management</h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Create, edit, and delete blog posts. Manage all content from one place.
            </p>
            <Link to="/admin/blog">
              <Button variant="default" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Manage Blog
              </Button>
            </Link>
          </div>

          {/* Placeholder for future modules */}
          <div className="bg-card rounded-2xl border border-border p-8 opacity-50">
            <div className="w-12 h-12 rounded-xl bg-slate-300/10 flex items-center justify-center mb-6">
              <div className="w-6 h-6 bg-slate-300 rounded" />
            </div>
            <h2 className="text-xl font-bold mb-2 font-display">Coming Soon</h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              More admin features coming soon...
            </p>
            <Button variant="outline" className="w-full" disabled>
              Stay Tuned
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
