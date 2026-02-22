import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { supabase, BlogPost } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: 'Note: Blog source not configured yet',
          description: 'Please configure Supabase to use blog features',
          variant: 'destructive',
        });
        // Use sample data for demo
        setPosts(getSampleBlogPosts());
      } else {
        setPosts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      setPosts(getSampleBlogPosts());
    } finally {
      setLoading(false);
    }
  };

  const getSampleBlogPosts = (): BlogPost[] => [
    {
      id: '1',
      slug: 'power-of-sip',
      title: 'The Power of SIP: How ₹5,000/Month Can Build a Crore',
      excerpt: 'Discover how systematic investment plans leverage compounding to turn small monthly investments into significant wealth over time.',
      content:
        'Systematic Investment Plans (SIP) are one of the most powerful tools for long-term wealth creation...',
      cover_image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop',
      published_at: '2024-12-15',
      reading_time: '5 min read',
      author: 'WealthWise Team',
    },
    {
      id: '2',
      slug: 'tax-saving-elss',
      title: 'ELSS vs PPF vs FD: Which Tax Saving Option Is Best?',
      excerpt: 'A comprehensive comparison of popular Section 80C investment options to help you make the smartest tax-saving decision.',
      content: 'When it comes to saving taxes under Section 80C...',
      cover_image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop',
      published_at: '2024-11-28',
      reading_time: '7 min read',
      author: 'WealthWise Team',
    },
  ];

  const deletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete post. Make sure Supabase is configured.',
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Success', description: 'Blog post deleted successfully' });
        fetchBlogPosts();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold font-display mb-2">Blog Management</h1>
            <p className="text-muted-foreground">Create and manage blog posts</p>
          </div>
          <Button
            onClick={() => navigate('/admin/blog/new')}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground mb-6">No blog posts yet</p>
              <Button onClick={() => navigate('/admin/blog/new')}>Create First Post</Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Author</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Published</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium">{post.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{post.slug}</p>
                      </td>
                      <td className="px-6 py-4 text-sm">{post.author || 'WealthWise Team'}</td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(post.published_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/admin/blog/${post.id}/edit`)}
                            className="gap-1"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            className="gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deletePost(post.id)}
                            className="gap-1 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
