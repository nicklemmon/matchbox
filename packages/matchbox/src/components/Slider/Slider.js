import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getRectFor, lerp } from '../../helpers/geometry';
import { noop, isNotTouchEvent } from '../../helpers/event';
import { onKey, onKeys } from '../../helpers/keyEvents';
import { roundToPlaces, clamp } from '../../helpers/math';
import styles from './Slider.module.scss';

function Slider(props) {
  const { defaultValue, disabled, max, min, onChange, precision, value } = props;

  const [sliderValue, setSliderValue] = React.useState(value || defaultValue);
  const [pixelOffset, setPixelOffset] = React.useState(0);
  const [moving, setMoving] = React.useState();
  const sliderRef = React.useRef();

  // Calculates step increments based on precision
  const interval = React.useMemo(() => {
    let interval = 1;
    if (precision > 0) {
      const zeros = '0'.repeat(precision - 1);
      interval = parseFloat(`0.${zeros}1`);
    }
    return interval;
  }, [precision]);

  // Sets internal value when value is controlled externally
  React.useEffect(() => {
    if (value) {
      setValue(value);
    }
  }, [value]);

  // Calculates pixel offset for handle and track when internal value changes
  React.useLayoutEffect(() => {
    const rect = getRectFor(sliderRef.current);
    const clampedValue = clamp(sliderValue, min, max);
    const absolutePercentage = (clampedValue + Math.abs(min)) / Math.abs(min - max);
    setPixelOffset(lerp(0, rect.width, absolutePercentage));
    if (!isNaN(parseFloat(sliderValue)) && isFinite(sliderValue) && onChange) {
      onChange(sliderValue);
    }
  }, [sliderValue]);

  // Event handlers
  function handleMouseDown(e) {
    if (e.button !== 0) {
      return;
    }
    const mousePosition = e.pageX;
    setPositions(mousePosition);
    setMoving('mouse');
  }

  function handleMouseMove(e) {
    const mousePosition = e.pageX;
    setPositions(mousePosition);
  }

  function handleTouchStart(e) {
    if (isNotTouchEvent(e)) {
      return;
    }
    const position = e.touches[0].pageX;
    setPositions(position);
    setMoving('touch');
  }

  function handleTouchMove(e) {
    if (isNotTouchEvent(e)) {
      return;
    }
    const position = e.touches[0].pageX;
    setPositions(position);
  }

  function handleEnd(e) {
    setMoving(null);
  }

  function handleKeyDown(e) {
    e.stopPropagation();
    e.preventDefault();

    onKeys(['arrowLeft', 'arrowDown'], () => setValue(sliderValue - interval))(e);
    onKeys(['arrowRight', 'arrowUp'], () => setValue(sliderValue + interval))(e);
    onKey('home', () => setValue(min))(e);
    onKey('end', () => setValue(max))(e);
  }

  // Sets positions based on mouse position
  function setPositions(mousePosition) {
    const rect = getRectFor(sliderRef.current);
    const clampedPixelOffset = clamp(mousePosition - rect.left, 0, rect.width);
    const percentOffset = clampedPixelOffset / rect.width;
    setValue(lerp(min, max, percentOffset));
  }

  // Sets value to a provided value
  function setValue(newValue) {
    const clampedValue = clamp(newValue, min, max);
    setSliderValue(roundToPlaces(clampedValue, precision));
  }

  // Binding of mouse/touch drag events
  React.useEffect(() => {
    if (moving === 'mouse') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
    }

    if (moving === 'touch') {
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }

    return (() => {
      if (moving === 'mouse') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleEnd);
      }

      if (moving === 'touch') {
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleEnd);
      }
    });
  }, [moving]);

  const sliderClasses = classnames(
    styles.Slider,
    disabled && styles.Disabled
  );

  return (
    <div
      className={sliderClasses}
      onTouchStart={disabled ? noop : handleTouchStart}
      onMouseDown={disabled ? noop : handleMouseDown}
      ref={sliderRef}
    >
      <div className={styles.Rail} />
      <div
        className={styles.Track}
        style={{ width: pixelOffset }}
      />
      <div
        className={styles.Handle}
        role='slider'
        tabIndex='0'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        style={{ left: pixelOffset }}
        onKeyDown={disabled ? noop : handleKeyDown}
      />
    </div>
  );
}

Slider.defaultProps = {
  defaultValue: 0,
  min: 0,
  max: 100,
  precision: 0
};

Slider.propTypes = {
  /**
   * The slider's initial value on first render
   */
  defaultValue: PropTypes.number,
  /**
   * Disables focus, key down, mouse and touch events
   */
  disabled: PropTypes.bool,
  /**
   * The slider's lower bounds
   */
  min: PropTypes.number,
  /**
   * The slider's upper bounds
   */
  max: PropTypes.number,
  onChange: PropTypes.func,
  /**
   * The number of decimal places to round values to
   */
  precision: PropTypes.number,
  /**
   * A value to programatically control the slider
   */
  value: PropTypes.number
};

export default Slider;
