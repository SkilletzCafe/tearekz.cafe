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
  - Monday-Friday: 10am - 8pm
  - Saturday-Sunday: 10am - 9pm
- **Address:** [PLACEHOLDER ADDRESS]
- **Phone:** [PLACEHOLDER PHONE]

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

The static site will be generated in the `docs/` directory, ready for deployment to GitHub Pages.

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

## Customization

Key branding placeholders to update:

- `src/config/business.ts` - Business name, address, phone, hours
- `src/config/colors.ts` - Brand colors (currently teal/tea-themed)
- `src/config/social.ts` - Social media links
- `public/images/logos/` - Add Tea-Rek'z logo images
- `public/favicon.ico` - Add Tea-Rek'z favicon

## License

This project is licensed under the Creative Commons Zero v1.0 Universal license.

---

_Serving dino-mite boba tea since 2025_ 🦖🧋
