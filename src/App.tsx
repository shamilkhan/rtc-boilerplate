import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {
  AppStore,
  AppDispatch
} from './store';
import {
  authSlice,
  fetchUserById
} from './store/extra';

function App() {

  const dispatch = useDispatch<AppDispatch>();

  /**@description Get Auth Value */
  const auth = useSelector((state: AppStore) => state.auth.data);

  const onRetry = () => dispatch(authSlice.actions.retry());

  const onFetchUserById = () => dispatch(
    fetchUserById(12312)
    ).then(data => console.log(data.payload)
  );

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
        <button onClick={onFetchUserById}>
          onFetchUserById
        </button>
      </header>
    </div>
  );
}

export default App;
