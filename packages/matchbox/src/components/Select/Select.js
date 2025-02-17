import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from '../Label';
import { Error } from '../Error';
import { ArrowDropDown } from '@sparkpost/matchbox-icons';
import classnames from 'classnames';
import styles from './Select.module.scss';

const Option = ({ option }) => {
  if (typeof option === 'object') {
    const { value, label = value, ...rest } = option;
    return <option value={value} {...rest}>{label}</option>;
  } else if (typeof option === 'string' || typeof option === 'number') {
    return <option value={option}>{option}</option>;
  }
};

class Select extends Component {
  static displayName = 'Select';

  static propTypes = {
    id: PropTypes.string,
    /**
     * Select options -
     * Array of Objects with { value, label }, Strings, or Numbers
     */
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          label: PropTypes.string.isRequired
        }),
        PropTypes.string.isRequired,
        PropTypes.number.isRequired
      ])
    ).isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    label: PropTypes.string,
    helpText: PropTypes.node,
    error: PropTypes.string,
    errorInLabel: PropTypes.bool,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  render() {
    const {
      id,
      options,
      label,
      helpText,
      placeholder,
      placeholderValue,
      disabled,
      required,
      error,
      errorInLabel,
      ...rest
    } = this.props;

    const setClasses = classnames(
      styles.Select,
      error && styles.error
    );

    const inputClasses = classnames(
      styles.Input,
      disabled && styles.disabled
    );

    const dropdownClasses = classnames(
      styles.Dropdown,
      !label && styles.labelHidden
    );

    let combined = options;

    if (placeholder) {
      combined = [ { label: placeholder, value: placeholderValue, disabled: true }, ...combined ];
    }

    const optionMarkup = combined && combined.length
      ? combined.map((option, key) => <Option option={option} key={key} />)
      : null;

    const requiredIndicator = required
      ? ' *'
      : '';

    const labelMarkup = (
      <Label id={id} label={`${label}${requiredIndicator}`}>
        {error && errorInLabel && <Error className={styles.InlineError} wrapper='span' error={error} />}
      </Label>
    );

    const helpMarkup = helpText
      ? <div className={styles.HelpText}>{helpText}</div>
      : null;

    return (
      <div className={setClasses}>
        {label && labelMarkup}
        <select
          className={inputClasses}
          id={id}
          disabled={disabled}
          {...rest} >
          {optionMarkup}
        </select>
        <ArrowDropDown className={dropdownClasses} />
        {error && !errorInLabel && <Error error={error} />}
        {helpMarkup}
      </div>
    );
  }
}

export default Select;
