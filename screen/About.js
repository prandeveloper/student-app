//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {color} from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import {Icon} from 'react-native-elements';
import CustomHeader from './header/CustomHeader';
import axios from 'axios';

// create a component
const About = ({navigation}) => {
  const [about, setAbout] = useState({});

  useEffect(() => {
    const getAbout = () => {
      axios
        .get(`https://nifty50algo.in/studentadmin/api-fetch-aboutus.php`)
        .then(response => {
          console.log(response.data);
          const about = response.data;
          setAbout(about);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getAbout();
  }, []);

  return (
    <View style={styles.container}>
      <CustomHeader title="ABOUT" navigation={navigation} />
      <ScrollView>
        <View>
          <Text style={styles.aa}>About Us</Text>
          <Text style={styles.bb}>{about?.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  aa: {
    fontSize: 20,
    marginLeft: moderateScale(20),
    color: '#000',
    fontWeight: '500',
    paddingVertical: moderateScale(15),
  },
  bb: {
    marginLeft: moderateScale(20),
    color: 'black',
  },
});

//make this component available to the app
export default About;
