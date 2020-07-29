import {
    createSlice,
    SliceCaseReducers,
    ValidateSliceCaseReducers,
    PayloadAction,
    ActionReducerMapBuilder
} from '@reduxjs/toolkit';

export interface GenericState<T, U> {
    expecting: boolean;
    retry: boolean;
    update: boolean;
    waiting: boolean;
    data: T | null;
    error: U | null
}


const createGenericSlice = <
    T,
    U,
    Reducers extends SliceCaseReducers<GenericState<T, U>>
>({
    name = '',
    initialState = {},
    reducers,
    extraReducers
}: {
    name: string
    initialState: Partial<GenericState<T, U>>
    reducers: ValidateSliceCaseReducers<GenericState<T, U>, Reducers>,
    extraReducers: ((builder: ActionReducerMapBuilder<GenericState<T, U>>) => void)
}) => {

    const initial: GenericState<T, U> = {
        expecting: true,
        retry: false,
        update: false,
        waiting: false,
        data: null,
        error: null,
        ...initialState
    }

    return createSlice({
        name,
        initialState: initial,
        reducers: {
            retry: (state) => ({ ...state as GenericState<T, U>, retry: true } as const),
            populate: (state) => ({ ...state as GenericState<T, U>, error: null, waiting: false } as const),
            setData: (state, { payload }: PayloadAction<T>) => ({ ...state as GenericState<T, U>, data: payload, error: null, waiting: false } as const),
            ...reducers
        },
        extraReducers: (builder) => {
            if (typeof extraReducers === 'function') extraReducers(builder);
        }
    })
}

//Add More optional params
const wrapper = <
    T,
    U
>(
    name: string,
    reducers: SliceCaseReducers<GenericState<T, U>>
) => {
    const slice = createGenericSlice({
        name,
        initialState: {} as Partial<GenericState<T, U>>,
        reducers: reducers as SliceCaseReducers<GenericState<T, U>>,
        extraReducers: {} as ((builder: ActionReducerMapBuilder<GenericState<T, U>>) => void)
    });
    return slice;
}

export {
    wrapper,
    createGenericSlice
}