import React, {useEffect, useState} from 'react';
import {View, FlatList} from 'react-native';
import styles from './Chat.style';

import firestore from '@react-native-firebase/firestore';

import {ChatBubble, ChatInput} from '@components';

import {
  checkChatRoom,
  getRoomDataById,
  createMessage,
} from '../../services/firebaseChatService';

import {getUser} from '../../services/userServices';

const Chat = ({route}) => {
  const {advertisementID, senderID, ownerID} = route.params;
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const handleChatRoomID = async () => {
      const chatRoomID = await checkChatRoom(
        advertisementID,
        senderID,
        ownerID,
      );

      const subscriber = firestore()
        .collection('ChatRooms')
        .doc(chatRoomID)
        .onSnapshot(documentSnapshot => {
          const data = documentSnapshot.data();
          console.log(data)
          setRoomData({...data,roomID: chatRoomID});
        });

      return () => subscriber();
    };
    handleChatRoomID(advertisementID, senderID, ownerID);
  }, []);

  useEffect(() => {
    if (roomData) {
    }
  }, [advertisementID]);

  if (roomData !== null) {
    return (
      <View style={styles.container}>
        <FlatList
          data={roomData.messages}
          contentContainerStyle={styles.chatListContainer}
          renderItem={({item}) => {
            console.log(item.sender)
            return <ChatBubble
              isOwner={item.sender === ownerID}
              messageDetails={item}
              key={item.messageId}
            />
          }}
        />
        <ChatInput
          createMessage={createMessage}
          senderID={senderID}
          roomID={roomData.roomID}
        />
      </View>
    );
  }
};

export default Chat;
