import { ILocalConversation } from '../../models';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { Linking, Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import APIKit from './axiosHelper';

export const saveUserConversationsLocal = ({
    botName,
    botAlias,
    intentName,
    intentVersion,
    slotName,
    slotQuestion,
    slotAnswer,
}: ILocalConversation) => {
    AsyncStorage.getItem('user-conver-data', (_err, result: any) => {
        result = JSON.parse(result);
        if (!result) {
            let userConversations = [];
            userConversations.push({
                botAlias,
                intentName,
                intentVersion,
                slotName,
                slotQuestion,
                slotAnswer,
                botName,
            });
            AsyncStorage.setItem('user-conver-data', JSON.stringify({ userConversations }));
        } else {
            let { userConversations } = result;
            userConversations.push({
                botAlias,
                intentName,
                intentVersion,
                slotName,
                slotQuestion,
                slotAnswer,
                botName,
            });
            AsyncStorage.setItem('user-conver-data', JSON.stringify({ userConversations }));
        }
    });
};

export const removeUserConversation = () => {
    AsyncStorage.removeItem('user-conver-data');
};

export const isLocalConversationSaved = async () => {
    const res = await AsyncStorage.getItem('user-conver-data');

    if (res) {
        return false;
    } else {
        return true;
    }
};
export const isJsonString = (str: any) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
};

export const isURL = (str: string) => {
    const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;
    if (!str) {
        return false;
    }
    let isMatched = str.match(urlRegex);
    return !!isMatched;
};

export const openLink = async (url: string) => {
    try {
        if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.open(url, {
                // iOS Properties
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: '#453AA4',
                preferredControlTintColor: 'white',
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'overFullScreen',
                modalTransitionStyle: 'partialCurl',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: true,
                toolbarColor: '#6200EE',
                secondaryToolbarColor: 'black',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right',
                },
                headers: {
                    'my-custom-header': 'my custom header value',
                },
            });
            // Alert.alert(JSON.stringify(result));
        } else Linking.openURL(url);
    } catch (error) {
        // Alert.alert(error.message);
    }
};

export const getUserConversationsLocal = async (
    currentSessionId: any,
    endResponseContent: any,
    notificationResponse: any,
    clinicalInfo: any,
    initialUtterance: any,
    temporaryUserAnswer: any,
    sessionAttrs: any
) => {
    const data = await AsyncStorage.getItem('user-conver-data');
    let {
        Name,
        Gender,
        Age,
        env,
        PathWayId,
        countryCode,
        emergencyNumber,
        siteURL,
        ...remainingAttrs
    } = sessionAttrs;
    let notificationResponseArray = isJsonString(notificationResponse);
    let endResponseContentObject = isJsonString(endResponseContent);
    if (!!data) {
        let { userConversations } = JSON.parse(data);
        if (!!userConversations && userConversations.length > 1) {
            let res = userConversations;
            let conObject: any = {
                sessionCode: currentSessionId,
                initialUtterance: initialUtterance || '',
                clinicalInfo,
                // healthAdviceId: healthAdviceId, removed
                responses: res.map((item: any, i: number) => {
                    return {
                        botAlias: item.botAlias,
                        botName: item.botName,
                        intentName: item.intentName,
                        intentVersion: item.intentVersion,
                        slotName: item.slotName,
                        slotQuestion: item.slotQuestion,
                        slotAnswer: res[i + 1]
                            ? res[i + 1].slotAnswer
                            : temporaryUserAnswer || 'no answer',
                    };
                }),
                sessionAttrs: JSON.stringify(remainingAttrs),
            };
            //means that object has two key [content, isAdmin, byEmail, subject]
            if (Object.keys(notificationResponseArray).length > 0) {
                conObject.notificationResponse = notificationResponseArray;
            }
            //means that object has two key [content, healthAdviceID]
            if (Object.keys(endResponseContentObject).length > 1) {
                conObject.endResponseContent = endResponseContentObject;
            }
            return conObject;
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export const saveConversationOnline = async (
    userId: number,
    localConv: any,
    successFun: Function,
    failFun: Function
) => {
    // console.log(userId, JSON.stringify(localConv, null, 4));

    return await APIKit.post('/users/' + userId + '/conversations', localConv)
        .then((res) => {
            const data = res.data;
            if (data?.data?.conversationId) {
                successFun(data?.data?.conversationId);
            }
            // return data;
        })
        .catch((e) => {
            failFun(e.response);
            console.log(e.response);
        });
};
