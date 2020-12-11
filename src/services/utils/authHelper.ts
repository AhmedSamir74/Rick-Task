/* eslint-disable no-undef */
import AsyncStorage from '@react-native-community/async-storage';

import APIKit, { setClientToken } from './axiosHelper';

export const getFBData = async () => {
    // try {
    //     await Facebook.initializeAsync('2562118184117994');
    //     const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    //         permissions: ['public_profile', 'email', 'user_friends'],
    //     });
    //     if (type === 'success') {
    //         return token;
    //     } else {
    //         // type === 'cancel'
    //     }
    // } catch ({ message }) {
    //     alert(`Facebook Login Error: ${message}`);
    // }
};
const getGoogleData = async () => {
    // try {
    //     await GoogleSignIn.initAsync({
    //         // You may ommit the clientId when the firebase `googleServicesFile` is configured
    //         clientId: '256215159874-3h5j4d0f9aok22kdb49e21gub3cf6vjc.apps.googleusercontent.com',
    //     });
    //     await GoogleSignIn.askForPlayServicesAsync();
    //     const { type, user } = await GoogleSignIn.signInAsync();
    //     if (type === 'success') {
    //         const user = await GoogleSignIn.signInSilentlyAsync();
    //         return user;
    //     }
    // } catch (e) {
    //     Alert.alert(e.message);
    //     // return { error: true };
    // }
};

export const logInWithGoogle = async () => {
    // const data = await getGoogleData();
    // try {
    //     Alert.alert('Logged in!', data?.firstName);
    // } catch (e) {
    //     Alert.alert(e.message);
    // }
};

export const signupWithGoogle = async () => {
    // const data = await getGoogleData();
    // const signupData: ISignup = {
    //     email: data?.email,
    //     full_name: data?.displayName,
    //     password: '123456',
    // };
    // try {
    //     const auth = new Auth();
    //     auth.signup(signupData)
    //         .then((res) => {
    //             Alert.alert('Logged in!', data?.firstName);
    //         })
    //         .catch(() => {});
    // } catch (e) {
    //     Alert.alert(e.message);
    // }
};

export const forgetPasswordHelper = async (
    email: string,
    successFun: Function,
    failFun: Function
) => {
    await APIKit.post('/forget-password', { email })
        .then((res) => {
            const data = res.data;
            console.log(data);
            successFun();
        })
        .catch((e) => {
            console.log(e.response.status);
            failFun(e.response.data.error);
        });
};

export const resetPasswordHelper = async (
    userId: number,
    oldPassword: string,
    newPassword: string,
    successFn: Function,
    failFn: Function
) => {
    return await APIKit.put('/users/' + userId + '/update-password', {
        oldPassword,
        newPassword,
    })
        .then((res) => {
            const data = res.data;
            // console.log(data);
            // return data;
            successFn();
        })
        .catch((e) => {
            console.log(e.response.data);
            failFn(e.response.data.error);
        });
};

export const changeTwoFac = async (userId: number, is2FA: boolean, onChangeSuccess: Function) => {
    return await APIKit.put('/users/' + userId, {
        is2FA,
    })
        .then((res) => {
            const data = res.data;
            onChangeSuccess();
            // console.log(data);
            // return data;
        })
        .catch((e) => {
            console.log(e.response.data);
            // failFn(e.response.data.error);
        });
};

export const isAutherized = async () => {
    let autherizedAccess = false;
    await AsyncStorage.getItem('userData', (_err, result: any) => {
        if (result) {
            const jwtDecode = require('jwt-decode');
            const userData: any = jwtDecode(JSON.parse(result).token);
            const expDate = userData?.exp;
            const currentDate = Date.now();
            // console.log('===', currentDate < expDate);
            if (currentDate > expDate) {
                autherizedAccess = true;
            }
        }
    });
    return autherizedAccess;
};

export const setNewUser = async () => {
    AsyncStorage.setItem('newUser', '0');
};

export const getLatestUserData = async (userId: number) => {
    return await APIKit.get('/users/' + userId, {})
        .then(async (res) => {
            const data = await res.data.data;
            return data;
        })
        .catch((e) => {
            console.log(e.response.data);
        });
};
