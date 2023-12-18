import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import colors from '../Config/colors';

const PolicyCardSkeleton = () => {
  return (
    <View style={{flex: 1, paddingTop: 20}}>
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
              <View style={{width: '90%', height: 40, marginTop: 15}} />
              <View
                style={{
                  width: '40%',
                  height: 30,
                  marginTop: 15,
                  alignSelf: 'flex-end',
                }}
              />
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
              <View style={{width: '90%', height: 40, marginTop: 15}} />
              <View
                style={{
                  width: '40%',
                  height: 30,
                  marginTop: 15,
                  alignSelf: 'flex-end',
                }}
              />
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
              <View style={{width: '90%', height: 40, marginTop: 15}} />
              <View
                style={{
                  width: '40%',
                  height: 30,
                  marginTop: 15,
                  alignSelf: 'flex-end',
                }}
              />
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
              <View style={{width: '90%', height: 40, marginTop: 15}} />
              <View
                style={{
                  width: '40%',
                  height: 30,
                  marginTop: 15,
                  alignSelf: 'flex-end',
                }}
              />
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
              <View style={{width: '90%', height: 40, marginTop: 15}} />
              <View
                style={{
                  width: '40%',
                  height: 30,
                  marginTop: 15,
                  alignSelf: 'flex-end',
                }}
              />
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
              <View style={{width: '90%', height: 40, marginTop: 15}} />
              <View
                style={{
                  width: '40%',
                  height: 30,
                  marginTop: 15,
                  alignSelf: 'flex-end',
                }}
              />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

export default PolicyCardSkeleton;

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
