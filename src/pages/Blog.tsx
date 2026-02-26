import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase, BlogPost } from "@/lib/supabase";

// Fallback data if Supabase is not available
const fallbackBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "risk-profiling-mutual-funds",
    title: "What Is Risk Profiling in Mutual Funds?",
    excerpt: "Understand the importance of risk profiling and how it helps determine the right mutual fund investments for your financial goals.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
    published_at: "2024-12-15",
    reading_time: "5 min read",
  },
  {
    id: "2",
    slug: "sip-vs-lumpsum-difference",
    title: "SIP vs Lumpsum: Understanding the Difference",
    excerpt: "Learn the key differences between Systematic Investment Plans (SIP) and lumpsum investments to choose the right approach for your portfolio.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    published_at: "2024-11-28",
    reading_time: "7 min read",
  },
  {
    id: "3",
    slug: "elss-tax-saving",
    title: "How ELSS Helps in Tax Saving Under Section 80C",
    excerpt: "Discover how Equity Linked Savings Schemes (ELSS) can provide tax benefits while building long-term wealth.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf35f?w=800&auto=format&fit=crop",
    published_at: "2024-11-20",
    reading_time: "6 min read",
  },
];

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(fallbackBlogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) {
        console.log("Supabase fetch note:", error.message);
        setBlogPosts(fallbackBlogPosts);
      } else if (data && data.length > 0) {
        setBlogPosts(data);
      } else {
        setBlogPosts(fallbackBlogPosts);
      }
    } catch (error) {
      console.log("Using fallback blog posts");
      setBlogPosts(fallbackBlogPosts);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="section-lg bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="label-uppercase text-accent mb-3">Insights</p>
            <h1 className="h1-display mb-6">
              Educational <span className="text-gradient-gold">Content</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              Stay informed with educational articles on mutual fund investments, goal-based investing, and investment strategies.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <div className="card-grid gap-lg">
            {blogPosts.map((post, i) => (
              <AnimatedSection key={post.id} delay={i * 0.1}>
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Clock className="w-3 h-3" />
                        <span>{post.reading_time}</span>
                        <span>·</span>
                        <span>{new Date(post.published_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 font-display group-hover:text-accent transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                      <p className="text-accent text-sm font-medium mt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-3 h-3" />
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Guide CTA */}
      <section className="section-lg bg-secondary">
        <div className="container-tight">
          <AnimatedSection>
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-accent/20 flex flex-col md:flex-row gap-lg items-center justify-between">
              <div className="md:flex-1">
                <div className="flex gap-3 mb-4 items-center">
                  <BookOpen className="w-6 h-6 text-accent" />
                  <h3 className="h3-display">Want to Understand Mutual Fund Taxation?</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Learn about tax rates for equity funds, debt funds, capital gains taxation, and smart tax-saving strategies. 
                  Our comprehensive tax guide covers everything you need to know about mutual fund taxation in India.
                </p>
              </div>
              <Link to="/tax-regime">
                <Button variant="gold" size="lg" className="whitespace-nowrap">
                  Read Tax Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
