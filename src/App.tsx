import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {
  AppStore,
  AppDispatch
} from './store';
import { useAuth } from './store/entities/auth';
import { useCustomers } from './store/entities/customers';

function App() {

  const dispatch = useDispatch<AppDispatch>();

  const authData = useAuth();
  
  const customer = useCustomers();

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
      </header>
    </div>
  );
}

export default App;
