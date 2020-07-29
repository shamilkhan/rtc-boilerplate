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
    waiting: boolean;
    data: T | null;
    error: U | null
}

const createGenericSlice = <
    T,
    U,
    Reducers extends SliceCaseReducers<GenericState<T, U>>
>({
    name,
    endPoint,
    initialState = {},
    reducers = {} as ValidateSliceCaseReducers<GenericState<T, U>, Reducers>,
    extraReducers
}: {
    name: string,
    endPoint: string,
    initialState?: Partial<GenericState<T, U>>
    reducers?: ValidateSliceCaseReducers<GenericState<T, U>, Reducers>,
    extraReducers?: ((builder: ActionReducerMapBuilder<GenericState<T, U>>) => void)
}) => {

    const initial: GenericState<T, U> = {
        expecting: true,
        waiting: false,
        data: null,
        error: null,
        ...initialState
    }

    return createSlice({
        name,
        initialState: initial,
        reducers: {
            expect: (state) => ({ ...state as GenericState<T, U>, expecting: true, waiting: false, error: null, data: null } as const),
            wait: (state) => ({ ...state as GenericState<T, U>, expecting: false, waiting: true } as const),
            populate: (state, { payload }: PayloadAction<U>) => ({ ...state as GenericState<T, U>, data: null, error: payload, waiting: false } as const),
            ...reducers
        },
        extraReducers: (builder) => {
            const remoteData = createThunk({ endPoint });
            builder.addCase(remoteData.fulfilled, (state, action) => {
                const nextState = state as GenericState<T, U>;
                return nextState;
            });
            if (typeof extraReducers === 'function') extraReducers(builder);
        }
    })
}

//Add More optional params
const wrapper = <
    T,
    U
>({
    name,
    endPoint,
    reducers = {},
}: {
    name: string,
    endPoint: string,
    reducers?: SliceCaseReducers<GenericState<T, U>>
}) => {

    const asyncThunk = createThunk<T, U>({ endPoint });

    const slice = createGenericSlice({
        name,
        endPoint,
        initialState: {} as Partial<GenericState<T, U>>,
        reducers: reducers as SliceCaseReducers<GenericState<T, U>>,
    });

    const {
        populate
    } = slice.actions;

    return {
        slice,
        asyncThunk,
        populate
    };
}

export {
    wrapper,
    createGenericSlice
}