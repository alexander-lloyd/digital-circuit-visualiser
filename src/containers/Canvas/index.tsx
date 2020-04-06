/* eslint no-magic-numbers: ["warn", {"ignore": [0, 1, 2]}] */
import React, {useEffect, useRef, useState, MouseEvent} from 'react';
import {connect} from 'react-redux';
import useResizeAware from 'react-resize-aware';

import * as actions from '../App/actions';
import CanvasButtonGroup from './CanvasButtonGroup';
import {GlobalState} from '../App/types';
import {
    ASTRenderer,
    EntityRendererVisitor,
    renderResult,
    scaleRenderResult,
    translateRenderResult
} from '../../lib/render/index';
import {AST} from '../../lib/parser/index';
import {Render2} from '../../lib/render/render2';

/**
 * As a workaround for not being able to set height and width to 100%.
 *
 * Sets height and width to 100%, gets the computed value and then sets
 * them statically. Needs to be called every time the screen size changes.
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
 * @param ast Abstract Syntax Tree.
 * @param ctx Canvas Context.
 * @param canvasWidth Canvas width.
 * @param canvasHeight Canvas height.
 * @param scale The scaling factor.
 * @param offsetPosition Canvas Offset.
 * @param featureFlags Feature Flags. E.g. Should the squares around functions be rendered?
 */
function drawDiagram(
    ast: AST,
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    scale: number,
    offsetPosition: [number, number],
    featureFlags: { [featureId: string]: boolean}
): void {
    // const astRenderer = new ASTRenderer();
    // const entityTree = astRenderer.visit(ast, {
    //     depthX: 1,
    //     depthY: 1
    // });

    // const entityRenderer = new EntityRendererVisitor();
    // const entityRendererConfig = {
    //     featureFlags
    // };
    // let result = entityRenderer.visit(entityTree, entityRendererConfig);
    const renderer2 = new Render2();
    let result = renderer2.visit(ast, null);

    const scalingValue = Math.min(canvasHeight, canvasWidth);
    result = scaleRenderResult(result, scalingValue / 2, scalingValue / 2);
    const START_POSITION = 30;
    result = translateRenderResult(result, START_POSITION, START_POSITION);

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Reset the position and scaling.
    ctx.setTransform();
    ctx.save();
    const [dragPositionX, dragPositionY] = offsetPosition;
    ctx.scale(scale, scale);
    ctx.translate(dragPositionX, dragPositionY);

    renderResult(ctx, result);
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
    featureFlags: { [featureId: string]: boolean};
}

/**
 * Canvas Dispatch Properties
 */
interface CanvasDispatchProps {
    resetZoom: typeof actions.resetZoom;
    throwRenderError: typeof actions.setSourceCodeFailure;
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
        featureFlags,
        resetZoom,
        throwRenderError,
        zoomIn,
        zoomOut
    } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const downloadRef = useRef<HTMLAnchorElement>(null);

    const [dragStartPosition, setDragging] = useState<[number, number] | null>(null);
    const [canvasPosition, setCanvasPosition] = useState<[number, number]>([0, 0]);

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
        try {
            drawDiagram(ast, ctx, canvas.width, canvas.height, scale, canvasPosition, featureFlags);
        } catch (e) {
            throwRenderError(e.toString());
        }
    }, [ast, canvasRef, scale, resetZoom, sizes.width, sizes.height, canvasPosition, featureFlags, throwRenderError]);

    /** Wrapper around download canvas function */
    const downloadCanvas = (): void => {
        if (canvasRef.current === null || downloadRef.current === null) {
            return;
        }

        downloadCanvasImage(canvasRef.current, downloadRef.current);
    };

    /* Handle Canvas Drag Operations */

    /**
     * Canvas Mouse Down. Set Dragging.
     *
     * @param event MouseEvent.
     */
    function canvasOnMouseDown(event: MouseEvent): void {
        const {offsetX, offsetY} = event.nativeEvent;
        const [translateX, translateY] = canvasPosition;
        setDragging([offsetX - translateX, offsetY - translateY]);
    }

    /**
     * Mouse has moved. If dragging update the canvas position.
     *
     * @param event Mouse Event
     */
    function canvasOnMouseMove(event: MouseEvent): void {
        if (dragStartPosition !== null) {
            const [startX, startY] = dragStartPosition;
            const {offsetX, offsetY} = event.nativeEvent;
            setCanvasPosition([offsetX - startX, offsetY - startY]);
        }
    }

    /**
     * Mouse lifted on canvas. Turn off draggable.
     */
    function canvasOnMouseUp(): void {
        setDragging(null);
    }

    /**
     * Reset the canvas perspective.
     */
    function onResetPerspective(): void {
        const [canvasX, canvasY] = canvasPosition;
        if (canvasX !== 0 || canvasY !== 0) {
            setCanvasPosition([0, 0]);
        }
    }

    /**
     * Handle mouse scroll.
     *
     * @param event Mouse wheel event.
     */
    function canvasOnMouseWheel({deltaY}: React.WheelEvent): void {
        const delta = Math.sign(deltaY);
        if (delta > 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    }

    return (
        <div className="fullheight">
            <CanvasButtonGroup isDownloadLoading={downloadLoading}
                               onDownload={downloadCanvas}
                               onResetPerspective={onResetPerspective}
                               onResetScale={resetZoom} />
            <div className=""
                 style={
                    {position: 'relative',
                        height: 'calc(100% - (1rem + 1.25rem))'}
                }>
                {resizeListener}
                <canvas onMouseDown={canvasOnMouseDown}
                        onMouseMove={canvasOnMouseMove}
                        onMouseUp={canvasOnMouseUp}
                        onWheel={canvasOnMouseWheel}
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
    const {ast, scale, download: {loading}, featureFlags} = state;
    return {
        ast,
        scale,
        downloadLoading: loading,
        featureFlags
    };
}

const mapDispatchToProps: CanvasDispatchProps = {
    resetZoom: actions.resetZoom,
    zoomIn: actions.zoomIn,
    zoomOut: actions.zoomOut,
    throwRenderError: actions.setSourceCodeFailure
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);
