import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

import {MessageCard, Animation, EmptyList} from '@components';

import {getMyRooms} from '../../../services/firebaseChatService';
import {useUser} from '../../../context/UserProvider';
import {getSenderReceiverData, getUser} from '../../../services/userServices';
import {getAdvertisementAPI} from '../../../services/advertisementServices';
import {getStyles} from './Messages.style';
import {useTheme} from '../../../context/ThemeContext';

import EmptyListDark from '@assets/images/empty_list_dark.png';
import EmptyListLight from '@assets/images/empty_list_light.png';

const Messages = ({navigation}) => {
  const {user} = useUser();
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const EmptyListVector = theme === 'dark' ? EmptyListDark : EmptyListLight;

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
          nameSurname: receiverUser.data.nameSurname,
          imageURL: receiverUser.data.imageURL,
          roomID: chat.roomID,
          messageCount: chat.messageCount,
          advertisementID: chat.advertisementID,
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
    if (chatRooms.length === 0)
      return (
        <EmptyList label={'Sohbet bulunamadı!'} vector={EmptyListVector} />
      );
    else {
      return (
        <View style={styles.messageCardContainer}>
          <Text style={styles.screenTitle}> Sohbetlerim </Text>
          <FlatList
            data={chatRooms.filter(chat => chat.messageCount !== 0)}
            renderItem={({item}) => (
              <MessageCard
                message={item}
                title={item.title}
                onPress={async () => {
                  const {receiver, sender} = await getSenderReceiverData(
                    user._id,
                    item.receiverID,
                    user.token,
                  );

                  navigation.navigate('ChatScreen', {
                    advertisementID: item.advertisementID,
                    senderID: user._id,
                    receiverID: item.receiverID,
                    receiver,
                    sender,
                    title: item.title,
                  });
                }}
              />
            )}
          />
        </View>
      );
    }
  }
};

export default Messages;
