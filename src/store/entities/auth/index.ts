import {
    wrapper
} from '../../extra';

type AuthData = {
    access: string;
    refresh: string
}

type AuthError = '500' | '401';

export const { 
    slice, 
    asyncThunk 
} = wrapper<AuthData, AuthError>({
    name: 'autorization',
    endPoint: '/test'
});

/**
 * @description Здесь выводится "Правильный" тип стора
 */
const populateResult = slice.caseReducers.wait({
    expecting: true,
    waiting: false,
    data: null,
    error: null,
})