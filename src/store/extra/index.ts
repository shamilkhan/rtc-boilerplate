import {
    SliceCaseReducers,
    ValidateSliceCaseReducers,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';

interface GenericState<T, U> {
    expecting: boolean;
    retry: boolean;
    update: boolean;
    waiting: boolean;
    data: T | null;
    error: U | null
}

const createGenericSlice = <
    T,
    U,
    Reducers extends SliceCaseReducers<GenericState<T, U>>
>({
    name = '',
    initialState = {},
    reducers
}: {
    name: string
    initialState: Partial<GenericState<T, U>>
    reducers: ValidateSliceCaseReducers<GenericState<T, U>, Reducers>
}) => {
    return createSlice({
        name,
        initialState: {
            expecting: true,
            retry: false,
            update: false,
            waiting: false,
            data: null,
            error: null,
            ...initialState
        } as GenericState<T, U>,
        reducers: {
            retry: (state: GenericState<T, U>) => ({ ...state, retry: true } as const),
            popuplate: (state: GenericState<T, U>): GenericState<T, U> => ({
                ...state,
                error: null,
                waiting: false,
            } as const
            ),
            setData: (state: GenericState<T, U>, { payload }: PayloadAction<T>): GenericState<T, U> => ({
                ...state,
                data: payload,
                error: null,
                waiting: false,
            } as const),
            ...reducers
        }
    })
}


const wrapper = <
    T,
    U
>(
    name: string,
    reducers: SliceCaseReducers<GenericState<T, U>>
) => {
    const slice = createGenericSlice({
        name,
        initialState: {} as Partial<GenericState<T, U>>,
        reducers: reducers as SliceCaseReducers<GenericState<T, U>>
    });
    return slice;
}

/**
 * @description Slice of Auths
 */

type AuthData = {
    access: string;
    refresh: string
}

type AuthError = '500' | '401';

const authSlice = wrapper<AuthData, AuthError>('autorization', {});

const authReducer = authSlice.reducer;

const populateResult = authSlice.caseReducers.popuplate({
    expecting: true,
    retry: false,
    update: false,
    waiting: false,
    data: null,
    error: null,
});

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
        }
    }
)


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

export const customerReducer = customerSlice.reducer;

export {
    authSlice,
    authReducer,
    customerSlice,
}
