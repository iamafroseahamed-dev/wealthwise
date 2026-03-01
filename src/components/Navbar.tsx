import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation, type Page } from "@/contexts/NavigationContext";

const navLinks = [
  { page: "home" as Page, label: "Home" },
  { page: "about" as Page, label: "About" },
  { page: "mutual-funds" as Page, label: "Mutual Funds" },
  { page: "insurance" as Page, label: "Insurance" },
  { page: "blog" as Page, label: "Blog" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { currentPage, navigate } = useNavigation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <button
          onClick={() => navigate("home")}
          className="font-display text-xl md:text-2xl font-bold tracking-tight hover:text-accent transition-colors"
        >
          Karthik G<span className="text-gradient-gold">.</span>Wealth
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                currentPage === link.page ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => navigate("book-session")}>
            <Button variant="gold" size="default">
              Begin Your Journey
            </Button>
          </button>
          <button
            onClick={() => navigate("admin-login")}
            className="text-xs text-muted-foreground hover:text-accent transition-colors opacity-60 hover:opacity-100"
          >
            Admin
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <div className="px-4 sm:px-6 md:px-8 py-6 flex flex-col gap-4 max-w-6xl mx-auto">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => {
                    navigate(link.page);
                    setOpen(false);
                  }}
                  className={`text-left text-base font-medium py-2 transition-colors ${
                    currentPage === link.page ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  navigate("book-session");
                  setOpen(false);
                }}
              >
                <Button variant="gold" className="w-full mt-2">
                  Book a Consultation
                </Button>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
