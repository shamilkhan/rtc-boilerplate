import {
    createSlice,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
    PayloadAction,
    ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import { createThunk } from './createAsyncThunk';

type AuthData = {
    access: string;
    refresh: string
}

interface GenericState<T, U> {
    expecting: boolean;
    retry: boolean;
    update: boolean;
    waiting: boolean;
    data: T | null;
    error: U | null
}

export const fetchUserById = createThunk<AuthData, number>({endPoint: '/endPoint'});

const createGenericSlice = <
    T,
    U,
    Reducers extends SliceCaseReducers<GenericState<T, U>>
>({
    name = '',
    initialState = {},
    reducers,
    extraReducers
}: {
    name: string
    initialState: Partial<GenericState<T, U>>
    reducers: ValidateSliceCaseReducers<GenericState<T, U>, Reducers>,
    extraReducers: ((builder: ActionReducerMapBuilder<GenericState<T, U>>) => void)
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
            popuplate: (state: GenericState<T, U>) => ({
                ...state,
                error: null,
                waiting: false,
            } as const
            ),
            setData: (state: GenericState<T, U>, { payload }: PayloadAction<T>) => ({
                ...state,
                data: payload,
                error: null,
                waiting: false,
            } as const),
            ...reducers
        },
        extraReducers
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
        reducers: reducers as SliceCaseReducers<GenericState<T, U>>,
        extraReducers: {} as ((builder: ActionReducerMapBuilder<GenericState<T, U>>) => void)
    });
    return slice;
}

/**
 * @description Slice of Auths
 */


type AuthError = '500' | '401';

const authSlice = wrapper<AuthData, AuthError>('autorization', {});

const authReducer = authSlice.reducer;

/**
 * @description Здесь выводится "Правильный" тип стора
 */
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
        },
        extraReducers: {} as ((builder: ActionReducerMapBuilder<GenericState<Customer, CustomerError>>) => void)
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

export const customerReducer = customerSlice.reducer;

export {
    authSlice,
    authReducer,
    customerSlice,
}
