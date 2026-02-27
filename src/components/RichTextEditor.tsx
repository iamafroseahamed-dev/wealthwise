import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Link as LinkIcon,
  Undo2,
  Redo2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import '@/styles/editor.css';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({
  content,
  onChange,
  placeholder = 'Start typing...',
}: RichTextEditorProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-blue-600 dark:text-blue-400 underline',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      // Validate Supabase configuration
      const supabaseUrl = (import.meta.env as any).VITE_SUPABASE_URL;
      const supabaseKey = (import.meta.env as any).VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase credentials not configured');
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 8);
      const cleanFileName = file.name
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9.-]/g, '')
        .toLowerCase();
      const fileName = `${timestamp}-${randomId}-${cleanFileName}`;

      // Upload to Supabase storage - store in root of bucket or organize by date
      const year = new Date().getFullYear();
      const month = String(new Date().getMonth() + 1).padStart(2, '0');
      const filePath = `${year}/${month}/${fileName}`;

      console.log('Uploading image to:', filePath);

      // Upload to Supabase storage
      const { data, error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('Upload successful:', data);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(filePath);
      
      const imageUrl = urlData.publicUrl;

      if (!imageUrl) {
        throw new Error('Failed to generate public URL');
      }

      console.log('Image public URL:', imageUrl);

      // Insert image into editor
      if (editor) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }

      toast({
        title: 'Success',
        description: 'Image uploaded and inserted',
      });

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload image. Check console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!editor) {
    return <div className="text-center py-8 text-muted-foreground">Loading editor...</div>;
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      {/* Toolbar */}
      <div className="bg-secondary border-b border-border p-3 flex flex-wrap gap-2 sticky top-0 z-10">
        <Button
          type="button"
          variant={editor.isActive('bold') ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
          className="w-9 h-9 p-0"
        >
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('italic') ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
          className="w-9 h-9 p-0"
        >
          <Italic className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('code') ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="Code"
          className="w-9 h-9 p-0"
        >
          <Code className="w-4 h-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          type="button"
          variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Heading 2"
          className="w-9 h-9 p-0"
        >
          <Heading2 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Heading 3"
          className="w-9 h-9 p-0"
        >
          <Heading3 className="w-4 h-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          type="button"
          variant={editor.isActive('bulletList') ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
          className="w-9 h-9 p-0"
        >
          <List className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('orderedList') ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered List"
          className="w-9 h-9 p-0"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive('blockquote') ? 'default' : 'outline'}
          size="sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
          className="w-9 h-9 p-0"
        >
          <Quote className="w-4 h-4" />
        </Button>

        <div className="w-px bg-border mx-1" />

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          title={isUploading ? "Uploading image..." : "Upload Image"}
          className="w-9 h-9 p-0"
        >
          {isUploading ? (
            <div className="w-4 h-4 border-2 border-border border-t-accent rounded-full animate-spin" />
          ) : (
            <ImageIcon className="w-4 h-4" />
          )}
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <div className="w-px bg-border mx-1" />

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
          className="w-9 h-9 p-0"
        >
          <Undo2 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
          className="w-9 h-9 p-0"
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="prose prose-sm max-w-none p-6" />

      {/* Character count */}
      <div className="bg-secondary border-t border-border px-6 py-2 text-xs text-muted-foreground">
        Characters: {editor.storage.characterCount?.characters() || 0}
      </div>
    </div>
  );
};

export default RichTextEditor;
