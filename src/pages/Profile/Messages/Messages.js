import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import {MessageCard, Animation, EmptyList} from '@components';

import {getMyRooms} from '@services/firebaseChatService';
import {getUser} from '@services/userServices';
import {getAdvertisementAPI} from '@services/advertisementServices';
import {getStyles} from './Messages.style';
import {useUser} from '@context/UserProvider';
import {useTheme} from '@context/ThemeContext';

import EmptyListDark from '@assets/images/empty_list_dark.png';
import EmptyListLight from '@assets/images/empty_list_light.png';

const Messages = ({navigation}) => {
  const {user} = useUser();
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const NoMesageVector = theme === 'dark' ? EmptyListDark : EmptyListLight;

  useEffect(() => {
    const handleRoomID = async () => {
      setLoading(true);
      const myChatRooms = await getMyRooms(user._id);
      setChatRooms(myChatRooms);
      let chats = [];
      for (let chat of myChatRooms) {
        const receiverID = chat.participantIDs[0];
        const receiverUser = await getUser(receiverID, user.token);
        const advertisement = await getAdvertisementAPI(
          chat.advertisementID,
          user.token,
        );
        const receiverChatInfo = {
          receiverID,
          roomID: chat.roomID,
          advertisementID: chat.advertisementID,

          nameSurname: receiverUser.data.nameSurname,
          imageURL: receiverUser.data.imageURL,
          messageCount: chat.messageCount,

          // Header için gerekli olan veriler
          receiver: receiverUser.data,
          title: advertisement.data.data.title,
        };
        chats.push(receiverChatInfo);
      }
      setChatRooms(chats);
      setLoading(false);
    };
    handleRoomID();
  }, []);

  if (loading) return <Animation animationName={'loading'} />;
  else {
    const chatsWithMessage = chatRooms.filter(chat => chat.messageCount !== 0);
    return (
      <View style={styles.messageCardContainer}>
        <Text style={styles.screenTitle}> Sohbetlerim </Text>

        {chatsWithMessage.length === 0 ? (
          <EmptyList
            label={'Henüz bir sohbetiniz bulunmuyor!'}
            vector={NoMesageVector}
          />
        ) : (
          <FlatList
            data={chatsWithMessage}
            renderItem={({item}) => (
              <MessageCard
                message={item}
                title={item.title}
                onPress={() =>
                  navigation.navigate('ChatScreen', {
                    advertisementID: item.advertisementID,
                    senderID: user._id,
                    receiverID: item.receiverID,
                    receiver: item.receiver,
                    title: item.title,
                  })
                }
              />
            )}
          />
        )}
      </View>
    );
  }
};

export default Messages;
