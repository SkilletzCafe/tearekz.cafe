import Head from 'next/head';
import Image from 'next/image';

import { imageLoader } from '@/utils/menu';

export default function TVMenu() {
  return (
    <>
      <Head>
        <title>Menu Display</title>
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
        <Image
          src="/images/menu/tearekz_menu_20251018.png"
          alt="Tea-Rek'z Menu"
          fill
          style={{
            objectFit: 'contain',
          }}
          loader={imageLoader}
          unoptimized
          priority
        />
      </div>
    </>
  );
}
