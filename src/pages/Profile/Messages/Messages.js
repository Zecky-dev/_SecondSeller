import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {MessageCard, Button} from '@components';
import {CONSTANTS, COLORS} from '@utils';

import styles from './Messages.style';

import {checkRooms, getMyRooms} from '../../../services/firebaseChatService';
import {useUser} from '../../../context/UserProvider';

const Messages = ({navigation}) => {
  const {user} = useUser();

  useEffect(() => {
    const handleRoomID = async () => {
      const roomID = await getMyRooms(user._id);
      console.log(roomID);
    };
    handleRoomID();
  }, []);

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
