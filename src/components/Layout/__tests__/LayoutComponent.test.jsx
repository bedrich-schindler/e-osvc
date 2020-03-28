import React from 'react';
import { shallow } from 'enzyme';
import LayoutComponent from '../LayoutComponent';

describe('rendering', () => {
  it('renders correctly', () => {
    const tree = shallow(
      <LayoutComponent
        user={{ name: 'Name' }}
        logout={() => {}}
      >
        <p>Content</p>
      </LayoutComponent>,
    );

    expect(tree).toMatchSnapshot();
  });
});
