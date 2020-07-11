export const getTimeDifferenceString = (startTimestamp, endTimestamp) => {
  if (startTimestamp === null || endTimestamp === null) {
    return '00:00:00';
  }

  const difference = Math.max((endTimestamp - startTimestamp) / 1000, 0);

  const hours = Math.floor(difference / 3600);
  const minutes = Math.floor((difference - hours * 3600) / 60);
  const seconds = Math.floor(difference - hours * 3600 - minutes * 60);

  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = seconds.toString().padStart(2, '0');

  return `${hoursString}:${minutesString}:${secondsString}`;
};
