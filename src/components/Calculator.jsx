import {useState} from "react";
import {useDispatch} from "react-redux";
import {addHistory} from "../redux/store";
import {useTranslation} from "react-i18next";
import {
  rectangle, square, triangleBaseHeight, triangleSides,
  parallelogramBaseHeight, parallelogramSidesAngle,
  trapezium, rhombusDiagonals, rhombusSideHeight,
  circleRadius, circleDiameter,
  ellipseAxes, ellipseDiameters,
  semicircleRadius, semicircleDiameter,
  quarterCircleRadius, quarterCircleDiameter,
  circularSector, circularSegment,
  isoscelesTrapeziumHeight, isoscelesTrapeziumLeg, rightTrapezium,
  kiteDiagonals, kiteSidesAngle,
  irregularQuadrilateral, irregularPolygon,
  rectMinusNotch, tShape, compositeRectSemicircle, combinedParts,
  fromSqft, fmt
} from "../utils/land";
import {Save, Printer, RotateCcw, Plus, Trash2} from "lucide-react";

const DEFAULT_METHOD = {
  triangle: "baseHeight", parallelogram: "baseHeight", rhombus: "diagonals",
  circle: "radius", ellipse: "axes", semicircle: "radius", quarterCircle: "radius",
  isoscelesTrapezium: "byHeight", kite: "diagonals",
};

const SHAPE_GROUPS = [
  ["basicShapes", ["rectangle","square","triangle","parallelogram","rhombus","kite"]],
  ["circularShapes", ["circle","ellipse","semicircle","quarterCircle","circularSector","circularSegment"]],
  ["trapeziumShapes", ["trapezium","isoscelesTrapezium","rightTrapezium"]],
  ["irregularShapes", ["irregularQuadrilateral","irregularPolygon"]],
  ["compositeShapes", ["lShape","tShape","uShape","cShape","compositeShape","combinedShape"]],
];

const fieldsFor = (shape, method) => {
  switch(shape){
    case "rectangle": return ["length","width"];
    case "square": return ["side"];
    case "triangle": return method==="baseHeight" ? ["base","height"] : ["sideA","sideB","sideC"];
    case "parallelogram": return method==="baseHeight" ? ["base","height"] : ["sideA","sideB","angle"];
    case "trapezium": return ["parallelSideA","parallelSideB","height"];
    case "rhombus": return method==="diagonals" ? ["diagonal1","diagonal2"] : ["side","height"];
    case "circle": return method==="radius" ? ["radius"] : ["diameter"];
    case "ellipse": return method==="axes" ? ["semiMajor","semiMinor"] : ["majorAxis","minorAxis"];
    case "semicircle": return method==="radius" ? ["radius"] : ["diameter"];
    case "quarterCircle": return method==="radius" ? ["radius"] : ["diameter"];
    case "circularSector": return ["radius","angle"];
    case "circularSegment": return ["radius","angle"];
    case "isoscelesTrapezium": return method==="byHeight" ? ["parallelSideA","parallelSideB","height"] : ["parallelSideA","parallelSideB","leg"];
    case "rightTrapezium": return ["parallelSideA","parallelSideB","height"];
    case "kite": return method==="diagonals" ? ["diagonal1","diagonal2"] : ["sideA","sideB","angle"];
    case "irregularQuadrilateral": return ["diagonal1","diagonal2","angle"];
    case "lShape": case "uShape": case "cShape": return ["outerLength","outerWidth","notchLength","notchWidth"];
    case "tShape": return ["topLength","topWidth","stemLength","stemWidth"];
    case "compositeShape": return ["length","width"];
    default: return [];
  }
};

export default function Calculator({defaultShape="rectangle"}) {
  const {t}=useTranslation(), dispatch=useDispatch();
  const [shape,setShape]=useState(defaultShape), [method,setMethod]=useState(DEFAULT_METHOD[defaultShape]||null);
  const [unit,setUnit]=useState("ft"), [v,setV]=useState({}), [result,setResult]=useState(null), [error,setError]=useState("");
  const [vertices,setVertices]=useState([{x:"",y:""},{x:"",y:""},{x:"",y:""},{x:"",y:""}]);
  const [parts,setParts]=useState([{length:"",width:""},{length:"",width:""}]);

  const reset = () => { setV({}); setResult(null); setError(""); setVertices([{x:"",y:""},{x:"",y:""},{x:"",y:""},{x:"",y:""}]); setParts([{length:"",width:""},{length:"",width:""}]); };
  const changeShape = (newShape) => { setShape(newShape); setMethod(DEFAULT_METHOD[newShape]||null); reset(); };
  const changeMethod = (newMethod) => { setMethod(newMethod); reset(); };

  const isPolygon = shape==="irregularPolygon";
  const isCombined = shape==="combinedShape";
  const fields = fieldsFor(shape, method);

  const methodOptions =
    shape==="triangle" ? [["baseHeight",t("baseHeight")],["threeSides",t("threeSides")]] :
    shape==="parallelogram" ? [["baseHeight",t("baseHeight")],["sidesAngle",t("sidesAngle")]] :
    shape==="rhombus" ? [["diagonals",t("diagonalsMethod")],["sideHeight",t("sideHeightMethod")]] :
    shape==="circle" ? [["radius",t("radius")],["diameter",t("diameter")]] :
    shape==="ellipse" ? [["axes",t("methodAxes")],["diameters",t("methodDiameters")]] :
    shape==="semicircle" ? [["radius",t("radius")],["diameter",t("diameter")]] :
    shape==="quarterCircle" ? [["radius",t("radius")],["diameter",t("diameter")]] :
    shape==="isoscelesTrapezium" ? [["byHeight",t("methodByHeight")],["byLeg",t("methodByLeg")]] :
    shape==="kite" ? [["diagonals",t("diagonalsMethod")],["sidesAngle",t("sidesAngle")]] :
    null;

  const calc=()=>{
    setError("");
    let sqft=0;
    switch(shape){
      case "rectangle": sqft=rectangle(v.length,v.width,unit); break;
      case "square": sqft=square(v.side,unit); break;
      case "triangle": sqft=method==="baseHeight"?triangleBaseHeight(v.base,v.height,unit):triangleSides(v.sideA,v.sideB,v.sideC,unit); break;
      case "parallelogram": sqft=method==="baseHeight"?parallelogramBaseHeight(v.base,v.height,unit):parallelogramSidesAngle(v.sideA,v.sideB,v.angle,unit); break;
      case "trapezium": sqft=trapezium(v.parallelSideA,v.parallelSideB,v.height,unit); break;
      case "rhombus": sqft=method==="diagonals"?rhombusDiagonals(v.diagonal1,v.diagonal2,unit):rhombusSideHeight(v.side,v.height,unit); break;
      case "circle": sqft=method==="radius"?circleRadius(v.radius,unit):circleDiameter(v.diameter,unit); break;
      case "ellipse": sqft=method==="axes"?ellipseAxes(v.semiMajor,v.semiMinor,unit):ellipseDiameters(v.majorAxis,v.minorAxis,unit); break;
      case "semicircle": sqft=method==="radius"?semicircleRadius(v.radius,unit):semicircleDiameter(v.diameter,unit); break;
      case "quarterCircle": sqft=method==="radius"?quarterCircleRadius(v.radius,unit):quarterCircleDiameter(v.diameter,unit); break;
      case "circularSector": sqft=circularSector(v.radius,v.angle,unit); break;
      case "circularSegment": sqft=circularSegment(v.radius,v.angle,unit); break;
      case "isoscelesTrapezium": sqft=method==="byHeight"?isoscelesTrapeziumHeight(v.parallelSideA,v.parallelSideB,v.height,unit):isoscelesTrapeziumLeg(v.parallelSideA,v.parallelSideB,v.leg,unit); break;
      case "rightTrapezium": sqft=rightTrapezium(v.parallelSideA,v.parallelSideB,v.height,unit); break;
      case "kite": sqft=method==="diagonals"?kiteDiagonals(v.diagonal1,v.diagonal2,unit):kiteSidesAngle(v.sideA,v.sideB,v.angle,unit); break;
      case "irregularQuadrilateral": sqft=irregularQuadrilateral(v.diagonal1,v.diagonal2,v.angle,unit); break;
      case "irregularPolygon": sqft=irregularPolygon(vertices,unit); break;
      case "lShape": case "uShape": case "cShape": sqft=rectMinusNotch(v.outerLength,v.outerWidth,v.notchLength,v.notchWidth,unit); break;
      case "tShape": sqft=tShape(v.topLength,v.topWidth,v.stemLength,v.stemWidth,unit); break;
      case "compositeShape": sqft=compositeRectSemicircle(v.length,v.width,unit); break;
      case "combinedShape": sqft=combinedParts(parts,unit); break;
      default: sqft=0;
    }

    if(!sqft){
      let msg=t("invalidInput");
      if(shape==="triangle" && method==="threeSides") msg=t("invalidTriangle");
      if((shape==="parallelogram"||shape==="kite") && method==="sidesAngle") msg=t("invalidAngle");
      if(shape==="irregularQuadrilateral") msg=t("invalidAngle");
      if((shape==="circularSector"||shape==="circularSegment")) msg=t("invalidAngle360");
      if(shape==="isoscelesTrapezium" && method==="byLeg") msg=t("invalidLeg");
      if(shape==="irregularPolygon") msg=t("minVerticesError");
      setError(msg); setResult(null); return;
    }
    setResult(fromSqft(sqft));
  };

  const save=()=>{if(!result)return; dispatch(addHistory({id:crypto.randomUUID(),shape,method,unit,values:isPolygon?{vertices}:isCombined?{parts}:v,result,date:new Date().toISOString()}));};

  const labels={
    length:t("length"), width:t("width"), side:t("side"), base:t("length"), height:t("height"),
    sideA:t("sideA"), sideB:t("sideB"), sideC:t("sideC"),
    parallelSideA:t("parallelSideA"), parallelSideB:t("parallelSideB"),
    diagonal1:t("diagonal1"), diagonal2:t("diagonal2"),
    radius:t("radius"), diameter:t("diameter"), angle:t("angle"),
    semiMajor:t("semiMajor"), semiMinor:t("semiMinor"), majorAxis:t("majorAxis"), minorAxis:t("minorAxis"),
    leg:t("leg"), outerLength:t("outerLength"), outerWidth:t("outerWidth"),
    notchLength:t("notchLength"), notchWidth:t("notchWidth"),
    topLength:t("topLength"), topWidth:t("topWidth"), stemLength:t("stemLength"), stemWidth:t("stemWidth"),
  };

  const updateVertex=(i,axis,val)=>{const next=[...vertices]; next[i]={...next[i],[axis]:val}; setVertices(next);};
  const addVertex=()=>setVertices([...vertices,{x:"",y:""}]);
  const removeVertex=(i)=>{if(vertices.length<=3)return; setVertices(vertices.filter((_,idx)=>idx!==i));};

  const updatePart=(i,key,val)=>{const next=[...parts]; next[i]={...next[i],[key]:val}; setParts(next);};
  const addPart=()=>setParts([...parts,{length:"",width:""}]);
  const removePart=(i)=>{if(parts.length<=1)return; setParts(parts.filter((_,idx)=>idx!==i));};

  return <div className="grid lg:grid-cols-5 gap-6">
    <section className="lg:col-span-2 card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{t("calculator")}</h2>
        <label className="label"><span>{t("shape")}</span></label>
        <select className="select select-bordered w-full" value={shape} onChange={e=>changeShape(e.target.value)}>
          {SHAPE_GROUPS.map(([groupKey,shapes])=>
            <optgroup key={groupKey} label={t(groupKey)}>
              {shapes.map(s=><option key={s} value={s}>{t(s)}</option>)}
            </optgroup>
          )}
        </select>

        {methodOptions&&<><label className="label"><span>{t("method")}</span></label>
          <div className="join w-full flex-wrap">
            {methodOptions.map(([key,label])=>
              <button key={key} className={"join-item btn flex-1 "+(method===key?"btn-primary":"")} onClick={()=>changeMethod(key)}>{label}</button>
            )}
          </div>
        </>}

        {!isPolygon && !isCombined && fields.map(f=>
          <label key={f} className="form-control mt-2">
            <span className="label-text">{labels[f]}</span>
            <input className="input input-bordered" type="number" min="0" value={v[f]??""} onChange={e=>setV({...v,[f]:e.target.value})}/>
          </label>
        )}

        {isPolygon && <div className="mt-2 space-y-2">
          {vertices.map((pt,i)=>
            <div key={i} className="flex items-end gap-2">
              <label className="form-control flex-1">
                <span className="label-text">{t("vertex")} {i+1} — {t("pointX")}</span>
                <input className="input input-bordered input-sm" type="number" value={pt.x} onChange={e=>updateVertex(i,"x",e.target.value)}/>
              </label>
              <label className="form-control flex-1">
                <span className="label-text">{t("pointY")}</span>
                <input className="input input-bordered input-sm" type="number" value={pt.y} onChange={e=>updateVertex(i,"y",e.target.value)}/>
              </label>
              <button className="btn btn-sm btn-ghost text-error" disabled={vertices.length<=3} onClick={()=>removeVertex(i)}><Trash2 size={16}/></button>
            </div>
          )}
          <button className="btn btn-sm btn-outline w-full" onClick={addVertex}><Plus size={16}/>{t("addVertex")}</button>
        </div>}

        {isCombined && <div className="mt-2 space-y-2">
          {parts.map((p,i)=>
            <div key={i} className="flex items-end gap-2">
              <span className="text-sm opacity-70 w-14">{t("part")} {i+1}</span>
              <label className="form-control flex-1">
                <span className="label-text">{t("length")}</span>
                <input className="input input-bordered input-sm" type="number" min="0" value={p.length} onChange={e=>updatePart(i,"length",e.target.value)}/>
              </label>
              <label className="form-control flex-1">
                <span className="label-text">{t("width")}</span>
                <input className="input input-bordered input-sm" type="number" min="0" value={p.width} onChange={e=>updatePart(i,"width",e.target.value)}/>
              </label>
              <button className="btn btn-sm btn-ghost text-error" disabled={parts.length<=1} onClick={()=>removePart(i)}><Trash2 size={16}/></button>
            </div>
          )}
          <button className="btn btn-sm btn-outline w-full" onClick={addPart}><Plus size={16}/>{t("addPart")}</button>
        </div>}

        <label className="label mt-2"><span>{t("unit")}</span></label>
        <select className="select select-bordered" value={unit} onChange={e=>setUnit(e.target.value)}>
          <option value="ft">{t("feet")}</option><option value="m">{t("meter")}</option><option value="yd">{t("yard")}</option>
        </select>
        {error&&<div className="alert alert-error mt-4">{error}</div>}
        <div className="card-actions mt-5">
          <button className="btn btn-primary flex-1" onClick={calc}>{t("calculate")}</button>
          <button className="btn btn-ghost" onClick={reset}><RotateCcw size={17}/>{t("clear")}</button>
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
