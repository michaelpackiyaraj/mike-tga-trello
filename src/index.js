import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';

import trelloApp from './reducers';
 
const store = createStore(trelloApp);

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
