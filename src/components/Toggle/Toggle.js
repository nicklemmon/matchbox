import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './Toggle.module.scss';

class Toggle extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  render() {
    const {
      id,
      value,
      checked,
      disabled,
      onChange,
      onFocus,
      onBlur,
      ...rest,
    } = this.props;

    return (
      <label htmlFor={id} className={styles.Toggle}>
        <input
          id={id}
          value={value}
          checked={checked}
          disabled={disabled}
          className={styles.Input}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          type='checkbox'
          {...rest} />
          <span className={styles.Outline}></span>
          <div className={styles.Labels}>
            <span>On</span>
            <span>Off</span>
          </div>
          <span className={styles.Indicator}></span>
      </label>
    );
  }
};

export default Toggle;
