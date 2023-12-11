import EncryptedStorage from 'react-native-encrypted-storage';

const key = 'authKey';
const storeUserData = async user => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify({user}));
  } catch (error) {
    console.log(error);
  }
};

const getUserData = async () => {
  try {
    return await EncryptedStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
};

const removeUserData = async () => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export default {
  storeUserData,
  getUserData,
  removeUserData,
};
