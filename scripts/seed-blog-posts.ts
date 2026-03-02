import { supabase } from '../src/lib/supabase';

/**
 * Seed script to add the first blog post
 * Run this once to populate the database with the mutual fund blog post
 * 
 * Execute with: npx ts-node scripts/seed-blog-posts.ts
 */

const mutualFundBlogPost = {
  slug: 'why-mutual-funds-work-rain-or-shine',
  title: 'Why Mutual Funds Work — Rain or Shine',
  excerpt: 'How consistent investing in mutual funds beats market timing — and why it pays regardless of where markets are headed.',
  author: 'WealthWise Team',
  reading_time: '6 min read',
  cover_image: 'https://images.unsplash.com/photo-1579532537598-3c90a1fda663?w=1200&h=600&fit=crop',
  published_at: new Date().toISOString(),
  content: `
<div style="max-width: 740px; margin: 0 auto;">

<div style="font-size: 1.22rem; font-weight: 400; line-height: 1.9; color: #333; border-left: 3px solid #c9a84c; padding-left: 24px; margin-bottom: 48px;">
  <p>Every week, someone asks: <em>"Should I wait for the market to fall before investing?"</em> It's a fair question — but it rests on a myth. The truth is, waiting for the "right" moment is one of the most expensive habits an investor can have.</p>
</div>

<p style="margin-bottom: 24px; font-size: 1.05rem;">
  Markets go up. Markets go down. That's not a flaw — it's how markets breathe. The real question isn't <em>when</em> to invest, but <em>whether</em> you're investing consistently. And that's exactly where mutual funds shine.
</p>

<h2 style="font-family: 'Playfair Display', serif; font-size: 1.65rem; font-weight: 700; color: #1a1a2e; margin: 52px 0 18px; line-height: 1.3;">
  <span style="display: block; width: 36px; height: 3px; background: #c9a84c; margin-bottom: 14px; border-radius: 2px;"></span>
  The Market Will Always Be Uncertain. That's the Point.
</h2>

<p style="margin-bottom: 24px; font-size: 1.05rem;">
  If markets moved in a straight line, everyone would be rich. The volatility that scares investors is the same volatility that creates opportunity. Mutual funds are built to work <em>within</em> this uncertainty — not despite it.
</p>

<p style="margin-bottom: 24px; font-size: 1.05rem;">
  A well-managed mutual fund holds a diversified basket of assets. When one sector dips, another may rise. Your risk is spread across companies, industries, and sometimes even geographies. You don't need to predict what happens next — the fund's structure handles the ups and downs on your behalf.
</p>

<div style="background: #e8f5e9; border-left: 4px solid #2d6a4f; border-radius: 0 8px 8px 0; padding: 28px 32px; margin: 40px 0;">
  <p style="margin: 0; color: #1b4332; font-weight: 400; font-size: 1.05rem;">
    <strong>The key insight:</strong> Diversification doesn't eliminate risk — it <strong>manages it intelligently</strong>. Owning 40–80 stocks through a single fund means no single bad day, bad stock, or bad headline can wipe out your investment.
  </p>
</div>

<h2 style="font-family: 'Playfair Display', serif; font-size: 1.65rem; font-weight: 700; color: #1a1a2e; margin: 52px 0 18px; line-height: 1.3;">
  <span style="display: block; width: 36px; height: 3px; background: #c9a84c; margin-bottom: 14px; border-radius: 2px;"></span>
  The Magic of SIP: Consistent Beats Lucky
</h2>

<p style="margin-bottom: 24px; font-size: 1.05rem;">
  A Systematic Investment Plan (SIP) is simply the practice of investing a fixed amount in a mutual fund every month — regardless of market conditions. Think of it as a monthly habit, like a gym membership, but for your wealth.
</p>

<p style="margin-bottom: 24px; font-size: 1.05rem;">
  Here's why it works even when markets are falling: when prices drop, your fixed monthly amount buys <em>more units</em>. When prices rise, those extra units become more valuable. Over time, this averaging effect — called <strong>rupee cost averaging</strong> — means your average buying price stays lower than you'd expect.
</p>

<div style="background: #fff; border: 1px solid #e5e0d8; border-radius: 10px; padding: 36px 32px; margin: 40px 0;">
  <h3 style="font-family: 'Playfair Display', serif; font-size: 1.1rem; margin-bottom: 24px; color: #1a1a2e;">📊 SIP in Action: ₹5,000/month over 10 years</h3>
  
  <div style="margin-bottom: 16px;">
    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #6b6560; margin-bottom: 6px;">
      <span>Total Amount Invested</span>
      <span>₹6,00,000</span>
    </div>
    <div style="height: 10px; border-radius: 99px; background: #e5e0d8; overflow: hidden;">
      <div style="height: 100%; width: 55%; background: #a8d5c2; border-radius: 99px;"></div>
    </div>
  </div>
  
  <div style="margin-bottom: 16px;">
    <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: #6b6560; margin-bottom: 6px;">
      <span>Estimated Value (at 12% p.a.)<sup style="color: #c9a84c; font-size: 0.75em;">*</sup></span>
      <span>₹11,61,695</span>
    </div>
    <div style="height: 10px; border-radius: 99px; background: #e5e0d8; overflow: hidden;">
      <div style="height: 100%; width: 100%; background: #c9a84c; border-radius: 99px;"></div>
    </div>
  </div>
  
  <div style="display: flex; gap: 20px; margin-top: 20px; font-size: 0.82rem; color: #6b6560;">
    <span style="display: flex; align-items: center; gap: 6px;">
      <span style="width: 10px; height: 10px; border-radius: 50%; background: #a8d5c2; display: inline-block;"></span>
      Amount Invested
    </span>
    <span style="display: flex; align-items: center; gap: 6px;">
      <span style="width: 10px; height: 10px; border-radius: 50%; background: #c9a84c; display: inline-block;"></span>
      Estimated Wealth (Illustrative)
    </span>
  </div>
  
  <div style="font-size: 0.82rem; color: #7a5c00; background: #fffde7; border: 1px solid #ffe082; border-radius: 6px; padding: 10px 16px; margin-top: 12px; line-height: 1.6;">
    <strong>* Important Assumption:</strong> The 12% p.a. return used above is purely illustrative and based on the historical long-term average performance of diversified equity mutual funds in India. It is <em>not</em> a guaranteed or promised return. Actual returns may be higher or lower depending on market conditions, fund selection, and investment period. <strong>Past performance does not guarantee future results.</strong> This illustration is for educational purposes only and should not be construed as investment advice.
  </div>
  
  <div style="font-size: 0.78rem; color: #6b6560; margin-top: 14px; font-style: italic; border-top: 1px dashed #e0dbd4; padding-top: 12px;">
    SIP does not assure a profit or guarantee protection against loss in declining markets. Investors should consider their risk appetite and investment horizon before investing.
  </div>
</div>

<p style="margin-bottom: 24px; font-size: 1.05rem;">
  The ₹5,61,695 in returns above? That's not from picking the perfect stock. It's from simply <em>showing up</em> every month — in bull markets and bear markets alike.
</p>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin: 40px 0;">
  <div style="background: #1a1a2e; color: #fff; border-radius: 8px; padding: 28px 22px; text-align: center;">
    <span style="font-family: 'Playfair Display', serif; font-size: 2.4rem; color: #c9a84c; display: block;">₹500</span>
    <span style="font-size: 0.8rem; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.6; margin-top: 6px; display: block;">Minimum SIP amount to get started</span>
  </div>
  <div style="background: #1a1a2e; color: #fff; border-radius: 8px; padding: 28px 22px; text-align: center;">
    <span style="font-family: 'Playfair Display', serif; font-size: 2.4rem; color: #c9a84c; display: block;">10 Yrs</span>
    <span style="font-size: 0.8rem; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.6; margin-top: 6px; display: block;">Longer horizon — greater potential</span>
  </div>
  <div style="background: #1a1a2e; color: #fff; border-radius: 8px; padding: 28px 22px; text-align: center;">
    <span style="font-family: 'Playfair Display', serif; font-size: 2.4rem; color: #c9a84c; display: block;">12%<sup style="font-size: 1rem;">*</sup></span>
    <span style="font-size: 0.8rem; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.6; margin-top: 6px; display: block;">Historical average rate</span>
  </div>
</div>

<h2 style="font-family: 'Playfair Display', serif; font-size: 1.65rem; font-weight: 700; color: #1a1a2e; margin: 52px 0 18px; line-height: 1.3;">
  <span style="display: block; width: 36px; height: 3px; background: #c9a84c; margin-bottom: 14px; border-radius: 2px;"></span>
  Why Mutual Funds Win in a Down Market Too
</h2>

<p style="margin-bottom: 24px; font-size: 1.05rem;">
  Counter-intuitive as it sounds, a falling market is one of the best times to be investing through SIP. Here's a simple analogy: imagine mangoes are on sale. You'd buy more, right? That's exactly what SIP does when markets fall — it quietly buys more units at lower prices, setting you up for better gains when the market recovers.
</p>

<blockquote style="font-family: 'Playfair Display', serif; font-size: 1.35rem; font-style: italic; color: #1a1a2e; text-align: center; padding: 40px 24px; position: relative; line-height: 1.6;">
  <span style="content: '\\201C'; font-size: 5rem; color: #c9a84c; opacity: 0.3; position: absolute; top: 0; left: 50%; transform: translateX(-50%); line-height: 1;"></span>
  "The stock market is a device for transferring money from the impatient to the patient."<br>
  <small style="font-size: 0.75rem; letter-spacing: 2px; opacity: 0.5;">— Warren Buffett</small>
</blockquote>

<p style="margin-bottom: 24px; font-size: 1.05rem;">
  Patience is built into SIP by design. You automate the decision, remove emotion from the equation, and let compounding do its quiet, powerful work.
</p>

<h2 style="font-family: 'Playfair Display', serif; font-size: 1.65rem; font-weight: 700; color: #1a1a2e; margin: 52px 0 18px; line-height: 1.3;">
  <span style="display: block; width: 36px; height: 3px; background: #c9a84c; margin-bottom: 14px; border-radius: 2px;"></span>
  6 Reasons to Start — Whatever the Market is Doing
</h2>

<ol style="list-style: none; margin: 24px 0 40px; padding: 0;">
  <li style="display: flex; gap: 18px; padding: 20px 0; border-bottom: 1px solid #e5e0d8; align-items: flex-start;">
    <div style="font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #c9a84c; opacity: 0.5; min-width: 36px; line-height: 1; padding-top: 4px;">01</div>
    <div>
      <strong style="display: block; font-size: 1rem; font-weight: 600; margin-bottom: 4px; color: #1a1a2e;">Professional Management</strong>
      <p style="font-size: 0.95rem; color: #6b6560; margin: 0; line-height: 1.7;">Expert fund managers research, select, and rebalance your portfolio. You get institutional-grade investing without needing to be an expert yourself.</p>
    </div>
  </li>
  
  <li style="display: flex; gap: 18px; padding: 20px 0; border-bottom: 1px solid #e5e0d8; align-items: flex-start;">
    <div style="font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #c9a84c; opacity: 0.5; min-width: 36px; line-height: 1; padding-top: 4px;">02</div>
    <div>
      <strong style="display: block; font-size: 1rem; font-weight: 600; margin-bottom: 4px; color: #1a1a2e;">Rupee Cost Averaging</strong>
      <p style="font-size: 0.95rem; color: #6b6560; margin: 0; line-height: 1.7;">Investing regularly means you automatically buy more when markets are low and less when they're high — reducing your average cost over time.</p>
    </div>
  </li>
  
  <li style="display: flex; gap: 18px; padding: 20px 0; border-bottom: 1px solid #e5e0d8; align-items: flex-start;">
    <div style="font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #c9a84c; opacity: 0.5; min-width: 36px; line-height: 1; padding-top: 4px;">03</div>
    <div>
      <strong style="display: block; font-size: 1rem; font-weight: 600; margin-bottom: 4px; color: #1a1a2e;">Power of Compounding</strong>
      <p style="font-size: 0.95rem; color: #6b6560; margin: 0; line-height: 1.7;">Returns generate their own returns. The longer you stay invested, the more exponentially your wealth can grow — time is your greatest asset.</p>
    </div>
  </li>
  
  <li style="display: flex; gap: 18px; padding: 20px 0; border-bottom: 1px solid #e5e0d8; align-items: flex-start;">
    <div style="font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #c9a84c; opacity: 0.5; min-width: 36px; line-height: 1; padding-top: 4px;">04</div>
    <div>
      <strong style="display: block; font-size: 1rem; font-weight: 600; margin-bottom: 4px; color: #1a1a2e;">Liquidity & Flexibility</strong>
      <p style="font-size: 0.95rem; color: #6b6560; margin: 0; line-height: 1.7;">Most open-ended mutual funds can be redeemed whenever you need, giving you access to your money without long lock-in periods.</p>
    </div>
  </li>
  
  <li style="display: flex; gap: 18px; padding: 20px 0; border-bottom: 1px solid #e5e0d8; align-items: flex-start;">
    <div style="font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #c9a84c; opacity: 0.5; min-width: 36px; line-height: 1; padding-top: 4px;">05</div>
    <div>
      <strong style="display: block; font-size: 1rem; font-weight: 600; margin-bottom: 4px; color: #1a1a2e;">Accessibility</strong>
      <p style="font-size: 0.95rem; color: #6b6560; margin: 0; line-height: 1.7;">Start with as little as ₹500/month. No need for large lump sums — mutual funds democratize wealth creation for every income level.</p>
    </div>
  </li>
  
  <li style="display: flex; gap: 18px; padding: 20px 0; border-bottom: none; align-items: flex-start;">
    <div style="font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; color: #c9a84c; opacity: 0.5; min-width: 36px; line-height: 1; padding-top: 4px;">06</div>
    <div>
      <strong style="display: block; font-size: 1rem; font-weight: 600; margin-bottom: 4px; color: #1a1a2e;">Tax Efficiency</strong>
      <p style="font-size: 0.95rem; color: #6b6560; margin: 0; line-height: 1.7;">ELSS funds offer tax deductions under Section 80C. Long-term capital gains on equity funds are taxed at 12.5% for gains above ₹1.25 lakh per year. Tax laws are subject to change — please consult a tax advisor for personalised guidance.</p>
    </div>
  </li>
</ol>

<div style="width: 60px; height: 2px; background: #c9a84c; margin: 48px auto; opacity: 0.4; border-radius: 2px;"></div>

<h2 style="font-family: 'Playfair Display', serif; font-size: 1.65rem; font-weight: 700; color: #1a1a2e; margin: 52px 0 18px; line-height: 1.3;">
  <span style="display: block; width: 36px; height: 3px; background: #c9a84c; margin-bottom: 14px; border-radius: 2px;"></span>
  The Real Risk Is Waiting
</h2>

<p style="margin-bottom: 24px; font-size: 1.05rem;">
  Many people wait for the "perfect" time to invest. Historically, this strategy has one consistent outcome: missed returns. Studies repeatedly show that missing just the 10 best market days in a decade can cut your overall return by more than half.
</p>

<p style="margin-bottom: 24px; font-size: 1.05rem;">
  The market rewards those who participate — consistently, patiently, and without trying to outsmart every news headline. Mutual funds, and especially SIP, are the simplest vehicle for doing exactly that.
</p>

<p style="margin-bottom: 24px; font-size: 1.05rem;">
  You don't need to predict the market. You don't need to time it. You just need to start — and keep going.
</p>

<div style="background: #1a1a2e; color: #fff; border-radius: 12px; padding: 48px 40px; text-align: center; margin-top: 64px;">
  <h3 style="font-family: 'Playfair Display', serif; font-size: 1.6rem; margin-bottom: 12px; color: #c9a84c;">Ready to Start Your SIP Journey?</h3>
  <p style="color: rgba(255,255,255,0.65); font-size: 1rem; margin-bottom: 28px;">Even ₹500 a month, invested consistently, builds into something remarkable over time. The best day to start was yesterday. The second best day is today.</p>
  <a href="#" style="display: inline-block; background: #c9a84c; color: #1a1a2e; font-weight: 600; font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase; padding: 14px 32px; border-radius: 4px; text-decoration: none; transition: opacity 0.2s;">Start Investing →</a>
</div>

<div style="background: #f5f5f5; border-top: 2px solid #ccc; padding: 32px; margin-top: 32px;">
  <div style="max-width: 740px; margin: 0 auto;">
    <div style="display: inline-block; font-weight: 700; font-size: 0.78rem; letter-spacing: 1.5px; text-transform: uppercase; color: #333; background: #e0e0e0; padding: 3px 10px; border-radius: 3px; margin-bottom: 12px;">📋 Statutory Disclaimer & Risk Disclosures</div>

    <p style="font-size: 0.82rem; color: #555; line-height: 1.7; margin: 0 auto; max-width: 740px; margin-bottom: 10px;">
      <strong>Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.</strong> The information contained in this blog is for general educational and informational purposes only and is not intended to constitute investment advice, a solicitation, or an offer to buy or sell any financial product or security.
    </p>

    <p style="font-size: 0.82rem; color: #555; line-height: 1.7; margin: 0 auto; max-width: 740px; margin-bottom: 10px;">
      <strong>Illustrative Returns Disclaimer:</strong> Any return figures mentioned (including the 12% p.a. example) are based on historical average performance of diversified equity mutual funds and are used solely for illustrative purposes. These figures do not represent guaranteed returns. Actual returns will vary. <em>Past performance is not indicative of future results.</em>
    </p>

    <p style="font-size: 0.82rem; color: #555; line-height: 1.7; margin: 0 auto; max-width: 740px; margin-bottom: 10px;">
      <strong>SIP Disclaimer:</strong> SIP is a method of investing and does not assure a profit or protect against loss in declining markets. Rupee cost averaging and diversification do not guarantee profits or eliminate all investment risk.
    </p>

    <p style="font-size: 0.82rem; color: #555; line-height: 1.7; margin: 0 auto; max-width: 740px; margin-bottom: 10px;">
      <strong>No Guaranteed Returns:</strong> Mutual funds do not offer guaranteed or fixed returns. The value of investments can go down as well as up.
    </p>

    <p style="font-size: 0.82rem; color: #555; line-height: 1.7; margin: 0 auto; max-width: 740px; margin-bottom: 10px;">
      <strong>Tax:</strong> Tax treatment depends on individual circumstances. Investors should consult a qualified tax advisor before investing.
    </p>

    <p style="font-size: 0.82rem; color: #555; line-height: 1.7; margin: 0 auto; max-width: 740px; margin-bottom: 10px;">
      <strong>AMFI Registration:</strong> Mutual Fund investments are distributed by AMFI-registered distributors. Verify registration at www.amfiindia.com. Register complaints at SEBI SCORES: scores.gov.in
    </p>
  </div>
</div>

</div>
  `,
};

async function seedBlogPosts() {
  try {
    console.log('🌱 Starting blog post seeding...');

    // Check if post already exists
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', mutualFundBlogPost.slug)
      .single();

    if (existing) {
      console.log('✅ Blog post already exists. Skipping...');
      return;
    }

    // Insert the new post
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([mutualFundBlogPost])
      .select();

    if (error) {
      console.error('❌ Error inserting blog post:', error);
      process.exit(1);
    }

    console.log('✅ Blog post created successfully!');
    console.log('📝 Post details:');
    console.log(`   Title: ${mutualFundBlogPost.title}`);
    console.log(`   Slug: ${mutualFundBlogPost.slug}`);
    console.log(`   Reading Time: ${mutualFundBlogPost.reading_time}`);
    console.log(`   Status: Published`);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

seedBlogPosts();
