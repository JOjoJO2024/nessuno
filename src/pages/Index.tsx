import { useEffect, useState, useRef } from "react";
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

type Lang = "it" | "en" | "ru" | "es" | "de" | "ar" | "zh";

const LANG_OPTIONS: { code: Lang; flag: string; label: string }[] = [
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "en", flag: "🇬🇧", label: "English" },
  { code: "ru", flag: "🇷🇺", label: "Русский" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "ar", flag: "🇸🇦", label: "العربية" },
  { code: "zh", flag: "🇨🇳", label: "中文" },
];

const translations: Record<Lang, {
  nav: string[];
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroCtaSecondary: string;
  valueTitle: string;
  values: { title: string; desc: string }[];
  propertyTitle: string;
  propertyDesc: string;
  propertyDesc2: string;
  highlightsTitle: string;
  highlights: string[];
  galleryTitle: string;
  locationTitle: string;
  locationDesc: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
  ctaButton2: string;
  contactTitle: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  footer: string;
}> = {
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
  ru: {
    nav: ["Люкс", "Особенности", "Галерея", "Расположение", "Контакты"],
    heroTitle: "Bellini Suite Garden",
    heroSubtitle: "Эксклюзивное убежище в самом сердце Вероны",
    heroCta: "Забронировать в WhatsApp",
    heroCtaSecondary: "Проверить наличие",
    valueTitle: "Почему Bellini Suite Garden",
    values: [
      { title: "Частный сад", desc: "Редкий оазис в историческом центре Вероны — ваше личное убежище в шаге от Театра Романо." },
      { title: "Центр и тишина", desc: "Идеальный баланс: всё в шаговой доступности, но абсолютное спокойствие." },
      { title: "Изысканный дизайн", desc: "80 кв.м колониальной элегантности с природными акцентами — каждая деталь продумана для комфорта." },
      { title: "До 4 гостей", desc: "Идеально для пар или семей: двуспальная кровать и раскладной диван в просторном open space." },
    ],
    propertyTitle: "Люкс",
    propertyDesc: "Bellini Suite Garden — апартаменты open space площадью 80 кв.м в историческом центре Вероны, в нескольких шагах от Театра Романо. Изысканный натуралистический дизайн сочетает колониальные детали с современным комфортом.",
    propertyDesc2: "В люксе есть просторная гостиная, полностью оборудованная кухня, уютная спальная зона с двуспальной кроватью и раскладным диваном, отдельная ванная комната и ухоженный частный сад — настоящая редкость в центре Вероны.",
    highlightsTitle: "Ваше пребывание включает",
    highlights: [
      "Частный сад в историческом центре",
      "80 кв.м open space",
      "Двуспальная кровать + диван-кровать (до 4 гостей)",
      "Полностью оборудованная кухня",
      "Отдельная ванная с премиум-отделкой",
      "В нескольких шагах от Театра Романо",
      "Кондиционер и быстрый Wi-Fi",
      "Самостоятельная регистрация",
    ],
    galleryTitle: "Загляните внутрь",
    locationTitle: "Премиальное расположение",
    locationDesc: "Via Redentore 4, Верона — в самом сердце исторического центра, в нескольких шагах от знаменитого Театра Романо. Понте Пьетра, Пьяцца делле Эрбе и набережная Адидже — в нескольких минутах ходьбы.",
    ctaTitle: "Готовы к незабываемому отдыху в Вероне?",
    ctaDesc: "Бронируйте напрямую у нас по лучшим ценам. Без посредников, без скрытых комиссий.",
    ctaButton: "Забронировать в WhatsApp",
    ctaButton2: "Проверить наличие",
    contactTitle: "Свяжитесь с нами",
    contactAddress: "Via Redentore 4, Верона, Италия",
    contactPhone: "+39 331 806 6110",
    contactEmail: "info@bellinisuitegarden.com",
    footer: "© 2026 Bellini Suite Garden. Все права защищены.",
  },
  es: {
    nav: ["La Suite", "Características", "Galería", "Ubicación", "Contacto"],
    heroTitle: "Bellini Suite Garden",
    heroSubtitle: "Un refugio exclusivo en el corazón de Verona",
    heroCta: "Reservar en WhatsApp",
    heroCtaSecondary: "Verificar disponibilidad",
    valueTitle: "Por qué Bellini Suite Garden",
    values: [
      { title: "Jardín privado", desc: "Un oasis único en el centro histórico de Verona — tu refugio personal a pocos pasos del Teatro Romano." },
      { title: "Céntrico y tranquilo", desc: "El equilibrio perfecto: todo a pie, pero con la paz de un rincón reservado." },
      { title: "Diseño refinado", desc: "80 m² de elegancia colonial con toques naturalistas — cada detalle pensado para el confort." },
      { title: "Hasta 4 huéspedes", desc: "Ideal para parejas o familias con cama doble y sofá cama en un amplio espacio abierto." },
    ],
    propertyTitle: "La Suite",
    propertyDesc: "Bellini Suite Garden es un apartamento open space de 80 m² ubicado en el corazón histórico de Verona, a pocos pasos del Teatro Romano. El refinado diseño naturalista combina detalles coloniales con comodidad moderna.",
    propertyDesc2: "La suite cuenta con un amplio salón, cocina totalmente equipada, zona de descanso con cama doble y sofá cama, baño separado y un hermoso jardín privado — una verdadera rareza en el centro de Verona.",
    highlightsTitle: "Tu estancia incluye",
    highlights: [
      "Jardín privado en el centro histórico",
      "80 m² open space",
      "Cama doble + sofá cama (hasta 4 huéspedes)",
      "Cocina moderna totalmente equipada",
      "Baño separado con acabados premium",
      "A pocos pasos del Teatro Romano",
      "Aire acondicionado y Wi-Fi rápido",
      "Auto check-in disponible",
    ],
    galleryTitle: "Un vistazo al interior",
    locationTitle: "Ubicación privilegiada",
    locationDesc: "Via Redentore 4, Verona — en el corazón del centro histórico, a pocos pasos del icónico Teatro Romano. Ponte Pietra, Piazza delle Erbe y la ribera del Adigio están a minutos a pie.",
    ctaTitle: "¿Listos para su experiencia en Verona?",
    ctaDesc: "Reserve directamente con nosotros para las mejores tarifas y un toque personal. Sin intermediarios, sin costes ocultos.",
    ctaButton: "Reservar en WhatsApp",
    ctaButton2: "Verificar disponibilidad",
    contactTitle: "Contáctenos",
    contactAddress: "Via Redentore 4, Verona, Italia",
    contactPhone: "+39 331 806 6110",
    contactEmail: "info@bellinisuitegarden.com",
    footer: "© 2026 Bellini Suite Garden. Todos los derechos reservados.",
  },
  de: {
    nav: ["Die Suite", "Ausstattung", "Galerie", "Lage", "Kontakt"],
    heroTitle: "Bellini Suite Garden",
    heroSubtitle: "Ein exklusives Refugium im Herzen von Verona",
    heroCta: "Jetzt auf WhatsApp buchen",
    heroCtaSecondary: "Verfügbarkeit prüfen",
    valueTitle: "Warum Bellini Suite Garden",
    values: [
      { title: "Privater Garten", desc: "Eine seltene Oase im historischen Zentrum Veronas — Ihr persönlicher Rückzugsort nahe dem Teatro Romano." },
      { title: "Zentral & Ruhig", desc: "Die perfekte Balance: alles zu Fuß erreichbar, aber in absoluter Ruhe." },
      { title: "Edles Design", desc: "80 m² koloniale Eleganz mit naturalistischen Akzenten — jedes Detail für Ihren Komfort gestaltet." },
      { title: "Bis zu 4 Gäste", desc: "Ideal für Paare oder Familien mit Doppelbett und Schlafsofa in einem großzügigen Open Space." },
    ],
    propertyTitle: "Die Suite",
    propertyDesc: "Bellini Suite Garden ist ein 80 m² großes Open-Space-Apartment im historischen Herzen Veronas, nur wenige Schritte vom Teatro Romano entfernt. Das raffinierte naturalistische Design verbindet koloniale Details mit modernem Komfort.",
    propertyDesc2: "Die Suite bietet einen großzügigen Wohnbereich, eine voll ausgestattete Küche, einen komfortablen Schlafbereich mit Doppelbett und Schlafsofa, ein separates Badezimmer und einen wunderschön gepflegten privaten Garten — eine echte Seltenheit im Zentrum Veronas.",
    highlightsTitle: "Ihr Aufenthalt beinhaltet",
    highlights: [
      "Privater Garten im historischen Zentrum",
      "80 m² Open Space",
      "Doppelbett + Schlafsofa (bis zu 4 Gäste)",
      "Voll ausgestattete moderne Küche",
      "Separates Bad mit Premium-Ausstattung",
      "Wenige Schritte vom Teatro Romano",
      "Klimaanlage & schnelles WLAN",
      "Self Check-in verfügbar",
    ],
    galleryTitle: "Ein Blick hinein",
    locationTitle: "Erstklassige Lage",
    locationDesc: "Via Redentore 4, Verona — im Herzen der Altstadt, nur wenige Schritte vom ikonischen Teatro Romano. Ponte Pietra, Piazza delle Erbe und die Etsch-Promenade sind in wenigen Minuten zu Fuß erreichbar.",
    ctaTitle: "Bereit für Ihr Verona-Erlebnis?",
    ctaDesc: "Buchen Sie direkt bei uns für die besten Preise und persönlichen Service. Keine Vermittler, keine versteckten Gebühren.",
    ctaButton: "Jetzt auf WhatsApp buchen",
    ctaButton2: "Verfügbarkeit prüfen",
    contactTitle: "Kontakt",
    contactAddress: "Via Redentore 4, Verona, Italien",
    contactPhone: "+39 331 806 6110",
    contactEmail: "info@bellinisuitegarden.com",
    footer: "© 2026 Bellini Suite Garden. Alle Rechte vorbehalten.",
  },
  ar: {
    nav: ["الجناح", "المميزات", "المعرض", "الموقع", "اتصل بنا"],
    heroTitle: "Bellini Suite Garden",
    heroSubtitle: "ملاذ حصري في قلب فيرونا",
    heroCta: "احجز عبر واتساب",
    heroCtaSecondary: "تحقق من التوفر",
    valueTitle: "لماذا Bellini Suite Garden",
    values: [
      { title: "حديقة خاصة", desc: "واحة نادرة في قلب فيرونا التاريخي — ملاذك الشخصي على بعد خطوات من مسرح رومانو." },
      { title: "مركزي وهادئ", desc: "التوازن المثالي: كل شيء في متناول يدك، مع هدوء تام." },
      { title: "تصميم راقٍ", desc: "80 متر مربع من الأناقة الاستعمارية بلمسات طبيعية — كل تفصيل مصمم للراحة." },
      { title: "حتى 4 ضيوف", desc: "مثالي للأزواج أو العائلات مع سرير مزدوج وأريكة سرير في مساحة مفتوحة واسعة." },
    ],
    propertyTitle: "الجناح",
    propertyDesc: "Bellini Suite Garden شقة مفتوحة بمساحة 80 متر مربع تقع في قلب فيرونا التاريخي، على بعد خطوات من مسرح رومانو. التصميم الطبيعي الراقي يمزج بين التفاصيل الاستعمارية والراحة العصرية.",
    propertyDesc2: "يضم الجناح صالة واسعة ومطبخ مجهز بالكامل ومنطقة نوم مريحة بسرير مزدوج وأريكة سرير وحمام منفصل وحديقة خاصة جميلة — نادرة حقيقية في وسط فيرونا.",
    highlightsTitle: "إقامتك تشمل",
    highlights: [
      "حديقة خاصة في المركز التاريخي",
      "80 متر مربع مساحة مفتوحة",
      "سرير مزدوج + أريكة سرير (حتى 4 ضيوف)",
      "مطبخ عصري مجهز بالكامل",
      "حمام منفصل بتشطيبات فاخرة",
      "على بعد خطوات من مسرح رومانو",
      "تكييف هواء وواي فاي سريع",
      "تسجيل وصول ذاتي متاح",
    ],
    galleryTitle: "نظرة من الداخل",
    locationTitle: "موقع متميز",
    locationDesc: "Via Redentore 4، فيرونا — في قلب المركز التاريخي، على بعد خطوات من مسرح رومانو الشهير. بونتي بييترا وبياتسا ديلي إربي وضفاف نهر أديجي على بعد دقائق سيراً.",
    ctaTitle: "هل أنتم مستعدون لتجربة فيرونا؟",
    ctaDesc: "احجزوا مباشرة معنا للحصول على أفضل الأسعار ولمسة شخصية. بدون وسطاء، بدون رسوم خفية.",
    ctaButton: "احجز عبر واتساب",
    ctaButton2: "تحقق من التوفر",
    contactTitle: "تواصل معنا",
    contactAddress: "Via Redentore 4، فيرونا، إيطاليا",
    contactPhone: "+39 331 806 6110",
    contactEmail: "info@bellinisuitegarden.com",
    footer: "© 2026 Bellini Suite Garden. جميع الحقوق محفوظة.",
  },
  zh: {
    nav: ["套房", "特色", "画廊", "位置", "联系我们"],
    heroTitle: "Bellini Suite Garden",
    heroSubtitle: "维罗纳心脏地带的专属度假胜地",
    heroCta: "通过WhatsApp预订",
    heroCtaSecondary: "查看可用性",
    valueTitle: "为什么选择 Bellini Suite Garden",
    values: [
      { title: "私人花园", desc: "维罗纳历史中心的稀有绿洲——距罗马剧院仅几步之遥的私人庇护所。" },
      { title: "中心且安静", desc: "完美的平衡：步行即可到达一切，却享有绝对的宁静。" },
      { title: "精致设计", desc: "80平方米殖民风格的优雅，融合自然主义元素——每个细节都为舒适而设计。" },
      { title: "最多4位客人", desc: "非常适合情侣或家庭，配有双人床和沙发床，宽敞的开放空间。" },
    ],
    propertyTitle: "套房",
    propertyDesc: "Bellini Suite Garden是一间80平方米的开放式公寓，位于维罗纳历史中心，距罗马剧院仅几步之遥。精致的自然主义设计将殖民风格的细节与现代舒适完美融合。",
    propertyDesc2: "套房设有宽敞的客厅、设备齐全的厨房、舒适的睡眠区（配有双人床和沙发床）、独立浴室以及精心维护的私人花园——在维罗纳市中心实属罕见。",
    highlightsTitle: "您的住宿包括",
    highlights: [
      "历史中心的私人花园",
      "80平方米开放空间",
      "双人床 + 沙发床（最多4位客人）",
      "设备齐全的现代厨房",
      "独立浴室，高端装修",
      "距罗马剧院仅几步",
      "空调和高速WiFi",
      "自助入住可用",
    ],
    galleryTitle: "内部一瞥",
    locationTitle: "黄金地段",
    locationDesc: "Via Redentore 4，维罗纳——位于历史中心的核心，距标志性的罗马剧院仅几步之遥。石桥、百草广场和阿迪杰河畔步行即可到达。",
    ctaTitle: "准备好体验维罗纳了吗？",
    ctaDesc: "直接与我们预订，享受最优惠的价格和个性化服务。没有中间商，没有隐藏费用。",
    ctaButton: "通过WhatsApp预订",
    ctaButton2: "查看可用性",
    contactTitle: "联系我们",
    contactAddress: "Via Redentore 4，维罗纳，意大利",
    contactPhone: "+39 331 806 6110",
    contactEmail: "info@bellinisuitegarden.com",
    footer: "© 2026 Bellini Suite Garden. 保留所有权利。",
  },
};

const Index = () => {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "it";
    const saved = window.localStorage.getItem("bellini-lang");
    if (saved && ["it", "en", "ru", "es", "de", "ar", "zh"].includes(saved)) return saved as Lang;
    const browserLang = window.navigator.language.toLowerCase();
    if (browserLang.startsWith("it")) return "it";
    if (browserLang.startsWith("ru")) return "ru";
    if (browserLang.startsWith("es")) return "es";
    if (browserLang.startsWith("de")) return "de";
    if (browserLang.startsWith("ar")) return "ar";
    if (browserLang.startsWith("zh")) return "zh";
    return "en";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownDesktopRef = useRef<HTMLDivElement>(null);
  const langDropdownMobileRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];
  const currentLangOption = LANG_OPTIONS.find((l) => l.code === lang)!;

  useEffect(() => {
    window.localStorage.setItem("bellini-lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("translate", "no");
    document.documentElement.classList.add("notranslate");
  }, [lang]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const isInsideDesktop = langDropdownDesktopRef.current?.contains(target);
      const isInsideMobile = langDropdownMobileRef.current?.contains(target);
      if (!isInsideDesktop && !isInsideMobile) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLang = (code: Lang) => {
    setLang(code);
    setLangDropdownOpen(false);
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
            <div className="relative" ref={langDropdownDesktopRef} translate="no">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="notranslate flex items-center gap-1.5 text-sm font-semibold text-primary border border-primary rounded-full px-3 py-1 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <span className="text-base leading-none">{currentLangOption.flag}</span>
                <span>{currentLangOption.code.toUpperCase()}</span>
                <ChevronDown size={14} className={`transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-popover border border-border rounded-xl shadow-lg py-1 z-50">
                  {LANG_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => selectLang(opt.code)}
                      className={`notranslate w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent transition-colors ${lang === opt.code ? "font-bold text-primary" : "text-foreground"}`}
                    >
                      <span className="text-lg">{opt.flag}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex md:hidden items-center gap-3">
            <div className="relative" ref={langDropdownMobileRef} translate="no">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="notranslate flex items-center gap-1.5 text-sm font-semibold text-primary border border-primary rounded-full px-3 py-1"
              >
                <span className="text-base leading-none">{currentLangOption.flag}</span>
                <span>{currentLangOption.code.toUpperCase()}</span>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-popover border border-border rounded-xl shadow-lg py-1 z-50">
                  {LANG_OPTIONS.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => selectLang(opt.code)}
                      className={`notranslate w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent transition-colors ${lang === opt.code ? "font-bold text-primary" : "text-foreground"}`}
                    >
                      <span className="text-lg">{opt.flag}</span>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
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
            <span className="text-primary-foreground text-lg md:text-xl font-semibold tracking-wide">{t.heroCta}</span>
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
                  <Maximize size={16} /> {{ it: "80 mq", en: "80 sqm", ru: "80 кв.м", es: "80 m²", de: "80 m²" }[lang]}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-foreground bg-background px-4 py-2 rounded-full">
                  <Users size={16} /> {{ it: "Max 4", en: "Max 4", ru: "До 4", es: "Máx 4", de: "Max 4" }[lang]}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-foreground bg-background px-4 py-2 rounded-full">
                  <Leaf size={16} /> {{ it: "Giardino Privato", en: "Private Garden", ru: "Частный сад", es: "Jardín Privado", de: "Privater Garten" }[lang]}
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
              <p className="text-xs text-muted-foreground mt-1">{{ it: "Tocca per chiamare", en: "Tap to call", ru: "Нажмите для звонка", es: "Toca para llamar", de: "Zum Anrufen tippen" }[lang]}</p>
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="p-6 group rounded-xl hover:bg-secondary/60 transition-colors">
              <MessageCircle className="mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" size={24} />
              <p className="text-sm text-primary font-medium">WhatsApp</p>
              <p className="text-xs text-muted-foreground mt-1">{{ it: "Scrivici su WhatsApp", en: "Message us on WhatsApp", ru: "Напишите нам в WhatsApp", es: "Escríbenos en WhatsApp", de: "Schreiben Sie uns auf WhatsApp" }[lang]}</p>
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
