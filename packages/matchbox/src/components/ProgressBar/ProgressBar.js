import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ScreenReaderOnly } from '@sparkpost/matchbox';
import styles from './ProgressBar.module.scss';

class ProgressBar extends Component {
  static displayName = 'ProgressBar';

  static propTypes = {
    /**
     * Completion in percentage
     */
    completed: PropTypes.number.isRequired,

    /**
     * Unique HTML id attribute that connects the progress element with its label
     */
    id: PropTypes.string.isRequired,

    /**
     * Label content for HTML <label> element - content is visually hidden but still required from an a11y POV
     */
    label: PropTypes.string.isRequired,

    /**
     * Used to describe the current status of the progress bar to screen reader only users
     */
    valueText: PropTypes.string,

    /**
     * Bar color
     */
    color: PropTypes.oneOf(['orange', 'blue', 'navy', 'purple', 'red'])
  };

  static defaultProps = {
    completed: 0,
    color: 'orange'
  }

  render() {
    const {
      completed = 0,
      color,
      id,
      label,
      valueText
    } = this.props;

    let percentage = completed;

    if (percentage > 100) {
      percentage = 100;
    } else if (percentage < 1) {
      percentage = 0;
    }

    return (
      // <div className={classnames(styles.ProgressBar, styles[color])}>
      //   <div className={styles.Progress} style={{ width: `${percentage}%` }}/>
      // </div>
      <React.Fragment>
        <ScreenReaderOnly>{label}</ScreenReaderOnly>

        <div className={classnames(styles.ProgressBar, styles[color])}>
          <div
            className={styles.Progress}
            style={{ width: `${percentage}%` }}
            aria-labelledby={id}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuetext={valueText}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ProgressBar;
