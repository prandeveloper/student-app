import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SearchComponent = ({ onSearchEnter }) => {
  const [term, setTerm] = useState("");
  const [search, setSearch] = React.useState('');
    const [teacherList,setTeacherList] = useState([]);
    const [masterData,setmasterData] = useState([]);
    const [filterData,setfilterData] = useState([]);
    const getTeacherList = async () => {
        axios
          .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/teacherbyid`)
          .then((response) => {
            console.log("<<<<<aa",response.data.data)
            const list = response.data.data
            setmasterData(list)
            setfilterData(list)
          })
          .catch((error) => {
            console.log(error);
          });
      };
      useEffect(() => {
        getTeacherList();
      }, []);

  const searchFilterFuntion =(text) =>{
    if(text){
    const newData = masterData.filter(
        function (item){
            const itemData = item.s_name
            ? item.s_name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        console.log(`new Data =` + JSON.stringify(newData));
        setfilterData(newData);
    }else{
        setfilterData(masterData);
        setSearch(text);
    }
  }


  return (
    <View style={styles.searchWrapperStyle}>
      <Icon size={18} name="search" color="white" style={styles.iconStyle} />
      <TextInput
                onChangeText={(text)=> searchFilterFuntion(text)}
                value={search}	
                underlineColorAndroid='transparent'
                placeholder='Search Here'
                placeholderTextColor={'#000000'}
                 />
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapperStyle: {
    backgroundColor: "#16A085",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconStyle: {
    marginTop: 12,
    marginHorizontal: 8,
  },
  searchInputStyle: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    margin: 0,
    color: "white",
  },
});

export default SearchComponent;