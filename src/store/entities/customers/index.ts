import {
    wrapper
} from '../../extra';

type CustomerData = {
    id: number;
    name: string
}[];

type CustomerError = {
    erorrName: string,
    errorId: 1 | 2
}[]

const customerSlice = wrapper<CustomerData, CustomerError>('customer', {});

export {
    customerSlice
}



