import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { supabase, BlogPost as BlogPostType } from "@/lib/supabase";

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPost();
  }, [slug]);

  const fetchBlogPost = async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (fetchError) {
        setError("Blog post not found");
        console.error("Error fetching post:", fetchError);
      } else if (data) {
        setPost(data);
      }
    } catch (err: any) {
      setError("Failed to load blog post");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <section className="section">
          <div className="container-tight text-center">
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <section className="section">
          <div className="container-tight text-center">
            <h1 className="h2-display mb-4">Post not found</h1>
            <p className="text-muted-foreground mb-6">{error || "The blog post you're looking for doesn't exist."}</p>
            <Link to="/blog" className="text-accent hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <article>
        {/* Cover Image with Title Overlay */}
        <div className="aspect-[21/9] relative overflow-hidden">
          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container-tight">
              <Link to="/blog" className="text-primary-foreground/70 text-sm hover:text-accent transition-colors inline-flex items-center gap-1 mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
              <h1 className="h1-display text-primary-foreground max-w-3xl">{post.title}</h1>
              <div className="flex items-center gap-4 mt-4 text-primary-foreground/60 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.published_at).toLocaleDateString("en-IN", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.reading_time}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="section">
          <div className="container-tight">
            <AnimatedSection>
              {/* HTML Content from Editor */}
              <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-accent prose-a:underline prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground prose-img:rounded-lg prose-img:border prose-img:border-border">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Mandatory Disclaimer */}
              <div className="mt-12 max-w-3xl mx-auto bg-secondary/50 border border-accent/20 rounded-2xl p-6 md:p-8">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">📋 Important Disclaimer:</strong> This article is for educational purposes only and does not constitute financial advice, investment recommendation, or a solicitation to buy or sell any security. Mutual Fund investments are subject to market risks, including loss of principal. Past performance is not indicative of future results. Please read all scheme documents, Key Information Documents (KID), and SAI before investing. All recommendations should be made only after proper risk profiling and assessment of suitability by a qualified professional. For personalized advice, consult an AMFI-registered Mutual Fund Distributor or SEBI-registered Investment Adviser.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default BlogPost;
