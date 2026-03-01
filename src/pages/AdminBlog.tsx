import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/components/AdminLayout';
import { useBlog } from '@/contexts/BlogContext';
import { useToast } from '@/hooks/use-toast';
import { BlogPost } from '@/lib/supabase';
import { blogService } from '@/lib/blogService';
import RichTextEditor from '@/components/RichTextEditor';
import { Trash2, Edit2, Plus, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AdminBlog = () => {
  const { posts, postsLoading, postsError, createPost, updatePost, deletePost } = useBlog();
  const { toast } = useToast();

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    cover_image: '',
    author: '',
    published: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      cover_image: '',
      author: '',
      published: false,
    });
    setImageFile(null);
    setImagePreview('');
    setEditingId(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    setUploading(true);
    try {
      const url = await blogService.uploadImage(imageFile);
      setFormData((prev) => ({ ...prev, cover_image: url }));
      setImageFile(null);
      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image,
      author: post.author || '',
      published: post.published_at ? true : false,
    });
    setImagePreview(post.cover_image);
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleSavePost = async () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const slug = blogService.generateSlug(formData.title);
      const readingTime = blogService.calculateReadingTime(formData.content);

      const postData = {
        ...formData,
        slug,
        reading_time: readingTime,
        published_at: formData.published ? new Date().toISOString() : null,
      };

      if (editingId) {
        await updatePost(editingId, postData);
        toast({
          title: 'Success',
          description: 'Post updated successfully',
        });
      } else {
        await createPost(postData as any);
        toast({
          title: 'Success',
          description: 'Post created successfully',
        });
      }

      setShowForm(false);
      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save post',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const success = await deletePost(id);
      if (success) {
        toast({
          title: 'Success',
          description: 'Post deleted successfully',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete post',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-muted-foreground">Create and manage blog posts</p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </div>

        {postsError && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
            <p className="text-destructive text-sm">{postsError}</p>
          </div>
        )}

        {postsLoading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No posts yet. Create your first post!</p>
          </div>
        ) : (
          <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reading Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="text-sm">{post.author || '-'}</TableCell>
                    <TableCell className="text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          post.published_at
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}
                      >
                        {post.published_at ? 'Published' : 'Draft'}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{post.reading_time}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPost(post)}
                        className="gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Blog Form Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Post' : 'Create New Post'}</DialogTitle>
              <DialogDescription>
                {editingId ? 'Update your blog post' : 'Create a new blog post with rich content and images'}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Post Title *</label>
                <Input
                  placeholder="Enter post title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt *</label>
                <Textarea
                  placeholder="Brief summary of the post"
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <Input
                  placeholder="Post author name"
                  value={formData.author}
                  onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                />
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">Cover Image</label>
                <div className="space-y-3">
                  {imagePreview && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted border border-border">
                      <img
                        src={imagePreview}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <label htmlFor="image-upload" className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById('image-upload')?.click();
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Image
                      </Button>
                    </label>
                    {imageFile && (
                      <Button
                        onClick={handleImageUpload}
                        disabled={uploading}
                        className="gap-2"
                      >
                        {uploading ? 'Uploading...' : 'Upload Image'}
                      </Button>
                    )}
                  </div>
                  {imageFile && <p className="text-xs text-muted-foreground">{imageFile.name}</p>}
                </div>
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="block text-sm font-medium mb-2">Content *</label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                />
              </div>

              {/* Publish Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                  className="w-4 h-4 rounded border-border"
                />
                <label htmlFor="published" className="text-sm font-medium cursor-pointer">
                  Publish this post (checked = published, unchecked = draft)
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSavePost}
                  disabled={saving}
                  className="gap-2"
                >
                  {saving ? 'Saving...' : 'Save Post'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
