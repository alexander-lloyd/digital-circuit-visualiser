import React, { useEffect, useRef } from 'react';

import { FunctionEntity, FunctionEntityRenderer } from '../lib/render';

/**
 * React to a mouse wheel event.
 *
 * @param evt Event object,
 */
function onMouseWheel(evt: React.WheelEvent): void {
  console.log(evt.deltaX, evt.deltaY, evt.deltaZ);
}

/**
 * Canvas Component.
 *
 * @returns React Component.
 */
export default function Canvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect((): void => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas == null) {
      return;
    }

    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }

    const entity: FunctionEntity = {
      x1: 20,
      y1: 20,
      width: 100,
      height: 100,
      label: 'f'
    };

    const renderer = new FunctionEntityRenderer();
    renderer.render(ctx, entity);
  });

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      onWheel={onMouseWheel}/>
  );
}
