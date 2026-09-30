import {Link} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {removeHistory,clearHistory} from "./redux/store";
import {useTranslation} from "react-i18next";
import SEO, {SITE_URL} from "./components/SEO";
import Calculator from "./components/Calculator";
import {fmt,fromSqft,SQFT_PER_DECIMAL,SQFT_PER_KATHA,SQFT_PER_BIGHA,SQFT_PER_ACRE} from "./utils/land";
import {useState} from "react";

const KEYWORDS = "Bangladesh land calculator, land measurement Bangladesh, Katha to Decimal, Decimal to Katha, Bigha calculator, jomi mapar hisab, parallelogram land area, trapezium land area, rhombus land area, circular land area, ellipse land area, semicircle land area, sector land area, kite shape land, L shape land, T shape land, U shape land, C shape land, irregular polygon land area, জমি মাপ, জমির হিসাব, শতাংশ থেকে কাঠা, সামান্তরিক জমি, ট্রাপিজিয়াম জমি, রম্বস জমি, বৃত্তাকার জমি, উপবৃত্তাকার জমি, অর্ধবৃত্তাকার জমি, সেক্টর জমি, ঘুড়ি আকৃতির জমি, অনিয়মিত বহুভুজ, L আকৃতির জমি, T আকৃতির জমি, U আকৃতির জমি, C আকৃতির জমি";

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
      "Rectangle, square and triangle land area calculator",
      "Parallelogram, trapezium (including isosceles and right trapezium) and rhombus calculator",
      "Circle, ellipse, semicircle, quarter circle, circular sector and circular segment calculator",
      "Kite, irregular quadrilateral and irregular polygon (coordinate-based) calculator",
      "L-shape, T-shape, U-shape, C-shape and other composite / multi-part land calculator",
      "Katha, Bigha, Decimal, Acre, Hectare unit conversion"
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
    <SEO title="Land Calculator Bangladesh | 23 Shapes incl. Ellipse, Kite, L-Shape, Polygon | Bhumi Map" description={t("heroText")} keywords={KEYWORDS}/>
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

const GUIDE_GROUPS = [
  ["basicShapes", [
    ["rectangle","rectangleInfo"],
    ["square", "squareInfo"],
    ["triangle","triangleInfo"],
    ["parallelogram","parallelogramInfo"],
    ["rhombus","rhombusInfo"],
    ["kite","kiteInfo"],
  ]],
  ["circularShapes", [
    ["circle","circleInfo"],
    ["ellipse","ellipseInfo"],
    ["semicircle","semicircleInfo"],
    ["quarterCircle","quarterCircleInfo"],
    ["circularSector","circularSectorInfo"],
    ["circularSegment","circularSegmentInfo"],
  ]],
  ["trapeziumShapes", [
    ["trapezium","trapeziumInfo"],
    ["isoscelesTrapezium","isoscelesTrapeziumInfo"],
    ["rightTrapezium","rightTrapeziumInfo"],
  ]],
  ["irregularShapes", [
    ["irregularQuadrilateral","irregularQuadrilateralInfo"],
    ["irregularPolygon","irregularPolygonInfo"],
    ["irregular","irregularInfo"],
  ]],
  ["compositeShapes", [
    ["lShape","lShapeInfo"],
    ["tShape","tShapeInfo"],
    ["uShape","uShapeInfo"],
    ["cShape","cShapeInfo"],
    ["compositeShape","compositeShapeInfo"],
    ["combinedShape","combinedShapeInfo"],
  ]],
];

export function Guide(){
  const {t}=useTranslation();
  return <div className="container mx-auto px-4 py-10 max-w-4xl">
    <SEO title="Bangladesh Land Measurement Guide | 23 Land Shapes | Bhumi Map" description="Learn how to calculate rectangle, triangle, parallelogram, trapezium, rhombus, circle, ellipse, kite, irregular polygon, L-shape, T-shape and other composite land shapes in Bangladesh." keywords={KEYWORDS}/>
    <h1 className="text-3xl font-black mb-8">{t("guideTitle")}</h1>
    <div className="space-y-10">
      {GUIDE_GROUPS.map(([groupKey,shapes])=>
        <div key={groupKey}>
          <h2 className="text-2xl font-black mb-4 opacity-80">{t(groupKey)}</h2>
          <div className="space-y-5">
            {shapes.map(([key,infoKey])=>
              <div className="card bg-base-100 shadow p-6" key={key}>
                <h3 className="text-xl font-bold">{t(key)}</h3>
                <p>{infoKey.endsWith("Info") ? t(infoKey) : infoKey}</p>
              </div>
            )}
          </div>
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
    ["Does it work in dark mode?","Yes. Use the sun/moon icon in the header to switch between light and dark themes; your choice is remembered."],
    ["How do I calculate an oddly shaped plot with 4+ corners?","Use Irregular Quadrilateral (enter both diagonals and the angle between them) for a 4-sided plot, or Irregular Polygon to enter every corner's X, Y coordinate for any number of sides — the app uses the Shoelace formula for an exact area."],
    ["How do I calculate an L-shape, T-shape, U-shape or C-shape plot?","Split the plot into simple rectangles. For L, U and C shapes, measure the outer bounding rectangle and subtract the missing rectangular notch. For a T-shape, add the top bar rectangle and the stem rectangle together."],
    ["My land has several separate rectangular parts — can I add them together?","Yes, choose Combined / Multiple Plots, add each rectangular part's length and width, and the app totals them automatically."],
    ["How do I calculate a semicircular, quarter-circle or sector-shaped plot?","Semicircle uses half of π × radius², Quarter Circle uses a quarter of it, and Circular Sector uses (angle ÷ 360) × π × radius² for any pie-slice angle."]
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
    ["এটি কি ডার্ক মোডে কাজ করে?","হ্যাঁ। হেডারে সূর্য/চাঁদ আইকনে ক্লিক করে লাইট ও ডার্ক থিমের মধ্যে পরিবর্তন করুন; আপনার পছন্দ মনে রাখা হবে।"],
    ["৪টির বেশি কোণবিশিষ্ট অনিয়মিত জমির হিসাব কীভাবে করব?","৪ বাহুর জমির জন্য অনিয়মিত চতুর্ভুজ (দুই কর্ণ ও তাদের মধ্যবর্তী কোণ দিন) ব্যবহার করুন, অথবা যেকোনো সংখ্যক বাহুর জন্য অনিয়মিত বহুভুজে প্রতিটি কোণবিন্দুর X, Y স্থানাঙ্ক দিন — Shoelace সূত্র ব্যবহার করে সঠিক ক্ষেত্রফল বের করা হয়।"],
    ["L-আকৃতি, T-আকৃতি, U-আকৃতি বা C-আকৃতির জমির হিসাব কীভাবে করব?","জমিটিকে সাধারণ আয়তক্ষেত্রে ভাগ করুন। L, U ও C আকৃতির জন্য, বাইরের সম্পূর্ণ আয়তক্ষেত্র মেপে তার থেকে কাটা অংশ বাদ দিন। T-আকৃতির জন্য উপরের বার ও স্টেম অংশ দুটি আলাদাভাবে যোগ করুন।"],
    ["আমার জমির একাধিক আলাদা আয়তক্ষেত্রাকার অংশ আছে — এগুলো একসাথে যোগ করা যাবে?","হ্যাঁ, সমন্বিত / একাধিক অংশের জমি নির্বাচন করে প্রতিটি অংশের দৈর্ঘ্য ও প্রস্থ দিন; অ্যাপ স্বয়ংক্রিয়ভাবে মোট ক্ষেত্রফল বের করবে।"],
    ["অর্ধবৃত্তাকার, চতুর্থাংশ বৃত্ত বা সেক্টর আকৃতির জমির হিসাব কীভাবে করব?","অর্ধবৃত্তের জন্য ½ × π × ব্যাসার্ধ², চতুর্থাংশ বৃত্তের জন্য তার এক-চতুর্থাংশ, এবং যেকোনো কোণের সেক্টরের জন্য (কোণ ÷ ৩৬০) × π × ব্যাসার্ধ² ব্যবহার করা হয়।"]
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
