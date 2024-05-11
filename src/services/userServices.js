import axios from 'axios';

import {BASE_URL} from '@env';

// E-mail doğrulaması atan servis fonksiyonu
const sendEmailVerification = async (values, type) => {
  const {emailAddress, phoneNumber} = values;
  try {
    const response = await axios.post(
      `${BASE_URL}/user/sendEmailVerification`,
      {emailAddress, phoneNumber, type},
    );
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data,
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
};

// Kayıt servis fonksiyonu
const register = async values => {
  const {nameSurname, emailAddress, phoneNumber, password} = values;

  try {
    const response = await axios.post(`${BASE_URL}/user/register`, {
      nameSurname,
      emailAddress,
      phoneNumber,
      password,
    });
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.token,
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
};

// Giriş servis fonksiyonu
const login = async values => {
  try {
    const {emailAddress, password} = values;
    const response = await axios.post(`${BASE_URL}/user/login`, {
      emailAddress,
      password,
    });
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.token,
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
};

// ID'ye göre kullanıcı getirme servis fonksiyonu
const getUser = async (userID, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userID}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return {
      status: 'success',
      message: 'User fetched successfully',
      data: response.data.data,
    };
  } catch (err) {
    return {
      status: 'error',
      message: 'An error occurred while processing your request.',
      error: err.message,
    };
  }
};

// Kullanıcı güncelleme servis fonksiyonu
const updateUser = async (userID, values) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/user/${userID}/updateUser`,
      values,
    );
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data,
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
};

// Şifre güncelleme servis fonksiyonu
const changePassword = async (userID, values) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/user/${userID}/changePassword`,
      values,
    );
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data,
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
};

// Favoriye ekleme, çıkarma servis fonksiyonu
const favoriteUnFavorite = async (userID, postID) => {
  try {
    const response = await axios.put(`${BASE_URL}/user/likeDislike`, {
      userID,
      postID,
    });
    return {
      status: response.status,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (err) {
    return {
      status: 'error',
      message: 'An error occurred while like/dislike.',
      error: err.response.data,
    };
  }
};

export {
  register,
  login,
  sendEmailVerification,
  getUser,
  favoriteUnFavorite,
  updateUser,
  changePassword,
};
