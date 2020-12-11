import APIKit from './axiosHelper';
import Toast from 'react-native-simple-toast';

export const getServiceType = () => {
    return APIKit.get('/payments/service/14')
        .then((res) => {
            return res.data.data;
        })
        .catch((e) => console.log(e));
};

export const getDoctors = (medicalCenterId: number) => {
    return APIKit.get('/centers/' + medicalCenterId + '/doctors')
        .then((res) => {
            return res.data.data;
        })
        .catch((e) => {
            console.log(e);
            return [];
        });
};

export const getDoctorsAvailabilities = (medicalCenterId: number, doctorId: number) => {
    return APIKit.get('/centers/' + medicalCenterId + '/doctors/' + doctorId + '/availabilities')
        .then((res) => {
            return res.data.data;
        })
        .catch((e) => {
            console.log(e.response.data);
            return [];
        });
};

export const bookAppointment = (data: any, successFun: Function) => {
    // console.log(JSON.stringify(data, null, 4));

    APIKit.post('/appointments', data)
        .then((res) => {
            // console.log(res.data.data);
            successFun(res.data.data);
        })
        .catch((e) => {
            // console.log(JSON.stringify(e.response.data, null, 4));
            if (e.response.status == 402) {
                Toast.show(e.response.data.error);
            }
        });
};

export const getAppointments = () => {
    return APIKit.get('/appointments')
        .then((res) => {
            return res.data.data;
        })
        .catch((e) => {
            console.log(e.response.status);
            if (e.response.status == 404) {
                return [];
            }
        });
};
