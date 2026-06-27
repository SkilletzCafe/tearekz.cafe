import { CSSProperties, useEffect, useState } from 'react';

import Head from 'next/head';

import { tvMenu } from '@/config/fonts';

import styles from '@/styles/TVMenuBoard.module.css';

import { LeftTVMenu } from './tv-menu/LeftTVMenu';
import { RightTVMenu } from './tv-menu/RightTVMenu';

const RELOAD_INTERVAL_MILLIS = 30 * 60 * 1000;
const TV_WIDTH_PX = 1920;
const TV_HEIGHT_PX = 1080;

type MenuSide = 'left' | 'right';

function useTvRefresh() {
  useEffect(() => {
    const reloadTimer = setInterval(() => window.location.reload(), RELOAD_INTERVAL_MILLIS);
    return () => clearInterval(reloadTimer);
  }, []);

  useEffect(() => {
    let wakeLock: { release: () => Promise<void> } | undefined;

    async function requestWakeLock() {
      try {
        const nav = navigator as Navigator & {
          wakeLock?: { request: (type: 'screen') => Promise<{ release: () => Promise<void> }> };
        };
        wakeLock = await nav.wakeLock?.request('screen');
      } catch {
        // Wake lock is best-effort only. The TV pages should still render cleanly.
      }
    }

    requestWakeLock();
    return () => {
      wakeLock?.release().catch(() => undefined);
    };
  }, []);
}

function isEnabledParam(value: string | null) {
  return value ? ['1', 'true', 'yes'].includes(value.toLowerCase()) : false;
}

function useDebugRegions() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const value = params.get('debug') ?? params.get('debugRegions') ?? params.get('regions');
    setEnabled(isEnabledParam(value));
  }, []);

  return enabled;
}

function useShowCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const override = params.get('debug') ?? params.get('showCursor') ?? params.get('cursor');

    if (override) {
      setEnabled(isEnabledParam(override));
      return;
    }

    const hostname = window.location.hostname.toLowerCase();
    setEnabled(hostname !== 'tearekz.cafe' && hostname !== 'www.tearekz.cafe');
  }, []);

  return enabled;
}

function useTvScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      setScale(Math.min(window.innerWidth / TV_WIDTH_PX, window.innerHeight / TV_HEIGHT_PX));
    }

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return scale;
}

export function TVMenuBoard({ side }: { side: MenuSide }) {
  useTvRefresh();
  const debugRegions = useDebugRegions();
  const showCursor = useShowCursor();
  const tvScale = useTvScale();

  const pageTitle = `Menu Display - ${side === 'left' ? 'Left' : 'Right'}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div
        className={`${tvMenu.variable} ${styles.viewport} ${showCursor ? styles.showCursor : ''}`}
        style={{ '--tv-scale': tvScale } as CSSProperties}
      >
        {side === 'left' ? (
          <LeftTVMenu debugRegions={debugRegions} />
        ) : (
          <RightTVMenu debugRegions={debugRegions} />
        )}
      </div>
    </>
  );
}
