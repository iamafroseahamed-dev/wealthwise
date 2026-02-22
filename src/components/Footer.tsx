import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-tight px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold mb-4">
              Wealth<span className="text-gradient-gold">Wise</span>
            </h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-md">
              Your trusted partner for mutual fund distribution and insurance solutions.
              Building wealth with discipline and clarity.
            </p>
            <div className="mt-6 space-y-1 text-sm text-primary-foreground/60">
              <p>AMFI Registered Mutual Fund Distributor</p>
              <p>ARN: XXXXX | EUIN: XXXXX</p>
            </div>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: "/about", label: "About Us" },
                { to: "/products", label: "Products" },
                { to: "/mutual-funds", label: "Mutual Funds" },
                { to: "/insurance", label: "Insurance" },
                { to: "/blog", label: "Blog" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider mb-4 text-primary-foreground/80">Get Started</h4>
            <div className="flex flex-col gap-3">
              <Link to="/book-session" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                Book Free Session
              </Link>
              <a href="mailto:hello@wealthwise.com" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                hello@wealthwise.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8">
          <p className="text-xs text-primary-foreground/40 leading-relaxed max-w-4xl">
            <strong>Disclaimer:</strong> Mutual Fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. 
            This website facilitates mutual fund distribution support only and does not provide investment advisory services.
          </p>
          <p className="text-xs text-primary-foreground/30 mt-4">
            © {new Date().getFullYear()} WealthWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
