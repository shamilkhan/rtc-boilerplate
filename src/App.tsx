import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import { 
  AppStore,
  AppDispatch
 } from './store';
import { authSlice } from './store/extra';

function App() {

  const dispatch = useDispatch<AppDispatch>();

  /**@description Get Auth Value */
  const auth = useSelector((state: AppStore) => state.auth.data);

  const onRetry = () => dispatch(authSlice.actions.retry());

  const onTest = () => dispatch({type: 'NOT_EXISTING'});

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={onRetry}>
          onClick
        </button>
      </header>
    </div>
  );
}

export default App;
