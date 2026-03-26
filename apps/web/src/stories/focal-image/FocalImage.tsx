import { useRef, useEffect, useCallback, useState } from 'react';
import { cn } from '../../lib/utils';

export interface FocalImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /**
   * Focal point X coordinate.
   * 0 = left edge, 50 = center, 100 = right edge.
   * @default 50
   */
  focusX?: number;
  /**
   * Focal point Y coordinate.
   * 0 = top edge, 50 = center, 100 = bottom edge.
   * @default 50
   */
  focusY?: number;
  /** Additional classes for the container */
  className?: string;
}

/**
 * Displays an image cropped around a focal point.
 *
 * Unlike `object-fit: cover` + `object-position`, this component
 * uses absolute positioning with calculated offsets so the focal
 * point stays visible even at extreme aspect ratio differences
 * between the container and the image.
 *
 * The container must have explicit dimensions (width + height or
 * max-height, etc.) since the image is absolutely positioned.
 */
const FocalImage = ({
  src,
  alt = '',
  focusX = 50,
  focusY = 50,
  className,
}: FocalImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  const applyFocus = useCallback(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img || !img.naturalWidth) return;

    const cW = container.offsetWidth;
    const cH = container.offsetHeight;
    const iW = img.naturalWidth;
    const iH = img.naturalHeight;

    // Scale image to cover container (same as object-fit: cover)
    const scaleW = cW / iW;
    const scaleH = cH / iH;
    const scale = Math.max(scaleW, scaleH);

    const scaledW = iW * scale;
    const scaledH = iH * scale;

    // Size the image
    img.style.width = `${scaledW}px`;
    img.style.height = `${scaledH}px`;

    // Calculate offset to center the focal point
    // focusX/focusY are 0-100 percentages
    const focalPxX = (focusX / 100) * scaledW;
    const focalPxY = (focusY / 100) * scaledH;

    // Ideal offset: place focal point at container center
    let offsetX = cW / 2 - focalPxX;
    let offsetY = cH / 2 - focalPxY;

    // Clamp so the image never shows empty space
    const maxOffsetX = 0;
    const minOffsetX = cW - scaledW;
    const maxOffsetY = 0;
    const minOffsetY = cH - scaledH;

    offsetX = Math.min(maxOffsetX, Math.max(minOffsetX, offsetX));
    offsetY = Math.min(maxOffsetY, Math.max(minOffsetY, offsetY));

    img.style.left = `${offsetX}px`;
    img.style.top = `${offsetY}px`;
  }, [focusX, focusY]);

  useEffect(() => {
    if (ready) applyFocus();
  }, [ready, applyFocus]);

  // Re-apply on resize
  useEffect(() => {
    if (!ready) return;
    const observer = new ResizeObserver(() => applyFocus());
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [ready, applyFocus]);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setReady(true)}
        className="absolute max-w-none"
        draggable={false}
      />
    </div>
  );
};

FocalImage.displayName = 'FocalImage';

export { FocalImage };
