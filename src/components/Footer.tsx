import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-tight px-4 sm:px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold mb-2">
              Karthik G - <span className="text-gradient-gold">Mutual Fund Distributor</span>
            </h3>
            <p className="text-sm text-primary-foreground/60 mb-2">
              AMFI Registered Mutual Fund Distributor
            </p>
            <p className="text-sm text-primary-foreground/60 mb-6">
              ARN: 332207
            </p>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-md">
              Helping Indian investors build wealth through disciplined, goal-based mutual fund investing with proper risk profiling, suitability assessment, and transparent practices.
            </p>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/about", label: "About Us" },
                { to: "/mutual-funds", label: "Mutual Funds" },
                { to: "/insurance", label: "Insurance Info" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">Contact</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="mailto:karthi.investmf@gmail.com" className="text-primary-foreground/60 hover:text-accent transition-colors">
                karthi.investmf@gmail.com
              </a>
              <a href="tel:+917904342330" className="text-primary-foreground/60 hover:text-accent transition-colors">
                +91 7904 342 330
              </a>
              <p className="text-primary-foreground/60">Chennai, India</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8">
          <div className="mb-6 space-y-3">
            <p className="text-xs text-primary-foreground/40 leading-relaxed">
              <strong>🔒 Regulatory Compliance Notice:</strong> Karthik G is an AMFI-Registered Mutual Fund Distributor (ARN: 332207). We distribute mutual fund schemes only and provide "incidental advice" to help you select suitable schemes based on your risk profile and financial goals. We do NOT provide comprehensive financial planning or investment advisory services (unless separately registered as Investment Adviser with SEBI).
            </p>
            <p className="text-xs text-primary-foreground/40 leading-relaxed">
              <strong>⚠️ Risk Disclosure:</strong> Mutual Fund investments are subject to market risks, including the loss of principal amount. Past performance is not indicative of future results. Please read all scheme documents, Key Information Document (KID), and Statement of Additional Information (SAI) carefully before investing. This information is for educational purposes only and does not constitute a recommendation or offer.
            </p>
            <p className="text-xs text-primary-foreground/40 leading-relaxed">
              <strong>💰 Commission Disclosure:</strong> We earn trail commission from Asset Management Companies (AMCs) on mutual fund schemes we distribute. This commission is paid from the scheme's expense ratio and does not add to your investment cost.
            </p>
            <p className="text-xs text-primary-foreground/40 leading-relaxed">
              <strong>👥 Suitability Note:</strong> All mutual fund recommendations are made only after conducting proper risk profiling and assessing product suitability. We are NOT responsible for providing advice on other financial products, insurance, or brokerage services.
            </p>
          </div>

          <p className="text-xs text-primary-foreground/30 text-center py-4 border-t border-primary-foreground/10">
            © {new Date().getFullYear()} Karthik G - AMFI Registered Mutual Fund Distributor (ARN: 332207). All rights reserved.<br/>
            For queries/grievances, contact us at karthi.investmf@gmail.com
          </p>

          <div className="text-xs text-primary-foreground/30 text-center space-y-1 pt-4">
            <p>Disclaimer: The information provided on this website is for educational purposes only.</p>
            <p>It is not a recommendation, offer, or solicitation to buy or sell any security or financial product.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
