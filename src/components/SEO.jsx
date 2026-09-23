import { Helmet } from "react-helmet-async";
export default function SEO({title, description}) {
  return <Helmet>
    <title>{title}</title>
    <meta name="description" content={description}/>
    <link rel="canonical" href={window.location.href.split("?")[0]}/>
  </Helmet>
}