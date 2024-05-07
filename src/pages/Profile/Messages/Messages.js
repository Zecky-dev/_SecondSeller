import React from 'react';
import {View, Text} from 'react-native';

import {MessageCard, Button} from '@components';
import {CONSTANTS, COLORS} from '@utils';

import styles from './Messages.style';

const Messages = ({navigation}) => {
  return (
    <View>
      <Text style={styles.screenTitle}> Sohbetlerim </Text>
      <View style={styles.messageCardContainer}>
        <MessageCard onPress={() => navigation.navigate('ChatScreen')} />
      </View>
    </View>
  );
};

export default Messages;
