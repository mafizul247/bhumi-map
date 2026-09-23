import {Routes,Route} from "react-router-dom";
import Layout from "./components/Layout";
import {Home,CalculatorPage,Converter,Units,Guide,History,FAQ,About} from "./pages";
export default function App(){return <Layout><Routes>
<Route path="/" element={<Home/>}/><Route path="/calculator" element={<CalculatorPage/>}/><Route path="/converter" element={<Converter/>}/>
<Route path="/units" element={<Units/>}/><Route path="/guide" element={<Guide/>}/><Route path="/history" element={<History/>}/><Route path="/faq" element={<FAQ/>}/><Route path="/about" element={<About/>}/>
</Routes></Layout>}