
import React from 'react';
import sinon from 'sinon';
import {
  mount,
  shallow,
} from 'enzyme';
import {
  getShortIdStub,
  restoreShortIdStub,
} from '../../../../tests/testUtils';
import { Menu } from '../Menu';

describe('rendering', () => {
  let shortIdStub = null;

  beforeEach(() => {
    shortIdStub = getShortIdStub();
  });

  afterEach(() => {
    restoreShortIdStub(shortIdStub);
  });

  it('renders correctly', () => {
    const tree = shallow(
      <Menu
        classes={{}}
        history={{ push: () => {} }}
        isMenuOpened={false}
        onCloseMenu={() => {}}
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with opened menu', () => {
    const tree = shallow(
      <Menu
        classes={{}}
        history={{ push: () => {} }}
        isMenuOpened
        onCloseMenu={() => {}}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});

describe('functionality', () => {
  let shortIdStub = null;

  beforeEach(() => {
    shortIdStub = getShortIdStub();
  });

  afterEach(() => {
    restoreShortIdStub(shortIdStub);
  });

  it('calls onCloseMenu when close menu button is clicked', () => {
    const spy = sinon.spy();
    const tree = mount(
      <Menu
        classes={{}}
        history={{ push: () => {} }}
        isMenuOpened
        onCloseMenu={spy}
      />,
    );

    tree.find('button').at(0).simulate('click');
    expect(spy.calledOnce).toEqual(true);
  });
});
