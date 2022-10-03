import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import OTPInputView from '@twotalltotems/react-native-otp-input';



import HomeScreen from './HomeScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function OtpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeddata, setStoreddata] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [users, setUsers] = useState('');
  const [storeUser_type, setStoreUser_type] = useState('');
  const [code, setCode] = useState('');


  

  const [language] = useState(
    [
      'Student',
      'Teacher',
      'Both',
    ].sort()
  );

  function showToast() {
    ToastAndroid.show('Wrong Email or Password', ToastAndroid.SHORT);
  }

  const signIn = (email,code) => {
    console.log(email,code);
    axios
      .post(` https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/verify_Forgot_otp`, {
        email: email,
        otp: code,
      })
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.message);
        if (response.data.message === 'success' || response.data.message == 'success') {
          ToastAndroid.show('Login Successfull....', ToastAndroid.SHORT);
        }

        console.log(response.data);

        if (response.data != null) {
          navigation.replace('ConfirnPassword');
        } else {
          console.log('no id!');
        }
      })
      .catch(function (error) {
        console.log(error.response.data);
        if (
          error.response.data.message == 'User Doesnot Exist' ||
          error.response.data.message === 'User Doesnot Exist'
        ) {
          showToast();
        }
      });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={{}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            height: 150,
          }}>
          <Text
            style={{
              margin: 10,
              fontSize: 38,
              fontWeight: 'bold',
              color: 'black',
            }}>
           Enter Otp
          </Text>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
            margin: 20,
          }}></Text>
        <View style={styles.inputView}>
          <Icon name="envelope" color="black" size={20} />
          <TextInput
            style={{flex: 1, paddingHorizontal: 12}}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            textContentType="emailAddress"
            color="black"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 15,
            fontWeight: 'bold',
          }}></Text>
        <View style={styles.inputView}>
          {/* <Icon name="envelope" color="black" size={20} /> */}
          <OTPInputView
                  style={{width: '100%', height: 50}}
                  onCodeChanged={setCode}
                  pinCount={6}
                  autoFocusOnLoad
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
                  }}
                />
        </View>
       
        <Text>{'\n'}</Text>

        

        <View style={{height: 130}}>
          <TouchableOpacity
            style={styles.logbut}
            onPress={() => {
              signIn(email,code);
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Register', {name: 'Register'})}>
          <Text style={{margin: 8, color: 'black'}}>
            Don't Have An Account?
          </Text>
          <Text style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>
            Create an Account
          </Text>
        </TouchableOpacity>
        <View>
        <TouchableOpacity>
        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 15,alignSelf:'center'}}>
            forgot password
          </Text>
        </TouchableOpacity>
        </View>
      </View> */}
    </ScrollView>
  );
}
const myTabs = ({navigation, route}) => {
  return;
};
const Register = ({navigation, route}) => {
  return;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  inputView: {
    width: '90%',
    height: 55,
    backgroundColor: '#f1f3f6',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  logbut: {
    width: '90%',
    height: 45,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 10,
    elevation: 10,
  },
  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderWidth: 2,
    borderRadius: 5,
    color: '#333',
    fontFamily: 'Roboto-Medium',
    borderColor: '#333',
  },

  underlineStyleHighLighted: {
    color: '#333',
  },
});
