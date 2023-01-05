import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import {moderateScale} from 'react-native-size-matters';

export default function ModelScreen({navigation}) {
  const [clases, setClases] = useState('');
  const [univerData, setUniverData] = useState('');
  const [data, setData] = useState([]);
  const [university, setUniversity] = useState([]);
  const [language] = useState(['Student', 'Teacher', 'Both'].sort());

  const getClass = async () => {
    axios
      .get(
        `https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/classsbyid`,
      )
      .then(response => {
        console.log('<<<<<class', response.data.data);
        const res = response.data.data;
        setData(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getUniversity = async () => {
    axios
      .get(
        `https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/universitylistid`,
      )
      .then(response => {
        console.log('<<<<<class', response.data.data);
        const res = response.data.data;
        setUniversity(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getClass();
    getUniversity();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={{width: '30%'}}>
          <Text style={styles.txt}>Class :</Text>
        </View>
        <View style={styles.dropDown}>
          <Picker
            selectedValue={clases}
            onValueChange={itemVal => {
              setClases(itemVal);
            }}>
            {data.map(l => (
              <Picker.Item
                label={l.class}
                value={l.id}
                style={{color: 'black'}}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={{width: '30%'}}>
          <Text style={styles.txt}>University :</Text>
        </View>
        <View style={styles.dropDown}>
          <Picker
            selectedValue={univerData}
            onValueChange={itemVal => {
              setUniverData(itemVal);
            }}>
            {university.map(l => (
              <Picker.Item
                label={l.university}
                value={l.id}
                style={{color: 'black'}}
              />
            ))}
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Search', {clases, univerData})}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>
          Apply
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  dropDown: {
    width: '60%',
    backgroundColor: '#f1f3f6',
    margin: 8,
    alignSelf: 'center',
  },
  txt: {
    color: '#333',
    fontSize: 16,
    fontWeight: '800',
  },
  btn: {
    width: '90%',
    height: 45,
    backgroundColor: 'gray',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 10,
    elevation: 10,
  },
});
