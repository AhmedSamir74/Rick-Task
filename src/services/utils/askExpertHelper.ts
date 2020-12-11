import APIKit from './axiosHelper';
import Toast from 'react-native-simple-toast';

export const getAskExpertServiceFees = () => {
    return APIKit.get('/payments/service/16')
        .then((res) => {
            return res.data.data;
        })
        .catch((e) => {
            console.log(e.response.status);
            Toast.show(e.response.data.error);
        });
};

export const askAnExpert = (data: any, successFun: Function, onFail: Function) => {
    APIKit.post('/users/complaint-assessments', data)
        .then((res) => {
            // console.log(res.data.data);
            successFun(res.data.data);
        })
        .catch((e) => {
            // console.log(JSON.stringify(e.response.data, null, 4));
            if (e.response.status == 402) {
                onFail(e.response.data.error);
                // Toast.show(e.response.data.error);
            }
        });
};
