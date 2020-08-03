import { SliceCaseReducers, ValidateSliceCaseReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthData = {
    id: number,
    name: string;
}

interface GenericState<T> {
    data?: T
    status: 'loading' | 'finished' | 'error'
}

const createGenericSlice = <
    T,
    Reducers extends SliceCaseReducers<GenericState<T>>
>({
    name = '',
    initialState,
    reducers
}: {
    name: string
    initialState: GenericState<T>
    reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
}) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            start(state) {
                state.status = 'loading'
            },
            success(state: GenericState<T>, action: PayloadAction<T>) {
                state.data = action.payload
                state.status = 'finished'
            },
            ...reducers
        }
    })
}

const wrapper = <
    T,
    Reducers extends SliceCaseReducers<GenericState<T>>
>(reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>) => {
    return createGenericSlice({
        name: 'test',
        initialState: { status: 'loading' } as GenericState<T>,
        reducers: reducers as ValidateSliceCaseReducers<GenericState<T>, Reducers>
    });
}

//
const withWrapper = wrapper({
        magic(state) {
            return {
                ...state as GenericState<AuthData>,
                data: {
                    id: 123,
                    name: 'Jone'
                }
            }
        }
    }
);

//Example from docs
const wrappedSlice = createGenericSlice({
    name: 'test',
    initialState: { status: 'loading' } as GenericState<string>,
    reducers: {
        magic(state) {
            state.status = 'finished'
            state.data = 'hocus pocus'
        }
    }
});

