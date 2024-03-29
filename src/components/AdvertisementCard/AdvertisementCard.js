import React, {useState} from 'react'
import {Image,View,Text,Pressable, ImageBackground,TouchableOpacity} from 'react-native'

import styles from './AdvertisemetCard.style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import COLORS from '../../utils/colors'
import CONSTANTS from '../../utils/constants'

const AdvertisementCard = ({
    imageURL,
    product,
    onPress
}) => {

    const [liked,setLiked] = useState(false)

    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.cardContainer}
            activeOpacity={.7}
        >

            <View>
                <Image source={require('../../assets/images/advertisement.jpeg')} style={styles.image}/>
                <Pressable
                    onPress={() => setLiked(!liked)}
                    style={styles.addFavoriteButton}
                >
                    <Icon name={
                        liked ? "heart" : "heart-outline"
                    }
                    color={
                        liked ? COLORS.red : COLORS.blackMuted
                    }
                    size={CONSTANTS.fontSize.L5}
                    />
                </Pressable>
            </View>

            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{product.price} TL</Text>




        </TouchableOpacity>
    )
}

export default AdvertisementCard
