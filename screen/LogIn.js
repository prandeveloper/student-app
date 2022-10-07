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


import HomeScreen from './HomeScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function LogIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeddata, setStoreddata] = useState('');
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [users, setUsers] = useState('');
  const [storeUser_type, setStoreUser_type] = useState('');

  

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

  const _storeData = async id => {
    console.log("kya aya ?????",users,id);
    try {
      await AsyncStorage.multiSet([['user_type',users],['user_id', id]]);
      console.log('token saved success');
    } catch (error) {
      console.log('Some error in setting token');
    }
  };
  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const user_type = await AsyncStorage.getItem('user_type');
      if (user_id !== null) {
        console.log('success');
        console.log(user_id);
        setStoreddata(user_id);
        // navigation.replace('Home');
      }
      if (user_type !== null) {
        console.log('success');
        console.log(user_type);
        setStoreUser_type(user_type);
        navigation.replace('Home');
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  useEffect(() => {
    getData();
  }, [storeddata,storeUser_type]);
  const signIn = (email, password,users) => {
    console.log(email, password,users);
    axios
      .post(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/user_loginbypassword`, {
        email: email,
        password: password,
        users:users
      })
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.message);
        if (response.data.message === 'success' || response.data.message == 'success') {
          ToastAndroid.show('Login Successfull....', ToastAndroid.SHORT);
        }

        console.log(response.data.data.id);

        if (response.data.data.id != null) {
          _storeData(response.data.data.id);
          navigation.replace('Home');
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
            Sign In
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
          <Icon name="lock" color="black" size={20} />
          <TextInput
            style={{flex: 1, paddingHorizontal: 12}}
            placeholder={'password'}
            secureTextEntry={passwordSecured}
            onChangeText={setPassword}
            value={password}
            placeholderTextColor="#003f5c"
            color="black"
          />
          <TouchableOpacity
            style={{padding: 4}}
            onPress={() => {
              setPasswordSecured(!passwordSecured);
            }}>
            <Icon name="eye" color="black" size={20} />
          </TouchableOpacity>
        </View>
        <View  style={{ width: '90%',
    height: 55,
    backgroundColor: '#f1f3f6',justifyContent:'center',alignSelf:'center',marginTop:15,marginLeft:5}}>
          {/* <Icon name="lock" color="black" size={20} /> */}
          <Picker
            selectedValue={users}
            onValueChange={(itemVal) => {
              setUsers(itemVal);
            }}
          >
            {
              language.map((l) => (
                <Picker.Item label={l} value={l} style={{ color: 'black' }} />
              ))
            }

          </Picker>
        </View>
       
        <Text>{'\n'}</Text>

        

        <View style={{height: 130}}>
          <TouchableOpacity
            style={styles.logbut}
            onPress={() => {
              signIn(email, password,users);
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{}}>
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
        <TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')} >
        <Text style={{color: '#333', fontWeight: 'bold', fontSize: 15,alignSelf:'center'}}>
            forgot password
          </Text>
        </TouchableOpacity>
        </View>
      </View>
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
});
