import * as React from 'react';
import {connect} from 'react-redux';

import Canvas from '../Canvas/index';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import Sidebar from '../../components/Sidebar';

import * as actions from './actions';
import {GlobalState, DispatchFunction} from './types';

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
function App({showModal, closeModal}: AppProps): JSX.Element {
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
                   content="Test Content"
                   show={showModal}
                   title="Test Title" />
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
    const {modalHideAction} = actions;
    return {
        closeModal: (): void => dispatch(modalHideAction())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
