import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import colors from '../Config/colors';
import {Eye} from 'iconsax-react-native';
interface AppTextInputProps {
  label?: string;
  color?: any;
  Inputstyle?: any;
  style?: any;
  marginLeft?: number;

  marginRight?: number;
  Required?: boolean;
  Width?: string;
  placeholderTextColor?: string;
  placeholder?: string;
  TextinputHeight?: number;
  secureTextEntry?: boolean;
  [key: string]: any;
}

const height = Dimensions.get('window').height;

const AppTextInput: React.FC<AppTextInputProps> = ({
  label = '',
  color,
  Inputstyle,
  style,
  marginLeft,
  marginRight,
  Required,
  Width = '100%',
  placeholderTextColor = 'grey',
  placeholder = '',
  secureTextEntry,
  TextinputHeight = height > 700 ? 58 : height / 13,
  ...otherProps
}) => {
  return (
    <View style={[styles.Container, style, {marginLeft, marginRight}]}>
      {label && (
        <Text
          style={[
            styles.label,
            {paddingBottom: 8, fontSize: 18, color: colors.medium},
          ]}>
          {label}{' '}
          {Required && (
            <Text style={{color: 'red', fontSize: 18, lineHeight: 18}}>*</Text>
          )}
        </Text>
      )}

      <TextInput
        style={[
          styles.textinput,
          Inputstyle,
          {
            borderColor: color,
            height: TextinputHeight,
            width: '100%',
          },
        ]}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize="none"
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {},
  label: {
    fontFamily: 'Sora-Medium',
  },
  textinput: {
    borderWidth: 1.5,
    paddingHorizontal: 15,
    fontSize: 17,
    fontFamily: 'Sora-Medium',
    borderRadius: 10,
    justifyContent: 'center',
    // marginBottom: 5,
  },
});

export default AppTextInput;
