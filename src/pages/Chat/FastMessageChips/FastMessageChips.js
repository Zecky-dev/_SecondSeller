import React from 'react';
import {View, Text, ScrollView} from 'react-native';

import {useTheme} from '@context/ThemeContext';
import {getStyles} from './FastMessageChips.style';

const FastMessageChips = ({messages, onPress}) => {
  const {theme} = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {messages.map(item => (
          <Text
            onPress={() => onPress(item.message)}
            key={item.key}
            style={styles.message}>
            {item.message}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default FastMessageChips;
