import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { createStore } from 'redux';

import trelloApp from './reducers';

 
const store = createStore(trelloApp);

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 100,
  },
});

render(
    <MuiThemeProvider muiTheme={muiTheme}><Provider store={store}>
        <App />
    </Provider></MuiThemeProvider>, 
    document.getElementById('root')
);
registerServiceWorker();
