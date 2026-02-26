import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, ArrowRight } from "lucide-react";

const products = [
  {
    icon: TrendingUp,
    title: "Mutual Fund Distribution",
    description: "We assist investors in selecting suitable mutual fund schemes based on their risk profile and financial goals through proper suitability assessment.",
    features: ["Goal-Based SIPs", "Lumpsum Investments", "ELSS (Tax Saving)", "Risk Profiling", "Portfolio Review", "After-Sales Support"],
    link: "/mutual-funds",
  },
  {
    icon: Shield,
    title: "Our Scope & Limitations",
    description: "As an AMFI-Registered Mutual Fund Distributor, our services are limited to mutual fund distribution only. View compliance details and scope.",
    features: ["Mutual Funds Only", "Incidental Advice", "Proper Risk Assessment", "Suitability Check", "NO Financial Planning", "NO Insurance Products"],
    link: "/insurance",
  },
];

const Products = () => {
  return (
    <Layout>
      <section className="section-lg bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="label-uppercase text-accent mb-3">Mutual Fund Solutions</p>
            <h1 className="h1-display mb-6 max-w-3xl">
              Our Services for <span className="text-gradient-gold">Every Goal</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              We assist investors across India in selecting suitable mutual fund schemes aligned with their financial goals and risk appetite.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section">
        <div className="container-tight">
          <div className="card-grid-2 gap-lg">
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
