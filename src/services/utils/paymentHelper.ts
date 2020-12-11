import Axios from 'axios';
import APIKit from './axiosHelper';

export const redeemVoucherHelper = (
    data: { code: string },
    successFun: Function,
    failFun: Function
) => {
    APIKit.post('/payments/vouchers', data)
        .then((res) => {
            // console.log(res.data.data);
            successFun(res.data.data);
        })
        .catch((e) => {
            // console.log(JSON.stringify(e.response.data, null, 4));
            failFun(e.response.data.error);
        });
};

export const getCredits = (data: { amount: string }, successFun: Function, failFun: Function) => {
    APIKit.get(`/payments/create-payment-intent/${data.amount}?type=paypal`)
        .then((res) => {
            // console.log(JSON.stringify(res.data.data, null, 4));
            successFun(res.data.data);
        })
        .catch((e) => {
            console.log(JSON.stringify(e, null, 4));
            // Toast.show(e.response.data.error);
            // failFun(e.response.data.error);
        });
};

export const getCreditsStripe = (
    data: { amount: string },
    successFun: Function,
    failFun: Function
) => {
    APIKit.get(`/payments/create-payment-intent/${data.amount}`)
        .then((res) => {
            // console.log(JSON.stringify(res.data.data, null, 4));
            successFun(res.data.data);
        })
        .catch((e) => {
            console.log('===>', JSON.stringify(e, null, 4));
            // Toast.show(e.response.data.error);
            failFun(e.response.data.error);
        });
};

export const getPaymentMainData = (
    data: { provider: string; amount: string },
    successFun: Function,
    failFun: Function
) => {
    APIKit.get(`/payments/payment-setup?provider=${data.provider}&amount=${data.amount}`)
        .then((res) => {
            // console.log(JSON.stringify(res.data.data, null, 4));
            successFun(res.data.data);
        })
        .catch((e) => {
            console.log(JSON.stringify(e, null, 4));
            // Toast.show(e.response.data.error);
            failFun(e.response.data.error);
        });
};

// export const getPaymentId = (
//     data: { amountCents: string; PaymentMethodId: string },
//     successFun: Function,
//     failFun: Function
// ) => {
//     APIKit.post(`/payments/payment-setup?provider=${data.provider}&amount=${data.amount}`)
//         .then((res) => {
//             // console.log(JSON.stringify(res.data.data, null, 4));
//             successFun(res.data.data);
//         })
//         .catch((e) => {
//             console.log(JSON.stringify(e, null, 4));
//             // Toast.show(e.response.data.error);
//             failFun(e.response.data.error);
//         });
// };

export const onPaymentSuccess = (
    data: { amountCents: number; cardToken: any },
    successFun: Function,
    failFun: Function
) => {
    // console.log('Data Sent => ', data);

    APIKit.post('/payments/stripe-charge', data)
        .then((res) => {
            // console.log(res.data.data);
            successFun(res.data.data);
        })
        .catch((e) => {
            console.log(JSON.stringify(e.response.data, null, 4));
            // Toast.show(e.response.data.error);
            // failFun(e.response.data.error);
        });
};
