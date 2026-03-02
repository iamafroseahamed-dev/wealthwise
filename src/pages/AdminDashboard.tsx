import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/components/AdminLayout';
import { useNavigation } from '@/contexts/NavigationContext';
import { useBlog } from '@/contexts/BlogContext';
import { useBookings } from '@/hooks/useBookings';
import { Calendar, BookOpen } from 'lucide-react';

const AdminDashboard = () => {
  const { navigate } = useNavigation();
  const { posts } = useBlog();
  const { bookings } = useBookings();
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalBlogPosts: 0,
    publishedPosts: 0,
  });

  useEffect(() => {
    setStats({
      totalBookings: bookings?.length || 0,
      totalBlogPosts: posts?.length || 0,
      publishedPosts: posts?.filter((p) => p.published_at)?.length || 0,
    });
  }, [posts, bookings]);

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold font-display mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content and settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Bookings Management Card */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold font-display text-accent">{stats.totalBookings}</p>
                <p className="text-xs text-muted-foreground">Total Bookings</p>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2 font-display">Session Bookings</h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              View and manage all client bookings and consultation requests.
            </p>
            <Button
              variant="default"
              className="w-full"
              onClick={() => navigate('admin-bookings')}
            >
              View Bookings
            </Button>
          </div>

          {/* Blog Posts Management Card */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold font-display text-blue-500">{stats.publishedPosts}</p>
                <p className="text-xs text-muted-foreground">of {stats.totalBlogPosts} Published</p>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2 font-display">Blog Posts</h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Create, edit, and publish articles for your financial blog.
            </p>
            <Button
              variant="default"
              className="w-full"
              onClick={() => navigate('admin-blog')}
            >
              Manage Blog
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
