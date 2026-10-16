import { useMemo, type ReactNode } from 'react';
import QRCode from 'qrcode';

/**
 * A QR code drawn as dots with rounded finder eyes and a clear centre for a logo.
 * Error correction is set to H (about 30% recoverable), which leaves room for the
 * centre mark while staying readable by phone cameras.
 */
export function DotQR({ value, color = '#131921', eye = color, logo, label }: { value: string; color?: string; eye?: string; logo?: ReactNode; label: string }) {
  const { size, dots, hole } = useMemo(() => {
    const qr = QRCode.create(value, { errorCorrectionLevel: 'H' });
    const count = qr.modules.size;
    const isEye = (r: number, c: number) => (r < 7 && c < 7) || (r < 7 && c >= count - 7) || (r >= count - 7 && c < 7);
    const holeSize = Math.round(count * 0.24) | 1;
    const start = Math.floor((count - holeSize) / 2);
    const inHole = (r: number, c: number) => r >= start && r < start + holeSize && c >= start && c < start + holeSize;
    const cells: [number, number][] = [];
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.modules.get(r, c) && !isEye(r, c) && !(logo && inHole(r, c))) cells.push([r, c]);
      }
    }
    return { size: count, dots: cells, hole: { start, size: holeSize } };
  }, [value, logo]);

  const eyes = [[0, 0], [0, size - 7], [size - 7, 0]];
  return (
    <div className="relative aspect-square w-full">
      <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} className="h-full w-full" role="img" aria-label={label} shapeRendering="geometricPrecision">
        {dots.map(([r, c]) => <circle key={`${r}-${c}`} cx={c + 0.5} cy={r + 0.5} r={0.44} fill={color} />)}
        {eyes.map(([r, c]) => (
          <g key={`${r}-${c}`}>
            <rect x={c + 0.5} y={r + 0.5} width={6} height={6} rx={1.9} fill="none" stroke={eye} strokeWidth={1} />
            <rect x={c + 2} y={r + 2} width={3} height={3} rx={0.9} fill={eye} />
          </g>
        ))}
      </svg>
      {logo && (
        <div className="absolute flex items-center justify-center" style={{
          left: `${((hole.start + 1) / (size + 2)) * 100}%`, top: `${((hole.start + 1) / (size + 2)) * 100}%`,
          width: `${(hole.size / (size + 2)) * 100}%`, height: `${(hole.size / (size + 2)) * 100}%`,
        }}>
          {logo}
        </div>
      )}
    </div>
  );
}
