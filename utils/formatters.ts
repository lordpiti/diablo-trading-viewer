import moment from 'moment';

export const formatDate = (date: string) =>
moment(new Date(date)).format('D/M/yyyy hh:mm')