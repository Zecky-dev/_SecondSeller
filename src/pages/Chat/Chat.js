import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList} from 'react-native';
import {getStyles} from './Chat.style';

import firestore from '@react-native-firebase/firestore';

import {ChatBubble, ChatInput, EmptyList} from '@components';

import {
  checkChatRoom,
  getRoomDataById,
  createMessage,
} from '../../services/firebaseChatService';

import {getUser} from '../../services/userServices';

import {useTheme} from '../../context/ThemeContext';

const Chat = ({route}) => {
  const {advertisementID, senderID, ownerID} = route.params;
  const [roomData, setRoomData] = useState(null);
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const chatRef = useRef();

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
          setRoomData({...data, roomID: chatRoomID});
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
    if (roomData.messages.length === 0) {
    }

    return (
      <View style={styles.container}>
        {roomData.messages.length === 0 ? (
          <EmptyList label={'Henüz bir mesajlaşma başlatılmamış'} />
        ) : (
          <FlatList
            data={roomData.messages}
            contentContainerStyle={styles.chatListContainer}
            ref={chatRef}
            onContentSizeChange={() => chatRef.current.scrollToEnd()}
            onLayout={() => chatRef.current.scrollToEnd({animated: true})}
            ListFooterComponent={<View style={{height: 20}} />}
            renderItem={({item}) => {
              return (
                <ChatBubble
                  theme={theme}
                  isOwner={item.sender === ownerID}
                  messageDetails={item}
                  key={item.messageId}
                />
              );
            }}
          />
        )}

        <ChatInput
          createMessage={createMessage}
          senderID={senderID}
          roomID={roomData.roomID}
          theme={theme}
        />
      </View>
    );
  }
};

export default Chat;
