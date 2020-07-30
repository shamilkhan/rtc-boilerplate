import {
    wrapper,
    GenericState
} from '../../extra';
import { createUseData } from '../../extra/useData';

export type Customer = {
    id: number;
    name: string
}[];

export type CustomerError = {
    rerorName: string,
    errorId: 1 | 2
}[]


//TODO: Вывести здесь тип!
const reducers = {
    reset: (state: any) => ({
        ...state, data: null, error: [{
            errorId: 2,
           erName: 'Privet'
        }]
    })
};


//TODO: объединить в вызов одной функциии
const { slice, asyncThunk } = wrapper<Customer, CustomerError, void, typeof reducers>(
    {
        name: 'customer',
        endPoint: '/another',
        reducers,
    }
);

export const useCustomers = createUseData<Customer, CustomerError>({ sliceName: 'customer', asyncThunk })

/**
 * @description Use extra reducer
 */
const customerResetResult = slice.caseReducers.reset({
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
    slice
}



