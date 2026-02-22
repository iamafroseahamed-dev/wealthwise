import { Link } from "react-router-dom";
import { CalendarDays, MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-primary-foreground" />
      </a>
      <Link
        to="/book-session"
        className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg shadow-gold/25 hover:scale-110 transition-transform"
        aria-label="Book Session"
      >
        <CalendarDays className="w-5 h-5 text-primary" />
      </Link>
    </div>
  );
};

export default FloatingButtons;
