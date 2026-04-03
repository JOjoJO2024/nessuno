import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Users, CalendarDays, Info } from "lucide-react";
import { format } from "date-fns";
import { it, enUS } from "date-fns/locale";

interface AvailabilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: "en" | "it";
}

const AvailabilityModal = ({ open, onOpenChange, lang }: AvailabilityModalProps) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(2);

  const locale = lang === "it" ? it : enUS;

  const buildWhatsAppMessage = () => {
    let msg = lang === "it"
      ? "Ciao, vorrei verificare la disponibilità per Bellini Suite Garden.\n"
      : "Hi, I'd like to check availability for Bellini Suite Garden.\n";
    if (checkIn) msg += `${lang === "it" ? "Check-in" : "Check-in"}: ${format(checkIn, "dd/MM/yyyy")}\n`;
    if (checkOut) msg += `${lang === "it" ? "Check-out" : "Check-out"}: ${format(checkOut, "dd/MM/yyyy")}\n`;
    msg += `${lang === "it" ? "Ospiti" : "Guests"}: ${guests}\n`;
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/393318066110?text=${buildWhatsAppMessage()}`;

  const labels = lang === "it" ? {
    title: "Verifica Disponibilità",
    checkIn: "Data Check-in",
    checkOut: "Data Check-out",
    guests: "Numero Ospiti",
    info: [
      "Check-in: dalle 15:00",
      "Check-out: entro 10:00",
      "Soggiorno minimo: 2 notti",
      "Max 4 ospiti",
      "Self check-in disponibile",
    ],
    send: "Invia Richiesta su WhatsApp",
    selectDate: "Seleziona una data",
  } : {
    title: "Check Availability",
    checkIn: "Check-in Date",
    checkOut: "Check-out Date",
    guests: "Number of Guests",
    info: [
      "Check-in: from 3:00 PM",
      "Check-out: by 10:00 AM",
      "Minimum stay: 2 nights",
      "Max 4 guests",
      "Self check-in available",
    ],
    send: "Send Request on WhatsApp",
    selectDate: "Select a date",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-light flex items-center gap-2">
            <CalendarDays size={22} className="text-primary" />
            {labels.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Check-in */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{labels.checkIn}</label>
            <div className="border border-border rounded-xl overflow-hidden flex justify-center">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                locale={locale}
                disabled={(date) => date < new Date()}
                className="p-3 pointer-events-auto"
              />
            </div>
            {checkIn && <p className="text-sm text-primary mt-1">{format(checkIn, "dd MMMM yyyy", { locale })}</p>}
          </div>

          {/* Check-out */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{labels.checkOut}</label>
            <div className="border border-border rounded-xl overflow-hidden flex justify-center">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                locale={locale}
                disabled={(date) => date < (checkIn || new Date())}
                className="p-3 pointer-events-auto"
              />
            </div>
            {checkOut && <p className="text-sm text-primary mt-1">{format(checkOut, "dd MMMM yyyy", { locale })}</p>}
          </div>

          {/* Guests */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">{labels.guests}</label>
            <div className="flex items-center gap-3">
              <Users size={18} className="text-muted-foreground" />
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setGuests(n)}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                    guests === n
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Practical Info */}
          <div className="bg-secondary/60 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Info size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Info</span>
            </div>
            <ul className="space-y-1.5">
              {labels.info.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[hsl(142,70%,40%)] text-primary-foreground px-6 py-4 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={18} />
            {labels.send}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvailabilityModal;
