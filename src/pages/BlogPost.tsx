import { useState, useEffect } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import Layout from '@/components/Layout';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { BlogPost as BlogPostType } from '@/lib/supabase';
import { blogService } from '@/lib/blogService';
import { ArrowLeft, Clock, User } from 'lucide-react';

const BlogPost = () => {
  const { navigate, postSlug } = useNavigation();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postSlug) {
        setError('No post found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await blogService.getPostBySlug(postSlug);
        if (!data) {
          setError('Post not found');
        } else {
          setPost(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <Layout>
        <div className="section-lg flex items-center justify-center min-h-96">
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="section-lg">
          <div className="container-tight">
            <div className="bg-destructive/10 border border-destructive rounded-lg p-6 text-center max-w-2xl mx-auto">
              <p className="text-destructive text-lg mb-6">{error || 'Post not found'}</p>
              <Button 
                variant="outline"
                onClick={() => navigate('blog')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Button */}
      <section className="section-sm bg-secondary border-b border-border">
        <div className="container-tight">
          <Button 
            variant="ghost"
            onClick={() => navigate('blog')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="section-lg bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="label-uppercase text-accent mb-3">Article</p>
            <h1 className="h1-display mb-6 max-w-3xl">{post.title}</h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 text-sm text-primary-foreground/70">
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
              {post.reading_time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.reading_time}</span>
                </div>
              )}
              {post.published_at && (
                <div className="flex items-center gap-2">
                  <span>
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover_image && (
        <section className="section-sm">
          <div className="container-tight">
            <div className="rounded-2xl overflow-hidden h-96">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <article className="section-lg">
        <div className="container-tight">
          <style>{`
            .blog-content {
              max-width: 48rem;
              margin-left: auto;
              margin-right: auto;
            }

            .blog-content * {
              color: #000000 !important;
            }

            .blog-content p {
              font-size: 1.05rem;
              line-height: 1.8;
              margin-bottom: 1.5rem;
              color: #000000;
              letter-spacing: 0.3px;
            }

            .blog-content h2 {
              font-family: 'Playfair Display', serif;
              font-size: 1.75rem;
              font-weight: 700;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
              color: #000000;
              letter-spacing: -0.5px;
            }

            .blog-content h3 {
              font-size: 1.3rem;
              font-weight: 600;
              margin-top: 2rem;
              margin-bottom: 1rem;
              color: #000000;
            }

            .blog-content h4 {
              font-size: 1.1rem;
              font-weight: 600;
              margin-top: 1.5rem;
              margin-bottom: 0.75rem;
              color: #000000;
            }

            .blog-content ul,
            .blog-content ol {
              margin: 1.5rem 0;
              padding-left: 2rem;
            }

            .blog-content li {
              margin-bottom: 0.75rem;
              color: #000000;
              line-height: 1.8;
            }

            .blog-content blockquote {
              border-left: 4px solid #c9a84c;
              padding-left: 1.5rem;
              margin: 2rem 0;
              font-style: italic;
              font-size: 1.15rem;
              color: #000000;
              opacity: 1;
            }

            .blog-content em {
              font-style: italic;
              color: #000000;
            }

            .blog-content strong {
              font-weight: 600;
              color: #ffffff;
            }

            .blog-content code {
              background-color: rgba(203, 165, 76, 0.1);
              color: #fbbf24;
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
              font-size: 0.95em;
              font-family: 'Monaco', 'Courier New', monospace;
            }

            .blog-content pre {
              background-color: rgba(0, 0, 0, 0.3);
              border: 1px solid rgba(203, 165, 76, 0.2);
              border-radius: 0.5rem;
              padding: 1.5rem;
              overflow-x: auto;
              margin: 2rem 0;
            }

            .blog-content pre code {
              background: none;
              color: #fbbf24;
              padding: 0;
            }

            .blog-content hr {
              border: none;
              border-top: 2px solid rgba(203, 165, 76, 0.3);
              margin: 3rem 0;
            }

            .blog-content a {
              color: #fbbf24;
              text-decoration: none;
              transition: opacity 0.2s;
            }

            .blog-content a:hover {
              opacity: 0.8;
              text-decoration: underline;
            }
          `}</style>
          
          <div className="blog-content">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      {/* Back to Blog CTA */}
      <section className="section-lg bg-secondary">
        <div className="container-tight">
          <AnimatedSection>
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border text-center max-w-2xl mx-auto">
              <p className="label-uppercase text-accent mb-3">More Insights</p>
              <h2 className="h3-display mb-6">Discover More Articles</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Explore more financial wisdom and investment insights to help guide your journey.
              </p>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => navigate('blog')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to All Articles
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;
