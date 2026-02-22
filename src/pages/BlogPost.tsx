import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

// Placeholder — will be replaced with Supabase data
const posts: Record<string, { title: string; content: string; cover_image: string; published_at: string; reading_time: string }> = {
  "power-of-sip": {
    title: "The Power of SIP: How ₹5,000/Month Can Build a Crore",
    cover_image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop",
    published_at: "2024-12-15",
    reading_time: "5 min read",
    content: `
Systematic Investment Plans (SIPs) are one of the most powerful tools for wealth creation available to everyday investors. By investing a fixed amount regularly, you harness two incredible forces: rupee cost averaging and the power of compounding.

## The Magic of Compounding

Albert Einstein reportedly called compound interest the eighth wonder of the world. When your returns start generating their own returns, the growth becomes exponential over time.

Consider this: investing ₹5,000 per month in an equity mutual fund averaging 12% annual returns could grow to approximately ₹1 crore in about 20 years. That's the power of disciplined, long-term investing.

## Why SIP Works

**Rupee Cost Averaging:** When markets are down, your fixed SIP amount buys more units. When markets are up, it buys fewer. Over time, this averages out your purchase cost and reduces the impact of market volatility.

**Discipline:** SIP automates your investment habit. You don't need to time the market or make emotional decisions. The process works in the background while you focus on your life.

**Accessibility:** You can start a SIP with as little as ₹500 per month. This makes quality investment accessible to virtually everyone.

## Getting Started

The best time to start a SIP was years ago. The second best time is today. Contact us to find the right mutual funds for your goals and begin your wealth-building journey.
    `,
  },
  "tax-saving-elss": {
    title: "ELSS vs PPF vs FD: Which Tax Saving Option Is Best?",
    cover_image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop",
    published_at: "2024-11-28",
    reading_time: "7 min read",
    content: `
When it comes to saving taxes under Section 80C, investors are often confused between ELSS mutual funds, Public Provident Fund (PPF), and Tax-Saving Fixed Deposits. Let's break down each option.

## ELSS (Equity Linked Savings Scheme)

ELSS funds invest primarily in equities and have the shortest lock-in period among 80C options — just 3 years. They offer the potential for highest returns but come with market-linked risks.

## PPF (Public Provident Fund)

PPF is a government-backed savings scheme with a 15-year lock-in period. It offers guaranteed, tax-free returns currently around 7.1% per annum. It's ideal for risk-averse investors.

## Tax-Saving FDs

These are fixed deposits with a 5-year lock-in period. They offer guaranteed returns, but the interest earned is taxable, making the effective returns lower than PPF.

## The Verdict

For long-term wealth creation with tax benefits, ELSS is the clear winner. For guaranteed, risk-free returns, PPF is excellent. Tax-saving FDs should generally be the last resort due to taxable returns and average interest rates.

The ideal strategy? A combination based on your risk appetite and financial goals. Talk to us to create your personalized tax-saving plan.
    `,
  },
  "health-insurance-guide": {
    title: "Health Insurance in 2025: A Complete Buying Guide",
    cover_image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop",
    published_at: "2024-11-10",
    reading_time: "6 min read",
    content: `
Medical inflation in India is rising at 14% annually, making health insurance not just important but essential. Here's everything you need to know about buying the right health insurance in 2025.

## How Much Coverage Do You Need?

A good rule of thumb is to have coverage of at least 10x your monthly income. For a family in a metro city, a minimum of ₹10 lakh coverage is recommended.

## Key Features to Look For

**Cashless Network:** Ensure the insurer has a wide network of cashless hospitals in your city.

**No Room Rent Capping:** Choose plans without sub-limits on room rent to avoid unexpected out-of-pocket expenses.

**Pre and Post Hospitalization:** Good plans cover expenses 30-60 days before and 60-180 days after hospitalization.

## Individual vs Family Floater

Family floater plans cover your entire family under a single sum insured, making them more cost-effective than individual plans for families.

## The Bottom Line

Don't wait for a medical emergency to realize the importance of health insurance. The younger and healthier you are when you buy, the lower your premiums will be.
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? posts[slug] : null;

  if (!post) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-tight text-center">
            <h1 className="text-3xl font-bold mb-4">Post not found</h1>
            <Link to="/blog" className="text-accent hover:underline">← Back to Blog</Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <article>
        <div className="aspect-[21/9] relative overflow-hidden">
          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container-tight">
              <Link to="/blog" className="text-primary-foreground/70 text-sm hover:text-accent transition-colors inline-flex items-center gap-1 mb-4">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground max-w-3xl">{post.title}</h1>
              <div className="flex items-center gap-4 mt-4 text-primary-foreground/60 text-sm">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(post.published_at).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.reading_time}</span>
              </div>
            </div>
          </div>
        </div>

        <section className="section-padding">
          <div className="container-tight">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-accent">
                {post.content.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("## ")) {
                    return <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-foreground">{paragraph.replace("## ", "")}</h2>;
                  }
                  if (paragraph.startsWith("**") && paragraph.includes(":**")) {
                    const parts = paragraph.split(":**");
                    return (
                      <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                        <strong className="text-foreground">{parts[0].replace(/\*\*/g, "")}:</strong>{parts[1]}
                      </p>
                    );
                  }
                  return paragraph.trim() ? <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p> : null;
                })}
              </div>
            </AnimatedSection>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default BlogPost;
