import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SubHeader from '../../Components/SubHeader';
import colors from '../../Config/colors';
import {CloseCircle} from 'iconsax-react-native';
import SearchBar from '../../Components/SearchBar';

const HealthInsurance = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchLoader, setSearchLoader] = useState<boolean>(false);

  const handleTextChange = (value: string): void => {
    console.log(value);
    setSearchQuery(value);
    if (value !== '') {
      setSearchLoader(true);
      //   getSearchedNews(`${value}`);
    } else {
      setSearchLoader(false);
    }
  };

  return (
    <>
      <SubHeader
        middleText={true}
        title="Health Insurance"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <SearchBar value={searchQuery} onChangeText={handleTextChange} />
      </View>
    </>
  );
};

export default HealthInsurance;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primaryBg},
});
