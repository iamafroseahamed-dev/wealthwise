import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase, BlogPost } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Upload, Image as ImageIcon, Trash2, Eye, Clock, Plus, ArrowUp, ArrowDown } from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'text' | 'image';
  content: string;
}

const AdminBlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingBlockId, setUploadingBlockId] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
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
          cover_image: data.cover_image,
          reading_time: data.reading_time,
          author: data.author || 'WealthWise Team',
        });
        // Parse content back into blocks
        parseContentToBlocks(data.content || '');
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

  const parseContentToBlocks = (content: string) => {
    const newBlocks: ContentBlock[] = [];
    const parts = content.split(/(\n?\[.*?\]\(.*?\)\n?)/g);
    
    parts.forEach((part, index) => {
      const imageMatch = part.match(/!\[(.*?)\]\((.*?)\)/);
      if (imageMatch) {
        newBlocks.push({
          id: `block-${Date.now()}-${index}`,
          type: 'image',
          content: imageMatch[2],
        });
      } else if (part.trim() && part !== '\n') {
        newBlocks.push({
          id: `block-${Date.now()}-${index}`,
          type: 'text',
          content: part.trim(),
        });
      }
    });

    if (newBlocks.length === 0) {
      newBlocks.push({
        id: `block-${Date.now()}-0`,
        type: 'text',
        content: '',
      });
    }
    setBlocks(newBlocks);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Block Management Functions
  const addTextBlock = () => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: 'text',
      content: '',
    };
    setBlocks([...blocks, newBlock]);
  };

  const addImageBlock = () => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: 'image',
      content: '',
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (blockId: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, content } : block
    ));
  };

  const deleteBlock = (blockId: string) => {
    if (blocks.length === 1) {
      toast({
        title: 'Error',
        description: 'You must have at least one block',
        variant: 'destructive',
      });
      return;
    }
    setBlocks(blocks.filter(block => block.id !== blockId));
  };

  const moveBlockUp = (blockId: string) => {
    const index = blocks.findIndex(block => block.id === blockId);
    if (index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  const moveBlockDown = (blockId: string) => {
    const index = blocks.findIndex(block => block.id === blockId);
    if (index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  const handleImageUploadForBlock = async (e: React.ChangeEvent<HTMLInputElement>, blockId: string) => {
    const files = e.target.files;
    if (!files) return;

    setUploadingBlockId(blockId);

    try {
      const file = files[0];
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Error',
          description: 'Please select an image file',
          variant: 'destructive',
        });
        return;
      }

      // Generate unique filename
      const timestamp = Date.now();
      const fileName = `blog-${timestamp}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = `blog-images/${fileName}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(filePath);
      const imageUrl = urlData.publicUrl;

      // Update block with image URL
      updateBlock(blockId, imageUrl);

      toast({
        title: 'Success',
        description: 'Image uploaded successfully',
      });

      // Reset input
      e.target.value = '';
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload image',
        variant: 'destructive',
      });
    } finally {
      setUploadingBlockId(null);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const blocksToContent = (): string => {
    return blocks.map(block => {
      if (block.type === 'text') {
        return block.content;
      } else {
        return `![Image](${block.content})`;
      }
    }).join('\n\n');
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

    if (blocks.length === 0 || blocks.every(b => !b.content.trim())) {
      toast({
        title: 'Error',
        description: 'Please add some content to your blog post',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);

    try {
      const postData = {
        ...formData,
        content: blocksToContent(),
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

            {/* BLOCKS EDITOR */}
            <div className="bg-secondary/50 rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4">Content Blocks</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Add text and image blocks in any order. Reorder them as needed.
              </p>

              {/* Add Block Buttons */}
              <div className="flex gap-3 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTextBlock}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Text Block
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addImageBlock}
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Image Block
                </Button>
              </div>

              {/* Blocks List */}
              <div className="space-y-4">
                {blocks.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">No blocks yet. Add one above!</p>
                ) : (
                  blocks.map((block, index) => (
                    <div
                      key={block.id}
                      className="bg-background rounded-lg border border-border p-4 space-y-3"
                    >
                      {/* Block Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {block.type === 'text' ? (
                            <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                              Text
                            </span>
                          ) : (
                            <span className="text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                              Image
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">Block {index + 1}</span>
                        </div>

                        {/* Block Actions */}
                        <div className="flex items-center gap-2">
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => moveBlockUp(block.id)}
                              title="Move up"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </Button>
                          )}
                          {index < blocks.length - 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => moveBlockDown(block.id)}
                              title="Move down"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBlock(block.id)}
                            className="text-destructive hover:text-destructive"
                            title="Delete block"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Block Content */}
                      {block.type === 'text' ? (
                        <div className="ql-wrapper">
                          <ReactQuill
                            theme="snow"
                            value={block.content}
                            onChange={(content) => updateBlock(block.id, content)}
                            modules={{
                              toolbar: [
                                [{ header: [2, 3, false] }],
                                'bold',
                                'italic',
                                'underline',
                                'link',
                                { list: 'ordered' },
                                { list: 'bullet' },
                                'blockquote',
                                { 'color': [] },
                              ],
                            }}
                            formats={['header', 'bold', 'italic', 'underline', 'link', 'list', 'blockquote', 'color']}
                            placeholder="Enter your content with formatting..."
                          />
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {block.content && (
                            <div className="rounded-lg overflow-hidden border border-border bg-secondary">
                              <img
                                src={block.content}
                                alt="Block image"
                                className="w-full h-40 object-cover"
                              />
                            </div>
                          )}
                          <label className="block">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUploadForBlock(e, block.id)}
                              disabled={uploadingBlockId === block.id}
                              className="cursor-pointer"
                            />
                          </label>
                          <p className="text-xs text-muted-foreground">
                            {uploadingBlockId === block.id
                              ? 'Uploading...'
                              : block.content
                              ? 'Image uploaded. Upload new image to replace.'
                              : 'Upload an image (PNG, JPG, GIF, WebP)'}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
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
                  {blocks.length === 0 || blocks.every(b => !b.content.trim() && b.content !== '<p><br/></p>') ? (
                    <p className="text-muted-foreground italic">Content will appear here as you add blocks...</p>
                  ) : (
                    blocks.map((block) => {
                      if (block.type === 'text') {
                        return (
                          <div
                            key={block.id}
                            className="text-muted-foreground leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: block.content }}
                          />
                        );
                      } else {
                        return (
                          <img
                            key={block.id}
                            src={block.content}
                            alt="Block"
                            className="w-full h-auto rounded-lg border border-border"
                          />
                        );
                      }
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Preview Info */}
            <div className="bg-amber-50 dark:bg-amber-950 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
              <p className="text-xs text-amber-800 dark:text-amber-200">
                💡 <strong>Tip:</strong> Your content blocks will render in the exact order shown on the left, with images and text exactly where you place them.
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
