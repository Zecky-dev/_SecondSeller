import axios from 'axios';
import {BASE_URL} from '@env';
import { convertToBase64 } from '@utils/functions';

const createAdvertisementAPI = async (values,token) => {
  let {
    advertisementCategory: category,
    advertisementDescription: description,
    advertisementImageURIS: images,
    advertisementName: title,
    advertisementPrice: price,
    location,
    owner,
  } = values;

  let advertisementData = {
    title,
    price,
    description,
    category,
    images,
    location,
    owner
  }

  images = await convertToBase64(images)
    
  // Kullanıcı giriş yapmışsa ve tokeni var ise
  if (token && images !== null) {
    advertisementData.images = images
    try {
        const response = await axios
        .post(`${BASE_URL}/advertisements/create`, advertisementData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token ,
          },
        })
        console.log("RESPONSE",response.data);
    }
    catch(err) {
        console.log("ERROR",err)
    }
  }

  else {
    console.log("x")
  }
  

};


export {createAdvertisementAPI};
