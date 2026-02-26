import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Award, Heart, Eye, Users } from "lucide-react";

const values = [
  { icon: Heart, title: "Integrity", description: "We prioritize your interests above all. Proper risk profiling and suitability assessment before every recommendation." },
  { icon: Eye, title: "Clarity", description: "Transparent about our role: mutual fund distribution only. We clearly communicate incidental advice vs. financial planning." },
  { icon: Award, title: "Compliance", description: "AMFI-registered operations. Regulatory compliance in all activities. Proper documentation of risk profiling and suitability." },
  { icon: Users, title: "Partnership", description: "We're mutual fund distributors committed to helping you build wealth through disciplined investing." },
];

const About = () => {
  return (
    <Layout>
      <section className="section-padding-lg bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">About Us</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
              Built on Integrity. <span className="text-gradient-gold">Guided by Your Goals.</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              As an AMFI-Registered Mutual Fund Distributor, we combine expertise, transparency, and compliance to help investors build wealth through disciplined investing.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet the Distributor</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Karthik G</strong> (ARN: 332207) is an AMFI-Registered Mutual Fund Distributor dedicated to helping investors select suitable mutual fund schemes aligned with their financial goals and risk profiles.
                </p>
                <p className="font-semibold text-foreground">
                  Core approach:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Deep understanding of your financial goals</li>
                  <li>Comprehensive risk profiling and assessment</li>
                  <li>Recommendation of suitable mutual fund schemes</li>
                  <li>Seamless transaction execution with guidance</li>
                  <li>Ongoing after-sales support and portfolio reviews</li>
                </ul>
                <p>
                  We serve salaried professionals, small business owners, young investors, and retirees across India. Our recommendations are always made after assessing suitability and are limited to mutual fund schemes, in compliance with AMFI and SEBI guidelines.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-secondary rounded-2xl p-10">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { num: "332207", label: "ARN Number" },
                    { num: "AMFI", label: "Registered with" },
                    { num: "MF", label: "Specialization" },
                    { num: "Pan-India", label: "Coverage" },
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

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="text-2xl font-bold mb-4 text-accent">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To empower Indian investors with reliable, compliant, and transparent mutual fund distribution services, helping them achieve their financial goals through disciplined, goal-based investing.
                </p>
              </div>
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h3 className="text-2xl font-bold mb-4 text-accent">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be a trusted mutual fund distributor known for integrity, transparency, and compliance, enabling thousands of families to build sustainable wealth aligned with their life goals.
                </p>
              </div>
            </div>
          </AnimatedSection>
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
      <section className="section-padding">
        <div className="container-tight">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <p className="text-accent font-medium text-sm uppercase tracking-widest mb-6">Compliance Note</p>
              <h2 className="text-3xl font-bold mb-8">Our Scope of Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-secondary rounded-2xl p-8 border border-border">
                  <h3 className="text-lg font-bold mb-4 text-accent">What We Do ✓</h3>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Mutual fund distribution only</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Conduct proper risk profiling</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Provide incidental advice on MF schemes</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Execute mutual fund transactions</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>Portfolio reviews & rebalancing</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-accent font-bold">✓</span>
                      <span>After-sales service support</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <h3 className="text-lg font-bold mb-4 text-red-600">What We Don't Do ✗</h3>
                  <ul className="space-y-3 text-muted-foreground text-sm">
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Provide comprehensive financial planning</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Offer investment advisory services</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Distribute insurance products</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Provide scheme-specific recommendations without risk assessment</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Make past performance or return predictions</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Offer guarantees or promise returns</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-accent/10 rounded-2xl border border-accent/20">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">ARN: 332207</strong> - AMFI Registered Mutual Fund Distributor. For comprehensive financial planning, please consult a SEBI-registered Investment Adviser. These regulations ensure investor protection and compliance with SEBI/AMFI guidelines.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
