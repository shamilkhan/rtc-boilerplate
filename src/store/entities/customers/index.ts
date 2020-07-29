import {
    ActionReducerMapBuilder,
} from '@reduxjs/toolkit';

import {
    createGenericSlice,
    GenericState
} from '../../extra';

type Customer = {
    id: number;
    name: string
}[];

type CustomerError = {
    erorrName: string,
    errorId: 1 | 2
}[]

const customerSlice = createGenericSlice(
    {
        name: 'customer',
        initialState: {} as Partial<GenericState<Customer, CustomerError>>,
        reducers: {
            reset: (state) => ({
                ...state, data: null, error: [{
                    errorId: 2,
                    erorrName: 'Privet'
                }]
            })
        },
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
    retry: false,
    update: false,
    waiting: false,
    data: [
        { id: 1, name: 'test' }
    ],
    error: [
        { errorId: 1, erorrName: 'test' }
    ],
});

export {
    customerSlice
}



