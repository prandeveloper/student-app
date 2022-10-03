import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { ListItem, Avatar } from 'react-native-elements';
import CustomHeader from '../header/CustomHeader';

export default function Batches({ navigation }) {
  const [date, setDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [time, setTime] = useState('');
  const [storeddata, setStoreddata] = useState('');
  const [storeUser_type, setStoreUser_type] = useState('');
  const [batchList, setBatchList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [batchId, setBatchId] = useState('');
  const list = [
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_4815126.jpg',
      subtitle: 'Student',
    },
    {
      name: 'Amy Farha',
      avatar_url:
        'https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png',
      subtitle: 'Student',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_4815126.jpg',
      subtitle: 'Student',
    },
  ];
  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const user_type = await AsyncStorage.getItem('user_type');
      if (user_id !== null) {
        console.log('success');
        console.log(user_id);
        setStoreddata(user_id);
      }
      if (user_type !== null) {
        console.log('success');
        console.log('storeUser_type ????', user_type);
        console.log('storeUser_type ????', storeUser_type);
        setStoreUser_type(user_type);
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  const getBatch = async () => {
    axios
      .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/batchlist11/${storeddata}`)
      .then((response) => {
        console.log("<<<<<aa", response.data.data)
        const list = response.data.data
        setBatchList(list)
        console.log("????????????", list[0].id);
        setBatchId(list[0].id)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getData();
    getBatch();
  }, [storeddata, storeUser_type]);
  const enrollNow = async () => {
    axios
      .post(
        `https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/joinbatch`, {
        user_id: await AsyncStorage.getItem('user_id'),
        batch_id: batchId,
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
    <SafeAreaView >
      <View>
        <CustomHeader title="Batches" navigation={navigation} />
      </View>
      <ScrollView>
      <View >
        {batchList?.map((l, i) => (
          <TouchableOpacity  >
            <ListItem key={i} bottomDivider style={{ marginBottom: 10 }}>
              {/* <Avatar source={{ uri: l.avatar_url }} /> */}
              <ListItem.Content>
                <ListItem.Title>{l.batch_name}</ListItem.Title>
                <ListItem.Subtitle>{l.batch_description}</ListItem.Subtitle>
                <ListItem.Subtitle>{l.start_time}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Content>
                {/* <ListItem.Title>
                  <TouchableOpacity onPress={enrollNow} >
                    <Text style={styles.buttonText}>JOIN BATCH</Text>
                  </TouchableOpacity></ListItem.Title> */}
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>
      
        <View style={styles.mainContainer}>
          <View style={styles.buttonView}>
            {console.log(storeUser_type==="Teacher"?'=<>>>>>>>true':'=>>>>>>>>>>>>false')}
            {storeUser_type === 'Student' ? 
              <View></View>
          :<TouchableOpacity style={styles.buttonTouch} onPress={() => navigation.navigate('BatchesForm')}>
          <Text style={styles.buttonText}>ADD BATCH</Text>
        </TouchableOpacity>}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  date: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: { color: '#000', fontWeight: '600' },
  startText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startDate: {
    backgroundColor: 'silver',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonView: {
    marginVertical: 20,
  },
  buttonTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:40
  },
  buttonText: {
    backgroundColor: 'blue',
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
