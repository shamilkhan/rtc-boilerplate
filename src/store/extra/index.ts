import {
    createSlice,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
    PayloadAction,
    ActionReducerMapBuilder,
    AsyncThunk
} from '@reduxjs/toolkit';
import { createThunk } from './createAsyncThunk';

export interface GenericState<SliceData, SliceError> {
    expecting: boolean;
    waiting: boolean;
    data: SliceData | null;
    error: SliceError | null
}

/**
 * @description Interface for createGenericSlice
 */
interface CreateGenericSlice<
    SliceData,
    SliceError,
    ThunkProps,
    Reducers extends SliceCaseReducers<GenericState<SliceData, SliceError>>
    > {
    name: string,
    asyncThunk: AsyncThunk<SliceData, ThunkProps, {}>,
    initialState?: Partial<GenericState<SliceData, SliceError>>
    reducers?: ValidateSliceCaseReducers<GenericState<SliceData, SliceError>, Reducers>,
    extraReducers?: ((builder: ActionReducerMapBuilder<GenericState<SliceData, SliceError>>) => void)
}

const createGenericSlice = <
    SliceData,
    SliceError,
    ThunkProps,
    Reducers extends SliceCaseReducers<GenericState<SliceData, SliceError>>
>({
    name,
    asyncThunk,
    initialState = {},
    reducers = {} as ValidateSliceCaseReducers<GenericState<SliceData, SliceError>, Reducers>,
    extraReducers
}: CreateGenericSlice<SliceData, SliceError, ThunkProps, Reducers>) => {

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
                const nextState = state as Slice;
                return {
                    ...nextState,
                    waiting: false,
                    error: null,
                    data: action.payload
                };
            });
            if (typeof extraReducers === 'function') extraReducers(builder);
        }
    })
}

type WrapperProps<T, U, ThunkProps, R extends SliceCaseReducers<GenericState<T, U>>> = Omit<CreateGenericSlice<T, U, ThunkProps, R>, 'asyncThunk'> & { endPoint: string };

const wrapper = <
    SliceData,
    SliceError,
    ThunkProps,
    Reducers extends SliceCaseReducers<GenericState<SliceData, SliceError>>
>({
    name,
    endPoint,
    initialState = {},
    reducers = {} as ValidateSliceCaseReducers<GenericState<SliceData, SliceError>, Reducers>,
    extraReducers
}: WrapperProps<SliceData, SliceError, ThunkProps, Reducers>) => {

    const asyncThunk = createThunk<SliceData, ThunkProps>({ endPoint, name });

    const slice = createGenericSlice({
        name,
        initialState: initialState as Partial<GenericState<SliceData, SliceError>>,
        reducers,
        extraReducers,
        asyncThunk,
    });
    const { actions } = slice;
    const { populate, expect, wait } = slice.actions;

    return {
        slice,
        asyncThunk,
        actions,
        populate,
        expect,
        wait
    };
}

export {
    wrapper,
    createGenericSlice
}