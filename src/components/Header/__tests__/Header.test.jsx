import React from 'react';
import sinon from 'sinon';
import {
  mount,
  shallow,
} from 'enzyme';
import { Header } from '../Header';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(
      <Header
        classes={{}}
        history={{ push: () => { }}}
        title="Title"
        isMenuOpened={false}
        user={{ name: 'Name' }}
        onLogout={() => {}}
        onOpenMenu={() => {}}
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with opened menu', () => {
    const tree = shallow(
      <Header
        classes={{}}
        history={{ push: () => { }}}
        title="Title"
        isMenuOpened
        user={{ name: 'Name' }}
        onLogout={() => {}}
        onOpenMenu={() => {}}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});

describe('functionality', () => {
  it('calls onOpenMenu when menu button is clicked', () => {
    const spy = sinon.spy();
    const tree = mount(
      <Header
        classes={{}}
        history={{ push: () => { }}}
        title="Title"
        isMenuOpened={false}
        user={{ name: 'Name' }}
        onLogout={() => {}}
        onOpenMenu={spy}
      />,
    );

    tree.find('button').at(0).simulate('click');
    expect(spy.calledOnce).toEqual(true);
  });
});
