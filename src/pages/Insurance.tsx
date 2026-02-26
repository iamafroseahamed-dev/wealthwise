import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { AlertCircle, Heart, Shield, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Insurance = () => {
  return (
    <Layout>
      <section className="section-padding-lg bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Insurance Protection</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
              Protect Your Family. <span className="text-gradient-gold">Secure What You've Built.</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              Understanding insurance and finding the right protection is crucial for your family's financial security.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight max-w-4xl">
          <AnimatedSection>
            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6 md:p-8 flex gap-4 mb-12">
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2">Important Disclaimer</h3>
                <p className="text-muted-foreground text-sm">
                  This section provides educational information about insurance products. We are AMFI-Registered Mutual Fund Distributors. We do NOT provide insurance products or services. For insurance needs, please consult a qualified IRDA-registered Insurance Agent or Insurance Advisor.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Why Insurance Matters</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Insurance serves as a financial safety net for your family, protecting them against unexpected events that could impact your wealth and savings. While you focus on building wealth through smart investments, insurance ensures your family is protected if you're unexpectedly unable to provide for them.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {[
                    { icon: Heart, title: "Family Protection", desc: "Ensures your family's financial security and lifestyle is maintained" },
                    { icon: Shield, title: "Wealth Protection", desc: "Protects the wealth and assets you've built from unexpected events" },
                    { icon: Users, title: "Liabilities Coverage", desc: "Covers potential legal and financial liabilities you might face" },
                  ].map((item, i) => (
                    <div key={i} className="bg-card p-6 rounded-xl border border-border">
                      <item.icon className="w-8 h-8 text-accent mb-3" />
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h2 className="text-3xl font-bold mb-4">Types of Insurance</h2>
                <div className="space-y-6">
                  <div className="bg-secondary rounded-xl p-8">
                    <h3 className="text-2xl font-bold mb-3">Term Life Insurance</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Term life insurance provides maximum coverage at the lowest premium. It pays a lump sum (death benefit) to your family if you pass away during the coverage period. It's ideal for individuals with dependents who rely on your income.
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Suitable for:</strong> Individuals with dependent family members, outstanding loans, or financial obligations</p>
                      <p><strong className="text-foreground">Duration:</strong> Typically 10, 20, or 30 years</p>
                      <p><strong className="text-foreground">Benefit:</strong> Affordable premiums with high coverage amounts</p>
                    </div>
                  </div>

                  <div className="bg-secondary rounded-xl p-8">
                    <h3 className="text-2xl font-bold mb-3">Health Insurance</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Health insurance covers medical expenses from hospitalization, treatment, and preventive care. It protects you and your family from unexpected healthcare costs that could deplete your savings.
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Coverage includes:</strong> Hospitalization, treatment, surgery, diagnostic tests, and preventive care</p>
                      <p><strong className="text-foreground">Types:</strong> Individual plans, family floaters, and group policies</p>
                      <p><strong className="text-foreground">Benefit:</strong> Protects your wealth from medical emergencies</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h2 className="text-3xl font-bold mb-6">How to Get Insurance</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  While we specialize in mutual fund distribution, we encourage you to explore insurance options suited to your needs:
                </p>
                <div className="space-y-4">
                  {[
                    "Consult a IRDA-registered Insurance Agent or Advisor",
                    "Compare different insurers and policy options",
                    "Understand coverage, exclusions, and premium rates",
                    "Choose a policy that matches your financial situation and goals",
                    "Ensure regular policy reviews to maintain adequate coverage",
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                        {i + 1}
                      </span>
                      <p className="text-muted-foreground pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <AnimatedSection>
            <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
              <h2 className="text-2xl font-bold mb-6">Combining Insurance & Investments</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                While you protect your family with insurance, you can simultaneously build wealth through mutual fund investments. This two-pronged approach ensures financial security and wealth creation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold mb-3 text-accent">Insurance Provides:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="text-accent">→</span> Emergency financial protection</li>
                    <li className="flex gap-2"><span className="text-accent">→</span> Family security and peace of mind</li>
                    <li className="flex gap-2"><span className="text-accent">→</span> Protection against unexpected liabilities</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-3 text-accent">Mutual Funds Provide:</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2"><span className="text-accent">→</span> Long-term wealth creation</li>
                    <li className="flex gap-2"><span className="text-accent">→</span> Goal-based investing opportunities</li>
                    <li className="flex gap-2"><span className="text-accent">→</span> Disciplined wealth accumulation</li>
                  </ul>
                </div>
              </div>
              <div className="text-center">
                <Link to="/book-session">
                  <Button variant="hero" size="lg">
                    Let's Discuss Your Goals <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Insurance;
