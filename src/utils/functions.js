import { PermissionsAndroid, Linking } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {showMessage} from 'react-native-flash-message';
import {Buffer} from 'buffer';
import {getUser} from '../services/userServices';
import Storage from './Storage';
import ImageResizer from '@bam.tech/react-native-image-resizer';

const getStatusType = statusCode => {
  if (statusCode >= 100 && statusCode < 200) {
    return 'info';
  } else if (statusCode >= 200 && statusCode < 300) {
    return 'success';
  } else if (statusCode >= 300 && statusCode < 400) {
    return 'warning';
  } else if (statusCode >= 400 && statusCode < 500) {
    return 'danger';
  } else if (statusCode >= 500 && statusCode < 600) {
    return 'default';
  } else {
    return 'none';
  }
};

const showFlashMessage = (statusCode, message) => {
  const messageType = getStatusType(statusCode);
  showMessage({
    type: messageType,
    message,
  });
};

// JWT token'i içinde tutulan payload'ın
// getirilmesi için kullanılan decode metodu
const jwtDecode = token => {
  if (token) {
    const parts = token.split('.').map(part => {
      return Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
    });
    const payload = JSON.parse(parts[1].toString());
    return payload;
  }
  return null;
};

const locationPermissionGranted = async () => {
  const granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  if (!granted) {
    const permissionRequestResult = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return permissionRequestResult === 'granted';
  }
  return true;
}

// Anlık konum almaak için bir promise döndürür
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {longitude, latitude} = position.coords;
        resolve({longitude, latitude});
      },
      error => {
        showMessage({
          message: `${error.code} : ${error.message}`,
        });
        reject(null);
      },
    );
  });
};

// Token'i decode ederek token'de saklanan kullanıcı
// id'si ile kullanıcı verilerini döndürür.
const getUserFromToken = async () => {
  const token = await Storage.getData('token');
  if (token) {
    const decodedJWT = jwtDecode(token);
    const userID = decodedJWT.userId;
    // getUser token değeri ile kullanıcı verilerini response olarak döner
    const response = await getUser(userID, token);
    return {...response.data, token};
  }
  // Eğer token yok ise null döner
  else {
    return null;
  }
};

// Resimleri yeniden boyutlandır
const resizeImage = (asset, width, height) => {
  return new Promise((resolve, reject) => {
    ImageResizer.createResizedImage(asset.uri, width, height, 'JPEG', 100)
      .then(response => {
        resolve({name: response.name, uri: response.uri});
      })
      .catch(err => {
        console.log('IMAGE_RESIZE_ERROR', err);
        reject(null);
      });
  });
};

const makePhoneCall = (phoneNumber) => {
  Linking.openURL(`tel:${phoneNumber}`)
} 



export {
  showFlashMessage,
  getUserFromToken,
  getCurrentLocation,
  resizeImage,
  locationPermissionGranted,
  makePhoneCall,
};
