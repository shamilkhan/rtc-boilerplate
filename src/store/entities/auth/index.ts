import {
    wrapper
} from '../../extra';

type AuthData = {
    access: string;
    refresh: string
}

type AuthError = '500' | '401';

const authSlice = wrapper<AuthData, AuthError>('autorization', {});

export {
    authSlice
};

/**
 * @description Здесь выводится "Правильный" тип стора
 */
const populateResult = authSlice.caseReducers.populate({
    expecting: true,
    retry: false,
    update: false,
    waiting: false,
    data: null,
    error: null,
});


