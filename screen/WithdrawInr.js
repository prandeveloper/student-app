import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WithdrawInr = () => {
  const [inrModal, setInrModal] = useState(false);
  const [upi, setUpi] = useState('');
  const [amount, setAmount] = useState('');

  const toggleModalThree = () => {
    setInrModal(!inrModal);
  };

  const withdrawInr = async () => {
    console.log(upi, amount);
    axios
      .post(
        `http://65.0.80.5:5000/api/user/withdrawal`,
        {
          upi_Id: upi,
          inr: amount,
          crpto_id: 0,
          usd: 0,
        },
        {
          headers: {
            'user-token': await AsyncStorage.getItem('user-token'),
          },
        },
      )
      .then(response => {
        console.log(response.data);
        if (
          response.data.message == 'success' &&
          response.data.message === 'success'
        ) {
          Alert.alert('Withdrawal Request Send Successfully');
        }
        setUpi('');
        setAmount('');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View>
      <TouchableOpacity style={styles.addButton} onPress={toggleModalThree}>
        <Text style={styles.addText}>WITHDRAW INR</Text>
      </TouchableOpacity>
      <Modal isVisible={inrModal}>
        <View style={styles.modalIcon}>
          <TouchableOpacity
            style={styles.closeTouch}
            onPress={toggleModalThree}>
            <Text style={styles.closeText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainModal}>
          <View style={styles.modelHead}>
            <Text style={styles.modalText}>INR</Text>
            <Text style={styles.modalText1}>Enter INR Amount To Withdraw</Text>
          </View>
          <View style={styles.inputArea}>
            <Text style={styles.inputText}>Enter UPI ID</Text>
            <TextInput
              // textContentType="number"
              placeholder="Enter UPI ID"
              keyboardType="ascii-capable"
              style={styles.modalField}
              onChangeText={upi => setUpi(upi)}
              value={upi}
            />
          </View>
          <View style={styles.inputArea}>
            <Text style={styles.inputText}>Amount</Text>
            <TextInput
              // textContentType="number"
              placeholder="Enter Amount"
              keyboardType="number-pad"
              style={styles.modalField}
              onChangeText={amount => setAmount(amount)}
              value={amount}
            />
          </View>
          <View style={styles.modalBtn}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={e => withdrawInr(upi, amount)}>
              <Text style={styles.addText}>REQUEST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WithdrawInr;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#8C0000',
    padding: 15,
    borderRadius: 10,
  },
  addText: {
    color: 'white',
    fontWeight: '700',
  },
  modalIcon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  closeTouch: {
    backgroundColor: 'red',
    padding: 8,
    margin: 1,
  },
  closeText: {
    color: 'white',
    fontWeight: '700',
  },
  mainModal: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modelHead: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 20,
  },
  modalText1: {
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
  },
  inputArea: {
    marginBottom: 10,
  },
  inputText: {
    color: 'black',
  },
  modalField: {
    borderRadius: 15,
    borderWidth: 1,
    width: 250,
    borderColor: 'black',
    color: 'black',
  },
});
