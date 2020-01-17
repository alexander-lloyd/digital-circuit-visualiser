import React, {useEffect, useRef, useReducer} from 'react';

import {FunctionEntity, FunctionEntityRenderer} from '../lib/render';

const SCALING_FACTOR = 1.05;

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
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Reset the position and scaling.
    ctx.setTransform();
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
 * Canvas Component State.
 */
interface CanvasState {
  scale: number;
}

const initialState = {
    scale: 1.0
};

type CanvasActions =
  | { type: 'scale_up' }
  | { type: 'scale_down' }
  | { type: 'reset_scale' };

/**
 * Component reducer.
 *
 * @param state Component internal state.
 * @param action Component action.
 * @returns The new state.
 */
function reducer(state: CanvasState, action: CanvasActions): CanvasState {
    const {scale} = state;

    console.log(`[Canvas Component]: ${action.type}`);

    switch (action.type) {
    case 'scale_up': {
        const newScale = Math.min(scale * SCALING_FACTOR, 5);
        return {...state,
            scale: newScale};
    }
    case 'scale_down': {
        const newScale = Math.max(scale / SCALING_FACTOR, 0.5);
        return {...state,
            scale: newScale};
    }
    case 'reset_scale': {
        return {...state,
            scale: 1.0};
    }
    default:
        return state;
    }
}

/**
 * Canvas Component.
 *
 * @returns React Component.
 */
export default function Canvas(): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect((): void => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (canvas === null) {
            return;
        }

        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (ctx === null) {
            return;
        }

        drawDiagram(ctx, canvas.width, canvas.height, state.scale);
    });

    return (
        <div>
            <div className="buttons">
                <button
                    className="button"
                    onClick={(): void => {
                        dispatch({type: 'reset_scale'});
                    }}>Reset Scale</button>
            </div>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onWheel={({deltaY}: React.WheelEvent): void => {
                    const delta = Math.sign(deltaY);
                    if (delta > 0) {
                        dispatch({type: 'scale_up'});
                    } else {
                        dispatch({type: 'scale_down'});
                    }
                }} />
        </div>
    );
}
