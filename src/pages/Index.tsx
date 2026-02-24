import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { TrendingUp, Shield, Users, Target, ArrowRight, CheckCircle2 } from "lucide-react";

const HeroSection = () => (
  <section className="bg-gradient-navy text-primary-foreground section-padding-lg relative overflow-hidden">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
    </div>
    <div className="container-tight relative z-10">
      <AnimatedSection>
        <div className="max-w-3xl">
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-6">AMFI Registered Mutual Fund Distributor - ARN: 332207</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
            Invest with Purpose.{" "}
            <span className="text-gradient-gold">Build Wealth with Discipline.</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-xl mb-10 font-body leading-relaxed">
            Goal-based mutual fund distribution services aligned with your life milestones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/book-session">
              <Button variant="hero" size="xl">
                Begin Your Investment Journey
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/book-session">
              <Button variant="outline-light" size="xl">
                Schedule a Consultation
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
    title: "Systematic Investment Plans (SIPs)",
    description: "Invest a fixed amount regularly through Systematic Investment Plans to build disciplined investing habits and participate in long-term market growth.",
  },
  {
    icon: Target,
    title: "ELSS (Tax Saving Mutual Funds)",
    description: "Equity Linked Savings Schemes help you save tax under Section 80C while building wealth with a 3-year lock-in period.",
  },
  {
    icon: Users,
    title: "Retirement Corpus Planning",
    description: "Goal-based mutual fund investments designed to help you build substantial retirement savings aligned to your desired lifestyle.",
  },
  {
    icon: Target,
    title: "Child Education Planning",
    description: "Structured mutual fund investments specifically aligned to meet your child's future education needs and aspirations.",
  },
];

const ServicesSection = () => (
  <section className="section-padding">
    <div className="container-tight">
      <AnimatedSection>
        <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Key Services</p>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Mutual Fund Solutions for Every Goal</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mb-14">
          We assist investors across India in selecting suitable mutual fund schemes aligned with their financial goals and risk appetite.
        </p>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
  "Risk Profiling Before Recommendation",
  "Goal-Based Investment Approach",
  "Ongoing Service Support",
  "Periodic Portfolio Review",
  "Transparent practices with zero hidden charges",
  "Proper suitability assessment for each recommendation",
];

const WhyChooseUs = () => (
  <section className="section-padding bg-secondary">
    <div className="container-tight">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <AnimatedSection>
          <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Why Choose Us</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Trusted Partner in Wealth Creation</h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Karthik G (ARN: 332207) is an AMFI-Registered Mutual Fund Distributor committed to conducting proper risk profiling, recommending suitable mutual fund schemes, and providing ongoing service assistance focused on disciplined, goal-oriented investing.
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
  <section className="section-padding bg-secondary">
    <div className="container-tight">
      <AnimatedSection>
        <div className="p-8 md:p-12 rounded-2xl border border-border bg-card">
          <div className="max-w-3xl mx-auto">
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Important Disclaimer</p>
            <h2 className="text-2xl font-bold mb-4">Scope & Limitations</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The information on this website is for educational purposes only. We are AMFI-Registered Mutual Fund Distributors providing only incidental advice to help you select suitable mutual fund schemes. We do NOT provide comprehensive financial planning, investment advisory services, or any products other than mutual funds.
            </p>
            <p className="text-muted-foreground text-sm">
              All recommendations are made after assessing your risk profile and evaluating product suitability. Mutual Fund investments are subject to market risks. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
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
