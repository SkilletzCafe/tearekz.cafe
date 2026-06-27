import { RefObject, useEffect, useState } from 'react';

import styles from '@/styles/TVMenuBoard.module.css';

const TV_WIDTH_PX = 1920;
const TV_HEIGHT_PX = 1080;

type DebugRegion = {
  id: number;
  label: string;
  color: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

type DebugMeasurement = {
  boardWidth: number;
  boardHeight: number;
  layoutWidth: number;
  layoutHeight: number;
  scaleX: number;
  scaleY: number;
  regions: DebugRegion[];
};

const DEBUG_REGION_SELECTOR = '[data-debug-region]';
const DEBUG_COLORS = [
  '#e53935',
  '#8e24aa',
  '#1e88e5',
  '#43a047',
  '#fb8c00',
  '#7cb342',
  '#6d4c41',
  '#d81b60',
  '#f6a000',
  '#00897b',
  '#3949ab',
  '#c0a000',
];

function getRegionLabel(element: HTMLElement) {
  return (
    element.dataset.debugRegion || element.getAttribute('aria-label') || element.id || 'Region'
  );
}

function measureDebugRegions(board: HTMLElement): DebugMeasurement {
  const boardRect = board.getBoundingClientRect();
  const scaleX = boardRect.width > 0 ? TV_WIDTH_PX / boardRect.width : 1;
  const scaleY = boardRect.height > 0 ? TV_HEIGHT_PX / boardRect.height : 1;

  const regions = Array.from(board.querySelectorAll<HTMLElement>(DEBUG_REGION_SELECTOR))
    .map((element, index) => {
      const rect = element.getBoundingClientRect();
      return {
        id: index + 1,
        label: getRegionLabel(element),
        color: DEBUG_COLORS[index % DEBUG_COLORS.length],
        left: (rect.left - boardRect.left) * scaleX,
        top: (rect.top - boardRect.top) * scaleY,
        width: rect.width * scaleX,
        height: rect.height * scaleY,
      };
    })
    .filter((region) => region.width > 0 && region.height > 0);

  return {
    boardWidth: boardRect.width,
    boardHeight: boardRect.height,
    layoutWidth: TV_WIDTH_PX,
    layoutHeight: TV_HEIGHT_PX,
    scaleX,
    scaleY,
    regions,
  };
}

function useDebugMeasurement(enabled: boolean, boardRef: RefObject<HTMLElement | null>) {
  const [measurement, setMeasurement] = useState<DebugMeasurement | null>(null);

  useEffect(() => {
    if (!enabled || !boardRef.current) {
      setMeasurement(null);
      return;
    }

    const board = boardRef.current;
    let frameId = 0;

    const updateMeasurement = () => {
      frameId = 0;
      setMeasurement(measureDebugRegions(board));
    };

    const scheduleMeasurement = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateMeasurement);
    };

    scheduleMeasurement();
    window.addEventListener('resize', scheduleMeasurement);
    window.addEventListener('load', scheduleMeasurement);

    const resizeObserver =
      'ResizeObserver' in window ? new ResizeObserver(scheduleMeasurement) : undefined;
    resizeObserver?.observe(board);
    board.querySelectorAll<HTMLElement>(DEBUG_REGION_SELECTOR).forEach((element) => {
      resizeObserver?.observe(element);
    });

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', scheduleMeasurement);
      window.removeEventListener('load', scheduleMeasurement);
      resizeObserver?.disconnect();
    };
  }, [boardRef, enabled]);

  return measurement;
}

function roundPixel(value: number) {
  return `${Math.round(value)}px`;
}

function getRegionMetrics(region: DebugRegion) {
  return `${roundPixel(region.width)} × ${roundPixel(region.height)} · x ${roundPixel(
    region.left
  )}, y ${roundPixel(region.top)}`;
}

function getBoardMetrics(measurement: DebugMeasurement | null) {
  if (!measurement) return `Board: ${TV_WIDTH_PX}px × ${TV_HEIGHT_PX}px`;

  const scale = (measurement.boardWidth / measurement.layoutWidth).toFixed(3);
  return `Board: ${Math.round(measurement.boardWidth)}px × ${Math.round(
    measurement.boardHeight
  )}px screen · ${measurement.layoutWidth}px × ${measurement.layoutHeight}px layout · scale ${scale}`;
}

export function RegionOverlay({ boardRef }: { boardRef: RefObject<HTMLElement | null> }) {
  const measurement = useDebugMeasurement(true, boardRef);
  const regions = measurement?.regions ?? [];

  return (
    <div className={styles.regionOverlay} aria-hidden="true">
      <div className={styles.regionBoardLabel}>{getBoardMetrics(measurement)}</div>
      {regions.map((region) => (
        <div
          key={`${region.id}-${region.label}`}
          className={styles.regionBox}
          style={{
            left: region.left,
            top: region.top,
            width: region.width,
            height: region.height,
            borderColor: region.color,
            color: region.color,
          }}
        >
          <span className={styles.regionLabel} style={{ backgroundColor: region.color }}>
            <strong>
              {region.id}. {region.label}
            </strong>
            <span>{getRegionMetrics(region)}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
