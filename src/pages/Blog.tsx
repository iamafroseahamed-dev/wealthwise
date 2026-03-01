import { useState, useEffect } from 'react';
import { useNavigation } from '@/contexts/NavigationContext';
import Layout from '@/components/Layout';
import AnimatedSection from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/lib/supabase';
import { blogService } from '@/lib/blogService';
import { ArrowRight, Clock, User } from 'lucide-react';

const Blog = () => {
  const { navigate } = useNavigation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await blogService.getPublishedPosts();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Subscribe to real-time updates
    const subscription = blogService.onBlogUpdates(() => {
      fetchPosts();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-lg bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="label-uppercase text-accent mb-3">Insights & Resources</p>
            <h1 className="h1-display mb-6 max-w-3xl">
              Financial Wisdom & Investment{' '}
              <span className="text-gradient-gold">Insights for Your Journey</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              Explore articles about mutual fund investing, financial planning strategies, and market insights to help you make informed investment decisions.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section">
        <div className="container-tight">
          {error && (
            <div className="mb-6 bg-destructive/10 border border-destructive rounded-lg p-4">
              <p className="text-destructive text-sm">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles published yet.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {posts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.1}>
                  <article className="grid grid-cols-1 md:grid-cols-3 gap-lg items-stretch border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500">
                    {/* Cover Image */}
                    {post.cover_image && (
                      <div className="md:col-span-1 h-64 md:h-auto overflow-hidden bg-muted">
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div
                      className={`p-8 flex flex-col justify-between ${
                        post.cover_image ? 'md:col-span-2' : 'md:col-span-3'
                      }`}
                    >
                      <div>
                        <p className="label-uppercase text-accent mb-3">Article</p>
                        <h2 className="h3-display mb-3">{post.title}</h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Meta Information */}
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
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
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          )}
                        </div>

                        <Button variant="default" className="w-full gap-2">
                          Read Full Article <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-lg bg-secondary">
        <div className="container-tight">
          <AnimatedSection>
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border text-center max-w-2xl mx-auto">
              <p className="label-uppercase text-accent mb-3">Ready to Start?</p>
              <h2 className="h3-display mb-6">Apply Your Knowledge</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Ready to take the next step in your investment journey? Book a consultation with us to discuss your financial goals.
              </p>
              <Button variant="hero" size="lg" onClick={() => navigate('book-session')} className="gap-2">
                Book a Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
