import React from 'react';
import DocumentTitle from 'react-document-title'
import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <DocumentTitle title={`快来pick你喜欢的爱豆 | starImg`}>
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </DocumentTitle>
  );
}

export default App;
