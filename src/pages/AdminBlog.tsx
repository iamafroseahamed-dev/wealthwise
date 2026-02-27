import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';

const AdminBlog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { blogPosts, blogLoading, blogError, deleteBlogPost } = useAdmin();

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const success = await deleteBlogPost(id);
      if (success) {
        toast({ title: 'Success', description: 'Blog post deleted successfully' });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete post',
        variant: 'destructive',
      });
    }
  };

  if (blogLoading) {
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

        {blogError && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 mb-6">
            <p className="text-destructive text-sm">{blogError}</p>
          </div>
        )}

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {blogPosts.length === 0 ? (
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
                  {blogPosts.map((post) => (
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
                            onClick={() => handleDelete(post.id)}
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
