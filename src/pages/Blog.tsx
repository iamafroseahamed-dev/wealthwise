import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowRight, Clock } from "lucide-react";
import { supabase, BlogPost } from "@/lib/supabase";

// Fallback data if Supabase is not available
const fallbackBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "power-of-sip",
    title: "The Power of SIP: How ₹5,000/Month Can Build a Crore",
    excerpt: "Discover how systematic investment plans leverage compounding to turn small monthly investments into significant wealth over time.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop",
    published_at: "2024-12-15",
    reading_time: "5 min read",
  },
  {
    id: "2",
    slug: "tax-saving-elss",
    title: "ELSS vs PPF vs FD: Which Tax Saving Option Is Best?",
    excerpt: "A comprehensive comparison of popular Section 80C investment options to help you make the smartest tax-saving decision.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop",
    published_at: "2024-11-28",
    reading_time: "7 min read",
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
      <section className="section-padding bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Blog</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Insights & <span className="text-gradient-gold">Knowledge</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              Stay informed with expert articles on investments, insurance, and personal finance.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </Layout>
  );
};

export default Blog;
