import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../Config/colors';
import AppText from './AppText';

const PasswordInput = ({color, onChange, onBlur, value, error}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <AppText
        fontFamily="Sora-Medium"
        style={{paddingBottom: 8, paddingTop: 2}}
        fontSize={18}
        color="medium">
        Password
        <Text style={{color: 'red', fontSize: 18, lineHeight: 18}}> *</Text>
      </AppText>
      <View style={[styles.container, {borderColor: color}]}>
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          placeholder="Enter Password"
          placeholderTextColor={colors.placeholderTextColor}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.icon}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color={colors.primaryText}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 55,
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontFamily: 'Sora-Medium',
  },
  errorInput: {
    borderColor: 'red',
  },
  icon: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default PasswordInput;
