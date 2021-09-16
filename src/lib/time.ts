import moment from 'moment';

moment.locale('en');

export function formatIntoTime(date: Date): string {
  return moment(date).fromNow();
}

export function formatInDate(date: Date): string {
  return moment(date).format('LL');
}

export function formatInDateDetails(date: Date): string {
  return moment(date).format('LLL');
}