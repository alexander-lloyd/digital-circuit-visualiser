import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Canvas from '../Canvas/index';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Sidebar from '../../components/Sidebar';

import * as actions from './actions';
import {INITIAL_CODE} from './constants';
import {GlobalState, DispatchFunction} from './types';

import {HELP_TITLE, HelpContentComponent} from '../../assets/help';

import './App.scss';

/**
 * App Component State.
 */
interface AppState {
    showModal: boolean;
}

/**
 * App Actions.
 */
interface AppDispatchProps {
    closeModal: () => void;
    setInitialSourceCode: () => void;
}

/**
 * App Properties.
 */
interface AppProps extends AppState, AppDispatchProps {}

/**
 * App Component.
 *
 * @returns App
 */
export function App({showModal, closeModal, setInitialSourceCode}: AppProps): JSX.Element {
    useEffect(() => {
        setInitialSourceCode();
    });

    return (
        <div className="fullscreen">
            <Header />
            <div className="columns is-fullheight-with-navbar is-gapless"
                 style={{height: 'calc(100% - 1rem)'}}>
                <div className="column fullheight is-narrow">
                    <Sidebar />
                </div>
                <div className="column">
                    <Canvas />
                </div>
            </div>
            <Modal closeAction={closeModal}
                   show={showModal}
                   title={HELP_TITLE} >
                <HelpContentComponent />
            </Modal>
        </div>
    );
}


/**
 * Map state to props.
 *
 * @returns Component Props.
 */
function mapStateToProps({showModal}: GlobalState): AppState {
    return {
        showModal
    };
}

/**
 * Map Dispatch to Props.
 *
 * @param dispatch Action dispatcher.
 * @returns Props.
 */
function mapDispatchToProps(dispatch: DispatchFunction): AppDispatchProps {
    const {modalHideAction, setSourceCode} = actions;
    return {
        closeModal: (): void => dispatch(modalHideAction()),
        setInitialSourceCode: (): void => setSourceCode(dispatch)('A . B . C')
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
