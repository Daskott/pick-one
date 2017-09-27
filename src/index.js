import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import lunchifyReducer from './redux/reducers';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    lunchifyReducer,
    compose(
        applyMiddleware(
            thunkMiddleware // lets us dispatch() functions
        ),
        (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose//dev-tool
    )
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
// registerServiceWorker();
