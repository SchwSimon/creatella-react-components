import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from 'redux/store';
import App from './App';
import 'lib/styles.scss';
import 'styles/styles.scss';

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

// TODO
// IDEA: add nice UX by adding centering animation of email/password on submit <ModalForgotPassword />
// add isDisabled to ItemPicker
