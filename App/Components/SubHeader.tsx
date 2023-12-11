import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import colors from '../Config/Colors';
import AppText from './AppText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../Config/colors';
import {ArrowLeft} from 'iconsax-react-native';

interface SubheaderProps {
  onPress?: () => void;
  title?: string;
  icon?: string;
  secondIconPress?: () => void;
  middleText?: boolean;
}

const SubHeader = ({
  onPress,
  title,
  icon,
  secondIconPress,
  middleText = false,
}: SubheaderProps) => {
  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.white,
          borderBottomColor: '#C0C0C025',
          borderBottomWidth: 4,
        },
      ]}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: '100%',
          width: '20%',
          justifyContent: 'center',
          // backgroundColor: 'red',
        }}>
        <ArrowLeft
          size={30}
          color={colors.primaryText}
          variant="Broken"
          style={{
            transform: [{translateX: middleText ? -5 : 0}],
          }}
        />
        {/* <MaterialCommunityIcons
          name={'keyboard-backspace'}
          size={30}
          color={colors.primaryText}
          style={{transform: [{translateX: middleText ? -5 : 0}]}}
        /> */}
      </TouchableOpacity>
      <View
        style={{paddingRight: middleText && !icon ? '20%' : icon ? '7%' : 0}}>
        <AppText
          fontSize={18}
          fontFamily="Sora-Medium"
          color="primaryText"
          style={styles.headerText}>
          {title}
        </AppText>
      </View>

      {icon ? (
        <TouchableOpacity onPress={secondIconPress}>
          <Ionicons name={icon} size={30} color={colors.primary} />
        </TouchableOpacity>
      ) : middleText ? (
        <View></View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 59,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  headerText: {
    // fontWeight: '600',
  },
});

export default SubHeader;
