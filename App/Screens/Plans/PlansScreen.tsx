import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {Notification1} from 'iconsax-react-native';
import colors from '../../Config/colors';
import AppText from '../../Components/AppText';
import CustomSwitch from '../../Components/CustomSwitch';
import PlanCard from '../../Components/PlanCard';
import ImageLoader from '../../Components/ImageLoader';
import FastImage from 'react-native-fast-image';
import {AuthContext} from '../../Config/AuthContext';
import firestore from '@react-native-firebase/firestore';
import DateFunctions from '../../Utils/DateFunctions';
import CardSkeleton from '../../Components/CardSkeleton';
import ErrorComponent from '../../Components/ErrorComponent';
import {useToast} from 'react-native-toast-notifications';

const PlansScreen = ({navigation}: any) => {
  const [swicthContent, setSwitchContent] = useState(1);
  const {setUser, user} = useContext(AuthContext);
  const [acceptedPolicies, setAcceptedPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [internetError, setInternetError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const toast = useToast();
  const onSelectSwitch = (value: any) => {
    setSwitchContent(value);
    console.log(value);
    if (value === 2) {
      setAcceptedPolicies([]);
      setLoading(true);
      fetchAcceptedPolicies('declined');
    } else if (value === 1) {
      setAcceptedPolicies([]);
      setLoading(true);
      fetchAcceptedPolicies('accepted');
    }
  };

  const fetchAcceptedPolicies = async (status: string) => {
    try {
      // Perform a query to get accepted policies for the specified user
      const querySnapshot = await firestore()
        .collection('userPolicies')
        .where('user.uid', '==', user.uid) // Replace 'userId' with the actual field name containing the user ID
        .where('status', '==', status)
        .get();
      // Map the retrieved documents to an array
      const policies: any = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(policies);
      setRefreshing(false);
      setAcceptedPolicies(policies);
      setLoading(false);
    } catch (error: any) {
      setRefreshing(false);
      setLoading(false);
      erroHandler(error);

      console.error('Error fetching accepted policies:', error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchAcceptedPolicies('accepted');
  }, []);
  const renderItem = ({item}: any) => {
    // console.log(item.policy.imageUrls[0]);
    return (
      <PlanCard
        headline={item.policy.name}
        time={DateFunctions.formatDate(item.signedUpAt)}
        imageUrl={item.policy.imageUrls[0]}
      />
    );
  };

  const erroHandler = (error: any) => {
    // console.log('Error getting news data: ', error);
    if (error.code && error.code === 'firestore/unavailable') {
      console.log('internet Error');
      setInternetError(true);
    } else {
      toast.show('Something went wrong. Please try again.', {
        type: 'normal',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
  };
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileContainer}>
          <ImageLoader
            containerStyle={{borderRadius: 8, height: 40, width: 40}}
            source={{
              uri: user.profilePicture,
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.immutable,
            }}
            style={{height: 40, width: 40, borderRadius: 8}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={require('../../Assets/logosmall.png')} />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Notification')}
          style={styles.actionBtnContainer}>
          <Notification1
            size={30}
            color={colors.primaryText}
            variant="Broken"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{backgroundColor: colors.primaryBg}}>
          <CustomSwitch selectionMode={1} onSelectSwitch={onSelectSwitch} />
        </View>
        {swicthContent === 1 ? (
          <>
            {loading ? (
              <CardSkeleton />
            ) : internetError ? (
              <ErrorComponent
                source={require('../../Assets/internet.json')}
                message="Network Error"
                subMessage="Please check your internet connection and retry"
                onRetry={() => {
                  setLoading(true);
                  fetchAcceptedPolicies('accepted');
                }}
              />
            ) : (
              <FlatList
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  // paddingVertical: 20,
                }}
                data={acceptedPolicies}
                renderItem={renderItem}
                scrollEnabled
                keyExtractor={(item: any) => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                      setRefreshing(true);
                      fetchAcceptedPolicies('accepted');
                    }}
                  />
                }
                ListEmptyComponent={
                  <ErrorComponent
                    source={require('../../Assets/nocontent.json')}
                    message={'No  policies Available'}
                    onRetry={() => {
                      setLoading(true);
                      fetchAcceptedPolicies('accepted');
                    }}
                  />
                }
              />
            )}
          </>
        ) : swicthContent === 2 ? (
          <>
            {loading ? (
              <CardSkeleton />
            ) : internetError ? (
              <ErrorComponent
                source={require('../../Assets/internet.json')}
                message="Network Error"
                subMessage="Please check your internet connection and retry"
                onRetry={() => {
                  setLoading(true);
                  fetchAcceptedPolicies('declined');
                }}
              />
            ) : (
              <FlatList
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  // paddingVertical: 20,
                }}
                data={acceptedPolicies}
                renderItem={renderItem}
                scrollEnabled
                keyExtractor={(item: any) => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => {
                      setRefreshing(true);
                      fetchAcceptedPolicies('declined');
                    }}
                  />
                }
                ListEmptyComponent={
                  <ErrorComponent
                    source={require('../../Assets/nocontent.json')}
                    message={'No declined policies Available'}
                    onRetry={() => {
                      setLoading(true);
                      fetchAcceptedPolicies('declined');
                    }}
                  />
                }
              />
            )}
          </>
        ) : null}
      </View>
    </>
  );
};

export default PlansScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBg,
  },
  header: {
    height: 59,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: colors.white,
  },
  profileContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtnContainer: {
    flex: 1,
    // backgroundColor: 'black',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
