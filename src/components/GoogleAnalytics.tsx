import Script from 'next/script';

import { GOOGLE_ANALYTICS_ID } from '@/config/analytics';

export default function GoogleAnalytics() {
  if (!GOOGLE_ANALYTICS_ID || GOOGLE_ANALYTICS_ID.startsWith('[PLACEHOLDER')) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GOOGLE_ANALYTICS_ID}');
        `}
      </Script>
    </>
  );
}
