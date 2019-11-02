import React, { useEffect, useRef } from 'react';

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

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 150);
    ctx.stroke();
  });

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      onWheel={onMouseWheel}/>
  );
}
