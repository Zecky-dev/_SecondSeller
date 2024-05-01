import Geolocation from '@react-native-community/geolocation';
import { showMessage } from "react-native-flash-message";
import { Buffer } from 'buffer' 
import { getUser } from "../services/userServices";
import Storage from "./Storage";
import RNFS from 'react-native-fs'



const getStatusType = (statusCode) => {
    if (statusCode >= 100 && statusCode < 200) {
        return "info";
    } else if (statusCode >= 200 && statusCode < 300) {
        return "success";
    } else if (statusCode >= 300 && statusCode < 400) {
        return "warning";
    } else if (statusCode >= 400 && statusCode < 500) {
        return "danger";
    } else if (statusCode >= 500 && statusCode < 600) {
        return "default";
    } else {
        return "none";
    }
}

const showFlashMessage = (statusCode,message) => {
    const messageType = getStatusType(statusCode)
    showMessage({
        type: messageType,
        message,
    })
}

// JWT token'i içinde tutulan payload'ın 
// getirilmesi için kullanılan decode metodu
const jwtDecode = (token) => {
    if(token)  {
        const parts  = token.split('.').map(part => { 
            return Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
        }) 
        const payload = JSON.parse(parts[1].toString());
        return payload
    }
    return null        
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
    const token = await Storage.getData('token')
    if(token) {
        const decodedJWT = jwtDecode(token);
        const userID = decodedJWT.userId;
        // getUser token değeri ile kullanıcı verilerini response olarak döner
        const response = await getUser(userID,token);
        return { ...response.data, token };
    }
    // Eğer token yok ise null döner
    else {
        return null;
    } 
}

// İçerisine girilen resimleri base64 formatına dönüştürür
const convertToBase64 = (images) => {
    const base64s = [];
    return new Promise( async (resolve,reject) => {
        for(let image of images) {
            try {
                const base64 = await RNFS.readFile(image, 'base64')
                base64s.push(base64);
            }
            catch(err) {
                reject(null)
                break;
            }
        }
        resolve(base64s);
    })
}


export {
    showFlashMessage,
    getUserFromToken,
    getCurrentLocation,
    convertToBase64
}