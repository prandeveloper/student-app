import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import CustomHeader from '../header/CustomHeader';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';


const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export default function BatchesForm({ navigation }) {
  const [date, setDate] = useState('');
  const [end_date, setEnd_date] = useState('');
  const [endTime, setEndTime] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [batchName, setBatchName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selected, setSelected] = useState([]);

  const AddBatch = async () => {
    console.log('data.....',date,end_date,time,endTime,selectedLanguage,batchName,description);
    axios
      .post(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/postbatch`, {
        start_date: date,
        end_date: end_date,
        start_time: time,
        end_time: endTime,
        subject: selectedLanguage,
        batch_name:batchName,
        batch_description:description,
        user_id: await AsyncStorage.getItem('user_id')
      })
      .then(response => {
        console.log('@@@@@', response.data);
        // if (response.data.message === "data Send successfully.") {
        //   setModalVisible(true)
        // } else {
        //   Alert.alert("error.");
        // }
      })
      .catch(error => {
        console.log(error);
      });
  };
  // const AddBatch = async () => {
  //   try {
  //     const res = await axios.post(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/postbatch`,{
  // start_date:date,
  // end_date:end_date,
  // start_time:time,
  // end_time:endTime,
  // subject:selectedLanguage
  //     }, {
  //       headers: {
  //         'user_id': await AsyncStorage.getItem('user_id'),
  //       },
  //     })
  //     console.log("kya hua ??",res);
  //   } catch (error) {
  //     Alert("An error has occurred");
  //   }
  // }
  useEffect(() => {
    const getStudentData = () => {
      axios
        .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/studentbyid`)
        .then(response => {
          console.log(response.data);
          const terms = response.data;
          setStudentList(terms);
        })
        .catch(error => {
          console.log(error);
        });
    };
    getStudentData();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <CustomHeader title="Batches" navigation={navigation} />
      </View>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.date}>
            <View style={styles.startText}>
              <Text style={styles.dateText}>START DATE</Text>
            </View>
            <View style={styles.startDate}>
              <DatePicker
                style={{ width: 180 }}
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
                style={{ width: 180 }}
                date={end_date}
                placeholder=""
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={d => setEnd_date(d)}
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
                placeholder="Start Time"
                keyboardType="ascii-capable"
                value={time}
                onChangeText={setTime}
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
                onChangeText={setEndTime}
              />
            </View>
          </View>
          <View style={styles.date}>
            <View style={styles.startText}>
              <Text style={styles.dateText}>BATCH NAME</Text>
            </View>
            <View style={styles.startDate}>
              <TextInput
                placeholder="Enter Batch Name"
                keyboardType="ascii-capable"
                value={batchName}
                onChangeText={setBatchName}
              />
            </View>
          </View>
          <View style={styles.date}>
            <View style={styles.startText}>
              <Text style={styles.dateText}>DESCRIPTION</Text>
            </View>
            <View style={styles.startDate}>
              <TextInput
                placeholder="Enter Batch Description"
                keyboardType="ascii-capable"
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>
          <View style={styles.date}>
            <View style={styles.startText}>
              <Text style={styles.dateText}>SUBJECT</Text>
            </View>
            <View style={styles.startDate}>
              <Picker
                style={{ width: 200 }}
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
          </View>
          <View style={styles.date}>
            <View style={styles.startText}>
              <Text style={styles.dateText}>STUDENT LIST</Text>
            </View>
            <View style={styles.startDates}>
            <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={selected}
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
          selectedStyle={styles.selectedStyle}
        />
            </View>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonTouch} onPress={AddBatch} >
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
  startDates: {
    backgroundColor: 'silver',
    flex: 2,
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
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
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
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
