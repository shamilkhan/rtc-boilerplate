import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {
  AppStore,
  AppDispatch
} from './store';
import { useAuth } from './store/entities/auth';
import { useCustomers } from './store/entities/customers';
import { slice as customerSlice } from './store/entities/customers';

function App() {

  const dispatch = useDispatch<AppDispatch>();

  const authData = useAuth();

  const customer = useCustomers();

  const setPopulate = useCallback(() => {
    dispatch(customerSlice.actions.expect());
  }, []);

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
        <p>
          {`Customer Value is ${customer.data}`}
        </p>
        {!!customer.data || (
          <button onClick={setPopulate} type='button'>
            Start load customer
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
