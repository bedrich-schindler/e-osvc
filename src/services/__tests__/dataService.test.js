import { updateData } from '../dataService';

describe('updateData', () => {
  it('sets value at first level', () => {
    const obj = {
      firstLevel1: 'value',
      firstLevel2: 'value',
    };
    const expectedObj = {
      firstLevel1: 'newValue',
      firstLevel2: 'value',
    };

    expect(updateData(obj, 'firstLevel1', 'newValue'))
      .toEqual(expectedObj);
  });

  it('sets value at second level', () => {
    const obj = {
      firstLevel1: {
        secondLevel1: 'value',
        secondLevel2: 'value',
      },
      firstLevel2: 'value',
    };
    const expectedObj = {
      firstLevel1: {
        secondLevel1: 'newValue',
        secondLevel2: 'value',
      },
      firstLevel2: 'value',
    };

    expect(updateData(obj, 'firstLevel1.secondLevel1', 'newValue'))
      .toEqual(expectedObj);
  });

  it('sets value within first level array', () => {
    const obj = {
      firstLevel1: [
        'value',
        'value',
      ],
      firstLevel2: [
        'value',
      ],
    };
    const expectedObj = {
      firstLevel1: [
        'newValue',
        'value',
      ],
      firstLevel2: [
        'value',
      ],
    };

    expect(updateData(obj, 'firstLevel1[0]', 'newValue'))
      .toEqual(expectedObj);
  });

  it('sets value at second level within first level array', () => {
    const obj = {
      firstLevel1: [
        {
          secondLevel1: 'value',
          secondLevel2: 'value',
        },
        {
          secondLevel1: 'value',
          secondLevel2: 'value',
        },
      ],
      firstLevel2: [
        {
          secondLevel1: 'value',
          secondLevel2: 'value',
        },
      ],
    };
    const expectedObj = {
      firstLevel1: [
        {
          secondLevel1: 'newValue',
          secondLevel2: 'value',
        },
        {
          secondLevel1: 'value',
          secondLevel2: 'value',
        },
      ],
      firstLevel2: [
        {
          secondLevel1: 'value',
          secondLevel2: 'value',
        },
      ],
    };

    expect(updateData(obj, 'firstLevel1[0].secondLevel1', 'newValue'))
      .toEqual(expectedObj);
  });
});
