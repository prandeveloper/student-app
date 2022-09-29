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
      .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/batchlistbyuserid/${storeddata}`)
      .then((response) => {
        console.log("<<<<<aa", response.data.data)
        const list = response.data.data
        setBatchList(list)
        console.log("????????????",list[0].id);
        setBatchId(list[0].id)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getData();
    getBatch();
  }, [storeddata]);
  const enrollNow = async () => {
    axios
      .post(
        `https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/joinbatch`,{
          user_id: await AsyncStorage.getItem('user_id'),
          batch_id:batchId,
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
    <SafeAreaView>
      <View>
        <CustomHeader title="Batches" navigation={navigation} />
      </View>
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
                <ListItem.Title>
                  <TouchableOpacity onPress={enrollNow} >
              <Text style={styles.buttonText}>JOIN BATCH</Text>
            </TouchableOpacity></ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView>
        <View style={styles.mainContainer}>
          {/* <View style={styles.date}>
            <View style={styles.startText}>
              <Text style={styles.dateText}>START DATE</Text>
            </View>
            <View style={styles.startDate}>
              <DatePicker
                style={{width: 180}}
                date={date}
                placeholder=""
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={d => setDate(d)}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    right: 5,

                    height: 18,
                  },
                  dateInput: {
                    marginLeft: 5,
                    borderWidth: 0,
                    //borderBottomWidth: 2,
                    marginBottom: 5,
                  },
                }}
              />
            </View>
          </View>
          <View style={styles.date}>
            <View style={styles.startText}>
              <Text style={styles.dateText}>END DATE</Text>
            </View>
            <View style={styles.startDate}>
              <DatePicker
                style={{width: 180}}
                date={date}
                placeholder=""
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={d => setDate(d)}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    right: 5,

                    height: 18,
                  },
                  dateInput: {
                    marginLeft: 5,
                    borderWidth: 0,
                    //borderBottomWidth: 2,
                    marginBottom: 5,
                  },
                }}
              />
            </View>
          </View>
          <View style={styles.date}>
            <View style={styles.startText}>
              <Text style={styles.dateText}>START TIME</Text>
            </View>
            <View style={styles.startDate}>
              <TextInput
                placeholder="End Time"
                keyboardType="ascii-capable"
                value={endTime}
                onChange={setEndTime}
              />
            </View>
          </View>
          <View style={styles.date}>
            <View style={styles.startText}>
              <Text style={styles.dateText}>END TIME</Text>
            </View>
            <View style={styles.startDate}>
              <TextInput
                placeholder="End Time"
                keyboardType="ascii-capable"
                value={endTime}
                onChange={setEndTime}
              />
            </View>
          </View>
          <View style={styles.date}>
            <View style={styles.startText}>
              <Text style={styles.dateText}>SUBJECT</Text>
            </View>
            <View style={styles.startDate}>
              <Picker
                style={{width: 200}}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                <Picker.Item label="English" value="english" />
                <Picker.Item label="Hindi" value="hindi" />
              </Picker>
            </View>
          </View> */}
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonTouch} onPress={() => navigation.navigate('BatchesForm')}>
              <Text style={styles.buttonText}>ADD BATCH</Text>
            </TouchableOpacity>
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
    marginVertical: 30,
  },
  buttonTouch: {
    justifyContent: 'center',
    alignItems: 'center',
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
