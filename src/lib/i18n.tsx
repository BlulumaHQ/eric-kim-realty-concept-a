import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "ko";

type Entry = { en: string; ko: string };
type Dict = Record<string, Entry>;

export const translations: Dict = {
  // Nav
  "nav.home": { en: "Home", ko: "홈" },
  "nav.services": { en: "Services", ko: "서비스" },
  "nav.commercial": { en: "Commercial", ko: "상업용 부동산" },
  "nav.presale": { en: "Presale", ko: "분양" },
  "nav.listings": { en: "Listings", ko: "매물" },
  "nav.about": { en: "About", ko: "소개" },
  "nav.contact": { en: "Contact", ko: "문의하기" },
  "nav.contactEric": { en: "Contact Eric", ko: "Eric에게 문의" },

  // Top bar
  "top.tagline": {
    en: "Metro Vancouver · Residential · Commercial · Presale",
    ko: "Metro Vancouver · 주거용 · 상업용 · 분양",
  },
  "top.language": { en: "Language", ko: "언어" },
  "top.bookShort": { en: "Book Consultation", ko: "상담 예약" },

  // Hero (generic slide)
  "hero.eyebrow": { en: "Eric Kim · Vancouver REALTOR®", ko: "Eric Kim · Vancouver REALTOR®" },
  "hero.title.a": { en: "Helping Families Find", ko: "Vancouver에서 우리 가족의" },
  "hero.title.home": { en: "Home", ko: "보금자리" },
  "hero.title.b": { en: "in Greater Vancouver", ko: "를 찾아드립니다" },
  "hero.subtitle": {
    en: "A trusted residential realtor guiding buyers, sellers, and first-time homeowners across Vancouver, Burnaby, Coquitlam, Richmond, and Surrey — with patience, clarity, and care from first conversation to keys in hand.",
    ko: "Vancouver, Burnaby, Coquitlam, Richmond, Surrey 전역에서 매매와 첫 내 집 마련을 도와드리는 신뢰받는 한인 REALTOR®입니다. 첫 상담부터 클로징까지, 차분하고 꼼꼼하게 함께합니다.",
  },
  "hero.cta.book": { en: "Book a Consultation", ko: "상담 예약하기" },
  "hero.cta.view": { en: "View Listings", ko: "매물 보기" },
  "hero.reviews": { en: "Google Reviews", ko: "구글 리뷰" },
  "hero.verified": { en: "Verified", ko: "검증된" },
  "hero.reviewsNote": {
    en: "Trusted by Vancouver homebuyers and sellers — from first-time buyers in Burnaby to families upsizing across Metro Vancouver.",
    ko: "Burnaby의 첫 내 집 마련 고객부터 Metro Vancouver 전역의 이사 가족까지, 많은 분들이 믿고 찾아주십니다.",
  },
  "hero.ratedAria": { en: "Rated 5 out of 5", ko: "5점 만점에 5점" },

  // Hero (listing slide)
  "hero.featured": { en: "Featured Listing", ko: "추천 매물" },
  "hero.viewListing": { en: "View Listing", ko: "매물 자세히 보기" },
  "hero.bookViewing": { en: "Book a Viewing", ko: "방문 예약하기" },
  "hero.priceOnRequest": { en: "Price upon request", ko: "가격 문의" },

  // Conversion bar
  "cb.buy.title": { en: "Buying a Home", ko: "주택 구매" },
  "cb.buy.desc": {
    en: "Find the right home for your family across Greater Vancouver.",
    ko: "Greater Vancouver에서 우리 가족에게 꼭 맞는 집을 찾아드립니다.",
  },
  "cb.sell.title": { en: "Selling a Home", ko: "주택 판매" },
  "cb.sell.desc": {
    en: "List with a clear pricing, marketing, and negotiation strategy.",
    ko: "명확한 가격 전략과 마케팅, 협상력으로 매도를 진행해 드립니다.",
  },
  "cb.first.title": { en: "First-Time Buyers", ko: "첫 주택 구매" },
  "cb.first.desc": {
    en: "Patient guidance through every step of your first purchase.",
    ko: "처음 집을 사시는 분들도 매 단계 차근차근 안내해 드립니다.",
  },
  "cb.free.title": { en: "Free Consultation", ko: "무료 상담" },
  "cb.free.desc": {
    en: "Book a no-pressure conversation about your home goals.",
    ko: "부담 없이 편하게 부동산 계획을 상담받아 보세요.",
  },
  "cb.learn": { en: "Learn More", ko: "자세히 보기" },

  // Featured listings
  "fl.eyebrow": { en: "Featured Homes", ko: "추천 매물" },
  "fl.title": { en: "Current Residential Listings", ko: "현재 진행 중인 주거용 매물" },
  "fl.desc": {
    en: "A live look at homes Eric is currently representing across Greater Vancouver. Contact Eric for full details, private showings, and the latest off-market opportunities.",
    ko: "Eric이 현재 Greater Vancouver에서 진행 중인 매물을 실시간으로 확인하실 수 있습니다. 상세 정보, 단독 투어, 비공개 매물 안내는 직접 문의 주세요.",
  },
  "fl.badge.sale": { en: "For Sale", ko: "매매" },
  "fl.badge.sold": { en: "Sold", ko: "판매 완료" },
  "fl.badge.lease": { en: "For Lease", ko: "임대" },
  "fl.viewSold": { en: "View Sold Details", ko: "거래 내역 보기" },
  "fl.requestShowing": { en: "Request Showing", ko: "방문 예약" },
  "fl.requestPrivate": { en: "Request Private Showing", ko: "단독 방문 예약" },
  "fl.spotlight": { en: "Spotlight Listing", ko: "스포트라이트 매물" },
  "fl.offmarket.eyebrow": { en: "Off-Market Access", ko: "비공개 매물 안내" },
  "fl.offmarket.title": { en: "Looking for something specific?", ko: "찾으시는 조건이 있으신가요?" },
  "fl.offmarket.desc": {
    en: "Eric regularly works with quiet listings and pre-market opportunities that never reach the MLS. Share what you're searching for and get matched first.",
    ko: "Eric은 MLS에 올라오지 않는 비공개 매물과 사전 공개 기회를 꾸준히 다루고 있습니다. 원하시는 조건을 알려주시면 가장 먼저 연결해 드립니다.",
  },
  "fl.startPrivate": { en: "Start a Private Search", ko: "비공개 검색 시작하기" },
  "fl.bed": { en: "Bed", ko: "베드룸" },
  "fl.bath": { en: "Bath", ko: "욕실" },
  "fl.inquire": { en: "Inquire", ko: "문의하기" },

  // Commercial
  "cf.eyebrow": { en: "Commercial", ko: "상업용 부동산" },
  "cf.title": { en: "Commercial Real Estate Opportunities", ko: "상업용 부동산 매물" },
  "cf.desc": {
    en: "Business locations, investment properties, retail and office spaces — represented with the same attentive process Eric brings to every transaction.",
    ko: "사업장, 투자용 부동산, 리테일·오피스 공간까지 — Eric이 모든 거래에 쏟는 세심한 프로세스로 진행해 드립니다.",
  },
  "cf.available": { en: "Available", ko: "현재 진행 중" },
  "cf.forLease": { en: "For Lease", ko: "임대 매물" },
  "cf.forSale": { en: "For Sale", ko: "매매 매물" },
  "cf.featuredOpp": { en: "Featured Opportunity", ko: "추천 매물" },
  "cf.inquireAbout": { en: "Inquire About This Property", ko: "이 매물 문의하기" },
  "cf.discussCta": { en: "Discuss a Commercial Opportunity", ko: "상업용 부동산 상담하기" },

  // Recently Sold
  "rs.eyebrow": { en: "Track Record", ko: "거래 실적" },
  "rs.title": { en: "Recently Sold Across Greater Vancouver", ko: "Greater Vancouver 최근 거래 완료 매물" },
  "rs.desc": {
    en: "Real homes, real outcomes. A look at Eric's recent residential transactions — every client receives the same attentive process.",
    ko: "실제 주택, 실제 결과. Eric의 최근 주거용 거래 사례입니다 — 모든 고객분께 동일하게 정성스러운 프로세스를 제공합니다.",
  },
  "rs.requestVal": { en: "Request a Home Valuation", ko: "내 집 시세 평가 요청" },
  "rs.recentResult": { en: "Recent Result", ko: "최근 거래" },

  // Areas
  "ae.eyebrow": { en: "Local Expertise", ko: "지역 전문성" },
  "ae.title": { en: "Neighbourhoods Eric Knows Inside Out", ko: "Eric이 가장 잘 아는 지역들" },
  "ae.desc": {
    en: "Greater Vancouver is a collection of distinct communities. Eric helps clients understand the lifestyle, value, and long-term potential of each area.",
    ko: "Greater Vancouver는 각기 다른 매력을 지닌 동네들이 모인 곳입니다. Eric은 각 지역의 라이프스타일, 가치, 장기적인 잠재력을 함께 살펴봐 드립니다.",
  },
  "ae.greater": { en: "Greater Vancouver", ko: "Greater Vancouver" },
  "ae.vancouver.desc": {
    en: "West Side, East Van, and Downtown — character homes, condos, and family neighbourhoods.",
    ko: "West Side, East Van, Downtown — 캐릭터 홈, 콘도, 가족 친화적인 동네까지.",
  },
  "ae.burnaby.desc": {
    en: "Brentwood, Metrotown, and North Burnaby — modern towers and established residential streets.",
    ko: "Brentwood, Metrotown, North Burnaby — 현대적인 고층 콘도와 안정적인 주거 단지.",
  },
  "ae.richmond.desc": {
    en: "Steveston, Brighouse, and Terra Nova — family homes, townhomes, and waterfront living.",
    ko: "Steveston, Brighouse, Terra Nova — 단독주택, 타운홈, 워터프론트 라이프까지.",
  },
  "ae.coquitlam.desc": {
    en: "North Coquitlam and Burke Mountain — SkyTrain access, parks, and growing family communities.",
    ko: "North Coquitlam, Burke Mountain — SkyTrain 접근성, 공원, 신생 가족 커뮤니티까지.",
  },
  "ae.surrey.desc": {
    en: "South Surrey, Cloverdale, and Fleetwood — detached homes, townhomes, and new developments.",
    ko: "South Surrey, Cloverdale, Fleetwood — 단독주택, 타운홈, 신축 분양까지.",
  },

  // Services section
  "sv.eyebrow": { en: "Services", ko: "서비스" },
  "sv.title": { en: "Residential Real Estate, Built Around Your Family", ko: "우리 가족 중심으로 진행되는 주거용 부동산" },
  "sv.desc": {
    en: "A focused practice helping Greater Vancouver buyers, sellers, and first-time homeowners — with quiet expertise across investment and commercial when needed.",
    ko: "Greater Vancouver의 매수자, 매도자, 첫 내 집 마련 고객을 위한 전문 서비스입니다. 필요할 때는 투자용·상업용까지 폭넓게 도와드립니다.",
  },
  "sv.mostRequested": { en: "Most Requested", ko: "가장 많은 문의" },
  "sv.buy.title": { en: "Buying a Home", ko: "주택 구매" },
  "sv.buy.desc": {
    en: "From neighbourhood discovery to closing day — Eric helps you understand the market, evaluate homes, and write a confident offer.",
    ko: "동네 탐색부터 클로징까지 — 시장 흐름을 함께 읽고, 매물을 객관적으로 평가하며, 자신 있게 오퍼를 쓸 수 있도록 도와드립니다.",
  },
  "sv.buy.cta": { en: "Start Your Home Search", ko: "내 집 찾기 시작하기" },
  "sv.sell.title": { en: "Selling a Home", ko: "주택 판매" },
  "sv.sell.desc": {
    en: "Pricing strategy, professional marketing, and skilled negotiation — designed to position your home for the strongest possible result.",
    ko: "가격 전략, 전문 마케팅, 노련한 협상 — 우리 집이 최고의 조건으로 거래되도록 준비해 드립니다.",
  },
  "sv.sell.cta": { en: "Request a Home Valuation", ko: "시세 평가 요청하기" },
  "sv.first.title": { en: "First-Time Buyers", ko: "첫 주택 구매" },
  "sv.first.desc": {
    en: "A patient, no-pressure approach for first-time buyers — clear answers about budgeting, mortgages, deposits, and long-term value.",
    ko: "처음 집을 사시는 분들도 부담 없이 — 예산, 모기지, 디파짓, 장기 가치까지 알기 쉽게 설명해 드립니다.",
  },
  "sv.first.cta": { en: "First-Time Buyer Guide", ko: "첫 구매 가이드 보기" },
  "sv.inv.title": { en: "Investment & Commercial", ko: "투자·상업용" },
  "sv.inv.desc": {
    en: "Residential investment guidance and commercial real estate support for clients building a long-term portfolio.",
    ko: "장기 포트폴리오를 만들어 가시는 분들을 위해 주거용 투자와 상업용 부동산까지 함께 안내해 드립니다.",
  },
  "sv.inv.cta": { en: "Explore Investment Options", ko: "투자 매물 살펴보기" },

  // Why Eric
  "we.eyebrow": { en: "Why Eric", ko: "왜 Eric인가요" },
  "we.title": {
    en: "Clear Guidance. Local Market Focus. Direct Communication.",
    ko: "명확한 가이드. 지역 시장 중심. 직접 소통.",
  },
  "we.p1.title": { en: "Direct advisor communication", ko: "Eric과 직접 소통" },
  "we.p1.desc": {
    en: "You speak directly with Eric — not a call center or assistant.",
    ko: "콜센터나 어시스턴트가 아닌, Eric과 직접 통화하고 상담하실 수 있습니다.",
  },
  "we.p2.title": { en: "Residential, commercial & presale knowledge", ko: "주거·상업·분양 전 분야 경험" },
  "we.p2.desc": {
    en: "Coverage across the most common Metro Vancouver opportunities.",
    ko: "Metro Vancouver에서 가장 많이 다뤄지는 거래 유형을 폭넓게 안내해 드립니다.",
  },
  "we.p3.title": { en: "Metro Vancouver market focus", ko: "Metro Vancouver 시장 집중" },
  "we.p3.desc": {
    en: "Local context shapes every recommendation and search.",
    ko: "현지 시장 상황을 바탕으로 매물 추천과 검색을 진행합니다.",
  },
  "we.p4.title": { en: "Practical guidance, start to next step", ko: "처음부터 다음 단계까지 실질적인 안내" },
  "we.p4.desc": {
    en: "Clear direction from the first conversation through closing.",
    ko: "첫 상담부터 클로징까지, 어떤 결정을 해야 하는지 명확히 안내해 드립니다.",
  },

  // Process
  "pr.eyebrow": { en: "Process", ko: "진행 절차" },
  "pr.title": { en: "A Simple Process From First Conversation to Next Step", ko: "첫 상담부터 다음 단계까지, 간단한 진행 절차" },
  "pr.s1.title": { en: "Book a Consultation", ko: "상담 예약" },
  "pr.s1.desc": {
    en: "Tell Eric what you are looking for and your timeline.",
    ko: "찾고 계신 매물과 일정을 Eric에게 알려주세요.",
  },
  "pr.s2.title": { en: "Review Your Goals", ko: "목표 점검" },
  "pr.s2.desc": {
    en: "Discuss location, budget, property type, and investment or lifestyle needs.",
    ko: "지역, 예산, 매물 종류, 투자·라이프스타일 목표를 함께 정리합니다.",
  },
  "pr.s3.title": { en: "Explore Suitable Options", ko: "맞춤 매물 검토" },
  "pr.s3.desc": {
    en: "Review available residential, commercial, or presale opportunities.",
    ko: "주거용·상업용·분양 매물 중 조건에 맞는 옵션을 함께 살펴봅니다.",
  },
  "pr.s4.title": { en: "Move Forward With Confidence", ko: "자신 있게 진행" },
  "pr.s4.desc": {
    en: "Get guidance through the next steps with clear communication.",
    ko: "다음 단계까지 명확한 소통으로 안내해 드립니다.",
  },

  // About section
  "ab.eyebrow": { en: "About", ko: "소개" },
  "ab.title": { en: "Meet Eric Kim", ko: "Eric Kim을 소개합니다" },
  "ab.p1": {
    en: "Eric Kim is a residential REALTOR® with Initia Real Estate, helping families across Greater Vancouver buy and sell homes with confidence. His approach is patient, transparent, and detail-driven — built around understanding each client's lifestyle, budget, and long-term goals before recommending a single property.",
    ko: "Eric Kim은 Initia Real Estate 소속 주거용 REALTOR®로, Greater Vancouver 가족 고객들의 매매를 자신 있게 도와드리고 있습니다. 차분하고 투명하며 디테일을 놓치지 않는 스타일로, 한 채의 매물을 추천하기 전에 먼저 고객의 라이프스타일, 예산, 장기 목표를 충분히 이해하는 것을 우선합니다.",
  },
  "ab.p2": {
    en: "Bilingual in English and Korean, Eric serves clients across Vancouver, Burnaby, Richmond, Coquitlam, and Surrey — with quiet expertise in residential investment and commercial opportunities when needed.",
    ko: "영어와 한국어 모두 가능한 Eric은 Vancouver, Burnaby, Richmond, Coquitlam, Surrey 지역의 고객들을 도와드리고 있으며, 필요할 때는 주거용 투자와 상업용 부동산까지 폭넓게 안내해 드립니다.",
  },
  "ab.k.title": { en: "Title", ko: "직함" },
  "ab.v.title": { en: "REALTOR® · Initia Real Estate", ko: "REALTOR® · Initia Real Estate" },
  "ab.k.focus": { en: "Focus", ko: "전문 분야" },
  "ab.v.focus": { en: "Residential Buying & Selling", ko: "주거용 매매" },
  "ab.k.area": { en: "Service Area", ko: "서비스 지역" },
  "ab.v.area": { en: "Greater Vancouver, BC", ko: "Greater Vancouver, BC" },
  "ab.k.lang": { en: "Languages", ko: "사용 언어" },
  "ab.v.lang": { en: "English · 한국어", ko: "English · 한국어" },
  "ab.k.approach": { en: "Approach", ko: "스타일" },
  "ab.v.approach": { en: "Patient, transparent, detail-driven", ko: "차분하고 투명하며 디테일에 강한 스타일" },
  "ab.brokerage": { en: "Brokerage", ko: "소속 브로커리지" },
  "ab.contactEric": { en: "Contact Eric", ko: "Eric에게 문의하기" },

  // Instagram
  "ig.eyebrow": { en: "Instagram", ko: "인스타그램" },
  "ig.title": { en: "Follow Eric's Latest Real Estate Updates", ko: "Eric의 최신 부동산 소식을 인스타그램에서 만나보세요" },
  "ig.desc": {
    en: "See current real estate updates, property opportunities, market content, and featured posts on Instagram.",
    ko: "최신 부동산 소식, 매물 정보, 시장 동향, 추천 포스트를 인스타그램에서 확인하실 수 있습니다.",
  },
  "ig.label.commercial": { en: "Commercial Spotlight", ko: "상업용 매물 스포트라이트" },
  "ig.label.presale": { en: "Presale Update", ko: "분양 소식" },
  "ig.label.market": { en: "Market Note", ko: "시장 동향" },
  "ig.label.featured": { en: "Featured Listing", ko: "추천 매물" },

  // Reviews
  "cx.eyebrow": { en: "Client Experiences", ko: "고객 후기" },
  "cx.title": { en: "Trusted by Vancouver Buyers & Sellers", ko: "Vancouver 매수·매도 고객들이 신뢰하는 REALTOR®" },
  "cx.note": {
    en: "Verified Google Reviews from clients across Metro Vancouver.",
    ko: "Metro Vancouver 전역의 고객분들이 남겨주신 검증된 구글 리뷰입니다.",
  },
  "cx.r1": {
    en: "They are always kind and, above all, highly professional. From start to finish, Eric was patient, honest, and never pressured us.",
    ko: "항상 친절하시고, 무엇보다 정말 프로페셔널하세요. 처음부터 끝까지 Eric은 차분하고 솔직하게, 한 번도 부담을 주지 않으면서 도와주셨어요.",
  },
  "cx.r2": {
    en: "Eric sold our townhouse above market value and helped us secure our new home. His negotiation skills are exceptional.",
    ko: "Eric 덕분에 저희 타운하우스를 시세보다 좋은 가격에 팔고, 새 집까지 잘 잡을 수 있었어요. 협상 능력이 정말 뛰어나세요.",
  },
  "cx.r3": {
    en: "Eric has a strong understanding of the Vancouver market and provides thoughtful, client-first advice.",
    ko: "Eric은 Vancouver 시장을 정말 잘 이해하고 계시고, 항상 고객 입장에서 세심하게 조언해 주세요.",
  },
  "cx.r4": {
    en: "Working with Eric was a pleasure. He understands the Burnaby market deeply and is extremely responsive and detail-oriented.",
    ko: "Eric과 함께한 시간이 정말 즐거웠어요. Burnaby 시장에 대해 깊이 알고 계시고, 연락도 빠르고 디테일까지 꼼꼼히 챙겨 주십니다.",
  },
  "cx.r5": {
    en: "Eric is excellent at planning and provides insights that helped us make confident financial decisions.",
    ko: "Eric은 계획을 정말 잘 세워 주시고, 덕분에 자신 있게 재정적인 결정을 내릴 수 있었습니다.",
  },

  // Contact / form
  "ct.eyebrow": { en: "Contact", ko: "문의" },
  "ct.title": { en: "Book a Real Estate Consultation", ko: "부동산 상담 예약하기" },
  "ct.desc": {
    en: "Whether you are buying, selling, investing, exploring commercial real estate, or reviewing presale opportunities, contact Eric directly to discuss your next step.",
    ko: "매수, 매도, 투자, 상업용 부동산, 분양 매물 — 어떤 단계든 다음 스텝이 궁금하시다면 Eric에게 직접 문의 주세요.",
  },
  "ct.phone": { en: "Phone", ko: "전화" },
  "ct.email": { en: "Email", ko: "이메일" },
  "ct.instagram": { en: "Instagram", ko: "인스타그램" },
  "ct.received": { en: "Inquiry Received", ko: "문의가 접수되었습니다" },
  "ct.thanks": {
    en: "Thank you. Eric will follow up directly regarding your inquiry.",
    ko: "감사합니다. Eric이 직접 연락드릴 예정입니다.",
  },
  "ct.fullName": { en: "Full Name", ko: "성함" },
  "ct.phoneLabel": { en: "Phone", ko: "연락처" },
  "ct.interest": { en: "I'm interested in", ko: "관심 분야" },
  "ct.message": { en: "Message", ko: "메시지" },
  "ct.placeholder": {
    en: "Tell Eric about your goals, timeline, or questions...",
    ko: "원하시는 조건, 일정, 궁금하신 점을 자유롭게 적어주세요...",
  },
  "ct.preferred": { en: "Preferred Contact Method", ko: "선호하는 연락 방법" },
  "ct.send": { en: "Send Inquiry", ko: "문의 보내기" },
  "ct.followNote": {
    en: "Eric will follow up directly regarding your inquiry.",
    ko: "Eric이 문의에 대해 직접 연락드립니다.",
  },
  "ct.method.phone": { en: "Phone", ko: "전화" },
  "ct.method.email": { en: "Email", ko: "이메일" },
  "ct.method.text": { en: "Text Message", ko: "문자" },
  "ct.interest.resBuy": { en: "Residential Buying", ko: "주거용 매수" },
  "ct.interest.resSell": { en: "Residential Selling", ko: "주거용 매도" },
  "ct.interest.commercial": { en: "Commercial Real Estate", ko: "상업용 부동산" },
  "ct.interest.presale": { en: "Presale Projects", ko: "분양 프로젝트" },
  "ct.interest.investment": { en: "Investment Opportunity", ko: "투자 매물" },
  "ct.interest.general": { en: "General Consultation", ko: "일반 상담" },
  // Validation
  "val.name": { en: "Please enter your name", ko: "성함을 입력해 주세요" },
  "val.email": { en: "Please enter a valid email", ko: "올바른 이메일 주소를 입력해 주세요" },
  "val.message": { en: "Please add a short message", ko: "간단한 메시지를 남겨주세요" },

  // Footer
  "ft.your": { en: "Your Trusted Realtor", ko: "신뢰받는 한인 REALTOR®" },
  "ft.subtitle": { en: "REALTOR® · Metro Vancouver", ko: "REALTOR® · Metro Vancouver" },
  "ft.bio": {
    en: "Residential, commercial, and presale real estate guidance — delivered with discretion, market intelligence, and a commitment to long-term client relationships.",
    ko: "주거용, 상업용, 분양 부동산까지 — 신중함과 시장 통찰력, 그리고 오랜 인연을 소중히 여기는 마음으로 안내해 드립니다.",
  },
  "ft.getInTouch": { en: "Get in Touch", ko: "연락하기" },
  "ft.location": { en: "Metro Vancouver, British Columbia", ko: "Metro Vancouver, British Columbia" },
  "ft.mlsMember": { en: "MLS® Member", ko: "MLS® 회원" },
  "ft.rights": {
    en: "© 2026 Eric Kim, REALTOR®. All rights reserved.",
    ko: "© 2026 Eric Kim, REALTOR®. 모든 권리 보유.",
  },
  "ft.webDesign": { en: "Web Design by", ko: "웹 디자인:" },

  // CTA Band
  "cta.eyebrow": { en: "Next Step", ko: "다음 단계" },
  "cta.title": { en: "Ready to Discuss Your Next Real Estate Move?", ko: "다음 부동산 계획, 함께 이야기해 보실까요?" },
  "cta.desc": {
    en: "Book a private consultation with Eric to review your goals across residential, commercial, or presale opportunities.",
    ko: "Eric과 일대일 상담을 통해 주거용, 상업용, 분양 등 다양한 옵션을 함께 살펴보세요.",
  },
  "cta.book": { en: "Book a Consultation", ko: "상담 예약하기" },

  // Listings index page
  "li.cta.title": { en: "Don't See What You're Looking For?", ko: "원하시는 매물이 안 보이시나요?" },
  "li.cta.desc": {
    en: "Tell Eric what kind of home you have in mind and he'll share matching active and off-market opportunities.",
    ko: "원하시는 조건을 알려주시면, 공개 매물부터 비공개 매물까지 맞춤으로 안내해 드립니다.",
  },

  // Listing detail
  "ld.notFound.title": { en: "Listing not found", ko: "매물을 찾을 수 없습니다" },
  "ld.notFound.desc": {
    en: "This listing may have been removed or the link is incorrect.",
    ko: "해당 매물이 삭제되었거나, 링크가 올바르지 않을 수 있습니다.",
  },
  "ld.viewAll": { en: "View All Listings", ko: "전체 매물 보기" },
  "ld.back": { en: "Back to Listings", ko: "매물 목록으로 돌아가기" },
  "ld.about": { en: "About This Property", ko: "매물 상세 설명" },
  "ld.priceOnRequest": { en: "Price upon request", ko: "가격 문의" },
  "ld.contactLease": { en: "Contact for lease rate", ko: "임대료 문의" },
  "ld.sold": { en: "Sold", ko: "거래 완료" },
  "ld.listed": { en: "Listed", ko: "리스팅" },
  "ld.stat.bedrooms": { en: "Bedrooms", ko: "베드룸" },
  "ld.stat.bathrooms": { en: "Bathrooms", ko: "욕실" },
  "ld.stat.sqft": { en: "Square Feet", ko: "면적 (sqft)" },
  "ld.stat.propertyType": { en: "Property Type", ko: "매물 유형" },
  "ld.stat.yearBuilt": { en: "Year Built", ko: "건축 연도" },
  "ld.stat.buildingType": { en: "Building Type", ko: "건물 유형" },
  "ld.stat.zoning": { en: "Zoning", ko: "용도지역" },
  "ld.stat.leaseRate": { en: "Lease Rate", ko: "임대료" },
  "ld.inquire": { en: "Inquire", ko: "문의" },
  "ld.requestInfo": { en: "Request Information", ko: "정보 요청하기" },
  "ld.formNote": {
    en: "Eric will reach out with full details, disclosures, and a private showing.",
    ko: "Eric이 상세 정보, 디스클로저, 단독 방문 일정을 안내해 드립니다.",
  },
  "ld.defaultMessage": {
    en: "I'd like more information about",
    ko: "다음 매물에 대해 자세히 알고 싶습니다:",
  },
  "ld.thanks": {
    en: "Thank you. Eric will follow up directly regarding",
    ko: "감사합니다. 다음 매물에 대해 Eric이 직접 연락드릴 예정입니다:",
  },

  // Services page header
  "spg.title": { en: "Real Estate Services for Every Stage", ko: "모든 단계에 맞춘 부동산 서비스" },
  "spg.desc": {
    en: "Eric helps clients move forward across residential, commercial, and presale real estate in Metro Vancouver.",
    ko: "Eric은 Metro Vancouver의 주거용, 상업용, 분양 부동산 전반에서 고객의 다음 단계를 함께합니다.",
  },

  // Commercial page
  "cpg.title": { en: "Commercial Real Estate in Metro Vancouver", ko: "Metro Vancouver 상업용 부동산" },
  "cpg.desc": {
    en: "Working with business owners and investors on retail, office, mixed-use, and investment opportunities.",
    ko: "사업주와 투자자를 위해 리테일, 오피스, 복합 용도, 투자용 매물을 함께 진행해 드립니다.",
  },
  "cpg.focusTitle": { en: "Areas of Commercial Focus", ko: "주요 상업용 분야" },
  "cpg.f1.title": { en: "Retail & Office Spaces", ko: "리테일·오피스 공간" },
  "cpg.f1.desc": {
    en: "Street-front retail, professional office, and mixed-use opportunities.",
    ko: "스트리트 프론트 리테일, 전문 오피스, 복합 용도 매물까지.",
  },
  "cpg.f2.title": { en: "Investment Properties", ko: "투자용 부동산" },
  "cpg.f2.desc": {
    en: "Income-producing assets reviewed against your investment thesis.",
    ko: "투자 방향에 맞춰 수익형 부동산을 면밀히 검토해 드립니다.",
  },
  "cpg.f3.title": { en: "Owner-User Locations", ko: "오너 사용 매장" },
  "cpg.f3.desc": {
    en: "Operational locations for businesses with growth in mind.",
    ko: "성장하는 사업체를 위한 실사용 매장을 찾아드립니다.",
  },
  "cpg.f4.title": { en: "Lease Opportunities", ko: "임대 매물" },
  "cpg.f4.desc": {
    en: "Lease terms and locations evaluated alongside purchase options.",
    ko: "임대 조건과 위치를 매수 옵션과 함께 비교 검토해 드립니다.",
  },
  "cpg.cta.title": { en: "Discuss a Commercial Opportunity", ko: "상업용 부동산 상담하기" },
  "cpg.cta.desc": {
    en: "Speak directly with Eric about your business location, investment property, or commercial listing.",
    ko: "사업장, 투자 부동산, 상업용 매물 등 어떤 사안이든 Eric과 직접 상담해 보세요.",
  },

  // Presale page
  "pp.title": { en: "New Developments & Presale Opportunities", ko: "신축 분양 및 프리세일 매물" },
  "pp.desc": {
    en: "Explore upcoming projects across Metro Vancouver with practical, client-focused guidance.",
    ko: "Metro Vancouver의 다양한 분양 프로젝트를 실용적이고 고객 중심으로 안내해 드립니다.",
  },
  "pp.h2": { en: "A Practical Approach to Presale Real Estate", ko: "분양 부동산, 실용적인 관점에서 접근합니다" },
  "pp.p": {
    en: "Presale opportunities can be exciting, but they require careful review. Eric helps clients understand the project, timeline, and decision points before moving forward.",
    ko: "분양 매물은 좋은 기회가 될 수 있지만, 그만큼 꼼꼼한 검토가 필요합니다. Eric은 프로젝트의 내용, 일정, 결정 시점까지 함께 살펴봐 드린 후 진행을 도와드립니다.",
  },
  "pp.i1.title": { en: "Project Overview", ko: "프로젝트 개요" },
  "pp.i1.desc": { en: "Understand the developer, location, and product mix.", ko: "디벨로퍼, 입지, 매물 구성을 함께 살펴봅니다." },
  "pp.i2.title": { en: "Timeline & Deposit Structure", ko: "일정 및 디파짓 구조" },
  "pp.i2.desc": { en: "Review key dates and deposit milestones before committing.", ko: "계약 전에 주요 일정과 디파짓 단계를 미리 확인합니다." },
  "pp.i3.title": { en: "Floorplan & Unit Selection", ko: "도면 및 유닛 선택" },
  "pp.i3.desc": { en: "Compare layouts, exposures, and pricing tiers.", ko: "평면도, 향, 가격대를 비교해 가장 좋은 옵션을 선택합니다." },
  "pp.i4.title": { en: "Documentation Review", ko: "서류 검토" },
  "pp.i4.desc": { en: "Walk through documentation with appropriate professional advisors.", ko: "필요한 전문가와 함께 서류를 꼼꼼히 검토해 드립니다." },
  "pp.disclaimer": {
    en: "All property decisions should be reviewed with the appropriate legal, financial, and professional advisors before completion.",
    ko: "모든 부동산 결정은 클로징 전에 법률·재무·전문 어드바이저와 함께 검토하시는 것이 좋습니다.",
  },
  "pp.cta.title": { en: "Looking at a Presale Opportunity?", ko: "분양 매물에 관심이 있으신가요?" },
  "pp.cta.desc": {
    en: "Eric can help you review the project, timeline, and next step before you commit.",
    ko: "계약 전에 프로젝트, 일정, 다음 단계까지 Eric이 함께 검토해 드립니다.",
  },
  "pp.cta.btn": { en: "Request Presale Information", ko: "분양 정보 요청하기" },

  // 404
  "nf.title": { en: "Page not found", ko: "페이지를 찾을 수 없습니다" },
  "nf.desc": {
    en: "The page you're looking for doesn't exist or has been moved.",
    ko: "찾으시는 페이지가 없거나 이동되었습니다.",
  },
  "nf.home": { en: "Go home", ko: "홈으로 가기" },
};

interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
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
    return {
      lang: "en" as Lang,
      setLang: () => {},
      t: (k: string) => translations[k]?.en ?? k,
    };
  }
  return ctx;
}
