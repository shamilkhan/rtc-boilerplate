import { GenericState } from '../../remoteData/interfaces';
import { createRemoteData } from '../../remoteData/createRemoteData';
import { createUseData } from '../../remoteData/createUseData';

export type Customer = {
    id: number;
    name: string
}[];

export type CustomerError = {
    rerorName: string,
    errorId: 1 | 2
}[]

export const {
    slice,
    asyncThunk
} = createRemoteData({
    name: 'customers',
    endPoint: 'customers',
    initialState: { expecting: false } as GenericState<Customer, CustomerError>,
    reducers: {
        resetError: (state) => ({
            ...state as GenericState<Customer, CustomerError>,
            error: null
        })
    },
});

export const useCustomers = createUseData({ sliceName: 'customers', asyncThunk })

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



