import React from 'react';
import {render} from '@testing-library/react';
import {
    drawDiagram,
    fitCanvasToContainer,
    downloadCanvasImage,
    mapStateToProps,
    Canvas
} from '../../../containers/Canvas/index';
import {ConstantAST, FileRange} from '../../../lib/parser';
import {GlobalState} from '../../../containers/App/types';


describe('fit canvas to container', () => {
    it('should fit canvas to container', () => {
        expect.assertions(2);
        const canvas = document.createElement('canvas');

        fitCanvasToContainer(canvas);

        expect(canvas.style.height).toBe('100%');
        expect(canvas.style.width).toBe('100%');
    });
});

describe('drawDiagram', () => {
    it('should draw diagram', () => {
        expect.assertions(1);
        const location = {} as FileRange;
        const ast = new ConstantAST('AND', location);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        drawDiagram(ast, ctx, 100, 100, 1, [0, 0], {});

        expect(ctx.__getEvents()).not.toBeNull();
    });
});

describe('download canvas image', () => {
    it('should download canvas image', (done) => {
        expect.assertions(1);
        const canvas = document.createElement('canvas');
        const link = document.createElement('a');
        link.addEventListener('click', () => {
            expect(link.getAttribute('download')).toStrictEqual('canvas.png');
            done();
        });

        downloadCanvasImage(canvas, link);
    });
});

describe('canvas component', () => {
    it('should map state to props', () => {
        expect.assertions(1);
        const state = {
            ast: null,
            scale: 1,
            download: {
                loading: true
            },
            featureFlags: {}
        } as unknown as GlobalState;
        expect(mapStateToProps(state)).toStrictEqual({
            ast: null,
            scale: 1,
            downloadLoading: true,
            featureFlags: {}
        });
    });

    it('should render component', () => {
        expect.assertions(1);
        const location = {} as FileRange;
        const ast = new ConstantAST('AND', location);
        const scale = 1;
        const downloadLoading = false;
        const featureFlags = {};
        const resetZoomMock = jest.fn();
        const throwErrorMock = jest.fn();
        const zoomInMock = jest.fn();
        const zoomOutMock = jest.fn();
        const component = (<Canvas ast={ast}
                                   downloadLoading={downloadLoading}
                                   featureFlags={featureFlags}
                                   resetZoom={resetZoomMock}
                                   scale={scale}
                                   throwRenderError={throwErrorMock}
                                   zoomIn={zoomInMock}
                                   zoomOut={zoomOutMock} />);
        const renderResult = render(component);
        expect(renderResult).not.toBeNull();
    });
});
