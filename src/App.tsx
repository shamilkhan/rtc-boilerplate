import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import {
  AppDispatch, AppStore
} from './store';
import { useAuth } from './store/entities/auth';
import { useCustomers } from './store/entities/customers';
import { slice as customerSlice } from './store/entities/customers';
import { asyncThunk } from './store/entities/paginationCollection';

function App() {

  const dispatch = useDispatch<AppDispatch>();

  const paginationCollection = useSelector((state: AppStore) => state.paginationCollection.data);

  const authData = useAuth();

  const customer = useCustomers();

  const setPopulate = useCallback(() => {
    dispatch(customerSlice.actions.expect());
  }, []);

  const loadNextPage = useCallback(() => {
    dispatch(asyncThunk({ params: String(1 + (paginationCollection?.page || 0)) }));
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        {paginationCollection && paginationCollection.data && (
          <ul>
            {
              paginationCollection.data.map(item => {
                return (
                  <li key={item.id}>
                    {item.description}
                  </li>
                )
              })}
          </ul>
        )}
        <button type='button' onClick={loadNextPage}>load next page</button>
        <p>
          {`Customer Value is ${customer.data}`}
        </p>
        {!!customer.data || (
          <button onClick={setPopulate} type='button'>
            Start load customer
          </button>
        )}
      </header>
    </div >
  );
}

export default App;
