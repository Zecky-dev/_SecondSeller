import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList, Text} from 'react-native';
import {getStyles} from './Chat.style';

import firestore from '@react-native-firebase/firestore';

import {ChatBubble, ChatInput, EmptyList, Animation} from '@components';

import {checkChatRoom, createMessage} from '../../services/firebaseChatService';

import NoMessageDark from '@assets/images/no_message_dark.png';
import NoMessageLight from '@assets/images/no_message_light.png';

import {getUser, getSenderReceiverData} from '../../services/userServices';

import {useTheme} from '../../context/ThemeContext';

import {useUser} from '../../context/UserProvider';
import FastMessageChips from './FastMessageChips/FastMessageChips';
import {CONSTANTS} from '@utils';

const Chat = ({route}) => {
  const {user} = useUser();
  const {advertisementID, senderID, receiverID} = route.params;
  const amITheOwner = user.advertisements.includes(advertisementID);

  const [roomData, setRoomData] = useState(null);
  const [userDatas, setUserDatas] = useState([]);
  const [message, setMessage] = useState('');

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const chatRef = useRef();

  const NoMessageVector = theme === 'dark' ? NoMessageDark : NoMessageLight;

  useEffect(() => {
    const handleChatRoomID = async () => {
      const chatRoomID = await checkChatRoom(
        advertisementID,
        senderID,
        receiverID,
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
    handleChatRoomID(advertisementID, senderID, receiverID);

    const getUsersData = async () => {
      const {sender, receiver} = await getSenderReceiverData(
        senderID,
        receiverID,
        user.token,
      );
      const userDatas = [sender, receiver];
      setUserDatas(userDatas);
    };
    getUsersData();
  }, []);

  const onFastMessagePress = message => {
    setMessage(message);
  };

  if (roomData === null) {
    return <Animation animationName={'loading'} />;
  } else {
    return (
      <View style={styles.container}>
        {roomData.messages.length === 0 ? (
          <EmptyList
            label={'Henüz bir mesajlaşma başlatılmamış'}
            vector={NoMessageVector}
          />
        ) : (
          <FlatList
            data={roomData.messages}
            contentContainerStyle={styles.chatListContainer}
            ref={chatRef}
            onContentSizeChange={() => chatRef.current.scrollToEnd()}
            onLayout={() => chatRef.current.scrollToEnd()}
            renderItem={({item}) => {
              return (
                <ChatBubble
                  theme={theme}
                  isOwner={item.sender == senderID}
                  user={userDatas.find(user => user._id === item.sender)}
                  messageDetails={item}
                  key={item.messageId}
                />
              );
            }}
          />
        )}
        <FastMessageChips
          messages={
            amITheOwner
              ? CONSTANTS.FAST_MESSAGES.OWNER.messages
              : CONSTANTS.FAST_MESSAGES.RECEIVER.messages
          }
          onPress={onFastMessagePress}
        />
        <ChatInput
          createMessage={createMessage}
          senderID={senderID}
          roomID={roomData.roomID}
          theme={theme}
          message={message}
        />
      </View>
    );
  }
};

export default Chat;
