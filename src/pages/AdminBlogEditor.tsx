import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase, BlogPost } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const AdminBlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    reading_time: '5 min read',
    author: 'WealthWise Team',
  });

  useEffect(() => {
    if (isEditing) {
      fetchBlogPost();
    }
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to load blog post',
          variant: 'destructive',
        });
      } else if (data) {
        setFormData({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content || '',
          cover_image: data.cover_image,
          reading_time: data.reading_time,
          author: data.author || 'WealthWise Team',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load blog post',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.slug || !formData.excerpt || !formData.cover_image) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    try {
      const postData = {
        ...formData,
        published_at: new Date().toISOString(),
      };

      if (isEditing) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);

        if (error) {
          throw error;
        }
      } else {
        const { error } = await supabase.from('blog_posts').insert([postData]);

        if (error) {
          throw error;
        }
      }

      toast({
        title: 'Success',
        description: isEditing ? 'Blog post updated' : 'Blog post created',
      });
      navigate('/admin/blog');
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: error.message || (isEditing ? 'Failed to update post' : 'Failed to create post'),
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <button
          onClick={() => navigate('/admin/blog')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-2">
            {isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? 'Update your blog content' : 'Add a new blog post to your website'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Enter blog post title"
              value={formData.title}
              onChange={handleTitleChange}
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="auto-generated-slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">Auto-generated from title</p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Short summary of the blog post (used in blog listing)"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Content</label>
            <Textarea
              placeholder="Full blog post content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Cover Image URL <span className="text-red-500">*</span>
            </label>
            <Input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.cover_image}
              onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
              required
            />
            {formData.cover_image && (
              <div className="mt-3 rounded-lg overflow-hidden w-full max-w-sm">
                <img src={formData.cover_image} alt="Cover preview" className="w-full h-40 object-cover" />
              </div>
            )}
          </div>

          {/* Reading Time */}
          <div>
            <label className="block text-sm font-medium mb-2">Reading Time</label>
            <Input
              type="text"
              placeholder="5 min read"
              value={formData.reading_time}
              onChange={(e) => setFormData({ ...formData, reading_time: e.target.value })}
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium mb-2">Author</label>
            <Input
              type="text"
              placeholder="Author name"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
          </div>

          {/* Actions */}
          <div className="bg-secondary rounded-lg p-6 flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/blog')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={saving}
            >
              {saving ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
            </Button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> This form works with Supabase. If you haven't configured Supabase yet,
            please set up your database first. For now, you can test the UI.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogEditor;
