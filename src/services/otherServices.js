import axios from 'axios';
import {IMGBB_API_KEY as apiKey} from '@env';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const uploadImagesAndGetURLs = async (imagesURIsToUpload) => {
    const apiUrl = 'https://api.imgbb.com/1/upload';
    const formData = new FormData();
    const imageURLs = [];
    return new Promise(async (resolve,reject) => {
      try {
        let response;
        formData.append('key', apiKey);
        for(let image of imagesURIsToUpload) {
          formData.append('image', {
            uri: image,
            name: uuidv4(),
            type: 'image/png',
          });
          response = await axios.post(apiUrl, formData, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          });
          imageURLs.push(response.data.data.display_url)
        }
        resolve(imageURLs)
      } catch (err) {
        console.log("IMAGE_UPLOAD_ERROR", err);
        reject(null);
      }
    })
  };

  export {
    uploadImagesAndGetURLs
  }