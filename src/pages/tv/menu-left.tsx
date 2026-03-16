import { useEffect, useState } from 'react';

import Head from 'next/head';

export default function TVMenuLeft() {
  const [cacheBuster, setCacheBuster] = useState('');

  useEffect(() => {
    // Set cache-buster on mount (runtime, not build time)
    setCacheBuster(`?v=${Date.now()}`);

    // Auto-refresh every 30 minutes to pick up menu updates
    const interval = setInterval(
      () => {
        window.location.reload();
      },
      30 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Menu Display - Left</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          overflow: 'hidden',
        }}
      >
        {cacheBuster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/images/menu/tearekz_menu_left.jpg${cacheBuster}`}
            alt="Tea-Rek'z Menu - Left"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        )}
      </div>
    </>
  );
}
