import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';
import {
    AUTHENTICATE,
    LOGOUT,
    VERIFY_USER,
    UPDATE_USER_DATA,
    SET_USER_DATA,
} from '../../../constants';
import { logInWithGoogle, getFBData } from '../../utils';
import { ISignup } from '../../../models';
import APIKit, { baseURL, setClientToken } from '../../utils/axiosHelper';
import Axios from 'axios';

export const autoAuthenticate = () => {
    return async (dispatch: any) => {
        await AsyncStorage.getItem('userData', (_err, result: any) => {
            result = JSON.parse(result);
            if (result != null && result !== undefined && result.token) {
                setClientToken(result.token);
                const jwtDecode = require('jwt-decode');
                const userData: any = jwtDecode(result.token);

                APIKit.get('/users/' + userData.id, {})
                    .then((res) => {
                        const data = res.data.data;
                        dispatch({
                            type: SET_USER_DATA,
                            payload: userData,
                        });
                        dispatch(authenticate(result.token, data.email, data.id, data));
                    })
                    .catch((e) => {
                        console.log(e.response.status);
                        if (e.response.status == 401) {
                            Toast.show('Your token has been expired, Please Relogin');
                            dispatch(logout());
                        }
                        console.log(e.response.data);
                    });
            }
        });
    };
};

export const verifyUser = (email: any) => {
    return {
        type: VERIFY_USER,
        payload: {
            email,
        },
    };
};

export const authenticate = (
    token: string,
    email: string,
    userId: number,
    updatedUserData: any
) => {
    return async (dispatch: any) => {
        dispatch({
            type: AUTHENTICATE,
            payload: {
                token,
                email,
                userId,
                updatedUserData,
            },
        });
    };
};

export const logout = (navigate?: any) => {
    AsyncStorage.removeItem('userData').then(() => {
        if (navigate) {
            navigate('Auth', { screen: 'Login' });
        }
    });
    return { type: LOGOUT };
};

export const authenticateWithFB = (successFn: Function, failFn: Function) => {
    return async (dispatch: any) => {
        // const token = await getFBData();
        // const auth = new Auth();
        // auth.loginWithFaceBook(token)
        //     .then((res) => {
        //         successFn();
        //         dispatch(authenticate(res.data.id, res.headers.api_token, res.data));
        // dispatch(authenticate('',''));
        //         saveDataToStorage(res.headers.api_token);
        //     })
        //     .catch(() => {
        //         failFn();
        //     });
    };
};

export const signup = (signupData: ISignup, successFn: Function, failFn: Function) => {
    return async (dispatch: any) => {
        APIKit.post('/register', signupData)
            .then((res) => {
                const data = res.data.date;
                // console.log(res.status);
                dispatch(verifyUser(signupData.email));
                successFn();
            })
            .catch((e) => {
                console.log(e.response.status);
                if (e.response.status == 400 || e.response.status == 409) {
                    failFn(e.response.data.error);
                } else {
                    failFn();
                }
            });
    };
};

export const updateProfile = (formData: ISignup, successFn: Function, failFn: Function) => (
    dispatch: any,
    getState: Function
) =>
    APIKit.put('/users/' + getState().auth.userId, formData)
        .then((res) => {
            const data = res.data.data;
            // console.log(data);
            dispatch({
                type: UPDATE_USER_DATA,
                payload: {
                    email: formData.email,
                    data,
                },
            });
            successFn();
        })
        .catch((e) => {
            console.log('------------------', e.response.data);
            failFn(e.response.data.error);
        });

export const twoFAAuth = (code: string, email: string, successFn: Function, failFn: Function) => {
    return async (dispatch: any) => {
        APIKit.post('/verify-2fa', { code })
            .then((res) => {
                const { token } = res.data.data;
                setClientToken(token);
                const jwtDecode = require('jwt-decode');
                const userData: any = jwtDecode(token);
                // console.log(baseURL + '/' + userData.id);

                Axios.get(baseURL + '/users/' + userData.id, {
                    headers: {
                        Authorization: token,
                    },
                })
                    .then((res) => {
                        const data = res.data.data;
                        dispatch(authenticate(token, data.email, data.id, data));
                        dispatch({
                            type: SET_USER_DATA,
                            payload: userData,
                        });
                        saveDataToStorage(token);
                        successFn();
                    })
                    .catch((e) => {
                        console.log('++++> ', e.response.data);
                        failFn(e.response.data.error);
                    });
            })
            .catch((e) => {
                console.log('===> ', e.response.data);
                failFn(e.response.data.error);
            });
    };
};

export const login = (
    email: string,
    password: string,
    successFn: Function,
    failFn: Function,
    navigateObj: any,
    setIsLoading: Function
) => {
    return async (dispatch: any) => {
        await APIKit.post('/login', {
            email,
            password,
        })
            .then((res) => {
                // console.log(res.status);
                if (res.status == 302) {
                    setIsLoading(false);
                    navigateObj('TwoFAAuth', { email });
                } else {
                    const { token } = res.data.data;
                    setClientToken(token);

                    const jwtDecode = require('jwt-decode');
                    const userData: any = jwtDecode(token);

                    APIKit.get('/users/' + userData.id, {})
                        .then((res) => {
                            const data = res.data.data;
                            dispatch(authenticate(token, data.email, data.id, data));
                            dispatch({
                                type: SET_USER_DATA,
                                payload: userData,
                            });
                            saveDataToStorage(token);
                            successFn();
                        })
                        .catch((e) => {
                            console.log(e.response.data);
                        });
                }
            })
            .catch((e) => {
                // console.log(e.response.status);
                failFn(e.response.data.error);
            });
    };
};

export const getProfileData = () => {
    return async (dispatch: any, getSate: Function) => {
        if (getSate().auth.token) {
            APIKit.get('/users/' + getSate().auth.userId, {})
                .then((res) => {
                    const data = res.data.data;
                    dispatch(authenticate(getSate().auth.token, data.email, data.id, data));
                })
                .catch((e) => {
                    console.log(e.response.data);
                });
        }
    };
};

const saveDataToStorage = (token: string) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token,
        })
    );
};
