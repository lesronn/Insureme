import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose any other icon library
import AppText from './AppText';
import colors from '../Config/colors';

const DocumentPickerComponent = ({
  onDocumentPick,
  label,
  placeholder,
  color,
}) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [docError, SetDocErro] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedDocument(result);
      onDocumentPick(result[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        throw err;
      }
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
          onPress={pickDocument}
          style={[
            styles.textinput,
            {
              borderColor: color,
            },
          ]}>
          <AppText
            fontFamily="Sora-Medium"
            fontSize={18}
            style={{flex: 1}}
            color={selectedDocument ? 'primaryText' : 'placeholderTextColor'}>
            {selectedDocument ? selectedDocument[0].name : placeholder}
          </AppText>
          <TouchableOpacity onPress={pickDocument} style={{padding: 10}}>
            <Icon name="file" size={20} color={colors.formBorder} />
          </TouchableOpacity>
        </Pressable>
      </View>
    </>
  );
};
export default DocumentPickerComponent;
const height = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  textinput: {
    borderWidth: 1.5,
    paddingHorizontal: 15,
    fontSize: 18,
    borderRadius: 10,
    width: '100%',
    height: height > 700 ? 58 : height / 13,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
