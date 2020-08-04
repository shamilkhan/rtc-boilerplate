import { createAsyncThunk } from '@reduxjs/toolkit';
import { createRemoteDataState } from '../../remoteDataState/createRemoteDataState';
import { GenericState } from '../../remoteDataState/interfaces';
import { createThunk } from '../../remoteDataState/createAsyncThunk';

type Item = {
    id: number,
    description: string
}

type PaginationCollection = {
    data: Item[],
    page: number,
    total: number
}

type Error = 'fail to load' | 'load to fail';

export const asyncThunk = createThunk<PaginationCollection>({
    endPoint: 'paginationCollection',
    name: 'paginationCollection'
})

export const { slice } = createRemoteDataState({
    name: 'paginationCollection',
    endPoint: 'paginationCollection',
    initialState: { expecting: false } as GenericState<PaginationCollection, Error>,
});
