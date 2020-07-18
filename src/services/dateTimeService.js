export const getTimeString = (timestampMilliseconds) => {
  const timestamp = timestampMilliseconds / 1000;
  const hours = Math.floor(timestamp / 3600);
  const minutes = Math.floor((timestamp - hours * 3600) / 60);
  const seconds = Math.floor(timestamp - hours * 3600 - minutes * 60);

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = seconds.toString().padStart(2, '0');

  return `${hoursString}:${minutesString}:${secondsString}`;
};

export const getTimeDifferenceString = (startTimestamp, endTimestamp) => {
  if (startTimestamp === null || endTimestamp === null) {
    return '00:00:00';
  }

  const difference = Math.max((endTimestamp - startTimestamp), 0);

  return getTimeString(difference);
};
