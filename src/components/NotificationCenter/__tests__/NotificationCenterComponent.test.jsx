import React from 'react';
import sinon from 'sinon';
import {
  mount,
  shallow,
} from 'enzyme';
import { NotificationCenterComponent } from '../NotificationCenterComponent';

describe('rendering', () => {
  it('renders all types of info notification', () => {
    const tree = shallow(
      <NotificationCenterComponent
        isOnline
        notifications={[
          {
            id: '1',
            message: 'Info message - Auto-removable',
            type: 'autoRemovable',
            variant: 'info',
          },
          {
            id: '2',
            message: 'Info message - Removable',
            type: 'removable',
            variant: 'info',
          },
          {
            id: '3',
            message: 'Info message - Non-removable',
            type: 'nonRemovable',
            variant: 'info',
          },
        ]}
        notificationRemove={() => {}}
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders all types of success notification', () => {
    const tree = shallow(
      <NotificationCenterComponent
        isOnline
        notifications={[
          {
            id: '1',
            message: 'Success message - Auto-removable',
            type: 'autoRemovable',
            variant: 'success',
          },
          {
            id: '2',
            message: 'Success message - Removable',
            type: 'removable',
            variant: 'success',
          },
          {
            id: '3',
            message: 'Success message - Non-removable',
            type: 'nonRemovable',
            variant: 'success',
          },
        ]}
        notificationRemove={() => {}}
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders all types of warning notification', () => {
    const tree = shallow(
      <NotificationCenterComponent
        isOnline
        notifications={[
          {
            id: '1',
            message: 'Warning message - Auto-removable',
            type: 'autoRemovable',
            variant: 'warning',
          },
          {
            id: '2',
            message: 'Warning message - Removable',
            type: 'removable',
            variant: 'warning',
          },
          {
            id: '3',
            message: 'Warning message - Non-removable',
            type: 'nonRemovable',
            variant: 'warning',
          },
        ]}
        notificationRemove={() => {}}
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders all types of error notification', () => {
    const tree = shallow(
      <NotificationCenterComponent
        isOnline
        notifications={[
          {
            id: '1',
            message: 'Error message - Auto-removable',
            type: 'autoRemovable',
            variant: 'error',
          },
          {
            id: '2',
            message: 'Error message - Removable',
            type: 'removable',
            variant: 'error',
          },
          {
            id: '3',
            message: 'Error message - Non-removable',
            type: 'nonRemovable',
            variant: 'error',
          },
        ]}
        notificationRemove={() => {}}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls notificationRemove when close notification button is clicked', () => {
    const spy = sinon.spy();
    const tree = mount(
      <NotificationCenterComponent
        isOnline
        notifications={[
          {
            id: '1',
            message: 'Info message - Removable',
            type: 'removable',
            variant: 'info',
          },
        ]}
        notificationRemove={spy}
      />,
    );

    tree.find('button').at(0).simulate('click');
    expect(spy.calledOnce).toEqual(true);
  });
});
