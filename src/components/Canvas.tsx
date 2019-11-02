import React from 'react';

export default function Canvas(): JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  return (<canvas ref={canvasRef} />);
}
