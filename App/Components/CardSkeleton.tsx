import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../Config/colors';

const CardSkeleton = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'black', paddingTop: 20}}>
      <View style={[styles.card, {backgroundColor: colors.white}]}>
        <SkeletonPlaceholder>
          <View style={styles.placeholderContainer}>
            <View style={{width: 90, height: 90, borderRadius: 10}} />
            <View
              style={{
                marginLeft: 15,
                justifyContent: 'center',
                width: '80%',
              }}>
              <View style={{width: '90%', height: 15}} />
              <View style={{width: '90%', height: 15, marginTop: 15}} />
              <View style={{width: '50%', height: 15, marginTop: 15}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View style={[styles.card, {backgroundColor: colors.white}]}>
        <SkeletonPlaceholder>
          <View style={styles.placeholderContainer}>
            <View style={{width: 90, height: 90, borderRadius: 10}} />
            <View
              style={{
                marginLeft: 15,
                justifyContent: 'center',
                width: '80%',
              }}>
              <View style={{width: '90%', height: 15}} />
              <View style={{width: '90%', height: 15, marginTop: 15}} />
              <View style={{width: '50%', height: 15, marginTop: 15}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View style={[styles.card, {backgroundColor: colors.white}]}>
        <SkeletonPlaceholder>
          <View style={styles.placeholderContainer}>
            <View style={{width: 90, height: 90, borderRadius: 10}} />
            <View
              style={{
                marginLeft: 15,
                justifyContent: 'center',
                width: '80%',
              }}>
              <View style={{width: '90%', height: 15}} />
              <View style={{width: '90%', height: 15, marginTop: 15}} />
              <View style={{width: '50%', height: 15, marginTop: 15}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View style={[styles.card, {backgroundColor: colors.white}]}>
        <SkeletonPlaceholder>
          <View style={styles.placeholderContainer}>
            <View style={{width: 90, height: 90, borderRadius: 10}} />
            <View
              style={{
                marginLeft: 15,
                justifyContent: 'center',
                width: '80%',
              }}>
              <View style={{width: '90%', height: 15}} />
              <View style={{width: '90%', height: 15, marginTop: 15}} />
              <View style={{width: '50%', height: 15, marginTop: 15}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View style={[styles.card, {backgroundColor: colors.white}]}>
        <SkeletonPlaceholder>
          <View style={styles.placeholderContainer}>
            <View style={{width: 90, height: 90, borderRadius: 10}} />
            <View
              style={{
                marginLeft: 15,
                justifyContent: 'center',
                width: '80%',
              }}>
              <View style={{width: '90%', height: 15}} />
              <View style={{width: '90%', height: 15, marginTop: 15}} />
              <View style={{width: '50%', height: 15, marginTop: 15}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View style={[styles.card, {backgroundColor: colors.white}]}>
        <SkeletonPlaceholder>
          <View style={styles.placeholderContainer}>
            <View style={{width: 90, height: 90, borderRadius: 10}} />
            <View
              style={{
                marginLeft: 15,
                justifyContent: 'center',
                width: '80%',
              }}>
              <View style={{width: '90%', height: 15}} />
              <View style={{width: '90%', height: 15, marginTop: 15}} />
              <View style={{width: '50%', height: 15, marginTop: 15}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>

      <View style={[styles.card, {backgroundColor: colors.white}]}>
        <SkeletonPlaceholder>
          <View style={styles.placeholderContainer}>
            <View style={{width: 90, height: 90, borderRadius: 10}} />
            <View
              style={{
                marginLeft: 15,
                justifyContent: 'center',
                width: '80%',
              }}>
              <View style={{width: '90%', height: 15}} />
              <View style={{width: '90%', height: 15, marginTop: 15}} />
              <View style={{width: '50%', height: 15, marginTop: 15}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

export default CardSkeleton;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  placeholderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
