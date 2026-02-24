import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, PiggyBank, TrendingUp, Clock } from "lucide-react";

const fundTypes = [
  { icon: TrendingUp, title: "Systematic Investment Plans (SIPs)", description: "Invest a fixed amount regularly to build disciplined investing habits, participate in long-term market growth, and harness the power of compounding and rupee cost averaging." },
  { icon: Clock, title: "ELSS (Tax Saving)", description: "Equity Linked Savings Schemes provide tax benefits under Section 80C with a 3-year lock-in period while primarily investing in equities for long-term wealth creation." },
  { icon: BarChart3, title: "Goal-Based Investments", description: "Mutual fund investments for specific goals like retirement corpus accumulation, children's education, home purchase, and wealth creation based on suitability assessment." },
  { icon: PiggyBank, title: "Lumpsum Investments", description: "Deploy surplus funds into suitable mutual fund schemes based on your risk profile, investment horizon, and financial goals." },
];

const MutualFunds = () => {
  return (
    <Layout>
      <section className="section-padding bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Mutual Funds</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
              Invest Smart, <span className="text-gradient-gold">Grow Steady</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              Choose from a wide range of mutual funds curated to match your risk profile and financial goals.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Fund Categories</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fundTypes.map((fund, i) => (
              <AnimatedSection key={fund.title} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300">
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

      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <AnimatedSection>
            <div className="bg-card rounded-2xl p-10 md:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Portfolio Review & Rebalancing</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Periodic portfolio reviews ensure your mutual fund investments remain aligned with your financial goals. We assess suitability and suggest changes if required to keep you on track.
                  </p>
                  <div className="space-y-3">
                    {["Assess alignment with goals", "Review suitability", "Suggest changes if needed", "Stay on track"].map((item) => (
                      <p key={item} className="flex items-center gap-3 text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <Link to="/book-session">
                    <Button variant="hero" size="xl">
                      Start Your SIP Today <ArrowRight className="w-5 h-5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <AnimatedSection>
            <div className="bg-secondary rounded-2xl p-8 md:p-12 border border-accent/10">
              <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Regulatory Compliance</p>
              <h2 className="text-2xl font-bold mb-6">Risk Profiling & Suitability Assessment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
