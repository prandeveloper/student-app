import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomHeader from './header/CustomHeader';
import axios from 'axios';

export default function TermsScreen({navigation}) {
  const [terms, setTerms] = useState({});

  useEffect(() => {
    const getTerms = () => {
      axios
        .get(`https://nifty50algo.in/studentadmin/api-fetch-term.php`)
        .then(response => {
          console.log(response.data);
          const terms = response.data;
          setTerms(terms);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getTerms();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <CustomHeader title="TERMS & CONDITION" navigation={navigation} />
      <View style={{flex: 1}}>
        {/* <Text style={styles.heding}>Terms & Conditions</Text> */}
        <Text style={styles.heding2}>{terms?.description}</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  heding: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',

    padding: moderateScale(20),
  },
  heding2: {
    width: scale(320),
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 5,
    color: 'black',
  },
});
