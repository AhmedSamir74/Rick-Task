import i18n from '../../localization';

/* eslint-disable radix */
export const timeFormatter = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (hours === 0) {
        return `${minutes}:${seconds}`;
    } else {
        return `${hours}:${minutes}:${seconds}`;
    }
};

export const dateTimeFormatter = (timeStamp: string) => {
    const dateTime = new Date(timeStamp.split(' ')[0]);
    dateTime.setHours(parseInt(timeStamp.split(' ')[1].split(':')[0]));
    dateTime.setMinutes(parseInt(timeStamp.split(' ')[1].split(':')[1]));
    dateTime.setSeconds(parseInt(timeStamp.split(' ')[1].split(':')[2]));
    let hours = dateTime.getHours();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? i18n.t('PM') : i18n.t('PM');
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    var strTime = timeStamp.split(' ')[0] + ' ' + hours + ':' + minutesStr + ' ' + ampm;
    return strTime;
};

export const standardDateTimeFormatter = (timeStamp: string) => {
    const dateTime = new Date(timeStamp.split('T')[0]);
    dateTime.setHours(parseInt(timeStamp.split('T')[1].split(':')[0]));
    dateTime.setMinutes(parseInt(timeStamp.split('T')[1].split(':')[1]));
    dateTime.setSeconds(parseInt(timeStamp.split('T')[1].split(':')[2]));
    let hours = dateTime.getHours();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? i18n.t('PM') : i18n.t('PM');
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    var strTime = timeStamp.split('T')[0] + ' ' + hours + ':' + minutesStr + ' ' + ampm;
    return strTime;
};
