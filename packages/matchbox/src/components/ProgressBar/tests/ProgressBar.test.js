import React from 'react';
import { shallow } from 'enzyme';

import ProgressBar from '../ProgressBar';

describe('ProgressBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ProgressBar
        id="my-progress-bar"
        label="My Progress Bar"
      />
    );
  });

  it('renders progressbar at defaults', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Has relevant WAI-ARIA attributes', () => {
    expect(wrapper.find('[role="progressbar"]')).toExist();
    expect(wrapper.find('[aria-valuenow]')).toExist();
    expect(wrapper.find('[aria-valuemin]')).toExist();
    expect(wrapper.find('[aria-valuemax]')).toExist();
  });

  it('renders at 50% progress in navy color', () => {
    wrapper.setProps({ completed: 50, color: 'navy' });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders at 100% progress if given a value over 100', () => {
    wrapper.setProps({ completed: 200 });
    expect(wrapper.find('.Progress').props().style.width).toEqual('100%');
  });
});
