import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart, Umbrella, GraduationCap } from "lucide-react";

const plans = [
  { icon: Shield, title: "Term Life Insurance", description: "Pure protection at affordable premiums. Secure your family's financial future with high sum assured." },
  { icon: Heart, title: "Health Insurance", description: "Comprehensive health coverage for individuals and families. Cashless treatment at 10,000+ hospitals." },
  { icon: Umbrella, title: "Endowment Plans", description: "Savings with protection. Get guaranteed maturity benefits along with life cover throughout the policy term." },
  { icon: GraduationCap, title: "Child Plans", description: "Secure your child's education and future milestones with dedicated investment-cum-insurance plans." },
];

const Insurance = () => {
  return (
    <Layout>
      <section className="section-padding bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Insurance</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
              Protect What <span className="text-gradient-gold">Matters Most</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              Comprehensive insurance solutions to safeguard your family and secure every milestone of life.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.map((plan, i) => (
              <AnimatedSection key={plan.title} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                    <plan.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-display">{plan.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{plan.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.3}>
            <div className="text-center mt-14">
              <Link to="/book-session">
                <Button variant="hero" size="xl">
                  Get Insurance Advice <ArrowRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Insurance;
