import {
    ActionReducerMapBuilder,
} from '@reduxjs/toolkit';

import {
    createGenericSlice,
    GenericState
} from '../../extra';
import { Reducer } from 'react';

type Customer = {
    id: number;
    name: string
}[];

type CustomerError = {
    rerorName: string,
    errorId: 1 | 2
}[]

const customerSlice = createGenericSlice(
    {
        name: 'customer',
        reducers: {
            reset: (state) => ({
                ...state, data: null, error: [{
                    errorId: 2,
                    rerorName: 'Privet'
                }]
            })
        },
        endPoint: '/another',
        extraReducers: ((builder: ActionReducerMapBuilder<GenericState<Customer, CustomerError>>) => {
            console.log('use it--->', builder);
        })
    }
)

/**
 * @description Use extra reducer
 */
const customerResetResult = customerSlice.caseReducers.reset({
    expecting: true,
    waiting: false,
    data: [
        { id: 1, name: 'test' }
    ],
    error: [
        { errorId: 1, rerorName: 'test' }
    ],
});

export {
    customerSlice
}



