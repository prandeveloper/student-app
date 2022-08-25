import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
  Button,
  ActionSheetIOS,
} from 'react-native';
import CustomHeader from './header/CustomHeader';
import Moment from 'react-moment';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Messaging({navigation, route}) {
  const {id} = route.params;
  console.log(id);
  const [currentUser] = useState({
    name: 'John Doe',
  });

  setInterval(() => {
    getChat();
  }, 50000);
  const getTeacher = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/user/getone_student_chat/${id}`)
      .then(response => {
        console.log(response.data.data.msg_receiver.fullname);
        setOneTeacher(response.data.data);
      })
      .catch(error => {
        //console.log(error);
      });
  };
  const getChat = async () => {
    axios
      .get(`http://65.0.80.5:5000/api/user/mychatwith_tchr/${id}`, {
        headers: {
          'user-token': await AsyncStorage.getItem('user-token'),
        },
      })
      .then(response => {
        //console.log(response.data.data);
        setMessages(response.data.data);
      })
      .catch(error => {
        //console.log(error);
      });
  };
  useEffect(() => {
    getTeacher();
    getChat();
  }, []);

  const sendMsg = async () => {
    //console.log(inputMessage);
    axios
      .post(
        `http://65.0.80.5:5000/api/user/addchat/${id}`,
        {
          msg: inputMessage,
        },
        {
          headers: {
            'user-token': await AsyncStorage.getItem('user-token'),
          },
        },
      )
      .then(response => {
        //console.log(response.data);
        getChat();
        setInputMessage('');
      })
      .catch(error => {
        //console.log(error.response);
      });
  };

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [oneTeacher, setOneTeacher] = useState({});

  function getTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  function CustomHeader({title, navigation}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: 'white',
          marginBottom: 5,
        }}>
        <View style={{flex: 1, justifyContent: 'center', marginLeft: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-left" color="black" size={22} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: oneTeacher?.msg_receiver?.image}}
            style={{width: 40, height: 40, borderRadius: 30}}
          />
        </View>
        <View
          style={{flex: 3, justifyContent: 'center', alignItems: 'flex-start'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: 18,
              color: 'black',
            }}>
            {oneTeacher?.msg_receiver?.fullname}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <CustomHeader navigation={navigation} />
        <FlatList
          style={{backgroundColor: 'white'}}
          inverted={true}
          data={JSON.parse(JSON.stringify(messages)).reverse()}
          renderItem={({item}) => (
            <TouchableWithoutFeedback>
              <View style={{marginTop: 6}}>
                <View
                  style={{
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    backgroundColor: 'black',
                    alignSelf:
                      item.sender === currentUser.name
                        ? 'flex-end'
                        : 'flex-start',
                    marginHorizontal: 10,
                    padding: 10,
                    borderRadius: 8,
                    borderBottomLeftRadius:
                      item.sender === currentUser.name ? 8 : 0,
                    borderBottomRightRadius:
                      item.sender === currentUser.name ? 0 : 8,
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                    }}>
                    {item.msg}
                  </Text>
                  <Text
                    style={{
                      color: '#dfe4ea',
                      fontSize: 14,
                      alignSelf: 'flex-end',
                    }}>
                    <Moment element={Text} fromNow>
                      {item.createdAt}
                    </Moment>
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />

        <View style={{paddingVertical: 10}}>
          <View style={styles.messageInputView}>
            {/* <TouchableOpacity style={{alignSelf: 'center'}}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../src/image-gallery.png')}
                resizeMode="contain"
              />
            </TouchableOpacity> */}
            <TextInput
              defaultValue={inputMessage}
              style={styles.messageInput}
              placeholder="Message"
              onChangeText={text => setInputMessage(text)}
              value={inputMessage}
              placeholderTextColor="#003f5c"
              color="black"
            />
            <TouchableOpacity
              style={styles.messageSendView}
              onPress={() => {
                sendMsg();
              }}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../src/send.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileImage: {height: '100%', aspectRatio: 1, borderRadius: 100},
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 14,
    backgroundColor: '#f1f3f6',
    borderRadius: 4,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});
