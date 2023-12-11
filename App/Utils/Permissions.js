import {Platform} from 'react-native';
import Permissions from 'react-native-permissions';

export async function requestPermissions() {
  try {
    const permissionList = [
      Permissions.PERMISSIONS.ANDROID.CAMERA,
      Permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      Permissions.PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
      // Permissions.PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      // Permissions.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      // Permissions.PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,

      // Permissions.PERMISSIONS.IOS.NOTIFICATIONS,
      Permissions.PERMISSIONS.IOS.CAMERA,
      Permissions.PERMISSIONS.IOS.LOCATION_ALWAYS,
      Permissions.PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      Permissions.PERMISSIONS.IOS.PHOTO_LIBRARY,
    ];

    if (Platform.OS === 'android') {
      const granted = await Permissions.requestMultiple(permissionList);

      const allGranted = Object.values(granted).every(
        result => result === Permissions.RESULTS.GRANTED,
      );

      return allGranted;
    } else if (Platform.OS === 'ios') {
      const granted = await Permissions.requestMultiple(permissionList);

      const allGranted = Object.values(granted).every(
        result => result === Permissions.RESULTS.GRANTED,
      );

      return allGranted;
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}
