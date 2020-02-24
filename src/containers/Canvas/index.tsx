import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import useResizeAware from 'react-resize-aware';

import * as actions from './actions';
import CanvasButtonGroup from './CanvasButtonGroup';
import {GlobalState} from '../../reducers';
import {
    ASTOptimisingTransformer,
    ASTRenderer,
    EntityRendererVisitor
} from '../../lib/renderer2';
import {
    LetAST,
    IdentifierAST,
    BinaryOpAST,
    ConstantAST,
    ApplicationAST
} from '../../lib/parser/index';

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
    ctx: CanvasRenderingContext2D, canvasWidth: number,
    canvasHeight: number, scale: number
): void {
    requestAnimationFrame(() => {
        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // Reset the position and scaling.
        ctx.setTransform();
        ctx.save();
        ctx.scale(scale, scale);

        const ast = new LetAST(
            new IdentifierAST('x'),
            new BinaryOpAST(
                'tensor',
                new ConstantAST('AND'),
                new ConstantAST('OR')
            ),
            new ApplicationAST('x', [])
        );

        const astTransformerContext = {
            identifiers: new Map()
        };

        const transformer = new ASTOptimisingTransformer();
        const newAST = transformer.visit(ast, astTransformerContext);
        const astRenderer = new ASTRenderer();
        const renderTree = astRenderer.visit(newAST, null);
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
 * Canvas Properties.
 */
interface CanvasProperties {
    downloadLoading: boolean;
    scale: number;
}

/**
 * Canvas Props.
 */
interface CanvasProps extends actions.CanvasActionCreaters, CanvasProperties {}

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
        if (canvas === null) {
            return;
        }
        fitCanvasToContainer(canvas);
        // Dispatch a reset scale event
        const ctx = canvas.getContext('2d');
        if (ctx === null) {
            return;
        }
        drawDiagram(ctx, canvas.width, canvas.height, scale);
    }, [sizes.width, sizes.height, canvasRef, resetZoom, scale]);

    useEffect((): void => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (canvas === null) {
            return;
        }

        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (ctx === null) {
            return;
        }

        drawDiagram(ctx, canvas.width, canvas.height, scale);
    }, [canvasRef, scale]);

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
function mapStateToProps(state: GlobalState): CanvasProperties {
    return {
        scale: state.canvas.scale,
        downloadLoading: state.canvas.download.loading
    };
}

const mapDispatchToProps = {
    resetZoom: actions.resetZoom,
    zoomIn: actions.zoomIn,
    zoomOut: actions.zoomOut
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);
