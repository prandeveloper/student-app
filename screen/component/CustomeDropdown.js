import axios from 'axios';
import React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from 'react-native';

const CustomeDropdown = ({data = [], value = {}, onSelect = () => {}}) => {
  const [showOption, setShowOption] = useState(false);
  console.log('Selected value', !!value);
  //   const getClass = async () => {
  //     axios
  //       .get(
  //         `https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/classsbyid`,
  //       )
  //       .then(response => {
  //         console.log('<<<<<class', response.data.data);
  //         const res = response.data.data;
  //         setData(res);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   };
  //   useEffect(() => {
  //     getClass();
  //   }, []);
  return (
    <View
      style={{
        height: '50%',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
      }}>
      <TouchableOpacity
        onPress={() => setShowOption(!showOption)}
        style={styles.dropDownStyle}
        activeOpacity={0.8}>
        <Text>{!!value ? value?.class : `Choose an option`}</Text>
        <Image
          source={require('../src/arrowDown.png')}
          style={{width: 25, height: 25}}
        />
      </TouchableOpacity>
      {showOption && (
        <View>
          {data.map((val, i) => {
            return <Text key={String(i)}>{val.class}</Text>;
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8,
    borderRadius: 6,
    minHeight: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
