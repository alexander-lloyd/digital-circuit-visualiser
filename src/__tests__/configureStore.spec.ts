import configureStore from '../configureStore';

describe('configure store', () => {
    it('should return a store', () => {
        expect.assertions(1);
        expect(configureStore()).not.toBeNull();
    });
});
