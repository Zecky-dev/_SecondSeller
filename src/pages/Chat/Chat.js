// React & Components
import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList} from 'react-native';
import {ChatBubble, ChatInput, EmptyList, Animation} from '@components';

// Styles
import {getStyles} from './Chat.style';

// Firestore & Firestore Services
import firestore from '@react-native-firebase/firestore';
import {checkChatRoom, createMessage, removeMessage as removeMessageService} from '../../services/firebaseChatService';

// Vectors
import NoMessageDark from '@assets/images/no_message_dark.png';
import NoMessageLight from '@assets/images/no_message_light.png';

// User services
import {getSenderReceiverData} from '../../services/userServices';

// Context
import {useTheme} from '../../context/ThemeContext';
import {useUser} from '../../context/UserProvider';


const Chat = ({route}) => {
  const {user} = useUser();
  const {advertisementID, senderID, receiverID} = route.params;
  const [roomData, setRoomData] = useState(null);
  const [userDatas, setUserDatas] = useState([]);

  // styling
  const {theme} = useTheme();
  const styles = getStyles(theme);
  const NoMessageVector = theme === 'dark' ? NoMessageDark : NoMessageLight;

  const chatRef = useRef();

  useEffect(() => {
    const handleChatRoomID = async () => {
      // Eğer oda var ise odanın ID değerini alır, yok ise oda oluşturur ve onun ID değerini alır
      const chatRoomID = await checkChatRoom(
        advertisementID,
        senderID,
        receiverID,
      );
      // Mesajlaşmayı takip eden abonelik
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
      const { sender, receiver } = await getSenderReceiverData(senderID, receiverID, user.token)
      const userDatas = [ sender, receiver];
      setUserDatas(userDatas);
    };
    getUsersData();
  }, []);


  // Mesaj gönderme & Silme

  const sendMessage = async (messageContent, isLocation) => {
    const message = {
      sender: senderID,
      message: messageContent,
      createDate: new Date().toLocaleString(),
      isLocation,
    };
    await createMessage(roomData.roomID, message);
  };

  const removeMessage = async (messageDetails) => {
    await removeMessageService(roomData.roomID, messageDetails)
  };


  // Render

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
                  removeMessage={removeMessage}
                  user={userDatas.find(user => user._id === item.sender)}
                  messageDetails={item}
                  key={item.messageId}
                />
              );
            }}
          />
        )}

        <ChatInput
          sendMessage={sendMessage}
          senderID={senderID}
          roomID={roomData.roomID}
          theme={theme}
        />
      </View>
    );
  }
};

export default Chat;
