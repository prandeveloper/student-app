import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-datepicker';
import CustomHeader from '../header/CustomHeader';

export default function Batches({navigation}) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  return (
    <View style={styles.mainContainer}>
      <CustomHeader title="Batches" navigation={navigation} />
      <View style={styles.date}>
        <View>
          <Text style={styles.dateText}>START DATE</Text>
        </View>

        <DatePicker
          date={date}
          placeholder=""
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={d => setDate(d)}
        />
      </View>
      <View style={styles.date}>
        <View>
          <Text style={styles.dateText}>END DATE</Text>
        </View>

        <DatePicker
          date={date}
          placeholder=""
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={d => setDate(d)}
        />
      </View>
      <View style={styles.date}>
        <View>
          <Text style={styles.dateText}>START TIME</Text>
        </View>
        <DatePicker
          date={date}
          placeholder=""
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={d => setDate(d)}
        />
      </View>
      <View style={styles.date}>
        <View>
          <Text style={styles.dateText}>END TIME</Text>
        </View>
        <DatePicker
          date={date}
          placeholder=""
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={d => setDate(d)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {color: '#000', fontWeight: '600'},
});
