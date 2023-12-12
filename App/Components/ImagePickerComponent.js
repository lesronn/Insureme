import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any other icon library
import AppText from './AppText';
import colors from '../Config/colors';
import {androidCameraPermission} from '../../permission';

const ImagePickerComponent = ({onImagePick, label, placeholder, color}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const selectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS === 'ios') {
      Alert.alert('Message', 'Select An Option', [
        {text: 'cancel'},
        {text: 'Choose from Gallery', onPress: pickImage},
        {text: 'Camera', onPress: onCamera},
      ]);
    }
  };

  const pickImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      setSelectedImage(image.path);
      onImagePick(image.path);
    } catch (error) {
      if (error.code === 'E_PICKER_CANCELLED') {
        // User canceled the picker
      } else {
        throw error;
      }
    }
  };
  const onCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
      });
      setSelectedImage(image.path);
      onImagePick(image.path);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.dateContainer}>
        <AppText
          fontSize={18}
          color="medium"
          fontFamily="Sora-Medium"
          style={{paddingBottom: 8}}>
          {label}{' '}
          <Text style={{color: 'red', fontSize: 18, lineHeight: 18}}>*</Text>
        </AppText>

        <Pressable
          onPress={selectImage}
          style={[
            styles.imagePicker,
            {
              borderColor: color,
            },
          ]}>
          <AppText
            fontFamily="Sora-Medium"
            fontSize={17}
            style={{flex: 1, paddingRight: 10}}
            numberOfLines={1}
            color={selectedImage ? 'primaryText' : 'placeholderTextColor'}>
            {selectedImage ? selectedImage : placeholder}
          </AppText>

          <TouchableOpacity onPress={pickImage}>
            <Icon name="file-image-o" size={20} color={colors.formBorder} />
          </TouchableOpacity>
        </Pressable>

        {/* <View style={{height: 28}}>
          {imageError && selectedImage === null ? (
            <Text style={styles.errorText}>Image is required</Text>
          ) : null}
        </View> */}
      </View>
    </>
  );
};

export default ImagePickerComponent;

const height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  imagePicker: {
    borderWidth: 1.5,
    borderRadius: 10,
    width: '100%',
    height: height > 700 ? 55 : height / 3,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: 15,
  },
  errorText: {
    color: colors.danger,
    fontSize: 16,
    paddingTop: 5,
  },
});
