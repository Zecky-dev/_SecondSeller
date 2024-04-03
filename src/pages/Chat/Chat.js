import React from 'react';
import {View, Text,FlatList} from 'react-native';
import styles from './Chat.style'

import {ChatBubble,ChatInput} from '@components';

function Message(messageId,message,messageOwner,messageDate) {
    this.messageId = messageId
    this.message = message,
    this.messageOwner = messageOwner
    this.messageDate = messageDate
}

const Chat = () => {
  
  // Giriş yapan kullanıcının kullanıcı adı 
  const user = "Zecky";

  // Mock mesajlar
  const messages = [
    new Message(1,"Selam","Zecky","17:06"),
    new Message(2,"Selammm","Alper","17:32"),
    new Message(3,"Sattığınız ürünü çok beğendim, ama fiyatta anlaşmamız lazım","Zecky","17:33"),
    new Message(4,"150 TL uygun mu?","Zecky","17:33"),
    new Message(5,"120 TL'de anlaşalım İNŞALLAH","Alper","18:00"),
    new Message(6,"Tamamdır alıyorum","Zecky","18:12"),

]

  return (
      <View style={styles.container}>
        <FlatList
        data={messages}
        contentContainerStyle={styles.chatListContainer}
        renderItem={({item}) => (
          <ChatBubble
            isOwner={item.messageOwner === user}
            messageDetails={item}
            key={item.messageId}
          />
        )}
      />
      <ChatInput/>
      </View>
      
  );
};

export default Chat;
