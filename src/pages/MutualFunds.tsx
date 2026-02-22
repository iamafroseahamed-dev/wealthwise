import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, PiggyBank, TrendingUp, Clock } from "lucide-react";

const fundTypes = [
  { icon: TrendingUp, title: "Equity Funds", description: "Long-term wealth creation through diversified stock portfolios. Ideal for 5+ year horizon." },
  { icon: PiggyBank, title: "Debt Funds", description: "Stable returns with lower risk. Perfect for short to medium-term goals and capital preservation." },
  { icon: BarChart3, title: "Hybrid Funds", description: "Best of both worlds — balanced allocation between equity and debt for moderate risk appetite." },
  { icon: Clock, title: "ELSS (Tax Saving)", description: "Save taxes under Section 80C while building wealth. Shortest lock-in of just 3 years." },
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
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Why SIP is Powerful</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Systematic Investment Plans (SIP) let you invest a fixed amount regularly, harnessing the power of compounding and rupee cost averaging. Start with as little as ₹500/month.
                  </p>
                  <div className="space-y-3">
                    {["Disciplined investing habit", "Rupee cost averaging", "Power of compounding", "Start small, grow big"].map((item) => (
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
    </Layout>
  );
};

export default MutualFunds;
