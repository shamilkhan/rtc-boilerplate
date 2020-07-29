import {
    createAsyncThunk,
} from '@reduxjs/toolkit';
import { AppStore, AppDispatch } from '../index';


export const createThunk = <T, U>({ endPoint }: { endPoint: string }) => createAsyncThunk<
    T,
    U,
    {
        dispatch: AppDispatch
        state: AppStore
    }
>
    (
        endPoint,
        async (props: U, thunkAPI) => {
            const response = await fetch("/endPoint");
            return {} as T;
        }
    );
