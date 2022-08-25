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

const WithdrawUsdt = () => {
  const [usdtModal, setUsdtModal] = useState(false);
  const [crypto, setCrypto] = useState('');
  const [usdAmount, setUsdAmount] = useState('');

  const toggleModalFour = () => {
    setUsdtModal(!usdtModal);
  };

  const withdrawUsd = async () => {
    console.log(crypto, usdAmount);
    axios
      .post(
        `http://65.0.80.5:5000/api/user/withdrawal`,
        {
          upi_Id: 0,
          inr: 0,
          crpto_id: crypto,
          usd: usdAmount,
        },
        {
          headers: {
            'user-token': await AsyncStorage.getItem('user-token'),
          },
        },
      )
      .then(response => {
        console.log(response.data);
        console.log(response.data.message);
        if (
          response.data.message == 'success' &&
          response.data.message === 'success'
        ) {
          Alert.alert('Withdrawal Request Send Successfully');
        }
        setCrypto('');
        setUsdAmount('');
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View>
      <TouchableOpacity style={styles.addButton} onPress={toggleModalFour}>
        <Text style={styles.addText}>WITHDRAW USDT</Text>
      </TouchableOpacity>
      <Modal isVisible={usdtModal}>
        <View style={styles.modalIcon}>
          <TouchableOpacity style={styles.closeTouch} onPress={toggleModalFour}>
            <Text style={styles.closeText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainModal}>
          <View style={styles.modelHead}>
            <Text style={styles.modalText}>USDT</Text>
            <Text style={styles.modalText1}>Enter USDT Amount To Withdraw</Text>
          </View>
          <View style={styles.inputArea}>
            <Text style={styles.inputText}>Enter Crypto ID</Text>
            <TextInput
              // textContentType="number"
              placeholder="Enter Crypto ID"
              keyboardType="ascii-capable"
              style={styles.modalField}
              onChangeText={crypto => setCrypto(crypto)}
              value={crypto}
            />
          </View>
          <View style={styles.inputArea}>
            <Text style={styles.inputText}>Amount</Text>
            <TextInput
              // textContentType="number"
              placeholder="Enter Amount"
              keyboardType="number-pad"
              style={styles.modalField}
              onChangeText={usdAmount => setUsdAmount(usdAmount)}
              value={usdAmount}
            />
          </View>
          <View style={styles.modalBtn}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={e => withdrawUsd(crypto, usdAmount)}>
              <Text style={styles.addText}>REQUEST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WithdrawUsdt;

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
