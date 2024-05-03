import axios from 'axios';
import {BASE_URL} from '@env';

// İlan yaratmak için kullanılan servis fonksiyonu
const createAdvertisementAPI = async (values, token) => {
  if (token) {
    try {
      const response = await axios.post(
        `${BASE_URL}/advertisements/create`,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      return {
        status: response.status,
        message: response.message,
        data: response.data,
      };
    } catch (err) {
      if (err.response) {
        return {
          status: err.response.status,
          message: err.response.data.message,
        };
      } else if (err.request) {
        return {
          status: 'Network Error',
          message:
            'The request was made but no response was received. Please check your network connection.',
        };
      } else {
        return {
          status: 'Error',
          message:
            'An error occurred while processing your request. Please try again.',
        };
      }
    }
  }
};

// ID'si bilinen ilanın detaylarını getirmek için kullanılan servis fonksiyonu
const getAdvertisementAPI = async (id, token) => {
  if (token) {
    try {
      const advertisement = await axios.get(
        `${BASE_URL}/advertisements/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return advertisement;
    } catch (err) {
      return null;
    }
  }
};

const getAllAdvertisementAPI = async token => {
  if (token) {
    try {
      const advertisements = await axios.get(`${BASE_URL}/advertisements`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      return advertisements;
    } catch (err) {
      console.log('ADVERTISEMENT_GET_ERROR', err);
      return null;
    }
  }
};

const getAdvertisementByUserIdAPI = async (id, token) => {
  if (token) {
    try {
      const advertisements = await axios.get(
        `${BASE_URL}/advertisements/user?id=${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      return advertisements.data.data;
    } catch (err) {
      console.log('ADVERTISEMENT_GET_ERROR', err);
      return null;
    }
  }
};

export {createAdvertisementAPI, getAdvertisementAPI, getAllAdvertisementAPI, getAdvertisementByUserIdAPI};
