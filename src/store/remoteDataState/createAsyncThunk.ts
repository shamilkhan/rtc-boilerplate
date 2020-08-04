import {
    createAsyncThunk,
} from '@reduxjs/toolkit';


type ThunkProps = {
    params?: string
};

export const createThunk = <T>({ endPoint, name }: { endPoint: string, name: string }) => createAsyncThunk<
    T,
    ThunkProps,
    //TODO: add ts
    {}
>
    (
        `${name}${endPoint}`,
        async (props = { params: '' }, thunkAPI) => {
            const response = await fetch(`http://localhost:5000/${endPoint}${props.params}`);
            const result = await response.json() as T;
            return result;
        }
    );
