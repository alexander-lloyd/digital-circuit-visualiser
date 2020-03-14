import * as actions from '../../../containers/App/actions';
import * as types from '../../../containers/App/constants';
import {IdentifierAST, ConstantAST} from '../../../lib/parser/ast';
import {compile} from '../../../lib/parser/index';

jest.mock('../../../lib/parser/index');

describe('app actions', () => {
    it('should create a modal hide action', () => {
        expect.assertions(1);
        const expectedAction = {
            type: types.MODAL_HIDE
        };

        expect(actions.modalHideAction()).toStrictEqual(expectedAction);
    });

    it('should create a modal show action', () => {
        expect.assertions(1);
        const expectedAction = {
            type: types.MODAL_SHOW
        };

        expect(actions.modalShowAction()).toStrictEqual(expectedAction);
    });

    it('should create a set feature flag action', () => {
        expect.assertions(1);
        const name = 'RENDER_UNIT_SQUARE';
        const value = true;
        const expectedAction = {
            type: types.SET_FEATURE_FLAG,
            name,
            value
        };

        expect(actions.setFeatureFlag(name, value)).toStrictEqual(expectedAction);
    });

    it('should create a set source code request action', () => {
        expect.assertions(1);
        const source = 'NOT . AND';
        const expectedAction = {
            type: types.SET_SOURCE_REQUEST,
            source
        };

        expect(actions.setSourceCodeRequest(source)).toStrictEqual(expectedAction);
    });

    it('should create a set source code success action', () => {
        expect.assertions(1);
        const location = {
            start: {
                column: 1,
                line: 1,
                offset: 1
            },
            end: {
                column: 1,
                line: 1,
                offset: 1
            }
        };
        const ast = new IdentifierAST('AND', location);
        const expectedAction = {
            type: types.SET_SOURCE_SUCCESS,
            ast
        };

        expect(actions.setSourceCodeSuccess(ast)).toStrictEqual(expectedAction);
    });

    it('should create a set source code failure action', () => {
        expect.assertions(1);
        const reason = 'Syntax Error';
        const expectedAction = {
            type: types.SET_SOURCE_FAILURE,
            reason
        };

        expect(actions.setSourceCodeFailure(reason)).toStrictEqual(expectedAction);
    });

    it('should create a set reset zoom action', () => {
        expect.assertions(1);
        const expectedAction = {
            type: types.RESET_SCALE
        };

        expect(actions.resetZoom()).toStrictEqual(expectedAction);
    });

    it('should create a zoom in action', () => {
        expect.assertions(1);
        const expectedAction = {
            type: types.ZOOM_IN
        };

        expect(actions.zoomIn()).toStrictEqual(expectedAction);
    });

    it('should create a zoom out action', () => {
        expect.assertions(1);
        const expectedAction = {
            type: types.ZOOM_OUT
        };

        expect(actions.zoomOut()).toStrictEqual(expectedAction);
    });
});

describe('app action creaters', () => {
    it('should dipatch source code request and success', () => {
        expect.assertions(3);
        jest.resetAllMocks();

        const location = {
            start: {
                column: 1,
                line: 1,
                offset: 1
            },
            end: {
                column: 1,
                line: 1,
                offset: 1
            }
        };

        const ast = new ConstantAST('AND', location);
        (compile as jest.Mock).mockReturnValue(ast);

        const dispatchMock = jest.fn();
        const source = 'AND';

        const action = actions.setSourceCode(dispatchMock);

        action(source);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: types.SET_SOURCE_REQUEST,
            source
        });

        expect(compile).toHaveBeenCalledWith(source);

        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: types.SET_SOURCE_SUCCESS,
            ast
        });
    });

    it('should dipatch source code request and failure when exception is thrown', () => {
        expect.assertions(3);
        jest.resetAllMocks();

        const location = {
            start: {
                column: 1,
                line: 1,
                offset: 1
            },
            end: {
                column: 1,
                line: 1,
                offset: 1
            }
        };

        const ast = new ConstantAST('AND', location);
        const reason = 'Syntax Error';
        (compile as jest.Mock).mockImplementation(() => {throw new SyntaxError(reason)});

        const dispatchMock = jest.fn();
        const source = 'NoT Valid';

        const action = actions.setSourceCode(dispatchMock);

        action(source);

        expect(dispatchMock).toHaveBeenNthCalledWith(1, {
            type: types.SET_SOURCE_REQUEST,
            source
        });

        expect(compile).toHaveBeenCalledWith(source);

        expect(dispatchMock).toHaveBeenNthCalledWith(2, {
            type: types.SET_SOURCE_FAILURE,
            reason
        });
    });
});
