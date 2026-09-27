import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {removeHistory,clearHistory} from "./redux/store";
import {useTranslation} from "react-i18next";
import SEO, {SITE_URL} from "./components/SEO";
import Calculator from "./components/Calculator";
import {fmt,fromSqft,SQFT_PER_DECIMAL,SQFT_PER_KATHA,SQFT_PER_BIGHA,SQFT_PER_ACRE} from "./utils/land";
import {useState} from "react";

const KEYWORDS = "Bangladesh land calculator, land measurement Bangladesh, Katha to Decimal, Decimal to Katha, Bigha calculator, jomi mapar hisab, parallelogram land area, trapezium land area, rhombus land area, circular land area, জমি মাপ, জমির হিসাব, শতাংশ থেকে কাঠা, সামান্তরিক জমি, ট্রাপিজিয়াম জমি, রম্বস জমি, বৃত্তাকার জমি";

export function Home(){
  const {t}=useTranslation();
  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"WebApplication",
    "name":"Bhumi Map",
    "alternateName":"ভূমি মাপ",
    "url":SITE_URL,
    "description":t("heroText"),
    "applicationCategory":"UtilitiesApplication",
    "operatingSystem":"Any",
    "browserRequirements":"Requires JavaScript",
    "inLanguage":["en","bn"],
    "offers":{"@type":"Offer","price":"0","priceCurrency":"BDT"},
    "featureList":[
      "Rectangle land area calculator","Square land area calculator","Triangle land area calculator",
      "Parallelogram land area calculator","Trapezium land area calculator","Rhombus land area calculator",
      "Circular land area calculator","Katha, Bigha, Decimal, Acre, Hectare unit conversion"
    ]
  };
  return <>
    <SEO title="Bhumi Map | Bangladesh Land Measurement Calculator" description={t("heroText")} keywords={KEYWORDS} jsonLd={jsonLd}/>
    <div className="hero bg-base-100 py-16">
      <div className="hero-content text-center">
        <div className="max-w-3xl">
          <div className="badge badge-primary mb-4">Bangladesh • বাংলা + English</div>
          <h1 className="text-4xl md:text-6xl font-black">{t("heroTitle")}</h1>
          <p className="py-6 text-lg opacity-80">{t("heroText")}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/calculator" className="btn btn-primary">{t("start")}</Link>
            <Link to="/units" className="btn btn-outline">{t("explore")}</Link>
          </div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 py-12"><Calculator/></div>
  </>;
}

export function CalculatorPage(){
  const {t}=useTranslation();
  return <div className="container mx-auto px-4 py-10">
    <SEO title="Land Calculator Bangladesh | Rectangle, Circle, Rhombus, Trapezium | Bhumi Map" description={t("heroText")} keywords={KEYWORDS}/>
    <h1 className="text-3xl font-black mb-6">{t("calculator")}</h1>
    <Calculator/>
  </div>;
}

export function Converter(){
  const {t}=useTranslation();
  const [unit,setUnit]=useState("decimal"),[value,setValue]=useState("");
  const map={sqft:1,decimal:SQFT_PER_DECIMAL,katha:SQFT_PER_KATHA,bigha:SQFT_PER_BIGHA,acre:SQFT_PER_ACRE};
  const sqft=(Number(value)||0)*map[unit];
  const r=fromSqft(sqft);
  const opts=[["sqft",t("sqft")],["decimal",t("decimal")],["katha",t("katha")],["bigha",t("bigha")],["acre",t("acre")]];
  return <div className="container mx-auto px-4 py-10">
    <SEO title="Katha to Decimal Converter | Bangladesh Land Unit Converter | Bhumi Map" description="Convert Katha, Decimal, Bigha, Acre and Square Feet in Bangladesh instantly." keywords={KEYWORDS}/>
    <div className="max-w-3xl mx-auto card bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="text-3xl font-black">{t("converter")}</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="input input-bordered" type="number" value={value} onChange={e=>setValue(e.target.value)} placeholder="Value"/>
          <select className="select select-bordered" value={unit} onChange={e=>setUnit(e.target.value)}>{opts.map(o=><option key={o[0]} value={o[0]}>{o[1]}</option>)}</select>
        </div>
        {value&&<div className="grid sm:grid-cols-2 gap-3 mt-5">{[[t("sqft"),r.sqft],[t("decimal"),r.decimal],[t("katha"),r.katha],[t("bigha"),r.bigha],[t("acre"),r.acre]].map(([k,v])=><div className="stat bg-base-200 rounded-box" key={k}><div className="stat-title">{k}</div><div className="stat-value text-2xl">{fmt(v,4)}</div></div>)}</div>}
      </div>
    </div>
  </div>;
}

export function Units(){
  const {t}=useTranslation();
  const rows=[[t("sqft"),"435.6 sq ft = 1 Decimal",""],[t("decimal"),"435.6 sq ft",""],[t("katha"),"720 sq ft",""],[t("bigha"),"20 Katha = 14,400 sq ft",""],[t("acre"),"43,560 sq ft = 100 Decimal",""],[t("hectare"),"≈ 2.471 Acres",""],[t("chhatak"),"45 sq ft",""],[t("gonda"),"864 sq ft",""],[t("kora"),"216 sq ft",""]];
  return <div className="container mx-auto px-4 py-10">
    <SEO title="Bangladesh Land Measurement Units | Katha, Bigha, Decimal | Bhumi Map" description="Bangladesh Katha, Decimal, Bigha, Acre and land measurement units explained." keywords={KEYWORDS}/>
    <h1 className="text-3xl font-black mb-6">{t("unitsTitle")}</h1>
    <div className="overflow-x-auto card bg-base-100 shadow"><table className="table"><thead><tr><th>Unit</th><th>Standard relationship</th></tr></thead><tbody>{rows.map(r=><tr key={r[0]}><td className="font-bold">{r[0]}</td><td>{r[1]}</td></tr>)}</tbody></table></div>
    <div className="alert mt-6">{t("notice")}</div>
  </div>;
}

export function Guide(){
  const {t}=useTranslation();
  const shapes = [
    ["rectangle","Area = Length × Width."],
    ["square", null],
    ["triangle","triangleInfo"],
    ["parallelogram","parallelogramInfo"],
    ["trapezium","trapeziumInfo"],
    ["rhombus","rhombusInfo"],
    ["circle","circleInfo"],
    ["irregular","irregularInfo"],
  ];
  return <div className="container mx-auto px-4 py-10 max-w-4xl">
    <SEO title="Bangladesh Land Measurement Guide | All Shapes | Bhumi Map" description="Learn how to calculate rectangle, square, triangle, parallelogram, trapezium, rhombus, circular and irregular land area in Bangladesh." keywords={KEYWORDS}/>
    <h1 className="text-3xl font-black mb-8">{t("guideTitle")}</h1>
    <div className="space-y-5">
      {shapes.map(([key,infoKey])=>
        <div className="card bg-base-100 shadow p-6" key={key}>
          <h2 className="text-xl font-bold">{t(key)}</h2>
          <p>{infoKey ? (infoKey.endsWith("Info") ? t(infoKey) : infoKey) : "Area = Side × Side."}</p>
        </div>
      )}
    </div>
  </div>;
}

export function History(){
  const {t}=useTranslation();
  const history=useSelector(s=>s.history),dispatch=useDispatch();
  return <div className="container mx-auto px-4 py-10">
    <SEO title="Land Calculation History | Bhumi Map" description="Your saved land measurement calculations, stored on this device." noindex={true}/>
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-black">{t("historyTitle")}</h1>
      {history.length>0&&<button className="btn btn-error btn-outline" onClick={()=>dispatch(clearHistory())}>{t("clear")}</button>}
    </div>
    {!history.length?<div className="alert">{t("noHistory")}</div>:
    <div className="space-y-3">{history.map(x=>
      <div key={x.id} className="card bg-base-100 shadow">
        <div className="card-body flex-row items-center justify-between">
          <div>
            <div className="font-bold capitalize">{t(x.shape)}</div>
            <div className="text-sm opacity-70">{new Date(x.date).toLocaleString()}</div>
            <div>{fmt(x.result.sqft)} sq ft • {fmt(x.result.decimal,4)} Decimal • {fmt(x.result.katha,4)} Katha</div>
          </div>
          <button className="btn btn-sm btn-error btn-outline" onClick={()=>dispatch(removeHistory(x.id))}>{t("clear")}</button>
        </div>
      </div>
    )}</div>}
  </div>;
}

const FAQ_DATA = {
  en: [
    ["How many square feet is 1 Katha?","1 Katha is commonly standardized as 720 square feet."],
    ["How many Decimal is 1 Acre?","1 Acre equals 100 Decimal."],
    ["How is triangle land calculated?","Use ½ × base × perpendicular height, or Heron's formula when all three sides are known."],
    ["How is a parallelogram-shaped plot calculated?","Multiply the base by the perpendicular height. If only two sides and the angle between them are known, use Side A × Side B × sin(angle)."],
    ["How is a trapezium (trapezoid) shaped plot calculated?","Add the two parallel sides, multiply by the perpendicular height between them, and divide by two."],
    ["How is a rhombus-shaped plot calculated?","Multiply the two diagonals and divide by two, or multiply one side by its perpendicular height."],
    ["How is a circular plot's area calculated?","Use π × radius². If you measured the distance across the plot instead, use π × (diameter ÷ 2)²."],
    ["Can I use this for legal land registration?","No. It is a calculation aid; verify legal measurements with official records and a qualified surveyor."],
    ["Does Bhumi Map work in Bengali?","Yes. Switch the language toggle in the header to view the entire app, including results, in বাংলা."],
    ["Does it work in dark mode?","Yes. Use the sun/moon icon in the header to switch between light and dark themes; your choice is remembered."]
  ],
  bn: [
    ["১ কাঠা সমান কত স্কয়ার ফিট?","১ কাঠা সাধারণত ৭২০ স্কয়ার ফিটের সমান ধরা হয়।"],
    ["১ একর সমান কত শতাংশ?","১ একর সমান ১০০ শতাংশ।"],
    ["ত্রিভুজাকার জমির হিসাব কীভাবে করব?","½ × ভিত্তি × লম্ব উচ্চতা ব্যবহার করুন, অথবা তিনটি বাহু জানা থাকলে Heron's formula ব্যবহার করুন।"],
    ["সামান্তরিক আকৃতির জমির হিসাব কীভাবে করব?","ভিত্তিকে লম্ব উচ্চতা দিয়ে গুণ করুন। শুধু দুটি বাহু ও তাদের মধ্যবর্তী কোণ জানা থাকলে বাহু A × বাহু B × sin(কোণ) ব্যবহার করুন।"],
    ["ট্রাপিজিয়াম আকৃতির জমির হিসাব কীভাবে করব?","দুটি সমান্তরাল বাহু যোগ করে, তাদের মধ্যবর্তী লম্ব উচ্চতা দিয়ে গুণ করে, ফলাফলকে দুই দিয়ে ভাগ করুন।"],
    ["রম্বস আকৃতির জমির হিসাব কীভাবে করব?","দুটি কর্ণ গুণ করে দুই দিয়ে ভাগ করুন, অথবা একটি বাহুকে তার লম্ব উচ্চতা দিয়ে গুণ করুন।"],
    ["বৃত্তাকার জমির ক্ষেত্রফল কীভাবে বের করব?","π × ব্যাসার্ধ² ব্যবহার করুন। ব্যাস জানা থাকলে π × (ব্যাস ÷ ২)² ব্যবহার করুন।"],
    ["এটি কি জমি রেজিস্ট্রেশনের জন্য ব্যবহার করা যাবে?","না। এটি শুধুমাত্র হিসাবের সহায়ক টুল; আইনগত পরিমাপের জন্য সরকারি রেকর্ড ও যোগ্য সার্ভেয়ারের মাধ্যমে যাচাই করুন।"],
    ["ভূমি মাপ কি বাংলায় কাজ করে?","হ্যাঁ। হেডারের ভাষা বাটনে ক্লিক করে পুরো অ্যাপটি, ফলাফলসহ, বাংলায় দেখতে পারবেন।"],
    ["এটি কি ডার্ক মোডে কাজ করে?","হ্যাঁ। হেডারে সূর্য/চাঁদ আইকনে ক্লিক করে লাইট ও ডার্ক থিমের মধ্যে পরিবর্তন করুন; আপনার পছন্দ মনে রাখা হবে।"]
  ]
};

export function FAQ(){
  const {t,i18n}=useTranslation();
  const faqs = FAQ_DATA[i18n.language] || FAQ_DATA.en;
  const jsonLd = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity": faqs.map(([q,a])=>({
      "@type":"Question",
      "name": q,
      "acceptedAnswer": {"@type":"Answer","text": a}
    }))
  };
  return <div className="container mx-auto px-4 py-10 max-w-4xl">
    <SEO title="FAQ | Bangladesh Land Calculator | Bhumi Map" description="Frequently asked questions about Bangladesh land measurement, Katha, Bigha, Decimal and shape-based land area calculation." keywords={KEYWORDS} jsonLd={jsonLd}/>
    <h1 className="text-3xl font-black mb-6">{t("faqTitle")}</h1>
    <div className="join join-vertical w-full">
      {faqs.map(([q,a])=>
        <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100" key={q}>
          <input type="checkbox"/>
          <div className="collapse-title font-semibold">{q}</div>
          <div className="collapse-content"><p>{a}</p></div>
        </div>
      )}
    </div>
  </div>;
}

export function About(){
  const {t}=useTranslation();
  return <div className="container mx-auto px-4 py-10 max-w-3xl">
    <SEO title="About Bhumi Map | Bangladesh Land Measurement Calculator" description="About Bhumi Map, a free Bangladesh land measurement calculator." keywords={KEYWORDS}/>
    <h1 className="text-3xl font-black mb-4">{t("aboutTitle")}</h1>
    <p className="text-lg opacity-80">{t("heroText")}</p>
    <div className="alert mt-8">{t("notice")}</div>
  </div>;
}
