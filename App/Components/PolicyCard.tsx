import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import colors from '../Config/colors';
import AppText from './AppText';
import {TouchableOpacity} from 'react-native-gesture-handler';
interface PolicyCardProps {
  policyName: string;
  policyDescription: string;
  imageUrl?: any;
  onPress?: () => void;
}
const PolicyCard: React.FC<PolicyCardProps> = ({
  policyName,
  policyDescription,
  imageUrl,
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.contentWrapper}>
        <FastImage
          source={imageUrl}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <AppText fontFamily="Sora-Bold" numberOfLines={2} fontSize={18}>
            {policyName}
          </AppText>

          <AppText
            style={{paddingTop: 10}}
            fontFamily="Sora-Medium"
            numberOfLines={3}
            fontSize={16}>
            {policyDescription}
          </AppText>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <AppText fontSize={15} fontFamily="Sora-Bold" color="primary">
          Learn More
        </AppText>
      </TouchableOpacity>
    </Pressable>
  );
};

export default PolicyCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 'auto',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  image: {
    height: 100,
    width: 100,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: colors.light,
    borderWidth: 1,
  },
  contentWrapper: {
    flexDirection: 'row',
  },
  textContainer: {
    paddingVertical: 15,
    paddingLeft: 15,
    flex: 1,
  },
  btn: {
    backgroundColor: colors.secondaryBtn,
    width: 'auto',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});
