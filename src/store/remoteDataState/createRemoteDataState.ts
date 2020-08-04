import {
    SliceCaseReducers,
    ValidateSliceCaseReducers,
    ActionReducerMapBuilder
} from '@reduxjs/toolkit';

import { GenericState } from './interfaces';

import { createGenericSlice } from './createGenericSlice';
import { createThunk } from './createAsyncThunk';

/**
 * @description Interface for createGenericSlice
 */
interface CreateRemoteDataState<
    SliceData,
    SliceError,
    Reducers extends SliceCaseReducers<GenericState<SliceData, SliceError>>
    > {
    name: string,
    endPoint: string,
    initialState?: Partial<GenericState<SliceData, SliceError>>
    reducers?: ValidateSliceCaseReducers<GenericState<SliceData, SliceError>, Reducers>,
    extraReducers?: ((builder: ActionReducerMapBuilder<GenericState<SliceData, SliceError>>) => void)
}

/**
 * @description Create GenericState with Async Thunk
 */
export const createRemoteDataState = <
    SliceData,
    SliceError,
    Reducers extends SliceCaseReducers<GenericState<SliceData, SliceError>>
>({
    name,
    endPoint,
    initialState = {},
    reducers = {} as ValidateSliceCaseReducers<GenericState<SliceData, SliceError>, Reducers>,
    extraReducers
}: CreateRemoteDataState<SliceData, SliceError, Reducers>) => {

    const asyncThunk = createThunk<SliceData>({ endPoint, name });

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