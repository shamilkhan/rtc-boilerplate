import {
    createSlice,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
    PayloadAction,
    ActionReducerMapBuilder,
    AsyncThunk
} from '@reduxjs/toolkit';
import { GenericState } from './interfaces';

/**
 * @description Interface for createGenericSlice
 */
interface CreateGenericSlice<
    SliceData,
    SliceError,
    Reducers extends SliceCaseReducers<GenericState<SliceData, SliceError>>
    > {
    name: string,
    asyncThunk: AsyncThunk<SliceData, void, {}>,
    initialState?: Partial<GenericState<SliceData, SliceError>>
    reducers?: ValidateSliceCaseReducers<GenericState<SliceData, SliceError>, Reducers>,
    extraReducers?: ((builder: ActionReducerMapBuilder<GenericState<SliceData, SliceError>>) => void)
}

export const createGenericSlice = <
    SliceData,
    SliceError,
    Reducers extends SliceCaseReducers<GenericState<SliceData, SliceError>>
>({
    name,
    asyncThunk,
    initialState = {},
    reducers = {} as ValidateSliceCaseReducers<GenericState<SliceData, SliceError>, Reducers>,
    extraReducers
}: CreateGenericSlice<SliceData, SliceError, Reducers>) => {

    type Slice = GenericState<SliceData, SliceError>;

    const initial: Slice = {
        expecting: true,
        waiting: false,
        data: null,
        error: null,
        ...initialState
    };

    return createSlice({
        name,
        initialState: initial,
        reducers: {
            //TODO: Dublicated for every reducerSlice (state) => ({...state, })
            expect: (state) => ({ ...state as Slice, expecting: true, waiting: false, error: null, data: null } as const),
            wait: (state) => ({ ...state as Slice, expecting: false, waiting: true } as const),
            populate: (state, { payload }: PayloadAction<SliceError>) => ({ ...state as Slice, data: null, error: payload, waiting: false } as const),
            ...reducers
        },
        extraReducers: (builder) => {
            builder.addCase(asyncThunk.fulfilled, (state, action) => {
                return {
                    ...state as Slice,
                    waiting: false,
                    error: null,
                    data: action.payload
                };
            });
            if (typeof extraReducers === 'function') extraReducers(builder);
        }
    })
}
