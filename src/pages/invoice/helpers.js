import { getTimeString } from '../../services/dateTimeService';

export const getTotalTime = (timeRecords, timeRecordsIds = null) => {
  const totalTime = timeRecords.reduce((total, timeRecord) => {
    if (timeRecordsIds === null || timeRecordsIds.includes(timeRecord.id)) {
      return total + (timeRecord.endDateTime - timeRecord.startDateTime);
    }

    return total;
  }, 0);

  return getTimeString(totalTime);
};
