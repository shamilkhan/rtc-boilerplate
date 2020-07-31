import {
    wrapper,
    GenericState,
    createGenericSlice
} from '../../extra';
import { createUseData } from '../../extra/useData';
import { createThunk } from '../../extra/createAsyncThunk';

export type Customer = {
    id: number;
    name: string
}[];

export type CustomerError = {
    rerorName: string,
    errorId: 1 | 2
}[]

const asyncThunk = createThunk<Customer, void>({ endPoint: "/test", name: 'customer' });

const slice = createGenericSlice({
    name: 'customer',
    endPoint: '/test',
    initialState: {expecting: false} as GenericState<Customer, CustomerError>,
    reducers: {
        resetError: (state) => ({
            ...state, 
            error: null
        })
    },
    asyncThunk
});

export const useCustomers = createUseData<Customer, CustomerError>({ sliceName: 'customer', asyncThunk })

/**
 * @description Use extra reducer
 */
const customerResetResult = slice.caseReducers.resetError({
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
    slice,
}



