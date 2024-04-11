import React from 'react';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './Button.style';

const Button = ({
  onPress,
  label = '',
  icon = null,
  vertical = false,
  loading = false,
  additionalStyles = {container: {}, label: {}},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        icon && vertical && {flexDirection: 'column', alignItems: 'center'},
        additionalStyles?.container,
      ]}
      disabled={loading}
      activeOpacity={0.7}>
      
      {loading ? (
        <ActivityIndicator size={'small'} style={styles.loadingIndicator}/>
      ) : (
        icon && (
          <Icon
            name={icon.name}
            size={icon.size}
            color={icon.color}
            style={styles.icon}
          />
        )
      )}

      {label !== '' && (
        <Text style={[styles.label, additionalStyles?.label]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
