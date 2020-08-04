import { Customer, CustomerError } from './index';
import { GenericState } from '../../remoteDataState/interfaces';
import { createRemoteDataState } from '../../remoteDataState/createRemoteDataState';

describe('Customer Slice Check', () => {
    it('Check Reducers return Value', () => {
        const {
            slice,
            asyncThunk
        } = createRemoteDataState({
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

        const result = slice.caseReducers.wait({
            expecting: false,
            waiting: false,
            data: null,
            error: null
        });

        expect(result.expecting).toBe(false);
        
        expect(result.waiting).toBe(true);
    });
});