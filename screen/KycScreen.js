import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useCamera} from 'react-native-camera-hooks';
import RNFS from 'react-native-fs';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeader from './header/CustomHeader';

export default function KycScreen({navigation}) {
  //const [checked, setChecked] = useState(0);
  //const [name, setName] = useState('');
  const [gender, setGender] = useState('Male');
  const [date, setDate] = useState('');
  const [national, setNational] = useState('Indian');
  const [aadhar_num, setAadhar_num] = useState('');
  const [gData] = useState(['Male', 'Female', 'Other']);

  //camera
  const [filePath, setFilePath] = useState([]);
  const [frontPhoto, setFrontPhoto] = useState([]);
  const [backPhoto, setBackPhoto] = useState([]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };
  const captureImage = async type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 400,
      maxHeight: 400,
      saveToPhotos: true,
      includeBase64: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        setFilePath(response);
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
    }
  };
  const chooseFrontFile = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 400,
      maxHeight: 400,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      setFrontPhoto(response);
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
  const chooseBackFile = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 400,
      maxHeight: 400,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      setBackPhoto(response);
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
  // <======================Post Kyc ==============>
  function submitKyc() {
    submit();
  }
  const submit = async () => {
    console.log(
      gender,
      date,
      national,
      aadhar_num,
      filePath,
      frontPhoto,
      backPhoto,
    );
    const data = new FormData();
    data.append('gender', gender);
    data.append('dob', date);
    data.append('nationality', national);
    data.append('aadhar_num', aadhar_num);
    data.append('front', frontPhoto.assets[0].base64);
    data.append('back', backPhoto.assets[0].base64);
    data.append('photo', filePath.assets[0].base64);
    fetch(`http://65.0.80.5:5000/api/user/addkycform`, {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'user-token': await AsyncStorage.getItem('user-token'),
      },
      body: data,
    })
      .then(response => {
        response.json().then(res => {
          console.log(res);
          {
            res.message == 'success' && res.message === 'success'
              ? Alert.alert('KYC Done Successfully')
              : null;
          }
          setGender('');
          setDate('');
          setAadhar_num('');
          setFrontPhoto('');
          setBackPhoto('');
          setFilePath('');
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {/* <CustomHeader title="KYC" navigation={navigation} /> */}
      <CustomHeader title="KYC" navigation={navigation} />
      <ScrollView>
        <View style={styles.kyc}>
          {/* <Text style={styles.fieldText}>Name</Text>
          <View style={styles.inputView}>
            <Icon name="user" color="black" size={20} />
            <TextInput
              style={{paddingHorizontal: 12, flex: 1}}
              placeholder="Name"
              textContentType="text"
              placeholderTextColor={'#7A7A81'}
              onChangeText={setName}
              value={name}
              color="black"
            />
          </View> */}
          <View>
            <Text style={styles.fieldText}>Gender</Text>
            <View>
              <Picker
                style={{
                  marginHorizontal: 20,
                  color: 'black',
                  backgroundColor: '#E8E8E8',
                }}
                selectedValue={gender}
                onValueChange={itemValue => setGender(itemValue)}>
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            <View>
              <Text style={styles.fieldText}>Date Of Birth</Text>
              <TouchableOpacity>
                <DatePicker
                  style={{
                    width: '90%',
                    marginLeft: 20,
                    backgroundColor: '#f1f3f6',
                    height: 50,
                  }}
                  date={date}
                  placeholder="Select Date"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={d => setDate(d)}
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                    },
                    dateText: {
                      color: 'black',
                    },
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* date pikar and */}
            <View>
              <Text style={styles.fieldText}>Nationality</Text>
              <View>
                <TextInput
                  disable
                  style={styles.cemra}
                  placeholderTextColor={'#7A7A81'}
                  color="black"
                  textContentType="text"
                  //onChangeText={setNational}
                  value={national}
                />
              </View>
            </View>
            <View>
              <Text style={styles.fieldText}>Aadhar/PAN Number</Text>

              <View>
                <TextInput
                  style={styles.cemra}
                  placeholder=" Type Aadhaar Number"
                  placeholderTextColor={'#7A7A81'}
                  color="black"
                  textContentType="text"
                  onChangeText={setAadhar_num}
                  value={aadhar_num}
                />
              </View>
            </View>
            {/* <CameraKyc getPath={'abcsdaj'} /> */}
            <Text style={styles.fieldText}>Upload Document Image</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.form}
                onPress={() => chooseFrontFile('photo')}>
                <Image
                  style={styles.capture}
                  source={require('../src/upload.png')}
                />

                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'black',
                  }}>
                  Front
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.form}
                onPress={() => chooseBackFile('photo')}>
                <Image
                  style={styles.capture}
                  source={require('../src/upload.png')}
                />
                <Text
                  style={{
                    flex: 1,
                    alignSelf: 'center',
                    color: 'black',
                  }}>
                  Back
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              margin: 20,
            }}>
            Selfie With Id Proof
          </Text>
          <View>
            <TouchableOpacity onPress={() => captureImage('photo')}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
                source={require('../src/camera.png')}
              />
            </TouchableOpacity>
            <View>
              <Text>hhjhjjhj</Text>
            </View>
          </View>
          <Text>{'\n'}</Text>
          <TouchableOpacity style={styles.logbut} onPress={submitKyc}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  kyc: {
    flex: 1,
  },
  fieldText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 20,
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
    marginTop: 20,
    flex: 1,
  },
  capture: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});
