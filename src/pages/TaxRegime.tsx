import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { AlertCircle, Info, TrendingUp, DollarSign } from "lucide-react";

const TaxRegime = () => {
  return (
    <Layout>
      {/* Header Section */}
      <section className="section-lg bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="label-uppercase text-accent mb-3">
              Tax Guide
            </p>
            <h1 className="h1-display mb-6 max-w-3xl">
              Tax Regime for <span className="text-gradient-gold">Mutual Funds</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              Understand how mutual fund investments are taxed in India. FY 2024-25 rates and regulations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Important Notice */}
      <section className="section-sm bg-secondary/40">
        <div className="container-tight">
          <AnimatedSection>
            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-6 md:p-8 flex gap-4">
              <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2">Disclaimer</h3>
                <p className="text-muted-foreground text-sm">
                  This information is for educational purposes only and based on AMFI guidelines for FY 2024-25. 
                  Tax laws are complex and subject to change. Please consult a qualified tax advisor or CA for your specific situation 
                  and the most current tax rates. This is not personalized tax advice.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Tax Rates Table */}
      <section className="section">
        <div className="container-tight">
          <AnimatedSection>
            <h2 className="h2-display mb-8">I. Tax Rates for Mutual Fund Investors (FY 2024-25)</h2>
          </AnimatedSection>

          {/* Equity Oriented Funds */}
          <AnimatedSection delay={0.1}>
            <div className="bg-card rounded-2xl border p-8 mb-8">
              <div className="flex gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-accent flex-shrink-0" />
                <h3 className="text-2xl font-bold">Equity-Oriented Funds (EOF)</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold mb-4 text-accent">Long-Term Capital Gains (LTCG)</h4>
                  <p className="text-muted-foreground mb-3">Units held for more than 12 months:</p>
                  <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                    <p className="font-semibold text-foreground">Tax Rate: 10%</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      (If gains exceed ₹1,25,000) + Surcharge + 4% Health & Education Cess
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>First ₹1,25,000 of LTCG:</strong> No tax on gains above 12-month holding
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4 text-accent">Short-Term Capital Gains (STCG)</h4>
                  <p className="text-muted-foreground mb-3">Units held for less than 12 months:</p>
                  <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                    <p className="font-semibold text-foreground">Tax Rate: 20%</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      (For transfers on or after 23 July 2024) + Surcharge + 4% Cess
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Before 23 July 2024:</strong> STCG was taxable at 15%
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4 text-accent">Dividend Income</h4>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="font-semibold text-foreground mb-2">Tax as per your Slab Rate</p>
                    <p className="text-sm text-muted-foreground">
                      • Taxed as per your income tax slab<br/>
                      • No TDS if dividend income {"<"} ₹5,000 in a financial year<br/>
                      • TDS at 20% (if dividend exceeds ₹5,000)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Debt Oriented Funds */}
          <AnimatedSection delay={0.2}>
            <div className="bg-card rounded-2xl border p-8 mb-8">
              <div className="flex gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-accent flex-shrink-0" />
                <h3 className="text-2xl font-bold">Non-Equity / Debt-Oriented Funds</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold mb-4 text-accent">Long-Term Capital Gains (LTCG)</h4>
                  <p className="text-muted-foreground mb-3">Units held for more than 12 months:</p>
                  <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                    <p className="font-semibold text-foreground">Tax Rate: 12.5%</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      (Without indexation benefit, for transfers on or after 23 July 2024)
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <strong>Note:</strong> Before 23 July 2024, the rate was 20% with indexation benefit.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4 text-accent">Short-Term Capital Gains (STCG)</h4>
                  <p className="text-muted-foreground mb-3">Units held for less than 12 months:</p>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="font-semibold text-foreground">Tax as per Income Slab Rate</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Applicable slab rate (10%, 20%, 30%, or higher)
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4 text-accent">Dividend Income</h4>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <p className="font-semibold text-foreground mb-2">Tax as per your Slab Rate</p>
                    <p className="text-sm text-muted-foreground">
                      Same as Equity-Oriented Funds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Liquid Funds & Money Market Funds */}
          <AnimatedSection delay={0.3}>
            <div className="bg-card rounded-2xl border p-8">
              <h3 className="text-2xl font-bold mb-6">Liquid Funds / Money Market Funds</h3>

              <div className="space-y-4">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">LTCG (12+ months):</h4>
                  <p className="text-muted-foreground text-sm">
                    Taxed as Short-Term Capital Gains (per section 50AA) as per Slab Rate
                  </p>
                </div>

                <div className="bg-secondary/50 rounded-lg p-4">
                  <h4 className="font-bold mb-2">STCG ({"<"}12 months):</h4>
                  <p className="text-muted-foreground text-sm">
                    Taxed as per Slab Rate
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Key Concepts */}
      <section className="section bg-secondary/40">
        <div className="container-tight">
          <AnimatedSection>
            <h2 className="h2-display mb-12">Key Tax Concepts</h2>
          </AnimatedSection>

          <div className="card-grid-2 gap-md">
            <AnimatedSection delay={0.1}>
              <div className="bg-card rounded-2xl border p-8">
                <h3 className="text-xl font-bold mb-4 flex gap-2 items-start">
                  <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  Holding Period
                </h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span><strong>Listed Units:</strong> 12 months = Long-term</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span><strong>Unlisted Units:</strong> 24 months = Long-term</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span>Holding period starts from the date of purchase</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-card rounded-2xl border p-8">
                <h3 className="text-xl font-bold mb-4 flex gap-2 items-start">
                  <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  Cost of Acquisition
                </h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span><strong>For LTCG:</strong> Higher of actual cost or FMV on 31 Jan 2018</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span>This reduces your taxable gains</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span>Important for old investments made before 2018</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-card rounded-2xl border p-8">
                <h3 className="text-xl font-bold mb-4 flex gap-2 items-start">
                  <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  Surcharge & Cess
                </h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span><strong>Surcharge:</strong> 0-37% based on income level</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span><strong>Health & Education Cess:</strong> 4% on tax + surcharge</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span>Capital gains surcharge is capped at 15%</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-card rounded-2xl border p-8">
                <h3 className="text-xl font-bold mb-4 flex gap-2 items-start">
                  <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  Securities Transaction Tax (STT)
                </h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span><strong>Applies to:</strong> Equity-oriented funds only</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span><strong>Rate:</strong> 0.025% on sale/redemption</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent font-bold flex-shrink-0">•</span>
                    <span>Does NOT apply to debt funds or purchase</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Tax Optimization Tips */}
      <section className="section">
        <div className="container-tight">
          <AnimatedSection>
            <h2 className="h2-display mb-12">Tax-Smart Investment Tips</h2>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection delay={0.1}>
              <div className="bg-card rounded-2xl border p-8">
                <h3 className="text-xl font-bold mb-4 flex gap-3 items-start">
                  <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold flex-shrink-0">1</span>
                  <span>Hold Equity Mutual Funds for 12+ Months</span>
                </h3>
                <p className="text-muted-foreground ml-11">
                  Long-term holding on equity funds attracts only 10% tax (if gains exceed ₹1,25,000). 
                  This is significantly lower than short-term tax rates.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-card rounded-2xl border p-8">
                <h3 className="text-xl font-bold mb-4 flex gap-3 items-start">
                  <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold flex-shrink-0">2</span>
                  <span>Utilize Tax-Free LTCG Threshold</span>
                </h3>
                <p className="text-muted-foreground ml-11">
                  First ₹1,25,000 of long-term capital gains from equity funds is completely tax-free. 
                  Plan your redemptions to maximize this benefit.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-card rounded-2xl border p-8">
                <h3 className="text-xl font-bold mb-4 flex gap-3 items-start">
                  <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold flex-shrink-0">3</span>
                  <span>Consider ELSS for Tax Saving (Section 80C)</span>
                </h3>
                <p className="text-muted-foreground ml-11">
                  ELSS (Equity Linked Savings Schemes) qualify for ₹1.5 lakh tax deduction under Section 80C, 
                  plus long-term capital gains benefits with 3-year lock-in.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-card rounded-2xl border p-8">
                <h3 className="text-xl font-bold mb-4 flex gap-3 items-start">
                  <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold flex-shrink-0">4</span>
                  <span>Rebalance Your Portfolio Strategically</span>
                </h3>
                <p className="text-muted-foreground ml-11">
                  Time your fund switches and rebalancing to minimize short-term capital gains tax impact. 
                  This is a key aspect of tax-efficient investing.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="bg-card rounded-2xl border p-8">
                <h3 className="text-xl font-bold mb-4 flex gap-3 items-start">
                  <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold flex-shrink-0">5</span>
                  <span>Maintain Proper Record of Investments</span>
                </h3>
                <p className="text-muted-foreground ml-11">
                  Keep all purchase statements, redemption letters, and cost of acquisition records. 
                  These are essential for calculating and proving your tax liabilities to the income tax department.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div className="bg-card rounded-2xl border p-8">
                <h3 className="text-xl font-bold mb-4 flex gap-3 items-start">
                  <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold flex-shrink-0">6</span>
                  <span>Consult a Tax Professional</span>
                </h3>
                <p className="text-muted-foreground ml-11">
                  Tax rules are complex and evolve frequently. A qualified Chartered Accountant can help 
                  optimize your investment and tax strategy based on your specific situation.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Other Tax Provisions */}
      <section className="section bg-secondary/40">
        <div className="container-tight">
          <AnimatedSection>
            <h2 className="h2-display mb-8">II. Other Important Tax Provisions</h2>
          </AnimatedSection>

          <div className="space-y-6">
            <AnimatedSection delay={0.1}>
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-bold mb-3">Consolidation & Merger of Schemes</h3>
                <p className="text-muted-foreground text-sm">
                  Capital gains upon consolidation of mutual fund schemes are EXEMPT from capital gains tax, 
                  if done in accordance with SEBI regulations.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-bold mb-3">Switching Within Same Scheme</h3>
                <p className="text-muted-foreground text-sm">
                  Switching units between Growth and Dividend Plans within the same scheme is subject to 
                  capital gains tax. Plan such switches carefully.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-bold mb-3">Fund of Funds (FoF) Taxation</h3>
                <p className="text-muted-foreground text-sm">
                  FoF schemes investing 90%+ in equity funds are treated as Equity-Oriented Funds and 
                  get the same tax treatment as direct equity fund investments.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-bold mb-3">NRI Taxation</h3>
                <p className="text-muted-foreground text-sm">
                  NRIs may be eligible for treaty benefits or special tax rates. An NRI must obtain a 
                  Tax Residency Certificate to claim treaty benefits and provide it to the mutual fund.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-bold mb-3">TDS on Dividend & Redemption</h3>
                <p className="text-muted-foreground text-sm">
                  • TDS is deducted at source on dividends (20%) and redemption proceeds as per applicable rates.<br/>
                  • No TDS if dividend income is below ₹5,000 in a financial year.<br/>
                  • Higher TDS applies to non-PAN holders and non-filers of tax returns.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              <div className="bg-card rounded-2xl border p-6">
                <h3 className="font-bold mb-3">Tax Loss Harvesting</h3>
                <p className="text-muted-foreground text-sm">
                  Capital losses can be set off against capital gains. You can strategically redeem funds 
                  with losses to offset gains from other investments, reducing your overall tax liability.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Disclaimer & Consultation */}
      <section className="section">
        <div className="container-tight max-w-3xl">
          <AnimatedSection>
            <div className="bg-secondary rounded-2xl p-8 md:p-12 border border-accent/20">
              <h2 className="h3-display mb-4">Before You Invest - Remember</h2>
              <ul className="space-y-4 text-muted-foreground leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-foreground">Tax rates are subject to change:</strong> This information 
                    is current as of FY 2024-25. Always verify with the latest tax guidelines.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-foreground">Consult a CA or tax advisor:</strong> Every investor's 
                    tax situation is unique. Get personalized advice before making investment decisions.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-foreground">Focus on long-term returns:</strong> While tax efficiency is 
                    important, the primary goal should be wealth creation through disciplined investing.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span>
                    <strong className="text-foreground">Maintain records:</strong> Keep all investment documents, 
                    purchase statements, and cost records for at least 7 years.
                  </span>
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default TaxRegime;
