import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: {
    brand:"Bhumi Map", tagline:"Measure Land Easily, Calculate Accurately",
    home:"Home", calculator:"Calculator", converter:"Converter", units:"Land Units",
    guide:"Guide", history:"History", faq:"FAQ", about:"About",
    heroTitle:"Bangladesh Land Measurement Calculator",
    heroText:"Calculate land area in Square Feet, Decimal, Shotok, Katha, Bigha, Acre and other common Bangladesh units.",
    start:"Start Calculating", explore:"Explore Units",
    shape:"Land Shape", rectangle:"Rectangle", square:"Square", triangle:"Triangle", irregular:"Irregular",
    method:"Triangle Method", baseHeight:"Base & Height", threeSides:"Three Sides",
    length:"Length", width:"Width", height:"Height", side:"Side", sideA:"Side A", sideB:"Side B", sideC:"Side C",
    unit:"Unit", feet:"Feet", meter:"Meter", yard:"Yard", calculate:"Calculate", result:"Calculation Result",
    save:"Save", print:"Print", clear:"Clear", saved:"Saved", invalidTriangle:"These three measurements cannot form a triangle.",
    area:"Area", sqft:"Square Feet", sqm:"Square Meter", decimal:"Decimal / Shotok", katha:"Katha", bigha:"Bigha",
    acre:"Acre", hectare:"Hectare", chhatak:"Chhatak", kani:"Kani", gonda:"Gonda", kora:"Kora",
    historyTitle:"Calculation History", noHistory:"No calculations saved yet.",
    unitsTitle:"Bangladesh Land Measurement Units", guideTitle:"Land Measurement Guide",
    faqTitle:"Frequently Asked Questions", aboutTitle:"About Bhumi Map",
    notice:"For estimation and general measurement only. Verify legal/property measurements against official records and a qualified surveyor.",
    irregularInfo:"For irregular plots, divide the land into triangles, calculate each triangle, then add the areas.",
    triangleInfo:"For base/height, Area = ½ × Base × Height. For three sides, Heron's formula is used.",
    converter:"Converter",
    rightsreserved: "All rights reserved.",
    designDeveloped: "Design & Developed By"
  }},
  bn: { translation: {
    brand:"ভূমি মাপ", tagline:"সহজে জমি মাপুন, সঠিকভাবে হিসাব করুন",
    home:"হোম", calculator:"ক্যালকুলেটর", converter:"রূপান্তর", units:"ভূমির একক",
    guide:"গাইড", history:"ইতিহাস", faq:"জিজ্ঞাসা", about:"পরিচিতি",
    heroTitle:"বাংলাদেশ জমি মাপ ও হিসাব ক্যালকুলেটর",
    heroText:"স্কয়ার ফিট, শতাংশ/শতক, কাঠা, বিঘা, একর এবং অন্যান্য প্রচলিত এককে জমির হিসাব করুন।",
    start:"হিসাব শুরু করুন", explore:"একক দেখুন",
    shape:"জমির আকৃতি", rectangle:"আয়তক্ষেত্র", square:"বর্গক্ষেত্র", triangle:"ত্রিভুজ", irregular:"অনিয়মিত",
    method:"ত্রিভুজের পদ্ধতি", baseHeight:"ভিত্তি ও উচ্চতা", threeSides:"তিন বাহু",
    length:"দৈর্ঘ্য", width:"প্রস্থ", height:"উচ্চতা", side:"বাহু", sideA:"বাহু A", sideB:"বাহু B", sideC:"বাহু C",
    unit:"একক", feet:"ফুট", meter:"মিটার", yard:"গজ", calculate:"হিসাব করুন", result:"হিসাবের ফলাফল",
    save:"সংরক্ষণ", print:"প্রিন্ট", clear:"পরিষ্কার", saved:"সংরক্ষিত", invalidTriangle:"এই তিনটি পরিমাপ দিয়ে ত্রিভুজ তৈরি করা সম্ভব নয়।",
    area:"ক্ষেত্রফল", sqft:"স্কয়ার ফিট", sqm:"স্কয়ার মিটার", decimal:"শতাংশ / শতক", katha:"কাঠা", bigha:"বিঘা",
    acre:"একর", hectare:"হেক্টর", chhatak:"ছটাক", kani:"কানি", gonda:"গণ্ডা", kora:"কোরা",
    historyTitle:"হিসাবের ইতিহাস", noHistory:"এখনও কোনো হিসাব সংরক্ষণ করা হয়নি।",
    unitsTitle:"বাংলাদেশের ভূমি পরিমাপের একক", guideTitle:"জমি মাপার গাইড",
    faqTitle:"সাধারণ জিজ্ঞাসা", aboutTitle:"ভূমি মাপ সম্পর্কে",
    notice:"এটি সাধারণ ও আনুমানিক হিসাবের জন্য। আইনগত বা সম্পত্তির কাজে সরকারি রেকর্ড ও যোগ্য সার্ভেয়ারের মাধ্যমে পরিমাপ যাচাই করুন।",
    irregularInfo:"অনিয়মিত জমিকে কয়েকটি ত্রিভুজে ভাগ করে প্রতিটি ত্রিভুজের ক্ষেত্রফল বের করে যোগ করুন।",
    triangleInfo:"ভিত্তি/উচ্চতার জন্য ক্ষেত্রফল = ½ × ভিত্তি × উচ্চতা। তিন বাহুর জন্য Heron's formula ব্যবহার করা হয়।",
    converter:"রূপান্তর",
    rightsreserved: "সর্বস্বত্ব সংরক্ষিত।",
    designDeveloped: "ডিজাইন ও ডেভেলপ করেছেন"
  }}
};

i18n.use(initReactI18next).init({
  resources, lng: localStorage.getItem("bhumi-language") || "en", fallbackLng: "en",
  interpolation: { escapeValue: false }
});
export default i18n;