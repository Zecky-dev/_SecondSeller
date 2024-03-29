import React, {useState} from 'react'
import {Image,View,Text,Pressable, ImageBackground,TouchableOpacity} from 'react-native'

import styles from './AdvertisemetCard.style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
            activeOpacity={.9}
        >
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={require('../../assets/images/advertisement.jpeg')}
                    style={styles.image}
                >
                    <Pressable onPress={() => setLiked(!liked)}>
                    <Icon 
                    name={
                        liked ? "heart" : "heart-outline"
                    } color={liked ? "red" : "rgba(0,0,0,0.5)"} size={32} style={{position: "absolute", right: 16, top: 16,padding:2,
                    backgroundColor: "white",borderRadius: 18,}}/>
                    </Pressable>
                    
                </ImageBackground>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.name}>
                    {product.name}
                </Text>
                <Text style={styles.price}>
                    {product.price} TL
                </Text>
            </View>

            
            
        </TouchableOpacity>        
    )
}

export default AdvertisementCard
