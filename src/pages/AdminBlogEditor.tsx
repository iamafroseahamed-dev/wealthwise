import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase, BlogPost } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, Clock } from 'lucide-react';

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

    if (!formData.title || !formData.slug || !formData.excerpt || !formData.cover_image || !formData.content) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields including content',
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
      <div className="w-full">
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

        {/* Split Screen: Editor + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Editor Form */}
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

            {/* HTML Content Editor */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                content={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
                placeholder="Start writing your blog post... Click the image icon to upload images."
              />
              <p className="text-xs text-muted-foreground mt-2">
                💡 <strong>Features:</strong> Upload images directly, formatting tools, headings, lists, and blockquotes.
              </p>
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
            <div className="bg-secondary rounded-lg p-6 flex gap-4 justify-end lg:col-span-1">
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

          {/* RIGHT: Live Preview */}
          <div className="space-y-6 sticky top-24 self-start h-fit">
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="bg-secondary px-6 py-4 border-b border-border">
                <h2 className="font-semibold flex items-center gap-2">
                  <Eye className="w-4 h-4 text-accent" />
                  Live Preview
                </h2>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {/* Cover Image */}
                {formData.cover_image && (
                  <div className="mb-6 rounded-lg overflow-hidden border border-border">
                    <img
                      src={formData.cover_image}
                      alt="Cover"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Title */}
                {formData.title && (
                  <h1 className="text-3xl md:text-4xl font-bold font-display mb-4 leading-tight">
                    {formData.title}
                  </h1>
                )}

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
                  {formData.reading_time && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formData.reading_time}
                    </span>
                  )}
                  {formData.author && (
                    <span>By {formData.author}</span>
                  )}
                </div>

                {/* Content Blocks Preview */}
                <div className="prose prose-sm max-w-none space-y-4">
                  {formData.content ? (
                    <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                  ) : (
                    <p className="text-muted-foreground italic">Content will appear here as you type...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Preview Info */}
            <div className="bg-amber-50 dark:bg-amber-950 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
              <p className="text-xs text-amber-800 dark:text-amber-200">
                💡 <strong>Tip:</strong> Your content renders in real-time in the preview. Use the editor toolbar to format text, add images, and create lists.
              </p>
            </div>
          </div>
        </div>

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
