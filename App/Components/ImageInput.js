import {
  Alert,
  Image,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import AppText from './AppText';

import AppModal from './AppModal';
import colors from '../Config/colors';
import {androidCameraPermission} from '../../permission';
import {ActivityIndicator} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
const ImageInput = ({imageUri, onChangeImage}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageModalVisible, setimageModalVisible] = useState(false);
  const [downloadMessage, setDownloadMesage] = useState('');
  const selectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS === 'ios') {
      setModalVisible(true);
    }
  };

  const openModal = useCallback(() => {
    setimageModalVisible(true);
    setModalVisible(false);
  }, []);
  const closeImageModal = useCallback(() => {
    setimageModalVisible(false);
  }, []);
  const shareImage = useCallback(async () => {
    try {
      const imageUrl = imageUri;
      const localImagePath = `${RNFS.CachesDirectoryPath}/sharedImage.jpg`;
      // Download the image to the local cache directory
      const result = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: localImagePath,
        begin: res => {
          // You can handle the beginning of the download if needed
          setDownloadMesage(`Downloading Image...`);
        },
        progress: res => {
          const percentage = (res.bytesWritten / res.contentLength) * 100;
          // You can update the progress if needed
        },
      }).promise;
      // Check if download is successful
      if (result.statusCode === 200) {
        // If download is successful, hide the toast
        setDownloadMesage('');
        // Share the local image file
        await Share.open({url: `file://${localImagePath}`, type: 'image/jpeg'});
      } else {
        setDownloadMesage('Error Downloading Image');
        setTimeout(() => {
          setDownloadMesage('');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      if (error.message === 'User did not share') {
        setDownloadMesage('User Didnt Share');
        setTimeout(() => {
          setDownloadMesage('');
        }, 2000);
      } else {
        setDownloadMesage('An Error Occured while sharing Image');
        setTimeout(() => {
          setDownloadMesage('');
        }, 2000);
      }
      console.log('Error sharing image: ', error.message);
    }
  }, []);
  const onCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      });
      setModalVisible(false);
      onChangeImage(image.path);
      // console.log(image);
    } catch (error) {
      setModalVisible(false);
      console.log(error);
    }
  };
  const onGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      });
      setModalVisible(false);
      onChangeImage(image.path);
      // console.log(image);
    } catch (error) {
      setModalVisible(false);

      console.log(error);
    }
  };
  const cancelImageSelection = () => {
    Alert.alert('Delete', 'Are you sure you want to delete this image?', [
      {text: 'Yes', onPress: () => onChangeImage('')},
      {text: 'No'},
    ]);
  };

  return (
    <>
      <Modal
        animationType="fade"
        visible={imageModalVisible}
        transparent={true}
        onRequestClose={closeImageModal}>
        <StatusBar barStyle={'light-content'} backgroundColor={colors.black} />
        <ImageViewer
          imageUrls={[
            {
              url: imageUri,
            },
          ]}
          loadingRender={() => (
            <ActivityIndicator color={colors.white} size={'large'} />
          )}
          renderIndicator={() => null}
          enableSwipeDown
          onSwipeDown={closeImageModal}
          renderHeader={() => (
            <>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeImageModal}>
                <Ionicons name="close" color={colors.white} size={33} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareButton} onPress={shareImage}>
                <Ionicons name="share-outline" color={colors.white} size={33} />
              </TouchableOpacity>
              {downloadMessage !== '' && (
                <View style={styles.toastMessageContainer}>
                  <AppText
                    fontFamily="Gilroy-Bold"
                    color="primaryText"
                    fontSize={18}>
                    {downloadMessage}
                  </AppText>
                </View>
              )}
            </>
          )}
        />
      </Modal>
      <AppModal
        modalVisible={modalVisible}
        headerText="Profile Picture"
        subText="Select An Option"
        modalClose={event => {
          if (event.target == event.currentTarget) {
            setModalVisible(false);
          }
        }}>
        <TouchableOpacity
          onPress={onCamera}
          style={[
            styles.profileOptions,
            {
              backgroundColor: colors.primary,
            },
          ]}>
          <AppText fontSize={16} color="white" fontFamily="Sora-Medium">
            Camera
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onGallery}
          style={[
            styles.profileOptions,
            {
              backgroundColor: colors.primary,
            },
          ]}>
          <AppText fontSize={16} color="white" fontFamily="Sora-Medium">
            Choose from Gallery
          </AppText>
        </TouchableOpacity>

        {imageUri && (
          <TouchableOpacity
            onPress={() => openModal()}
            style={[
              styles.profileOptions,
              {
                backgroundColor: colors.primary,
              },
            ]}>
            <AppText fontSize={16} color="white" fontFamily="Sora-Medium">
              View Profile
            </AppText>
          </TouchableOpacity>
        )}
      </AppModal>
      <TouchableOpacity
        style={[
          styles.profilePicture,
          {borderWidth: imageUri ? 0 : 1.5, borderColor: colors.formBorder},
        ]}
        onPress={selectImage}>
        {imageUri ? (
          <>
            <Image
              source={{uri: imageUri}}
              style={{
                height: 90,
                width: 90,
                borderRadius: 10,
              }}
            />
            <Pressable
              style={[styles.closeBtn, {backgroundColor: colors.primary}]}
              onPress={cancelImageSelection}>
              <AppText fontSize={18} color="white" style={{fontWeight: '800'}}>
                ×
              </AppText>
            </Pressable>
          </>
        ) : (
          <Ionicons name="camera-outline" size={50} color={colors.formBorder} />
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    width: 90,
    height: 90,
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  closeBtn: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 100,
    transform: [{translateX: 45}, {translateY: -45}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileOptions: {
    padding: 20,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
  shareButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 99999,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    // left: 20,
    zIndex: 9999,
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  toastMessageContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 100,
    paddingHorizontal: 15,
    alignSelf: 'center',
    paddingVertical: 5,
    borderRadius: 6,
  },
});
export default ImageInput;
