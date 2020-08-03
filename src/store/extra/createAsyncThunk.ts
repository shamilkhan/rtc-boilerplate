import {
    createAsyncThunk,
} from '@reduxjs/toolkit';

export const createThunk = <T, U>({ endPoint, name }: { endPoint: string, name: string }) => createAsyncThunk<
    T,
    U,
    {}
    // {
        // dispatch: AppDispatch
        // state: AppStore
    // }
>
    (
        `${name}${endPoint}`,
        async (props: U, thunkAPI) => {
            console.log('call fn', props, typeof thunkAPI);
            const response = await fetch(endPoint);
            //@ts-ignore
            return ['test'] as T;
        }
    );
