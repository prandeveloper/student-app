import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import CustomHeader from '../header/CustomHeader';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteTeacher = ({navigation}) => {
  const [storeddata,setStoreddata] = useState('')
  const [favList,setFavList] = useState([])
  const list = [
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_4815126.jpg',
      subtitle: 'Teacher',
    },
    {
      name: 'Amy Farha',
      avatar_url:
        'https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png',
      subtitle: 'Teacher',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_4815126.jpg',
      subtitle: 'Teacher',
    },
  ];
  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        console.log('@@@@@@@@', user_id);
        setStoreddata(user_id);
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  const getBatch = async () => {
    axios
      .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/favlistteacher/${storeddata}`)
      .then((response) => {
        console.log("<<<<<aa", response.data.data)
        const list = response.data.data
        setFavList(list)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getData();
    getBatch();
  }, [storeddata]);
  return (
    <SafeAreaView>
      <View>
        <CustomHeader title="FAVORITE TEACHER" navigation={navigation} />
      </View>
      <View>
        <View>
          {favList?.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar source={{uri: l.image}} />
              <ListItem.Content>
                <ListItem.Title>{l.s_name}</ListItem.Title>
                {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FavoriteTeacher;

const styles = StyleSheet.create({});
