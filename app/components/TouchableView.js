import React from 'react';
import PropTypes from 'prop-types';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';

const IS_ANDROID = Platform.OS === 'android';
const IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21 && IS_ANDROID;

const TouchableView = ({
  isRippleDisabled, animation, delay, duration, rippleColor, children, style, ...props
}) => {
  if (IS_RIPPLE_EFFECT_SUPPORTED && !isRippleDisabled) {
    const background = TouchableNativeFeedback.Ripple(rippleColor);
    return (
      <TouchableNativeFeedback {...props} background={background}>
        <View
          animation={animation}
          delay={delay}
          duration={duration}
          style={style}
        >
          {children}
        </View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity {...props} style={style}>
      {children}
    </TouchableOpacity>
  );
};

TouchableView.propTypes = {
  animation: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  isRippleDisabled: PropTypes.bool,
  rippleColor: PropTypes.string,
  children: PropTypes.any.isRequired,
  style: View.propTypes.style,
};

TouchableView.defaultProps = {
  animation: '',
  delay: 0,
  duration: 0,
  isRippleDisabled: false,
  rippleColor: '#fff',
  style: {},
};

export default TouchableView;
