import React, { useState } from 'react'
import { View, Text,StyleSheet } from 'react-native'
import DatePicker from 'react-native-datepicker'
import CustomHeader from '../header/CustomHeader'

export default function Batches({ navigation }) {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    return (
        <View style={styles.mainContainer}>
            <CustomHeader title="Batches" navigation={navigation} />
            <View style={styles.date} >
                <DatePicker
                    style={{ width: '40%' }}
                    date={date}
                    placeholder='select Start Date'
                    format='DD-MM-YYYY'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    onDateChange={(d) => setDate(d)}
                />
                <DatePicker
                    style={{ width: '40%' }}
                    date={date}
                    placeholder='select End Date'
                    format='DD-MM-YYYY'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    onDateChange={(d) => setDate(d)}
                />
            </View>
            <View style={styles.date} >
                <DatePicker
                    style={{ width: '40%' }}
                    date={time}
                    placeholder='select Start Time'
                    format='DD-MM-YYYY'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    onDateChange={(d) => setTime(d)}
                />
                <DatePicker
                    style={{ width: '40%' }}
                    date={time}
                    placeholder='select End Time'
                    format='DD-MM-YYYY'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    onDateChange={(d) => setTime(d)}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
    },
date:{
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginTop:10
}
})