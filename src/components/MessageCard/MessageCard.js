import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './MessageCard.style'


const MessageCard = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={.7} onPress={onPress}>
            <Image source={{ uri: "https://randomuser.me/api/portraits/men/58.jpg"}} style={styles.image} />
            <Text style={styles.name}>Alper Köşgeroğlu</Text>
        </TouchableOpacity>
    )
}

export default MessageCard