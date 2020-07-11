import { getTimeDifferenceString } from '../dateTimeService';

describe('getTimeDifferenceString', () => {
  it('show zero time when one of timestamp is null ', () => {
    expect(getTimeDifferenceString(3600, null)).toEqual('00:00:00');
    expect(getTimeDifferenceString(null, 3600)).toEqual('00:00:00');
  });

  it('show zero time difference when timestamps are equal', () => {
    expect(getTimeDifferenceString(3600, 3600)).toEqual('00:00:00');
  });

  it('show time when timestamps are different ', () => {
    expect(getTimeDifferenceString(0, 3661000)).toEqual('01:01:01');
  });
});
