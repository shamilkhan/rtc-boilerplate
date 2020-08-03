import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    AppStore,
    ReducersKeys
} from '../index';
import { GenericState } from './interfaces';
import {
    AuthData,
    AuthError
} from '../entities/auth';
import {
    Customer,
    CustomerError
} from '../entities/customers';
import { AsyncThunk } from '@reduxjs/toolkit';

type Props<T, U> = {
    sliceName: ReducersKeys,
    asyncThunk: AsyncThunk<T, { params?: string }, {}>
}

const createUseData = <
    //TODO: не выводить типы вручную!
    SliceData extends AuthData | Customer,
    SliceError extends AuthError | CustomerError
>({ sliceName, asyncThunk }: Props<SliceData, SliceError>) => () => {

    const dispatch = useDispatch();

    const {
        data,
        expecting,
        error
    } = useSelector((store: AppStore) => store[sliceName] as GenericState<SliceData, SliceError>);

    useEffect(() => {
        if (expecting && typeof asyncThunk === 'function') {
            dispatch(asyncThunk({}));
        }
    }, [expecting]);

    return { data, error };
}

export {
    createUseData
};