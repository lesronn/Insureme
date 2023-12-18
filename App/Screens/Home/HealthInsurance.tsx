import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SubHeader from '../../Components/SubHeader';
import colors from '../../Config/colors';
import SearchBar from '../../Components/SearchBar';
import PolicyCard from '../../Components/PolicyCard';
import firestore from '@react-native-firebase/firestore';
import {useToast} from 'react-native-toast-notifications';
import PolicyCardSkeleton from '../../Components/PolicyCardSkeleton';
import ErrorComponent from '../../Components/ErrorComponent';
const HealthInsurance = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchLoader, setSearchLoader] = useState<boolean>(false);
  const [policies, setPolicies] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [internetError, setInternetError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const toast = useToast();

  const handleTextChange = (value: string): void => {
    setSearchQuery(value);
    if (value !== '') {
      setSearchLoader(true);
      // Filter policies based on the search query
      const filteredResults = policies.filter((policy: any) =>
        policy?.name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredPolicies(filteredResults);
    } else {
      setSearchLoader(false);
      setFilteredPolicies(policies);
    }
  };
  const fetchPolicies = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('policies')
        .where('policyType', '==', 'Health')
        .get();

      const policiesData: any = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPolicies(policiesData);
      setFilteredPolicies(policiesData);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      setLoading(false);
      erroHandler(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchPolicies();
  }, []);

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

  const renderItem = ({item}: any) => (
    <PolicyCard
      imageUrl={{uri: item.imageUrls[0]}}
      policyName={item.name}
      policyDescription={item.description}
      onPress={() => navigation.navigate('InsuranceDetail', item)}
    />
  );
  return (
    <>
      <SubHeader
        middleText={true}
        title="Health Insurance"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <SearchBar value={searchQuery} onChangeText={handleTextChange} />

        {loading ? (
          <PolicyCardSkeleton />
        ) : internetError ? (
          <ErrorComponent
            source={require('../../Assets/internet.json')}
            message="Network Error"
            subMessage="Please check your internet connection and retry"
            onRetry={() => {
              setLoading(true);
              fetchPolicies();
            }}
          />
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 30,
            }}
            data={filteredPolicies}
            renderItem={renderItem}
            keyExtractor={(item: any) => item?.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  fetchPolicies();
                }}
              />
            }
            ListEmptyComponent={
              <ErrorComponent
                source={require('../../Assets/nocontent.json')}
                message={'No policies Available'}
                onRetry={() => {
                  setLoading(true);
                  fetchPolicies();
                }}
              />
            }
          />
        )}
      </View>
    </>
  );
};

export default HealthInsurance;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primaryBg},
});
