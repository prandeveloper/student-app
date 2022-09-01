import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
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
import CustomHeader from '../header/CustomHeader';

export default function BatchesForm({navigation}) {
  const [date, setDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [time, setTime] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
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
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.buttonTouch}>
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
  dateText: {color: '#000', fontWeight: '600'},
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
