import {
    createSlice,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
    PayloadAction,
    ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import { createThunk } from './createAsyncThunk';

export interface GenericState<T, U> {
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
        extraReducers: (builder) => {
            if (typeof extraReducers === 'function') extraReducers(builder);
        }
    })
}


//Add More optional params
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

export {
    wrapper,
    createGenericSlice
}