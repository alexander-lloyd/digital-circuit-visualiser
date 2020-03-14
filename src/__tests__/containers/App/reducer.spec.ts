import {reducer, initialState} from '../../../containers/App/reducer';
import * as types from '../../../containers/App/constants';
import {
    AppActions,
    ModalHideAction,
    ModalShowAction,
    ResetScaleAction,
    SetFeatureFlagAction,
    SetSourceCodeFailureAction,
    SetSourceCodeRequestAction,
    SetSourceCodeSuccessAction,
    ZoomInAction,
    ZoomOutAction
} from '../../../containers/App/types';
import {ConstantAST, FileRange} from '../../../lib/parser/ast';

describe('app reducer', () => {
    it('should return initial state', () => {
        expect.assertions(1);
        expect(reducer(undefined, {} as AppActions)).toBe(initialState);
    });

    it('should handle modal hide', () => {
        expect.assertions(1);
        const action: ModalHideAction = {
            type: types.MODAL_HIDE
        };
        expect(reducer(initialState, action)).toStrictEqual({
            ...initialState,
            showModal: false
        });
    });

    it('should handle modal show', () => {
        expect.assertions(1);
        const action: ModalShowAction = {
            type: types.MODAL_SHOW
        };
        expect(reducer(initialState, action)).toStrictEqual({
            ...initialState,
            showModal: true
        });
    });

    it('should handle set feature flag', () => {
        expect.assertions(1);
        const action: SetFeatureFlagAction = {
            type: types.SET_FEATURE_FLAG,
            name: 'RENDER_UNIT_SQUARE',
            value: true
        };
        expect(reducer(initialState, action)).toStrictEqual({
            ...initialState,
            featureFlags: {
                ...initialState.featureFlags,
                RENDER_UNIT_SQUARE: true
            }
        });
    });

    it('should handle set source request', () => {
        expect.assertions(1);
        const source = 'AND';
        const action: SetSourceCodeRequestAction = {
            type: types.SET_SOURCE_REQUEST,
            source
        };
        expect(reducer(initialState, action)).toStrictEqual({
            ...initialState,
            code: source
        });
    });

    it('should shouldnt change the state if source is the same', () => {
        expect.assertions(1);
        const source = 'AND';
        const action: SetSourceCodeRequestAction = {
            type: types.SET_SOURCE_REQUEST,
            source
        };
        const state = reducer(initialState, action);
        expect(reducer(state, action)).toBe(state);
    });

    it('should handle set source success', () => {
        expect.assertions(1);
        const ast = new ConstantAST('AND', {} as FileRange);
        const action: SetSourceCodeSuccessAction = {
            type: types.SET_SOURCE_SUCCESS,
            ast
        };
        expect(reducer(initialState, action)).toStrictEqual({
            ...initialState,
            ast,
            errorString: null
        });
    });

    it('should handle set source failure', () => {
        expect.assertions(1);
        const reason = 'Syntax Error';
        const action: SetSourceCodeFailureAction = {
            type: types.SET_SOURCE_FAILURE,
            reason
        };
        expect(reducer(initialState, action)).toStrictEqual({
            ...initialState,
            ast: null,
            errorString: reason
        });
    });

    it('should handle reset scale', () => {
        expect.assertions(1);
        const action: ResetScaleAction = {
            type: types.RESET_SCALE
        };
        expect(reducer({
            ...initialState,
            scale: 2
        }, action)).toStrictEqual({
            ...initialState,
            scale: 1
        });
    });

    it('should handle zoom in', () => {
        expect.assertions(1);
        const action: ZoomInAction = {
            type: types.ZOOM_IN
        };
        expect(reducer({
            ...initialState,
            scale: 2
        }, action)).toStrictEqual({
            ...initialState,
            scale: 2.1
        });
    });

    it('should handle zoom out', () => {
        expect.assertions(1);
        const action: ZoomOutAction = {
            type: types.ZOOM_OUT
        };
        expect(reducer({
            ...initialState,
            scale: 2.1
        }, action)).toStrictEqual({
            ...initialState,
            scale: 2
        });
    });
});
