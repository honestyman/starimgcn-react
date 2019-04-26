import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DocumentTitle from 'react-document-title'

import store from './store'
import * as serviceWorker from './serviceWorker';

import './index.css';
import WebApp from './containers/WebApp'

function App() {
  return (
    <Provider store={store}>
      <DocumentTitle title={`快来pick你喜欢的爱豆 | starImg`}>
        <WebApp />
      </DocumentTitle>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
