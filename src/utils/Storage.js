import AsyncStorage from '@react-native-async-storage/async-storage';

const Storage = {
  storeData: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      //console.log(`Key ${key} is set to value ${value}`)
    } catch (err) {
      console.log('Storage Store Error', err.message);
    }
  },
  getData: async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      //console.log(`Value of key ${key} is ${value}`)
      return value;
    } catch (err) {
      console.log('Storage Get Error', err.message);
      return;
    }
  },
  removeData: async key => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Key ${key} is removed`);
    } catch (err) {
      console.log('Storage Error Remove', err.message);
    }
  },
  getAllKeys: async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      return allKeys;
    } catch (err) {
      console.log('Storage Error All Keys', err.message);
    }
  },
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
      console.log('All storage is cleared');
    } catch (err) {
      console.log('Storage Error Clear All Keys', err.message);
    }
  },
};

export default Storage;
