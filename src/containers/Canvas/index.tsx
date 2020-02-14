import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import useResizeAware from 'react-resize-aware';

import { FunctionEntity, FunctionEntityRenderer } from '../../lib/render';

import { resetZoom, zoomIn, zoomOut, CanvasActionCreaters } from './actions';
import { CanvasState } from './types';

/**
 * As a workaround for not being able to set height and width to 100%.
 *
 * Sets height and width to 100%, gets the computed value and then sets
 * them statically. Needs to be called everytime the screen size changes.
 *
 * Base on https://stackoverflow.com/questions/10214873/make-canvas-as-wide-and-as-high-as-parent.
 *
 * @param canvas Html Canvas Element.
 */
function fitCanvasToContainer(canvas: HTMLCanvasElement): void {
  // Make it fit the parent.
  canvas.style.height = '100%';
  canvas.style.width = '100%';

  // Set the height and width to computed values.
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

/**
 * Draw the diagram on the canvas.
 *
 * @param ctx Canvas Context.
 * @param canvasWidth Canvas width.
 * @param canvasHeight Canvas height.
 * @param scale The scaling factor.
 */
function drawDiagram(ctx: CanvasRenderingContext2D, canvasWidth: number,
    canvasHeight: number, scale: number): void {

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.setTransform(); // Reset the position and scaling.
    ctx.save();
    ctx.scale(scale, scale);

    const entity: FunctionEntity = {
        x1: 20,
        y1: 20,
        width: 100,
        height: 100,
        label: 'f'
    };

    const renderer = new FunctionEntityRenderer();
    renderer.render(ctx, entity);
}

/**
 * Canvas Properties.
 */
interface CanvasProperties {
    scale: number;
}

/**
 * Canvas Props.
 */
interface CanvasProps extends CanvasActionCreaters, CanvasProperties {}

/**
 * Canvas Component.
 *
 * @param props Component Propeties.
 * @returns React Component.
 */
function Canvas(props: CanvasProps): JSX.Element {
  const {
      scale,
      resetZoom,
      zoomIn,
      zoomOut
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

    const [resizeListener, sizes] = useResizeAware();

  React.useEffect(() => {
    console.log('canvas resize');
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas == null) {
      return;
    }
    fitCanvasToContainer(canvas);
    // Dispatch a reset scale event
    resetZoom();
  }, [sizes.width, sizes.height, canvasRef, resetZoom]);

  useEffect((): void => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    if (canvas == null) {
      return;
    }

    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (ctx == null) {
      return;
    }

    drawDiagram(ctx, canvas.width, canvas.height, scale);
  }, [canvasRef, scale]);

  return (
      <div className="fullheight">
          {resizeListener}
          <div className="buttons box">
              <button className="button"
                      onClick={(): void => { props.resetZoom(); }}
                      type="button">
                  Reset Scale
              </button>
          </div>
          <canvas onWheel={
                    ({ deltaY }: React.WheelEvent): void => {
          const delta = Math.sign(deltaY);
          if (delta > 0) {
            zoomIn();
          } else {
            zoomOut();
          }
        }
      }
                  ref={canvasRef}
                  style={{ position: 'relative'}} />
      </div>
  );
}


/**
 * Map State to React Props.
 *
 * @param state Canvas State.
 * @returns Component Props.
 */
function mapStateToProps(state: CanvasState): CanvasProperties {
  const { scale } = state;
  return {
    scale
  };
}

const mapDispatchToProps = {
  resetZoom,
  zoomIn,
  zoomOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Canvas);