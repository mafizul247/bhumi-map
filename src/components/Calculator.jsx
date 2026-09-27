import {useState} from "react";
import {useDispatch} from "react-redux";
import {addHistory} from "../redux/store";
import {useTranslation} from "react-i18next";
import {
  rectangle, square, triangleBaseHeight, triangleSides,
  parallelogramBaseHeight, parallelogramSidesAngle,
  trapezium, rhombusDiagonals, rhombusSideHeight,
  circleRadius, circleDiameter, fromSqft, fmt
} from "../utils/land";
import {Save, Printer, RotateCcw} from "lucide-react";

const defaultMethodFor = (shape) => {
  if (shape === "triangle") return "baseHeight";
  if (shape === "parallelogram") return "baseHeight";
  if (shape === "rhombus") return "diagonals";
  if (shape === "circle") return "radius";
  return null;
};

export default function Calculator({defaultShape="rectangle"}) {
  const {t}=useTranslation(), dispatch=useDispatch();
  const [shape,setShape]=useState(defaultShape), [method,setMethod]=useState(defaultMethodFor(defaultShape));
  const [unit,setUnit]=useState("ft"), [v,setV]=useState({}), [result,setResult]=useState(null), [error,setError]=useState("");

  const changeShape = (newShape) => {
    setShape(newShape);
    setMethod(defaultMethodFor(newShape));
    setV({});
    setResult(null);
    setError("");
  };

  const changeMethod = (newMethod) => {
    setMethod(newMethod);
    setV({});
    setResult(null);
    setError("");
  };

  const fields =
    shape==="rectangle" ? ["length","width"] :
    shape==="square" ? ["side"] :
    shape==="triangle" ? (method==="baseHeight" ? ["base","height"] : ["sideA","sideB","sideC"]) :
    shape==="parallelogram" ? (method==="baseHeight" ? ["base","height"] : ["sideA","sideB","angle"]) :
    shape==="trapezium" ? ["parallelSideA","parallelSideB","height"] :
    shape==="rhombus" ? (method==="diagonals" ? ["diagonal1","diagonal2"] : ["side","height"]) :
    shape==="circle" ? (method==="radius" ? ["radius"] : ["diameter"]) :
    [];

  const methodOptions =
    shape==="triangle" ? [["baseHeight",t("baseHeight")],["threeSides",t("threeSides")]] :
    shape==="parallelogram" ? [["baseHeight",t("baseHeight")],["sidesAngle",t("sidesAngle")]] :
    shape==="rhombus" ? [["diagonals",t("diagonalsMethod")],["sideHeight",t("sideHeightMethod")]] :
    shape==="circle" ? [["radius",t("radius")],["diameter",t("diameter")]] :
    null;

  const calc=()=>{
    setError("");
    let sqft=0;
    if(shape==="rectangle") sqft=rectangle(v.length,v.width,unit);
    else if(shape==="square") sqft=square(v.side,unit);
    else if(shape==="triangle") sqft=method==="baseHeight"?triangleBaseHeight(v.base,v.height,unit):triangleSides(v.sideA,v.sideB,v.sideC,unit);
    else if(shape==="parallelogram") sqft=method==="baseHeight"?parallelogramBaseHeight(v.base,v.height,unit):parallelogramSidesAngle(v.sideA,v.sideB,v.angle,unit);
    else if(shape==="trapezium") sqft=trapezium(v.parallelSideA,v.parallelSideB,v.height,unit);
    else if(shape==="rhombus") sqft=method==="diagonals"?rhombusDiagonals(v.diagonal1,v.diagonal2,unit):rhombusSideHeight(v.side,v.height,unit);
    else if(shape==="circle") sqft=method==="radius"?circleRadius(v.radius,unit):circleDiameter(v.diameter,unit);

    if(!sqft) {
      let msg = t("invalidInput");
      if(shape==="triangle" && method==="threeSides") msg = t("invalidTriangle");
      if(shape==="parallelogram" && method==="sidesAngle") msg = t("invalidAngle");
      setError(msg);
      setResult(null);
      return;
    }
    setResult(fromSqft(sqft));
  };
  const save=()=>{if(!result)return; dispatch(addHistory({id:crypto.randomUUID(),shape,method,unit,values:v,result,date:new Date().toISOString()}));};
  const labels={
    length:t("length"), width:t("width"), side:t("side"), base:t("length"), height:t("height"),
    sideA:t("sideA"), sideB:t("sideB"), sideC:t("sideC"),
    parallelSideA:t("parallelSideA"), parallelSideB:t("parallelSideB"),
    diagonal1:t("diagonal1"), diagonal2:t("diagonal2"),
    radius:t("radius"), diameter:t("diameter"), angle:t("angle")
  };
  return <div className="grid lg:grid-cols-5 gap-6">
    <section className="lg:col-span-2 card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{t("calculator")}</h2>
        <label className="label"><span>{t("shape")}</span></label>
        <select className="select select-bordered w-full" value={shape} onChange={e=>changeShape(e.target.value)}>
          <option value="rectangle">{t("rectangle")}</option>
          <option value="square">{t("square")}</option>
          <option value="triangle">{t("triangle")}</option>
          <option value="parallelogram">{t("parallelogram")}</option>
          <option value="trapezium">{t("trapezium")}</option>
          <option value="rhombus">{t("rhombus")}</option>
          <option value="circle">{t("circle")}</option>
        </select>
        {methodOptions&&<><label className="label"><span>{t("method")}</span></label>
          <div className="join w-full">
            {methodOptions.map(([key,label])=>
              <button key={key} className={"join-item btn flex-1 "+(method===key?"btn-primary":"")} onClick={()=>changeMethod(key)}>{label}</button>
            )}
          </div>
        </>}
        {fields.map(f=><label key={f} className="form-control mt-2"><span className="label-text">{labels[f]}</span><input className="input input-bordered" type="number" min="0" value={v[f]??""} onChange={e=>setV({...v,[f]:e.target.value})}/></label>)}
        <label className="label mt-2"><span>{t("unit")}</span></label>
        <select className="select select-bordered" value={unit} onChange={e=>setUnit(e.target.value)}>
          <option value="ft">{t("feet")}</option><option value="m">{t("meter")}</option><option value="yd">{t("yard")}</option>
        </select>
        {error&&<div className="alert alert-error mt-4">{error}</div>}
        <div className="card-actions mt-5">
          <button className="btn btn-primary flex-1" onClick={calc}>{t("calculate")}</button>
          <button className="btn btn-ghost" onClick={()=>{setV({});setResult(null);setError("")}}><RotateCcw size={17}/>{t("clear")}</button>
        </div>
      </div>
    </section>
    <section className="lg:col-span-3">
      <div className="card bg-base-100 shadow-xl h-full">
        <div className="card-body">
          <h2 className="card-title">{t("result")}</h2>
          {!result?<div className="flex-1 grid place-items-center text-center opacity-60 py-16">{t("calculate")}</div>:
          <><div className="stat bg-primary text-primary-content rounded-box"><div className="stat-title text-primary-content/80">{t("area")}</div><div className="stat-value text-4xl result-number">{fmt(result.sqft)} <span className="text-lg">sq ft</span></div></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
            {[[t("decimal"),result.decimal],[t("katha"),result.katha],[t("bigha"),result.bigha],[t("acre"),result.acre],[t("hectare"),result.hectare],[t("chhatak"),result.chhatak],[t("kani"),result.kani],[t("gonda"),result.gonda],[t("kora"),result.kora]].map(([k,x])=><div key={k} className="rounded-box bg-base-200 p-4"><div className="text-sm opacity-70">{k}</div><div className="font-bold result-number">{fmt(x,4)}</div></div>)}
          </div>
          <div className="card-actions mt-auto justify-end"><button className="btn" onClick={save}><Save size={17}/>{t("save")}</button><button className="btn" onClick={()=>window.print()}><Printer size={17}/>{t("print")}</button></div></>}
        </div>
      </div>
    </section>
  </div>
}
