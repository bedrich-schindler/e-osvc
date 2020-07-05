import sinon from 'sinon';
import { fromJS } from 'immutable';
import {
  getShortIdStub,
  restoreShortIdStub,
} from '../../../tests/testUtils';
import { prepareNotification } from '../apiService';

describe('prepareNotification', () => {
  const getStateMock = () => fromJS({
    notification: {
      data: {
        notifications: [],
      },
    },
  });
  let shortIdStub = null;

  beforeEach(() => {
    shortIdStub = getShortIdStub();
  });

  afterEach(() => {
    restoreShortIdStub(shortIdStub);
  });

  it('does not return null if API action type is not present', () => {
    const action = {};
    const notificationMessages = null;

    expect(prepareNotification(action, notificationMessages))
      .toEqual(null);
  });

  it('does not return null if API request succeed but success message is not set', () => {
    const action = { type: 'api/resource/method/success' };
    const notificationMessages = null;
    expect(prepareNotification(action, notificationMessages))
      .toEqual(null);
  });

  it('does not return null if API request failed but failure message is not set', () => {
    const action = { type: 'api/resource/method/failure' };
    const notificationMessages = null;

    expect(prepareNotification(action, notificationMessages))
      .toEqual(null);
  });

  it('dispatches notification if API request succeeded and success message is set', () => {
    const dispatchMock = sinon.spy();

    const action = { type: 'api/resource/method/success' };
    const notificationMessages = { success: 'Success message' };

    prepareNotification(action, notificationMessages)(dispatchMock, getStateMock);

    expect(dispatchMock.calledOnce).toBeTruthy();
    expect(dispatchMock.getCall(0).args[0]).toEqual({
      payload: {
        result: {
          id: 'pseudo_generated_key_0',
          message: 'Success message',
          type: 'autoRemovable',
          variant: 'success',
        },
      },
      type: 'local/notification/notifications/add',
    });
  });

  it('dispatches notification if API request failed and failure message is set', () => {
    const dispatchMock = sinon.spy();

    const action = { type: 'api/resource/method/failure' };
    const notificationMessages = { failure: 'Failure message' };

    prepareNotification(action, notificationMessages)(dispatchMock, getStateMock);

    expect(dispatchMock.calledOnce).toBeTruthy();
    expect(dispatchMock.getCall(0).args[0]).toEqual({
      payload: {
        result: {
          id: 'pseudo_generated_key_0',
          message: 'Failure message',
          type: 'removable',
          variant: 'error',
        },
      },
      type: 'local/notification/notifications/add',
    });
  });

  it('dispatches auto-removable notification if API request succeeded, success message is set and timeout is fulfilled', () => {
    const timer = jest.useFakeTimers();
    const dispatchMock = sinon.spy();

    const action = { type: 'api/resource/method/success' };
    const notificationMessages = { success: 'Success message' };

    prepareNotification(action, notificationMessages)(dispatchMock, getStateMock);

    timer.advanceTimersByTime(10000);

    expect(dispatchMock.calledTwice).toBeTruthy();
    expect(dispatchMock.getCall(1).args[0]).toEqual({
      payload: { result: { id: 'pseudo_generated_key_0' } },
      type: 'local/notification/notifications/remove',
    });
  });
});
