import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { AlertCircle } from "lucide-react";

const Insurance = () => {
  return (
    <Layout>
      <section className="section-padding bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Mutual Fund Only</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
              <span className="text-gradient-gold">Mutual Funds</span> Distribution
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              As an AMFI-Registered Mutual Fund Distributor, our expertise and services are limited to mutual fund distribution only.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight max-w-3xl">
          <AnimatedSection>
            <div className="bg-secondary rounded-2xl p-8 md:p-12 border border-accent/20">
              <div className="flex gap-4 mb-6">
                <AlertCircle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Important Regulatory Notice</h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      <strong className="text-foreground">Scope of Services:</strong> Karthik G is an AMFI-Registered Mutual Fund Distributor (ARN: 332207) authorized to distribute mutual fund schemes only. We do NOT provide insurance products or services.
                    </p>
                    <p>
                      <strong className="text-foreground">Our Role:</strong> Our role is limited to:
                    </p>
                    <ul className="list-disc list-inside ml-2 space-y-2">
                      <li>Assessing your risk profile through proper profiling</li>
                      <li>Recommending suitable mutual fund schemes based on your financial goals</li>
                      <li>Assisting in mutual fund investment transactions</li>
                      <li>Providing after-sales support (portfolio review, SIP updates, KYC changes)</li>
                    </ul>
                    <p>
                      <strong className="text-foreground">What We Do NOT Provide:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-2 space-y-2">
                      <li>Insurance products or brokerage services</li>
                      <li>Comprehensive financial planning or financial advice</li>
                      <li>Advisory services (we provide only "incidental advice" to help you choose mutual fund schemes)</li>
                    </ul>
                    <p className="border-t border-border pt-4 mt-4">
                      For any insurance needs, please consult a qualified IRDA-registered Insurance Agent or Insurance Advisor. For comprehensive financial planning, consult a SEBI-registered Investment Adviser.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Insurance;
