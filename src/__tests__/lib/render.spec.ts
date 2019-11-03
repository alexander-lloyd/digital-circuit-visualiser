import { WireEntity, WireEntityRenderer, FunctionEntity, FunctionEntityRenderer } from '../../lib/render';

describe('WireEntityRenderer', () => {
    it('should match snapshot', () => {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const entity: WireEntity = {
            x1: 20,
            y1: 20,
            x2: 30,
            y2: 20
          }

        const renderer = new WireEntityRenderer();
        renderer.render(ctx, entity);

        const events = ctx.__getEvents();
        expect(events).toMatchSnapshot()
        const calls = ctx.__getDrawCalls();
        expect(calls).toMatchSnapshot();
    });
});

describe('FunctionEntityRender', () => {
    it('should match snapshot', () => {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const entity: FunctionEntity = {
            x1: 20,
            y1: 20,
            width: 100,
            height: 100,
            label: 'f'
        }
      
        const renderer = new FunctionEntityRenderer();
        renderer.render(ctx, entity);

        const events = ctx.__getEvents();
        expect(events).toMatchSnapshot()
        const calls = ctx.__getDrawCalls();
        expect(calls).toMatchSnapshot();
    });

    it('should throw warning if label is larger than function box', () => {
        console.warn = jest.fn();
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const entity: FunctionEntity = {
            x1: 20,
            y1: 20,
            width: 10,
            height: 10,
            label: 'super long string that larger than width of box'
        }

        const renderer = new FunctionEntityRenderer();
        renderer.render(ctx, entity);

        expect(console.warn).toHaveBeenCalled();
    });
});