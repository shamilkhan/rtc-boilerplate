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
}



