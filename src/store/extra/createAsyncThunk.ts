import {
    createAsyncThunk,
} from '@reduxjs/toolkit';

export const createThunk = <T, U>({ endPoint, name }: { endPoint: string, name: string }) => createAsyncThunk<
    T,
    U,
    {}
>
    (
        `${name}${endPoint}`,
        async (props: U, thunkAPI) => {
            const response = await fetch(`http://localhost:5000/${endPoint}`);
            const result = await response.json() as T;
            return result;
        }
    );
