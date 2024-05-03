import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';

// Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles & constants
import {littleCardStyles, bigCardStyles} from './AdvertisemetCard.style';
import COLORS from '../../utils/colors';
import CONSTANTS from '../../utils/constants';

// Custom components
import { Button } from '@components';

// Uygulama genelindeki kullanıcıyı döndüren hook
import { useUser } from '../../context/UserProvider';

// Kart - büyük versiyon
const LittleCard = ({advertisement, onPress, isOwner, styles, favoriteUnfavorite}) => {

  const { user } = useUser();

  console.log(isOwner)

  const {images, title, price} = advertisement;
  const [liked, setLiked] = useState(false);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.cardContainer}
      activeOpacity={.7}>
      <View>
        <Image source={{uri: images[0]}} style={styles.image} />
        {isOwner !== true && (
          <Pressable
            onPress={() => {
              setLiked(!liked);
              favoriteUnfavorite(user._id, advertisement._id)
            }}
            style={styles.addFavoriteButton}>
            <Icon
              name={liked ? 'heart' : 'heart-outline'}
              color={liked ? COLORS.red : COLORS.blackMuted}
              size={CONSTANTS.fontSize.L5}
            />
          </Pressable>
        )}
      </View>
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.price}>{price} TL</Text>
    </TouchableOpacity>
  );
};

// Kart - küçük versiyon
const BigCard = ({advertisement,onPress,isOwner,styles, favoriteUnfavorite}) => {

  const { user } = useUser();

    const { title, description, images, price } = advertisement
    const [liked, setLiked] = useState(false);

    return (
        <TouchableOpacity activeOpacity={.7} style={styles.cardContainer}>
          <Image source={{uri: images[0]}} style={styles.image}/>
          <Text style={styles.name}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>{price} TL</Text>
          {!isOwner && (
          <Pressable
            onPress={() => {
              setLiked(!liked);
              favoriteUnfavorite(user._id, advertisement._id)
            }}
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
  favoriteUnfavorite
}) => {

    const styles = big ? bigCardStyles : littleCardStyles
    if(!big) {
        return <LittleCard advertisement={advertisement} onPress={onPress} isOwner={isOwner} styles={styles} favoriteUnfavorite={favoriteUnfavorite}/>
    }
    else {
        return <BigCard advertisement={advertisement} onPress={onPress} isOwner={isOwner} styles={styles} favoriteUnfavorite={favoriteUnfavorite}/>
    }
};

export default AdvertisementCard;
