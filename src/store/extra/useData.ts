import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    AppStore,
    ReducersKeys
} from '../index';
import { GenericState } from './index';
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
    asyncThunk: AsyncThunk<T, void, {}>
}

const createUseData = <
    //TODO: не выводить типы вручную!
    SliceData extends AuthData | Customer, 
    SliceError extends AuthError | CustomerError
>({ sliceName, asyncThunk }: Props<SliceData, SliceError>) => () => {
    const {
        data,
        expecting,
        waiting,
        error
    } = useSelector((store: AppStore) => store[sliceName] as GenericState<SliceData, SliceError>);

    useEffect(() => {
        if (expecting && typeof asyncThunk === 'function') {
            asyncThunk();
        }
    }, [expecting]);

    return { data, error };
}

export {
    createUseData
};