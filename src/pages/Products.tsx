import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, ArrowRight } from "lucide-react";

const products = [
  {
    icon: TrendingUp,
    title: "Mutual Funds",
    description: "Diversified investment solutions across equity, debt, and hybrid categories. Start with as low as ₹500/month through SIP.",
    features: ["Equity Funds", "Debt Funds", "Hybrid Funds", "ELSS (Tax Saving)", "Index Funds", "SIP & Lump Sum"],
    link: "/mutual-funds",
  },
  {
    icon: Shield,
    title: "Insurance",
    description: "Protect what matters most. Comprehensive life and health insurance solutions for complete peace of mind.",
    features: ["Term Life Insurance", "Health Insurance", "ULIPs", "Endowment Plans", "Child Plans", "Pension Plans"],
    link: "/insurance",
  },
];

const Products = () => {
  return (
    <Layout>
      <section className="section-padding bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Our Products</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
              Solutions Designed for <span className="text-gradient-gold">Every Goal</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              From wealth creation to wealth protection, we offer a comprehensive suite of financial products.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product, i) => (
              <AnimatedSection key={product.title} delay={i * 0.15}>
                <div className="border border-border rounded-2xl p-8 md:p-10 bg-card hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    <product.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 font-display">{product.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-8 flex-1">
                    {product.features.map((f) => (
                      <p key={f} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {f}
                      </p>
                    ))}
                  </div>
                  <Link to={product.link}>
                    <Button variant="default" className="w-full">
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
