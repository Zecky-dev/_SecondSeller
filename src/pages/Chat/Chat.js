import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import styles from './Chat.style';

import {ChatBubble, ChatInput} from '@components';
import {useUser} from '../../context/UserProvider';

import {checkRooms} from '../../services/firebaseChatService';

const Chat = ({route}) => {
  const {
    user: {_id: userID},
  } = useUser();
  const {advertisementID, ownerID} = route.params;

  useEffect(() => {
    const handleRoomID = async () => {
      const roomID = await checkRooms(advertisementID, userID, ownerID);
      console.log(roomID);
    };
    handleRoomID();
  }, [advertisementID]);

  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        contentContainerStyle={styles.chatListContainer}
        renderItem={({item}) => (
          <ChatBubble
            isOwner={true}
            messageDetails={item}
            key={item.messageId}
          />
        )}
      />
      <ChatInput />
    </View>
  );
};

export default Chat;
