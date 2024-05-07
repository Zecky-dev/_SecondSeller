import {useEffect, useState} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';

// Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// styles & constants
import COLORS from '../../utils/colors';
import CONSTANTS from '../../utils/constants';
import {bigCardStyles, littleCardStyles} from './AdvertisemetCard.style';

// Custom components
import {Button} from '@components';

// Uygulama genelindeki kullanıcıyı döndüren hook
import {useUser} from '../../context/UserProvider';

// Kart - büyük versiyon
const LittleCard = ({
  advertisement,
  onPress,
  isOwner,
  styles,
  favoriteUnfavorite,
}) => {
  const {user, setUser} = useUser();

  const {images, title, price} = advertisement;
  // Kalp icon durum kontrolü
  const [liked, setLiked] = useState(
    user?.favorites?.includes(advertisement._id),
  );

  // Eğer local de bulunan user'ın favorileri güncellenirse kart üzerindeki icon'lar tekrardan düzenlenecek
  useEffect(() => {
    setLiked(user.favorites.includes(advertisement._id));
  }, [user.favorites]);

  // Kalp icon'una basılınca ilan favorilere eklenecek veya favorilerden kaldırılacak,
  // local de bulunan user'ın favorites değeri güncellenecek
  const getLastFavorites = async () => {
    const updatedFavorites = await favoriteUnfavorite(
      user._id,
      advertisement._id,
    );
    const newFavorites = updatedFavorites.data;
    setUser({...user, favorites: newFavorites});
    setLiked(newFavorites.includes(advertisement._id));
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.cardContainer}
      activeOpacity={0.7}>
      <View>
        <Image source={{uri: images[0]}} style={styles.image} />
        {isOwner !== true && (
          <Pressable
            onPress={() => {
              getLastFavorites();
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
      <Text style={styles.name} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.price}>{price} TL</Text>
    </TouchableOpacity>
  );
};

// Kart - küçük versiyon
const BigCard = ({
  advertisement,
  onPress,
  isOwner,
  styles,
  favoriteUnfavorite,
  handleSoldStatus,
  handleUpdateButton,
}) => {
  const {user, setUser} = useUser();

  const {
    title,
    description,
    images,
    price,
    soldStatus,
    _id: id,
  } = advertisement;
  const [liked, setLiked] = useState(
    user?.favorites.includes(advertisement._id),
  );
  const [isSold, setIsSold] = useState(soldStatus);

  const getLastFavorites = async () => {
    const updatedFavorites = await favoriteUnfavorite(
      user._id,
      advertisement._id,
    );
    const newFavorites = updatedFavorites.data;
    setUser({...user, favorites: newFavorites});
    setLiked(newFavorites.includes(advertisement._id));
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.cardContainer}
      onPress={onPress}>
      <Image source={{uri: images[0]}} style={styles.image} />
      <Text style={styles.name}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{price} TL</Text>
      {!isOwner && (
        <Pressable
          onPress={() => {
            getLastFavorites();
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
          <Button label="İlanı Düzenle" onPress={handleUpdateButton} />
          <Button
            label={isSold ? 'İlanı Aktifleştir' : 'Satıldı İşaretle'}
            onPress={async () => {
              const soldStatus = !isSold;
              handleSoldStatus(id, {...advertisement, soldStatus});
              setIsSold(soldStatus);
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const AdvertisementCard = ({
  advertisement,
  onPress,
  isOwner,
  big = false,
  favoriteUnfavorite,
  handleSoldStatus,
  handleUpdateButton,
}) => {
  const styles = big ? bigCardStyles : littleCardStyles;
  if (!big) {
    return (
      <LittleCard
        advertisement={advertisement}
        onPress={onPress}
        isOwner={isOwner}
        styles={styles}
        favoriteUnfavorite={favoriteUnfavorite}
      />
    );
  } else {
    return (
      <BigCard
        advertisement={advertisement}
        onPress={onPress}
        isOwner={isOwner}
        styles={styles}
        favoriteUnfavorite={favoriteUnfavorite}
        handleSoldStatus={handleSoldStatus}
        handleUpdateButton={handleUpdateButton}
      />
    );
  }
};

export default AdvertisementCard;
