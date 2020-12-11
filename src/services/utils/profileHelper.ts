import APIKit from './axiosHelper';
var _ = require('lodash');

export const getUserBalance = (userId: number) => {
    return APIKit.get(`/users/${userId}/balance`)
        .then((res) => {
            return res.data.data.balance;
        })
        .catch((e) => {
            console.log(e.response.data);
            if (e.response.status == 404) {
                return 0;
            }
        });
};

export const getPaymentHistory = () => {
    return APIKit.get(`/payments/histories`)
        .then((res) => {
            // console.log(JSON.stringify(res.data.data, null, 4));
            return res.data.data;
        })
        .catch((e) => {
            console.log(e.response.data);
            if (e.response.status == 404) {
                return [];
            }
            return [];
        });
};

export const getTransactionsHistory = () => {
    return APIKit.get(`/payments/transactions`)
        .then((res) => {
            // console.log(JSON.stringify(res.data.data, null, 4));
            return res.data.data;
        })
        .catch((e) => {
            console.log(e.response.data);
            if (e.response.status == 404) {
                return [];
            }
        });
};

export const getChatbotHistory = (userId: number) => {
    return APIKit.get(`/users/${userId}/conversations`)
        .then((res) => {
            // console.log(JSON.stringify(res.data.data, null, 4));
            return res.data.data;
        })
        .catch((e) => {
            console.log(e.response.data);
            if (e.response.status == 404) {
                return [];
            }
        });
};

export const getPackages = () => {
    return APIKit.get(`/payments/packages`)
        .then((res) => {
            // console.log(JSON.stringify(res.data.data, null, 4));
            return res.data.data;
        })
        .catch((e) => {
            console.log(e.response.data);
            if (e.response.status == 404) {
                return [];
            }
        });
};

export const subscripeHelper = async (
    duration: number,
    successFun: Function,
    failFun: Function,
    packageId?: number
) => {
    return APIKit.post(`/payments/subscriptions`, {
        packageId,
        duration,
    })
        .then((res) => {
            // console.log(JSON.stringify(res.data.data, null, 4));
            successFun();
            return res.data.data;
        })
        .catch((e) => {
            console.log(e.response.data);
            failFun(e.response.data.error);
        });
};

export const sendComplaint = async (data: any, successFun: Function, failFun: Function) => {
    return APIKit.post(`/users/log-complaints`, data)
        .then((res) => {
            // console.log(JSON.stringify(res.data.data, null, 4));
            successFun();
            return res.data.data;
        })
        .catch((e) => {
            console.log(e.response.data);
            failFun(e.response.data.error);
        });
};

export const rateYourVisit = async (data: any, successFun: Function, failFun: Function) => {
    return APIKit.post(`/users/rates`, data)
        .then((res) => {
            // console.log(JSON.stringify(res.data.data, null, 4));
            successFun();
            return res.data.data;
        })
        .catch((e) => {
            console.log(e.response.data);
            failFun(e.response.data.error);
        });
};

export const mostFrequentItem = (arr: any[], itemKey: string) => {
    let items = _.map(arr || [], (i: any) => i[itemKey]);
    return _.head(_(items).countBy().entries().maxBy(_.last));
};

export const capitalLetter = (str: any)=>
{
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}