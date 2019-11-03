import React, { useEffect, useRef } from 'react';

import { WireEntity, WireEntityRenderer } from '../lib/render';

function onMouseWheel(evt: React.WheelEvent): void {
  console.log(evt.deltaX, evt.deltaY, evt.deltaZ);
}

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

    const wire: WireEntity = {
      x1: 20,
      y1: 20,
      x2: 30,
      y2: 20
    }

    const renderer = new WireEntityRenderer();
    renderer.render(ctx, wire);
  });

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      onWheel={onMouseWheel}/>
  );
}
