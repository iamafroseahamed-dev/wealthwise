import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
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
