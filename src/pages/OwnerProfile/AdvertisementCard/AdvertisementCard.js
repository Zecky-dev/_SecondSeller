import React from 'react'
import {View,Text,Image,TouchableOpacity} from 'react-native'

import { getStyles } from './AdvertisementCard.style'

const AdvertisementCard = ({advertisement, theme, onPress}) => {

    const styles = getStyles(theme)
    const { title, description, images } = advertisement


    return (
        <TouchableOpacity style={styles.container} activeOpacity={.7} onPress={onPress}>
            <Image source={{uri: images[0]}} style={styles.image}/>
            <View style={styles.innerRightContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AdvertisementCard;