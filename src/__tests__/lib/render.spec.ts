import { WireEntity, WireEntityRenderer } from '../../lib/render';

describe('WireEntityRenderer', () => {
    it('should match snapshot', () => {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

        const wire: WireEntity = {
            x1: 20,
            y1: 20,
            x2: 30,
            y2: 20
          }

        const entity = new WireEntityRenderer();
        entity.render(ctx, wire);

        const events = ctx.__getEvents();
        expect(events).toMatchSnapshot()
        const calls = ctx.__getDrawCalls();
        expect(calls).toMatchSnapshot();
    });
})