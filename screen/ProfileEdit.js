import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-datepicker';
import { useCamera } from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomHeader from './header/CustomHeader';
// import {MultiSelect} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MultiSelect } from 'react-native-element-dropdown';

const DATA = [
  { label: 'React Naive', value: '1' },
  { label: 'Javascript', value: '2' },
  { label: 'Laravel', value: '3' },
  { label: 'PHP', value: '4' },
  { label: 'jQuery', value: '5' },
  { label: 'Bootstrap', value: '6' },
  { label: 'HTML', value: '7' },
  { label: 'CSS', value: '8' },
];

export default function ProfileEdit({ navigation }) {
  const [user, setUser] = useState({});
  const [passwordSecured, setPasswordSecured] = useState(true);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [singleFile, setSingleFile] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [Subject, setSubject] = useState('');
  const [selected, setSelected] = useState([]);
  const [storeProfile, setStoreProfile] = useState('');
  const [showData, setShowData] = useState([]);
  const [storeUser_type, setStoreUser_type] = useState('');


  const renderDataItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.subject_name}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
    );
  };

  const getDropData = async () => {
    axios
      .get(
        'https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/subjectlistget',
      )
      .then(response => {
        // console.log("drop data//////",response.data.data);
        const drop = response.data.data;
        setShowData(drop);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getDropData();
  }, []);

  const getDataProfile = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const user_type = await AsyncStorage.getItem('user_type');
      if (user_id !== null) {
        console.log('@@@@@@@@', user_id);
        setStoreProfile(user_id);
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
  const getUser = async () => {
    axios
      .get(
        `https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/usersingledata/${storeProfile}`,
      )
      .then(response => {
        console.log('edit profile ///////', response.data.data);
        const user = response.data.data;
        {
          setFullname(user[0].s_name);
          setEmail(user[0].email);
          setMobile(user[0].phone);
          setPassword(user[0].password);
          setConfirmPassword(user[0].cpassword);
          setAddress(user[0].address);
          setCity(user[0].city);
          setEducation(user[0].education);
          setExperience(user[0].experience);
          setState(user[0].state);
        }
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getDataProfile();
    getUser();
  }, [storeProfile]);

  const chooseFrontFile = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 100,
      maxHeight: 100,
      selectionLimit: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('response : ' + JSON.stringify(response));
      setSingleFile(response);
      console.log(response.assets[0].base64);
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
    });
  };

  // // <=========== Edit Profile ================>
  function editProfile() {
    handleSubmit();
  }
  const handleSubmit = async () => {
    console.log(
      singleFile.assets[0].base64,
      fullname,
      email,
      mobile,
      password,
      education,
      selected,
      city,
      state,
      experience
    );
    const data = new FormData();
    data.append('s_name', fullname);
    data.append('email', email);
    data.append('phone', mobile);
    data.append('password', password);
    data.append('cpassword', confirmPassword);
    data.append('address', address);
    data.append('city', city);
    data.append('state', state);
    data.append('experience', experience);
    data.append('education', education);
    data.append('Subject', JSON.stringify(selected));
    data.append('image', singleFile.assets[0].base64);

    fetch(
      `https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/profileuser`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          id: await AsyncStorage.getItem('user_id'),
        },
        body: data,
      },
    )
      .then(response => {
        response.json().then(res => {
          console.log(res);
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <CustomHeader title="PROFILE" navigation={navigation} />
      {storeUser_type === 'Student' ?
        <ScrollView>
          <View>
            <View style={styles.inputView}>
              <Icon name="user" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="Full Name"
                onChangeText={setFullname}
                value={fullname}
                textContentType="text"
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="default"
              />
            </View>

            <View style={styles.inputView}>
              <Icon name="envelope" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="Email"
                textContentType="Email"
                onChangeText={setEmail}
                value={email}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputView}>
              <Icon name="phone" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="Mobile"
                textContentType="telephoneNumber"
                onChangeText={setMobile}
                value={mobile}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputView}>
              <Icon name="lock" color="black" size={20} />
              <TextInput
                style={{ flex: 1, paddingHorizontal: 12 }}
                placeholder={'password'}
                secureTextEntry={passwordSecured}
                onChangeText={setPassword}
                value={password}
                textContentType="password"
                placeholderTextColor={'#7A7A81'}
                color="black"
              />
              <TouchableOpacity
                style={{ padding: 4 }}
                onPress={() => {
                  setPasswordSecured(!passwordSecured);
                }}>
                <Icon name="eye" color="black" size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputView}>
              <Icon name="lock" color="black" size={20} />
              <TextInput
                style={{ flex: 1, paddingHorizontal: 12 }}
                placeholder={'confirm password'}
                secureTextEntry={passwordSecured}
                textContentType="password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholderTextColor={'#7A7A81'}
                color="black"
              />
              <TouchableOpacity
                style={{ padding: 4 }}
                onPress={() => {
                  setPasswordSecured(!passwordSecured);
                }}>
                <Icon name="eye" color="black" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <Icon name="vcard" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="Area"
                textContentType="Email"
                onChangeText={setAddress}
                value={address}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputView}>
              <Icon name="vcard" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="State"
                textContentType="Email"
                onChangeText={setState}
                value={state}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputView}>
              <Icon name="vcard" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="City"
                textContentType="Email"
                onChangeText={setCity}
                value={city}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View>
            {/* <View style={styles.inputView}>
              <Icon name="vcard" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="experience"
                textContentType="Email"
                onChangeText={setExperience}
                value={experience}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputView}>
              <Icon name="vcard" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="Education"
                textContentType="Email"
                onChangeText={setEducation}
                value={education}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View> */}
            <View style={styles.inputView1}>
              {/* <Icon name="vcard" color="black" size={20} /> */}
              {/* <View style={{width: '100%', marginTop: 20}}>
              <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={showData}
                labelField="subject_name"
                valueField="value"
                placeholder="Select Subject"
                value={selected}
                search
                searchPlaceholder="Search..."
                onChange={item => {
                  setSelected(item);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color="black"
                    name="Safety"
                    size={20}
                  />
                )}
                renderItem={renderDataItem}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View style={styles.selectedStyle}>
                      <Text style={styles.textSelectedStyle}>
                        {item.subject_name}
                      </Text>
                      <AntDesign color="black" name="delete" size={17} />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View> */}
            </View>
            <View style={styles.imagetext}>
              <Text style={styles.textimage}>Upload Image</Text>
            </View>
            <View style={styles.inputImage}>
              <View style={styles.inputimage1}>
                <TouchableOpacity style={{ padding: 4 }} onPress={chooseFrontFile}>
                  <Icon name="camera" color="black" size={20} />
                </TouchableOpacity>
              </View>
              {singleFile != '' &&
                singleFile != undefined &&
                singleFile != null ? (
                <View style={styles.inputimage2}>
                  <Text style={{ color: 'black' }}>
                    {singleFile.assets[0].fileName}
                  </Text>
                </View>
              ) : (
                <View style={styles.inputimage2}>
                  <Text style={{ color: 'black' }}>Upload Image</Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.logbut} onPress={editProfile}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
          <Text>{'\n'}</Text>
        </ScrollView>

        :

        <ScrollView>
          <View>
            <View style={styles.inputView}>
              <Icon name="user" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="Full Name"
                onChangeText={setFullname}
                value={fullname}
                textContentType="text"
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="default"
              />
            </View>

            <View style={styles.inputView}>
              <Icon name="envelope" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="Email"
                textContentType="Email"
                onChangeText={setEmail}
                value={email}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputView}>
              <Icon name="phone" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="Mobile"
                textContentType="telephoneNumber"
                onChangeText={setMobile}
                value={mobile}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputView}>
              <Icon name="lock" color="black" size={20} />
              <TextInput
                style={{ flex: 1, paddingHorizontal: 12 }}
                placeholder={'password'}
                secureTextEntry={passwordSecured}
                onChangeText={setPassword}
                value={password}
                textContentType="password"
                placeholderTextColor={'#7A7A81'}
                color="black"
              />
              <TouchableOpacity
                style={{ padding: 4 }}
                onPress={() => {
                  setPasswordSecured(!passwordSecured);
                }}>
                <Icon name="eye" color="black" size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputView}>
              <Icon name="lock" color="black" size={20} />
              <TextInput
                style={{ flex: 1, paddingHorizontal: 12 }}
                placeholder={'confirm password'}
                secureTextEntry={passwordSecured}
                textContentType="password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholderTextColor={'#7A7A81'}
                color="black"
              />
              <TouchableOpacity
                style={{ padding: 4 }}
                onPress={() => {
                  setPasswordSecured(!passwordSecured);
                }}>
                <Icon name="eye" color="black" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputView}>
              <Icon name="vcard" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="Area"
                textContentType="Email"
                onChangeText={setAddress}
                value={address}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputView}>
              <Icon name="vcard" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="State"
                textContentType="Email"
                onChangeText={setState}
                value={state}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputView}>
              <Icon name="vcard" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="City"
                textContentType="Email"
                onChangeText={setCity}
                value={city}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputView}>
              <Icon name="vcard" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="experience"
                textContentType="Email"
                onChangeText={setExperience}
                value={experience}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputView}>
              <Icon name="vcard" color="black" size={20} />
              <TextInput
                style={{ paddingHorizontal: 12, flex: 1 }}
                placeholder="Education"
                textContentType="Email"
                onChangeText={setEducation}
                value={education}
                placeholderTextColor={'#7A7A81'}
                color="black"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputView1}>
              {/* <Icon name="vcard" color="black" size={20} /> */}
              <View style={{ width: '100%', marginTop: 20 }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={showData}
                  labelField="subject_name"
                  valueField="subject_name"
                  placeholder="Select Subject"
                  value={selected}
                  search
                  searchPlaceholder="Search..."
                  onChange={item => {
                    setSelected(item);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color="black"
                      name="Safety"
                      size={20}
                    />
                  )}
                  renderItem={renderDataItem}
                  renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                      <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>
                          {item.subject_name}
                        </Text>
                        <AntDesign color="black" name="delete" size={17} />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
            <View style={styles.imagetext}>
              <Text style={styles.textimage}>Upload Image</Text>
            </View>
            <View style={styles.inputImage}>
              <View style={styles.inputimage1}>
                <TouchableOpacity style={{ padding: 4 }} onPress={chooseFrontFile}>
                  <Icon name="camera" color="black" size={20} />
                </TouchableOpacity>
              </View>
              {singleFile != '' &&
                singleFile != undefined &&
                singleFile != null ? (
                <View style={styles.inputimage2}>
                  <Text style={{ color: 'black' }}>
                    {singleFile.assets[0].fileName}
                  </Text>
                </View>
              ) : (
                <View style={styles.inputimage2}>
                  <Text style={{ color: 'black' }}>Upload Image</Text>
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.logbut} onPress={editProfile}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
                Update
              </Text>
            </TouchableOpacity>
          </View>
          <Text>{'\n'}</Text>
        </ScrollView>
      }
    </View>
  );
}
// const Login = ({navigation, route}) => {
//   return;
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputView: {
    marginTop: 20,
    width: '100%',
    height: 55,
    backgroundColor: '#f1f3f6',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
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
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f6',
    height: 55,
    width: '90%',
    marginLeft: 20,
  },
  chosepht: {
    backgroundColor: '#f1f3f6',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  state: {
    backgroundColor: '#f1f3f6',
    width: '90%',
    height: 50,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cemra: {
    backgroundColor: '#f1f3f6',
    width: '90%',
    height: 50,
    marginLeft: 20,
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  form: {
    backgroundColor: '#f1f3f6',
    height: 100,
    width: '50%',
    margin: 10,
    flex: 1,
  },
  inputImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  inputimage1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 100,
  },
  inputimage2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  imagetext: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  textimage: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  dropdown: {
    height: 55,
    backgroundColor: '#f1f3f6',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#f1f3f6',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
