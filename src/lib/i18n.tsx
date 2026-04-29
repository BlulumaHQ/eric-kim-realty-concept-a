import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "ko";

type Dict = Record<string, { en: string; ko: string }>;

export const translations: Dict = {
  // Nav
  "nav.home": { en: "Home", ko: "홈" },
  "nav.services": { en: "Services", ko: "서비스" },
  "nav.commercial": { en: "Commercial", ko: "상업용" },
  "nav.presale": { en: "Presale", ko: "프리세일" },
  "nav.listings": { en: "Listings", ko: "매물" },
  "nav.about": { en: "About", ko: "소개" },
  "nav.contact": { en: "Contact", ko: "연락처" },

  // CTAs
  "cta.book": { en: "Book a Consultation", ko: "상담 예약" },
  "cta.bookShort": { en: "Book Consultation", ko: "상담 예약" },
  "cta.call": { en: "Call", ko: "전화" },
  "cta.email": { en: "Email", ko: "이메일" },
  "cta.viewServices": { en: "Explore Services", ko: "서비스 보기" },
  "cta.contact": { en: "Contact Eric", ko: "Eric에게 문의" },

  // Top bar
  "top.tagline": {
    en: "Metro Vancouver · Residential · Commercial · Presale",
    ko: "메트로 밴쿠버 · 주거 · 상업 · 프리세일",
  },
  "top.language": { en: "Language", ko: "언어" },

  // Hero
  "hero.eyebrow": {
    en: "Metro Vancouver Real Estate Advisor",
    ko: "메트로 밴쿠버 부동산 어드바이저",
  },
  "hero.title.l1": { en: "Trusted advisory for", ko: "신뢰받는 자문" },
  "hero.title.l2": { en: "Residential, Commercial", ko: "주거, 상업" },
  "hero.title.l3": { en: "& Presale opportunities.", ko: "& 프리세일 기회" },
  "hero.subtitle": {
    en: "Eric Kim, REALTOR® at Initia Real Estate, helps clients buy, sell, and lease across Metro Vancouver — with a special focus on commercial assets and pre-construction projects.",
    ko: "Initia Real Estate 소속 Eric Kim REALTOR®가 메트로 밴쿠버 전역에서 매매·임대를 도와드립니다. 상업용 자산과 분양 프로젝트에 특화되어 있습니다.",
  },
  "hero.badge.residential": { en: "Residential", ko: "주거용" },
  "hero.badge.commercial": { en: "Commercial", ko: "상업용" },
  "hero.badge.business": { en: "Business Asset / Lease", ko: "사업체 / 임대" },
  "hero.badge.presale": { en: "Presale VIP Access", ko: "프리세일 VIP" },

  // Footer
  "footer.tagline": {
    en: "Residential, Commercial & Presale Real Estate across Metro Vancouver.",
    ko: "메트로 밴쿠버의 주거·상업·프리세일 부동산 전문.",
  },
  "footer.rights": { en: "All rights reserved.", ko: "모든 권리 보유." },
  "footer.explore": { en: "Explore", ko: "둘러보기" },
  "footer.contact": { en: "Get in touch", ko: "문의하기" },
};

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof translations | string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("ek-lang") as Lang | null;
    if (saved === "en" || saved === "ko") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ek-lang", l);
      document.documentElement.lang = l;
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang];
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Safe SSR fallback
    return {
      lang: "en" as Lang,
      setLang: () => {},
      t: (k: string) => translations[k]?.en ?? k,
    };
  }
  return ctx;
}
