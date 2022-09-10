//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity,Button } from 'react-native';
import NotifyHeader from './header/NotifyHeader';

// create a component
const StudentDetails = ({route,navigation}) => {
  const {id} = route.params;
  const [profile, setProfile] = useState({});

  // <=============== Course Detail =======>
  const getProfile = async () => {
    axios
      .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/studentdescription/${id}`)
      .then(response => {
        // console.log('techer//',response.data.data[0]);
        setProfile(response.data.data[0]);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);
  const enrollNow = async () => {
    axios
      .post(
        `https://edumatelive.in/studentadmin/newadmin//api/ApiCommonController/teafavuritepost`,{
            teacher_id: profile.id,
          user_id: await AsyncStorage.getItem('user_id')
        },
      )
      .then(response => {
        console.log(response.data);
        // if (
        //   response.data.message == 'success' &&
        //   response.data.message === 'success'
        // ) {
        //   Alert.alert('Enrolled SuccessFully');
        // }
      })
      .catch(error => {
        console.log('####', error.response);
        // console.log(error.response.data.message);
        // if (
        //   error.response.data.message == 'already exists' &&
        //   error.response.data.message === 'already exists'
        // ) {
        //   Alert.alert('You Already Enrolled this Course');
        // } 
      });
  };


    return (
        <View style={styles.container}>
          <NotifyHeader title="PROFILE" navigation={navigation} />
            <View style={styles.profile} >
                <View>
                    <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{uri: `${profile?.image}`}} />
                </View>
                <View >
                    <View style={styles.name}>
                        <Text style={styles.txt}>Name:</Text>
                        <Text style={styles.txt}>{profile?.s_name}</Text>
                    </View>
                    <View style={styles.name}>
                        <Text style={styles.txt}>Subject:</Text>
                        <Text style={styles.txt}>{profile?.subject}</Text>
                    </View>
                    {/* <View style={styles.name}>
                        <Text style={styles.txt}>Experiance:</Text>
                        <Text style={styles.txt}>{profile?.experiance}</Text>
                    </View> */}
                    <View style={styles.name}>
                        {/* <TouchableOpacity style={styles.enrollBtn}>
                            <Button
                                title="FAVORITE"
                                color="black"
                                style={styles.enrollText}
                                onPress={enrollNow}
                            />
                        </TouchableOpacity> */}
                        <TouchableOpacity style={[styles.enrollBtn,]}>
                            <Button
                                title="JOIN BATCH"
                                color="black"
                                style={styles.enrollText}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profile: {
        flexDirection: 'row',
        marginTop: 10
    },
    name: {
        flexDirection: 'row',
        marginHorizontal: 30,
        marginTop: 10
    },
    txt: {
        fontSize: 18, color: '#333', fontWeight: '600'
    },
      enrollBtn: {
        height: 50,
        // backgroundColor: 'yellow',
        width: 100,
        borderRadius: 5,
      },
});

//make this component available to the app
export default StudentDetails;
