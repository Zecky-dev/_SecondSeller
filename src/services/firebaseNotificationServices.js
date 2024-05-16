import notifee, {AndroidStyle} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// FCM'e cihaz kaydetme
const createToken = () => {
  try {
    messaging()
      .registerDeviceForRemoteMessages()
      .then(async () => {
        await messaging().getToken();
        console.log('FCM TOKEN CREATED');
      });
  } catch (error) {
    console.log('ERROR', error);
  }
};

// FCM'den cihazı silme
const deleteToken = () => {
  try {
    messaging()
      .unregisterDeviceForRemoteMessages()
      .then(async () => {
        await messaging().deleteToken();
        console.log('FCM TOKEN DELETED');
      });
  } catch (error) {
    console.log('ERROR', error);
  }
};

// Foreground bildirimleri yakalama
const handleForegroundMessages = () => {
  const foreground = messaging().onMessage(async remoteMessage => {
    createNotification(remoteMessage.notification);
  });
  return () => {
    foreground();
  };
};

// Uygulama içerisinde bildirim oluşturma
const createNotification = async notification => {
  const isChannelCreated = await notifee.isChannelCreated(
    'second-seller-channel',
  );

  // channel oluşturulmuş ise bildirim gönder
  if (isChannelCreated) {
    const notificationData = {
      title: notification.title,
      body: notification.body,
      android: {
        channelId: 'second-seller-channel',
        pressAction: {
          id: 'default',
          mainComponent: 'main',
        },
      },
    };
    // eğer bildirim içeriğinde imageUrl varsa bildirime resmi ekle
    if (notification.android.imageUrl !== undefined) {
      notificationData.android.style = {
        type: AndroidStyle.BIGPICTURE,
        picture: notification.android.imageUrl,
      };
    }
    // bildirimi göster
    notifee.displayNotification(notificationData);
  } else {
    // chanel oluşturulmamış ise önce kanal oluştur sonra bildirim gönder
    notifee
      .createChannel({
        id: 'second-seller-channel',
        name: 'Second Seller',
        vibration: true,
        importance: 2,
      })
      .then(res => {
        createNotification(notification);
      });
  }
};

export {createToken, deleteToken, handleForegroundMessages};
