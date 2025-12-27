import Head from 'next/head';
import Image from 'next/image';

import { imageLoader } from '@/utils/menu';

export default function TVMenuRight() {
  return (
    <>
      <Head>
        <title>Menu Display - Right</title>
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
          src="/images/menu/tearekz_menu_right.jpg"
          alt="Tea-Rek'z Menu - Right"
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
