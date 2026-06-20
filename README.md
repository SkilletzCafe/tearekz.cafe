[![Deploy GitHub Pages](https://github.com/SkilletzCafe/tearekz.cafe/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/SkilletzCafe/tearekz.cafe/actions/workflows/deploy-pages.yml)
[![Proof HTML](https://github.com/SkilletzCafe/tearekz.cafe/actions/workflows/proof-html.yml/badge.svg)](https://github.com/SkilletzCafe/tearekz.cafe/actions/workflows/proof-html.yml)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)

# Tea-Rek'z Website

Welcome to the official repository for [Tea-Rek'z](https://tearekz.cafe), a premium boba tea and specialty drinks shop in the historic Niles district of Fremont, California.

## About Tea-Rek'z

Tea-Rek'z is a modern boba tea shop serving the Fremont community with delicious, handcrafted beverages. We're known for our:

- Premium boba tea and milk tea
- Fresh fruit teas
- Specialty seasonal drinks
- Quality ingredients in every cup
- Friendly service and welcoming atmosphere

### Hours & Location

- **Hours:**
  - Mon-Wed: 12pm - 7pm
  - Thu-Fri: 12pm - 8pm
  - Sat-Sun: 10am - 8pm
- **Address:** 37390 Niles Blvd, Fremont, CA 94536
- **Phone:** (510) 793-8161

## Website Technical Details

This website is built with:

- [Next.js](https://nextjs.org/) - React framework for production
- TypeScript for type safety
- Static site generation (`next export`) for optimal performance
- Modern, responsive design
- Google Analytics integration

### Development Setup

1. Clone the repository

```bash
git clone https://github.com/[ORG]/tearekz.cafe.git
cd tearekz.cafe
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

The static site will be generated in the `docs/` directory. Production deploys use the `Deploy GitHub Pages` workflow, which uploads the committed `docs/` folder without cloning private submodules.

### Features

- 🏠 Homepage with business information
- 🧋 Menu page for boba tea and specialty drinks
- 📞 Contact page with location and hours
- 📱 Mobile-responsive design
- 🔍 SEO optimized
- 📊 Analytics integration
- 🌓 Dark/Light theme toggle

### Project Structure

```
tearekz.cafe/
├── public/           # Static assets (images, favicon)
├── src/
│   ├── components/   # React components
│   ├── config/       # Business configuration & branding
│   ├── context/      # React context providers
│   ├── data/         # Menu and other data files
│   ├── pages/        # Next.js pages
│   ├── posts/        # Blog posts (markdown)
│   ├── styles/       # CSS modules
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
├── next.config.mjs   # Next.js configuration
├── tsconfig.json     # TypeScript configuration
└── package.json      # Dependencies and scripts
```

## Configuration

Key configuration files:

- `src/config/business.ts` - Business information, address, phone, hours
- `src/config/analytics.ts` - Google Analytics tracking ID
- `src/config/verification.ts` - Facebook domain verification
- `src/config/colors.ts` - Brand colors (teal/tea-themed)
- `src/config/social.ts` - Social media links (Facebook, Instagram, Yelp, Google Business)
- `src/config/orderingPartners.ts` - Online ordering links (Toast, DoorDash)

## License

This project is licensed under the Creative Commons Zero v1.0 Universal license.

---

_Serving dino-mite boba tea since 2025_ 🦖🧋
