import { createUseData } from '../../remoteDataState/createUseData';
import { createRemoteDataState } from '../../remoteDataState/createRemoteDataState';

export type AuthData = {
    access: string;
    refresh: string
}

export type AuthError = '500' | '401';

export const { slice, asyncThunk } = createRemoteDataState<AuthData, AuthError, {}>({
    name: 'auth',
    endPoint: 'auth'
});

export const useAuth = createUseData({ sliceName: 'auth', asyncThunk });

const populateResult = slice.caseReducers.wait({
    expecting: true,
    waiting: false,
    data: null,
    error: null,
});
