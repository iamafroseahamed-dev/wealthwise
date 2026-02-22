import { useState } from "react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM",
];

const BookSession = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !date || !timeSlot) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);

    // EmailJS integration placeholder
    // Will be connected once EmailJS credentials are provided
    try {
      // Simulate sending
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding min-h-[70vh] flex items-center">
          <div className="container-tight text-center">
            <AnimatedSection>
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-10 h-10 text-accent" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Session Booked!</h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-2">
                Thank you, {name}! We've received your booking request.
              </p>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                <strong className="text-foreground">{format(date!, "MMMM d, yyyy")}</strong> at <strong className="text-foreground">{timeSlot}</strong>
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                We'll confirm your session via email shortly.
              </p>
              <Button variant="gold" onClick={() => setSubmitted(false)}>
                Book Another Session
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding bg-gradient-navy text-primary-foreground">
        <div className="container-tight">
          <AnimatedSection>
            <p className="text-accent font-medium text-sm uppercase tracking-widest mb-3">Free Consultation</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-3xl">
              Book Your <span className="text-gradient-gold">Free Session</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl leading-relaxed">
              Take the first step towards financial clarity. Schedule a free, no-obligation consultation with our experts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-tight max-w-2xl">
          <AnimatedSection>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Full Name *</label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email *</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Date *</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full h-12 justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarDays className="mr-2 w-4 h-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => d < new Date() || d.getDay() === 0}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Time Slot *</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={cn(
                        "py-2.5 px-3 rounded-lg text-sm font-medium border transition-all",
                        timeSlot === slot
                          ? "bg-accent text-accent-foreground border-accent shadow-md"
                          : "bg-card border-border text-muted-foreground hover:border-accent/50"
                      )}
                    >
                      <Clock className="w-3 h-3 inline mr-1" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Message (Optional)</label>
                <Textarea
                  placeholder="Tell us about your financial goals or any specific questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
                {!loading && <ArrowRight className="w-5 h-5 ml-1" />}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By booking, you agree that your information will be used solely to schedule your consultation.
              </p>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default BookSession;
