# Bhumi Map

Bangladesh-focused land measurement calculator built with React, Tailwind CSS, DaisyUI, Redux Toolkit, Axios, LocalStorage and bilingual English/Bangla UI.

## Features
- 7 land shapes: Rectangle, Square, Triangle, Parallelogram, Trapezium, Rhombus and Circle
- Multiple input methods per shape (e.g. triangle: base/height or three sides; parallelogram: base/height or sides+angle; rhombus: diagonals or side/height; circle: radius or diameter)
- Bangladesh units: Square Feet, Decimal/Shotok, Katha, Bigha, Acre, Hectare, Chhatak, Kani, Gonda and Kora
- LocalStorage calculation history
- Redux Toolkit state management
- Full Bangla / English UI, including navigation, calculator, guide and FAQ (with a Bengali web font, Noto Sans Bengali)
- Light / Dark mode with persisted preference and a dynamic mobile theme-color
- Responsive UI
- Deep SEO: per-page title/description/keywords, canonical URLs, Open Graph + Twitter Card tags, JSON-LD structured data (WebApplication on Home, FAQPage on FAQ, Organization site-wide), robots.txt, sitemap.xml, web app manifest, favicons and a generated Open Graph share image (`public/og-image.png`)
- Axios included for future API integration

## Run

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Notes
- Replace `your-domain.example` in `public/sitemap.xml` with the real production domain.
- The initial application stores user calculations locally; no backend/database is required.
- For legal land transactions, verify measurements against official records and a qualified surveyor.
