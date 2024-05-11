import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList} from 'react-native';
import {getStyles} from './Chat.style';

import firestore from '@react-native-firebase/firestore';

import {ChatBubble, ChatInput, EmptyList, Animation} from '@components';

import {checkChatRoom, createMessage} from '../../services/firebaseChatService';

import NoMessageDark from '@assets/images/no_message_dark.png';
import NoMessageLight from '@assets/images/no_message_light.png';

import {getUser} from '../../services/userServices';

import {useTheme} from '../../context/ThemeContext';

import {useUser} from '../../context/UserProvider';

const Chat = ({route}) => {
  const {user} = useUser();
  const {advertisementID, senderID, receiverID} = route.params;

  const [roomData, setRoomData] = useState(null);
  const [userDatas, setUserDatas] = useState([]);

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
      const senderData = await getUser(senderID, user.token);
      const receiverData = await getUser(receiverID, user.token);
      const participantDatas = [
        {
          id: senderID,
          nameSurname: senderData.data.nameSurname,
          imageURL: senderData.data.imageURL,
        },
        {
          id: receiverID,
          nameSurname: receiverData.data.nameSurname,
          imageURL: receiverData.data.imageURL,
        },
      ];
      setUserDatas(participantDatas);
    };
    getUsersData();
  }, []);

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
                  user={userDatas.find(user => user.id === item.sender)}
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
