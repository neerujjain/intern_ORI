import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware, compose} from 'redux';
import Thunk from 'redux-thunk';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import App from './components/App';
import reducers from './reducers';
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||compose;

const persistConfig = {
    key: 'root',
    storage: storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(Thunk)));

const persistor = persistStore(store);
ReactDOM.render(
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>, document.getElementById('root'));


// const store=createStore(
//     reducers,
//     composeEnhancers(applyMiddleware(reduxthunk))
// );

// ReactDOM.render(
//     <Provider store={store}>
//     <App />
//     </Provider>, document.getElementById('root'));
