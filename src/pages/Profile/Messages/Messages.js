import React, {useEffect} from 'react';
import {View, Text} from 'react-native';

import {MessageCard, Button} from '@components';
import {CONSTANTS, COLORS} from '@utils';

import styles from './Messages.style';

import {getMyRooms, getRoomDataById} from '../../../services/firebaseChatService';
import {useUser} from '../../../context/UserProvider';

const Messages = ({navigation}) => {
  const {user} = useUser();

  useEffect(() => {
    const handleRoomID = async () => {
      const myChatRooms = await getMyRooms(user._id);
      for(let room of myChatRooms) {
        // const roomDetail = await getRoomDataById(room.roomID)
      }
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
