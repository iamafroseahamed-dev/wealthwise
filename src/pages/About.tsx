import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Award, Heart, Eye, Users } from "lucide-react";

const values = [
  { icon: Heart, title: "Integrity", description: "We prioritize your interests above all. Transparent advice with zero hidden costs." },
  { icon: Eye, title: "Clarity", description: "Complex financial concepts made simple. You always know where your money goes." },
  { icon: Award, title: "Excellence", description: "Continuous learning and research to deliver the best strategies for your portfolio." },
  { icon: Users, title: "Partnership", description: "We're not just advisors — we're your long-term financial partners." },
];

const About = () => {
  return (
    <Layout>
      <section className="section-padding bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">About Us</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
              Your Trusted Partner in <span className="text-gradient-gold">Wealth Creation</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              With over a decade of experience, we help families and individuals navigate the world of investments with confidence and clarity.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  WealthWise was founded with a simple mission: to make quality financial guidance accessible to everyone. 
                  As an AMFI Registered Mutual Fund Distributor, we bring institutional-grade expertise to individual investors.
                </p>
                <p>
                  We believe that wealth creation is not about timing the market — it's about time in the market. 
                  Our disciplined approach focuses on goal-based investing, regular portfolio reviews, and long-term wealth accumulation.
                </p>
                <p>
                  Every recommendation we make is backed by thorough research and aligned with your unique financial situation, risk tolerance, and life goals.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-secondary rounded-2xl p-10">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { num: "10+", label: "Years Experience" },
                    { num: "500+", label: "Happy Families" },
                    { num: "₹50Cr+", label: "AUM Managed" },
                    { num: "100%", label: "Transparency" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl font-bold text-gradient-gold font-display">{stat.num}</p>
                      <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="container-tight">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Our Values</p>
              <h2 className="text-3xl md:text-5xl font-bold">What Drives Us</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="bg-card p-8 rounded-2xl text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-display">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
