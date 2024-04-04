import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  ImageBase,
} from 'react-native';

import {littleCardStyles, bigCardStyles} from './AdvertisemetCard.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import COLORS from '../../utils/colors';
import CONSTANTS from '../../utils/constants';
import { Button } from '@components';

const LittleCard = ({advertisement, onPress,isOwner,styles}) => {
  const {imageURL, name, price} = advertisement;
  const [liked, setLiked] = useState(false);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.cardContainer}
      activeOpacity={0.7}>
      <View>
        <Image source={{uri: imageURL[0]}} style={styles.image} />
        {!isOwner && (
          <Pressable
            onPress={() => setLiked(!liked)}
            style={styles.addFavoriteButton}>
            <Icon
              name={liked ? 'heart' : 'heart-outline'}
              color={liked ? COLORS.red : COLORS.blackMuted}
              size={CONSTANTS.fontSize.L5}
            />
          </Pressable>
        )}
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price} TL</Text>
    </TouchableOpacity>
  );
};

const BigCard = ({advertisement,onPress,isOwner,styles}) => {
    
    const { name, description, imageURL, price } = advertisement
    const [liked, setLiked] = useState(false);

    return (
        <TouchableOpacity activeOpacity={.7} style={styles.cardContainer}>
          <Image source={{uri: imageURL[0]}} style={styles.image}/>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>{price} TL</Text>
          {!isOwner && (
          <Pressable
            onPress={() => setLiked(!liked)}
            style={styles.likeButton}>
            <Icon
              name={liked ? 'heart' : 'heart-outline'}
              color={liked ? COLORS.red : COLORS.blackMuted}
              size={CONSTANTS.fontSize.L6}
            />
          </Pressable>
        )}
        {isOwner && (
        <View style={styles.actionButtonsContainer}>
          <Button label='İlanı Düzenle' onPress={() => console.log("İlanı Düzenle")}/>
          <Button label='Satıldı İşaretle' onPress={() => console.log("Satıldı İşaretle")}/>

        </View>
      )}
        </TouchableOpacity>
    )
}

const AdvertisementCard = ({
  advertisement,
  onPress,
  isOwner,
  big = false,
}) => {

    const styles = big ? bigCardStyles : littleCardStyles

    if(!big) {
        return <LittleCard advertisement={advertisement} onPress={onPress} isOwner={isOwner} styles={styles}/>
    }
    else {
        return <BigCard advertisement={advertisement} onPress={onPress} isOwner={isOwner} styles={styles}/>
    }


};

export default AdvertisementCard;
