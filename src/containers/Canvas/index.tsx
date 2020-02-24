import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import useResizeAware from 'react-resize-aware';

import * as actions from '../App/actions';
import CanvasButtonGroup from './CanvasButtonGroup';
import {GlobalState} from '../App/types';
import {
    ASTRenderer,
    EntityRendererVisitor
} from '../../lib/renderer2';
import {compile, AST} from '../../lib/parser/index';

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
function drawDiagram(
    ast: AST,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    scale: number
): void {
    requestAnimationFrame(() => {
        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // Reset the position and scaling.
        ctx.setTransform();
        ctx.save();
        ctx.scale(scale, scale);

        const astRenderer = new ASTRenderer();
        const renderTree = astRenderer.visit(ast, null);
        renderTree.scale(400, 400);
        renderTree.translate(50, 50);
        const entityRenderer = new EntityRendererVisitor();
        const rendererContext = {
            ctx,
            canvasCtx: {
                canvasHeight,
                canvasWidth
            }
        };

        entityRenderer.visit(renderTree, rendererContext);
        // RENDER_UNITSQUARE_BOX: true
    });
}

/**
 * Download an image of the Canvas.
 *
 * @param canvas Canvas Element.
 * @param downloadLink Anchor Tag used to download canvas.
 */
function downloadCanvasImage(canvas: HTMLCanvasElement, downloadLink: HTMLAnchorElement): void {
    const image = canvas.toDataURL('image/png').
        replace('image/png', 'image/octet-stream');
    downloadLink.setAttribute('download', 'canvas.png');
    downloadLink.setAttribute('href', image);
    downloadLink.click();
}

/**
 * Canvas State.
 */
interface CanvasState {
    ast: AST | null;
    downloadLoading: boolean;
    scale: number;
}

/**
 * Canvas Dispatch Properties
 */
interface CanvasDispatchProps {
    resetZoom: typeof actions.resetZoom;
    zoomIn: typeof actions.zoomIn;
    zoomOut: typeof actions.zoomOut;
}

/**
 * Canvas Properties.
 */
interface CanvasProps extends CanvasState, CanvasDispatchProps {}

/**
 * Canvas Component.
 *
 * @param props Component Propeties.
 * @returns React Component.
 */
function Canvas(props: CanvasProps): JSX.Element {
    const {
        ast,
        scale,
        downloadLoading,
        resetZoom,
        zoomIn,
        zoomOut
    } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const downloadRef = useRef<HTMLAnchorElement>(null);

    const [resizeListener, sizes] = useResizeAware();

    useEffect((): void => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (canvas === null || ast === null) {
            return;
        }
        fitCanvasToContainer(canvas);

        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (ctx === null) {
            return;
        }

        drawDiagram(ast, ctx, canvas.width, canvas.height, scale);
    }, [ast, canvasRef, scale, resetZoom, sizes.width, sizes.height]);

    /** Wrapper around download canvas function */
    const downloadCanvas = (): void => {
        if (canvasRef.current === null || downloadRef.current === null) {
            return;
        }

        downloadCanvasImage(canvasRef.current, downloadRef.current);
    };

    return (
        <div className="fullheight">
            <CanvasButtonGroup isDownloadLoading={downloadLoading}
                               onDownload={downloadCanvas}
                               onResetScale={resetZoom} />
            <div className=""
                 style={
                    {position: 'relative',
                        height: 'calc(100% - (1rem + 1.25rem))'}
                }>
                {resizeListener}
                <canvas onWheel={
                    ({deltaY}: React.WheelEvent): void => {
                        const delta = Math.sign(deltaY);
                        if (delta > 0) {
                            zoomIn();
                        } else {
                            zoomOut();
                        }
                    }
                }
                        ref={canvasRef} />
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
function mapStateToProps(state: GlobalState): CanvasState {
    const {ast, scale, download: {loading}} = state;
    return {
        ast,
        scale,
        downloadLoading: loading
    };
}

const mapDispatchToProps: CanvasDispatchProps = {
    resetZoom: actions.resetZoom,
    zoomIn: actions.zoomIn,
    zoomOut: actions.zoomOut
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);
