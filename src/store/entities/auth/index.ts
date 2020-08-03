import {
    wrapper
} from '../../extra';
import { createUseData } from '../../extra/useData';

export type AuthData = {
    access: string;
    refresh: string
}

export type AuthError = '500' | '401';

//TODO: Если slice не используется, то вызов 2-х функций заменить на 1
export const {
    slice,
    asyncThunk
} = wrapper<AuthData, AuthError, void, {}>({
    name: 'auth',
    endPoint: 'auth'
});

export const useAuth = createUseData<AuthData, AuthError>({ sliceName: 'auth', asyncThunk });

/**
 * @description Здесь выводится "Правильный" тип стора
 */

const populateResult = slice.caseReducers.wait({
    expecting: true,
    waiting: false,
    data: null,
    error: null,
})