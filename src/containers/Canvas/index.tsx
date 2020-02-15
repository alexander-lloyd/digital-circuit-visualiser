import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import useResizeAware from 'react-resize-aware';

import { FunctionEntity, FunctionEntityRenderer } from '../../lib/render';

import { resetZoom, zoomIn, zoomOut, CanvasActionCreaters } from './actions';
import CanvasButtonGroup from './CanvasButtonGroup';
import { GlobalState } from 'reducers';

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

    requestAnimationFrame(() => {

        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.setTransform(); // Reset the position and scaling.
        ctx.save();
        ctx.scale(scale, scale);

        const entity: FunctionEntity = {
            x1: 100,
            y1: 100,
            width: 100,
            height: 100,
            label: 'f'
        };

        const renderer = new FunctionEntityRenderer();
        renderer.render(ctx, entity);
    });
}

/**
 * Download an image of the Canvas.
 *
 * @param canvas Canvas Element.
 */
function downloadCanvasImage(canvas: HTMLCanvasElement | null, downloadLink: HTMLAnchorElement | null): void {
    if (canvas === null || downloadLink === null) {
        return;
    }

    const image = canvas.toDataURL('image/png').
        replace('image/png', 'image/octet-stream');
    downloadLink.setAttribute('download', 'canvas.png');
    downloadLink.setAttribute('href', image);
    downloadLink.click();
}

/**
 * Canvas Properties.
 */
interface CanvasProperties {
    scale: number;
    downloadLoading: boolean;
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
        downloadLoading,
        resetZoom,
        zoomIn,
        zoomOut
    } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const downloadRef = useRef<HTMLAnchorElement>(null);

    const [resizeListener, sizes] = useResizeAware();
    
    React.useEffect(() => {
        console.log('canvas resize');
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (canvas == null) {
            return;
        }
        fitCanvasToContainer(canvas);
        // Dispatch a reset scale event
        const ctx = canvas.getContext('2d');
        if (ctx == null) {
            return;
        }
        drawDiagram(ctx, canvas.width, canvas.height, scale);
    }, [sizes.width, sizes.height, canvasRef, resetZoom, scale]);

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
          <CanvasButtonGroup isDownloadLoading={downloadLoading}
                             onDownload={() => { downloadCanvasImage(canvasRef.current, downloadRef.current); }}
                             onResetScale={resetZoom} />
          <div className=""
               style={{ position: 'relative', height: 'calc(100% - (1rem + 1.25rem))'}}>
              {resizeListener}
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
                      ref={canvasRef}  />
          </div>
          <a hidden
             ref={downloadRef} />
      </div>
  );
}


/**
 * Map State to React Props.
 *
 * @param state Canvas State.
 * @returns Component Props.
 */
function mapStateToProps(state: GlobalState): CanvasProperties {
    return {
        scale: state.canvas.scale,
        downloadLoading: state.canvas.download.loading
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
