import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { TrendingUp, Shield, Users, Target, ArrowRight, CheckCircle2 } from "lucide-react";

const HeroSection = () => (
  <section className="bg-gradient-navy text-primary-foreground section-padding relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
    </div>
    <div className="container-tight relative z-10">
      <AnimatedSection>
        <div className="max-w-3xl">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-6">AMFI Registered Mutual Fund Distributor</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
            Build Wealth with Discipline.{" "}
            <span className="text-gradient-gold">Plan with Clarity.</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-10 font-body leading-relaxed">
            Expert guidance for mutual fund investments and insurance solutions tailored to your financial goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/book-session">
              <Button variant="hero" size="xl">
                Book Free Session
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline-light" size="xl">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

const services = [
  {
    icon: TrendingUp,
    title: "Mutual Funds",
    description: "Diversified mutual fund solutions including SIP, lump sum, and goal-based investments across equity, debt, and hybrid categories.",
  },
  {
    icon: Shield,
    title: "Insurance",
    description: "Comprehensive life and health insurance plans to protect your family's future and secure your financial wellbeing.",
  },
  {
    icon: Target,
    title: "Goal Planning",
    description: "Structured financial planning to help you achieve milestones — retirement, education, home purchase, and more.",
  },
  {
    icon: Users,
    title: "Family Wealth",
    description: "Holistic wealth management for your entire family with personalized strategies for every life stage.",
  },
];

const ServicesSection = () => (
  <section className="section-padding">
    <div className="container-tight">
      <AnimatedSection>
        <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">What We Offer</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Services Built for Your Future</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mb-14">
          We simplify wealth creation with disciplined investment strategies and the right protection plans.
        </p>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, i) => (
          <AnimatedSection key={service.title} delay={i * 0.1}>
            <div className="group p-8 rounded-2xl border border-border bg-card hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

const reasons = [
  "AMFI Registered Distributor with transparent practices",
  "Personalized investment strategies, not one-size-fits-all",
  "Zero hidden charges — complete fee transparency",
  "Regular portfolio reviews and rebalancing",
  "Dedicated support for all your financial queries",
  "10+ years of trusted wealth management experience",
];

const WhyChooseUs = () => (
  <section className="section-padding bg-secondary">
    <div className="container-tight">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Why WealthWise</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Trust, Our Commitment</h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            We believe in building long-term relationships through transparency, expertise, and unwavering dedication to your financial success.
          </p>
          <Link to="/about">
            <Button variant="default" size="lg">
              Learn More About Us <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="space-y-4">
            {reasons.map((reason) => (
              <div key={reason} className="flex items-start gap-4 p-4 rounded-xl bg-card">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">{reason}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  </section>
);

const steps = [
  { num: "01", title: "Book a Session", description: "Schedule a free consultation at your convenience." },
  { num: "02", title: "Share Your Goals", description: "Tell us about your financial dreams and risk appetite." },
  { num: "03", title: "Get a Plan", description: "Receive a personalized investment strategy tailored for you." },
  { num: "04", title: "Start Investing", description: "Begin your wealth-building journey with expert guidance." },
];

const ProcessSteps = () => (
  <section className="section-padding">
    <div className="container-tight">
      <AnimatedSection>
        <div className="text-center mb-16">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-bold">Simple. Transparent. Effective.</h2>
        </div>
      </AnimatedSection>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <AnimatedSection key={step.num} delay={i * 0.1}>
            <div className="text-center">
              <span className="text-5xl font-bold text-gradient-gold font-display">{step.num}</span>
              <h3 className="text-lg font-bold mt-4 mb-2 font-display">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

const CTABanner = () => (
  <section className="section-padding bg-gradient-navy text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/30 blur-3xl" />
    </div>
    <div className="container-tight relative z-10 text-center">
      <AnimatedSection>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Start Your <span className="text-gradient-gold">Wealth Journey?</span>
        </h2>
        <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-10">
          Take the first step towards financial freedom. Book a free consultation today — no obligations, just clarity.
        </p>
        <Link to="/book-session">
          <Button variant="hero" size="xl">
            Book Your Free Session <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </Link>
      </AnimatedSection>
    </div>
  </section>
);

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <ProcessSteps />
      <CTABanner />
    </Layout>
  );
};

export default Index;
