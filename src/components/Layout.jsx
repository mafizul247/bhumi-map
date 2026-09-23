import { Link, NavLink } from "react-router-dom";
import { Moon, Sun, Menu, Languages } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, setTheme } from "../redux/store";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Layout({children}) {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const {language, theme} = useSelector(s=>s.settings);

  useEffect(()=> {
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme==="dark");
    document.documentElement.lang = language;
    localStorage.setItem("bhumi-language", language);
    i18n.changeLanguage(language);
  }, [theme, language, i18n]);

  const nav = [["/",t("home")],["/calculator",t("calculator")],["/converter",t("converter")],["/units",t("units")],["/guide",t("guide")],["/history",t("history")],["/faq",t("faq")]];
  return <div className="min-h-screen bg-base-200 text-base-content">
    <header className="navbar bg-base-100 border-b sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost"><Menu/></label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-56">
              {nav.map(([to,label])=><li key={to}><Link to={to}>{label}</Link></li>)}
            </ul>
          </div>
          <Link to="/" className="text-xl md:text-2xl font-black text-primary">{t("brand")}</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {nav.map(([to,label])=><li key={to}><NavLink className={({isActive})=>isActive?"font-bold text-primary":""} to={to}>{label}</NavLink></li>)}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <button className="btn btn-ghost btn-sm" onClick={()=>dispatch(setLanguage(language==="en"?"bn":"en"))} title="Language">
            <Languages size={18}/>{language==="en"?"বাংলা":"English"}
          </button>
          <button className="btn btn-circle btn-ghost" onClick={()=>dispatch(setTheme(theme==="light"?"dark":"light"))}>
            {theme==="light"?<Moon size={19}/>:<Sun size={19}/>}
          </button>
        </div>
      </div>
    </header>
    <main>{children}</main>
    <footer className="footer footer-center p-8 bg-base-100 border-t mt-12">
      <aside>
        <p className="font-semibold">{t("brand")} — {t("tagline")}</p>
        <p className="text-sm opacity-70">{t("notice")}</p>
      </aside>
    </footer>
  </div>
}