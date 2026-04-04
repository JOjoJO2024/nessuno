import { useEffect, useState } from "react";
import heroLiving from "@/assets/hero-living.jpg";
import gardenImg from "@/assets/garden.jpg";
import bedroomImg from "@/assets/bedroom.jpg";
import kitchenImg from "@/assets/kitchen.jpg";
import bedroom2Img from "@/assets/bedroom2.jpg";
import bedroom3Img from "@/assets/bedroom3.jpg";
import livingImg from "@/assets/living.jpg";
import bathroomImg from "@/assets/bathroom.jpg";
import hallwayImg from "@/assets/hallway.jpg";
import teaCornerImg from "@/assets/tea-corner.jpg";
import amenitiesImg from "@/assets/amenities.jpg";
import { MapPin, Users, Maximize, Leaf, Star, Phone, MessageCircle, ChevronDown, Menu, X } from "lucide-react";
import AvailabilityModal from "@/components/AvailabilityModal";

const WHATSAPP_LINK = "https://wa.me/393318066110?text=Hi%2C%20I%27d%20like%20to%20book%20Bellini%20Suite%20Garden";

const translations = {
  en: {
    nav: ["The Suite", "Features", "Gallery", "Location", "Contact"],
    heroTitle: "Bellini Suite Garden",
    heroSubtitle: "An exclusive retreat in the heart of Verona",
    heroCta: "Book Now on WhatsApp",
    heroCtaSecondary: "Check Availability",
    valueTitle: "Why Bellini Suite Garden",
    values: [
      { title: "Private Garden", desc: "A rare oasis in Verona's historic center — your personal escape steps from Teatro Romano." },
      { title: "Central & Quiet", desc: "The perfect balance: walk to everything, yet retreat to absolute tranquility." },
      { title: "Refined Design", desc: "80 sqm of colonial elegance with naturalistic touches — every detail curated for comfort." },
      { title: "Up to 4 Guests", desc: "Ideal for couples or families with a king bed and double sofa bed in a spacious open layout." },
    ],
    propertyTitle: "The Suite",
    propertyDesc: "Bellini Suite Garden is an 80 sqm open-space apartment located in the historic heart of Verona, just steps from Teatro Romano. The refined naturalistic design blends colonial-style details with modern comfort, creating an atmosphere that is both elegant and deeply relaxing.",
    propertyDesc2: "The suite features a spacious living area, a fully equipped kitchen, a comfortable sleeping zone with one main bed and a double sofa bed, a separate bathroom, and a beautifully maintained private garden — a true rarity in Verona's city center.",
    highlightsTitle: "Your Stay Includes",
    highlights: [
      "Private garden in the historic center",
      "80 sqm open-space layout",
      "King bed + double sofa bed (up to 4 guests)",
      "Fully equipped modern kitchen",
      "Separate bathroom with premium finishes",
      "Steps from Teatro Romano",
      "Air conditioning & fast Wi-Fi",
      "Self check-in available",
    ],
    galleryTitle: "A Glimpse Inside",
    locationTitle: "Prime Location",
    locationDesc: "Via Redentore 4, Verona — nestled in the historic center, steps from the iconic Teatro Romano. Walk to Ponte Pietra, Piazza delle Erbe, and the Adige riverfront in minutes. Central enough to explore everything on foot, yet tucked away in a quiet corner that feels like a private world.",
    ctaTitle: "Ready for Your Verona Experience?",
    ctaDesc: "Book directly with us for the best rates and a personal touch. No middlemen, no hidden fees.",
    ctaButton: "Book Now on WhatsApp",
    ctaButton2: "Check Availability",
    contactTitle: "Get in Touch",
    contactAddress: "Via Redentore 4, Verona, Italy",
    contactPhone: "+39 331 806 6110",
    contactEmail: "info@bellinisuitegarden.com",
    footer: "© 2026 Bellini Suite Garden. All rights reserved.",
  },
  it: {
    nav: ["La Suite", "Caratteristiche", "Galleria", "Posizione", "Contatti"],
    heroTitle: "Bellini Suite Garden",
    heroSubtitle: "Un rifugio esclusivo nel cuore di Verona",
    heroCta: "Prenota su WhatsApp",
    heroCtaSecondary: "Verifica Disponibilità",
    valueTitle: "Perché Bellini Suite Garden",
    values: [
      { title: "Giardino Privato", desc: "Un'oasi rara nel centro storico di Verona — il tuo rifugio personale a pochi passi dal Teatro Romano." },
      { title: "Centrale & Tranquillo", desc: "L'equilibrio perfetto: tutto raggiungibile a piedi, ma con la pace di un angolo riservato." },
      { title: "Design Raffinato", desc: "80 mq di eleganza coloniale con dettagli naturalistici — ogni particolare curato per il comfort." },
      { title: "Fino a 4 Ospiti", desc: "Ideale per coppie o famiglie con letto matrimoniale e divano letto in un ampio spazio open space." },
    ],
    propertyTitle: "La Suite",
    propertyDesc: "Bellini Suite Garden è un appartamento open space di 80 mq situato nel cuore storico di Verona, a pochi passi dal Teatro Romano. Il raffinato design naturalistico unisce dettagli in stile coloniale al comfort moderno, creando un'atmosfera elegante e profondamente rilassante.",
    propertyDesc2: "La suite offre un ampio soggiorno, una cucina completamente attrezzata, una zona notte confortevole con un letto matrimoniale e un divano letto, un bagno separato e un bellissimo giardino privato curato — una vera rarità nel centro di Verona.",
    highlightsTitle: "Il Tuo Soggiorno Include",
    highlights: [
      "Giardino privato nel centro storico",
      "80 mq open space",
      "Letto matrimoniale + divano letto (fino a 4 ospiti)",
      "Cucina moderna completamente attrezzata",
      "Bagno separato con finiture premium",
      "A pochi passi dal Teatro Romano",
      "Aria condizionata e Wi-Fi veloce",
      "Self check-in disponibile",
    ],
    galleryTitle: "Uno Sguardo all'Interno",
    locationTitle: "Posizione Privilegiata",
    locationDesc: "Via Redentore 4, Verona — nel cuore del centro storico, a pochi passi dall'iconico Teatro Romano. Ponte Pietra, Piazza delle Erbe e il lungadige sono raggiungibili in pochi minuti a piedi. Abbastanza centrale per esplorare tutto, ma in un angolo tranquillo che sembra un mondo a parte.",
    ctaTitle: "Pronti per la Vostra Esperienza a Verona?",
    ctaDesc: "Prenotate direttamente con noi per le migliori tariffe e un tocco personale. Nessun intermediario, nessun costo nascosto.",
    ctaButton: "Prenota su WhatsApp",
    ctaButton2: "Verifica Disponibilità",
    contactTitle: "Contattaci",
    contactAddress: "Via Redentore 4, Verona, Italia",
    contactPhone: "+39 331 806 6110",
    contactEmail: "info@bellinisuitegarden.com",
    footer: "© 2026 Bellini Suite Garden. Tutti i diritti riservati.",
  },
};

type Lang = "en" | "it";

const Index = () => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "it";
    const saved = window.localStorage.getItem("bellini-lang");
    if (saved === "en" || saved === "it") return saved;
    return window.navigator.language.toLowerCase().startsWith("it") ? "it" : "en";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const t = translations[lang];
  const nextLang: Lang = lang === "en" ? "it" : "en";

  useEffect(() => {
    window.localStorage.setItem("bellini-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("translate", "no");
    document.documentElement.classList.add("notranslate");
  }, [lang]);

  const toggleLang = () => {
    setLang(nextLang);
  };

  const sectionIds = ["property", "highlights", "gallery", "location", "contact"];
  const galleryImages = [
    { src: heroLiving, alt: "Living area" },
    { src: livingImg, alt: "Living room" },
    { src: gardenImg, alt: "Private garden" },
    { src: bedroomImg, alt: "Bedroom" },
    { src: bedroom2Img, alt: "Bedroom detail" },
    { src: bedroom3Img, alt: "Bed headboard" },
    { src: kitchenImg, alt: "Kitchen" },
    { src: bathroomImg, alt: "Bathroom" },
    { src: hallwayImg, alt: "Hallway" },
    { src: teaCornerImg, alt: "Tea corner" },
    { src: amenitiesImg, alt: "Amenities" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <a href="#" className="font-heading text-xl md:text-2xl font-semibold tracking-wide text-foreground">
            Bellini Suite Garden
          </a>
          <div className="hidden md:flex items-center gap-8">
            {t.nav.map((label, i) => (
              <a key={i} href={`#${sectionIds[i]}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {label}
              </a>
            ))}
            <button
              type="button"
              onClick={toggleLang}
              translate="no"
              aria-label={lang === "it" ? "Passa alla lingua inglese" : "Switch to Italian language"}
              className="notranslate text-sm font-semibold text-primary border border-primary rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <span translate="no">{nextLang.toUpperCase()}</span>
            </button>
          </div>
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={toggleLang}
              translate="no"
              aria-label={lang === "it" ? "Passa alla lingua inglese" : "Switch to Italian language"}
              className="notranslate text-sm font-semibold text-primary border border-primary rounded-full px-3 py-1"
            >
              <span translate="no">{nextLang.toUpperCase()}</span>
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-foreground">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
            {t.nav.map((label, i) => (
              <a key={i} href={`#${sectionIds[i]}`} onClick={() => setMobileMenuOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <img src={gardenImg} alt="Bellini Suite Garden" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-primary-foreground/80 text-sm md:text-base tracking-[0.3em] uppercase mb-4 font-body animate-fade-in-up">
            Verona, Italy
          </p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            {t.heroTitle}
          </h1>
          <p className="text-primary-foreground/90 text-lg md:text-xl font-light mb-10 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col items-center gap-5 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-primary-foreground w-20 h-20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
              <MessageCircle size={38} />
            </a>
            <span className="text-primary-foreground text-sm font-semibold tracking-wide">{t.heroCta}</span>
            <button onClick={() => setAvailabilityOpen(true)} className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-full text-sm font-bold hover:bg-primary-foreground/30 transition-all">
              {t.heroCtaSecondary}
            </button>
          </div>
        </div>
        <a href="#values" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/70 animate-bounce">
          <ChevronDown size={28} />
        </a>
      </section>

      {/* Value Proposition */}
      <section id="values" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-5xl text-center font-light mb-16 text-foreground">{t.valueTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.values.map((v, i) => {
              const icons = [<Leaf key={0} size={28} />, <MapPin key={1} size={28} />, <Star key={2} size={28} />, <Users key={3} size={28} />];
              return (
                <div key={i} className="text-center p-6 group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {icons[i]}
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Property Description */}
      <section id="property" className="py-20 md:py-28 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-5xl font-light mb-8 text-foreground">{t.propertyTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{t.propertyDesc}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{t.propertyDesc2}</p>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 text-sm text-foreground bg-background px-4 py-2 rounded-full">
                  <Maximize size={16} /> 80 sqm
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-foreground bg-background px-4 py-2 rounded-full">
                  <Users size={16} /> Max 4
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-foreground bg-background px-4 py-2 rounded-full">
                  <Leaf size={16} /> Private Garden
                </span>
              </div>
            </div>
            <div className="relative">
              <img src={heroLiving} alt="Living area" className="rounded-2xl shadow-2xl w-full" loading="lazy" width={1920} height={1080} />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-xl hidden md:block">
                <img src={bedroomImg} alt="Bedroom" className="w-full h-full object-cover" loading="lazy" width={1200} height={800} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-5xl text-center font-light mb-16 text-foreground">{t.highlightsTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {t.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card hover:bg-secondary/60 transition-colors">
                <span className="mt-1 w-2 h-2 rounded-full bg-accent shrink-0" />
                <span className="text-sm text-foreground">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 md:py-28 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-5xl text-center font-light mb-16 text-foreground">{t.galleryTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxImg(img.src)}
                className={`overflow-hidden rounded-xl cursor-pointer group ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-foreground/90 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button onClick={() => setLightboxImg(null)} className="absolute top-6 right-6 text-primary-foreground">
            <X size={32} />
          </button>
          <img src={lightboxImg} alt="" className="max-w-full max-h-[90vh] rounded-xl object-contain" />
        </div>
      )}

      {/* Location */}
      <section id="location" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-5xl font-light mb-8 text-foreground">{t.locationTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{t.locationDesc}</p>
              <div className="flex items-center gap-2 text-primary font-medium">
                <MapPin size={18} />
                <span>Via Redentore 4, 37121 Verona VR, Italy</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl h-80 md:h-96">
              <iframe
                title="Bellini Suite Garden Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1398.5!2d11.0012!3d45.4485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f5f46a09a6b8d%3A0x2c3e4f5a6b7c8d9e!2sVia+Redentore+4%2C+37129+Verona+VR!5e0!3m2!1sit!2sit!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 text-primary-foreground overflow-hidden">
        <img src={gardenImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h2 className="font-heading text-3xl md:text-5xl font-light mb-6">{t.ctaTitle}</h2>
          <p className="text-primary-foreground/80 mb-10 text-lg">{t.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-primary-foreground px-8 py-4 rounded-full text-sm font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              <MessageCircle size={18} />
              {t.ctaButton}
            </a>
            <button onClick={() => setAvailabilityOpen(true)} className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm border-2 border-primary-foreground text-primary-foreground px-8 py-4 rounded-full text-sm font-bold hover:bg-primary-foreground/30 transition-all">
              {t.ctaButton2}
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-heading text-3xl md:text-5xl text-center font-light mb-16 text-foreground">{t.contactTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="p-6">
              <MapPin className="mx-auto mb-4 text-primary" size={24} />
              <p className="text-sm text-muted-foreground">{t.contactAddress}</p>
            </div>
            <a href="tel:+393318066110" className="p-6 group rounded-xl hover:bg-secondary/60 transition-colors">
              <Phone className="mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" size={24} />
              <p className="text-sm text-primary font-medium">{t.contactPhone}</p>
              <p className="text-xs text-muted-foreground mt-1">{lang === "it" ? "Tocca per chiamare" : "Tap to call"}</p>
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="p-6 group rounded-xl hover:bg-secondary/60 transition-colors">
              <MessageCircle className="mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" size={24} />
              <p className="text-sm text-primary font-medium">WhatsApp</p>
              <p className="text-xs text-muted-foreground mt-1">{lang === "it" ? "Scrivici su WhatsApp" : "Message us on WhatsApp"}</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-sm text-muted-foreground">{t.footer}</p>
        </div>
      </footer>

      {/* Availability Modal */}
      <AvailabilityModal open={availabilityOpen} onOpenChange={setAvailabilityOpen} lang={lang} />

    </div>
  );
};

export default Index;
