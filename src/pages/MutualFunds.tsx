import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, PiggyBank, TrendingUp, Clock, BookOpen, Banknote } from "lucide-react";

const fundTypes = [
  { icon: TrendingUp, title: "Systematic Investment Plans (SIPs)", description: "Invest a fixed amount regularly to build disciplined investing habits, participate in long-term market growth, and harness the power of compounding and rupee cost averaging." },
  { icon: Clock, title: "ELSS (Tax Saving)", description: "Equity Linked Savings Schemes provide tax benefits under Section 80C with a 3-year lock-in period while primarily investing in equities for long-term wealth creation." },
  { icon: BarChart3, title: "Goal-Based Investments", description: "Mutual fund investments for specific goals like retirement corpus accumulation, children's education, home purchase, and wealth creation based on suitability assessment." },
  { icon: PiggyBank, title: "Lumpsum Investments", description: "Deploy surplus funds into suitable mutual fund schemes based on your risk profile, investment horizon, SWP and financial goals." },
  { icon: Banknote, title: "Loan Against Mutual Fund", description: "Access quick liquidity by taking a loan against your mutual fund holdings without liquidating your investments. Maintain your portfolio's growth potential while meeting immediate financial needs at competitive interest rates." },
];

const MutualFunds = () => {
  return (
    <Layout>
      <section className="section-lg bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="label-uppercase text-accent mb-3">Mutual Funds</p>
            <h1 className="h1-display mb-6 max-w-3xl">
              Invest with Purpose. <span className="text-gradient-gold">Build Wealth Over Time</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              Understand mutual funds and select suitable schemes aligned with your financial goals through proper risk profiling.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container-tight max-w-3xl">
          <AnimatedSection>
            <div className="prose prose-invert max-w-none">
              <h2 className="h2-display">What is a Mutual Fund?</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A mutual fund is an investment vehicle that pools money from multiple investors to invest in a diversified portfolio of securities such as stocks, bonds, or a mix of both. Professional fund managers manage these portfolios according to the fund's stated objectives.
                </p>
                <p>
                  <strong className="text-foreground">How it works:</strong> When you invest in a mutual fund, you receive units proportional to your investment. The fund's value fluctuates based on market performance, and you benefit from diversification without needing to pick individual stocks.
                </p>
                <p>
                  <strong className="text-foreground">Why invest in mutual funds:</strong> They offer diversification, professional management, liquidity, and accessibility to various asset classes with relatively low investment amounts compared to direct stock investing.
                </p>
                <p className="text-sm border-l-4 border-accent pl-4 py-2 bg-secondary">
                  ⚠️ <strong>Important:</strong> Mutual Fund investments are subject to market risks, including the loss of principal. Please read all scheme documents carefully before investing.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <AnimatedSection>
            <h2 className="h2-display mb-12">Fund Categories</h2>
          </AnimatedSection>
          <div className="card-grid-2">
            {fundTypes.map((fund, i) => (
              <AnimatedSection key={fund.title} delay={i * 0.1}>
                <div className="card-full group p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <fund.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-display">{fund.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{fund.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-lg bg-secondary">
        <div className="container-tight">
          <AnimatedSection>
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-accent/10 mb-8">
              <h2 className="h3-display mb-6">Understanding Risk Profiling & Risk-O-Meter</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div>
                  <h3 className="text-lg font-bold mb-3 text-accent">Risk-O-Meter</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    Every mutual fund is assigned a Risk-O-Meter rating from 1 (lowest risk) to 5 (highest risk) by AMFI. This helps investors quickly assess the volatility and risk profile of a scheme.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="flex gap-2"><span className="font-bold text-accent">1-2:</span> <span className="text-muted-foreground">Low risk - Debt-focused</span></p>
                    <p className="flex gap-2"><span className="font-bold text-accent">3:</span> <span className="text-muted-foreground">Moderate risk - Balanced</span></p>
                    <p className="flex gap-2"><span className="font-bold text-accent">4-5:</span> <span className="text-muted-foreground">High risk - Equity-focused</span></p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3 text-accent">Our Risk Profiling Process</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Assess your financial goals and investment timeline</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Evaluate your risk appetite and tolerance</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Match your risk profile with suitable fund categories</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Document your profile and recommendation rationale</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 md:p-12 border border-accent/10">
              <h2 className="h3-display mb-6">Commission Disclosure</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
                <p>
                  <strong className="text-foreground">We are compensated by AMCs:</strong> As an AMFI-registered Mutual Fund Distributor, we earn trail commission from Asset Management Companies (AMCs) on the mutual funds we distribute. This commission is paid from the scheme's expense ratio and does NOT add to your investment cost.
                </p>
                <p>
                  <strong className="text-foreground">Transparency:</strong> The exact commission varies by scheme and AMC. You can find this information in the scheme's Statement of Additional Information (SAI) or contact us directly.
                </p>
                <p>
                  <strong className="text-foreground">Your benefit:</strong> This compensation model ensures we are incentivized to help you invest optimally, as our income depends on your long-term investments.
                </p>
                <p className="border-t border-border pt-4 mt-4">
                  All scheme-related charges including expense ratio are transparent and available in the fund documents. We encourage you to review these carefully.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <AnimatedSection>
            <div className="bg-secondary rounded-2xl p-8 md:p-12 border border-accent/10">
              <p className="label-uppercase text-accent mb-3">Regulatory Compliance</p>
              <h2 className="h3-display mb-6">Risk Profiling & Suitability Assessment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div>
                  <h3 className="text-lg font-bold mb-3">Before You Invest</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span>We conduct thorough risk profiling to understand your goals and risk appetite</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span>We maintain detailed records of your risk profile for reference and compliance</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      <span>We provide only "incidental advice" based on suitability assessment</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-3">What We Don't Do</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">✗</span>
                      <span>We don't provide comprehensive financial planning</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">✗</span>
                      <span>We don't offer investment advisory services (unless separately registered)</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold mt-0.5">✗</span>
                      <span>We don't recommend schemes without knowing your risk profile</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>


    </Layout>
  );
};

export default MutualFunds;
