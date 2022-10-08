import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
    Alert,
    Image,
    TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotifyHeader from './header/NotifyHeader';
import { Searchbar } from 'react-native-paper';
import { ListItem, Avatar } from 'react-native-elements';
import { FlatList } from 'react-native';

export default function SearchScreen({ navigation }) {
    const [search, setSearch] = React.useState('');
    const [teacherList, setTeacherList] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [filterData, setfilterData] = useState([]);


    const getTeacherList = async () => {
        axios
            .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/teacherbyid`)
            .then((response) => {
                console.log("<<<<<aa", response.data.data)
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

    const searchFilterFuntion = (text) => {
        if (text) {
            const newData = masterData.filter(
                function (item) {
                    const itemData = item.s_name
                        ? item.s_name.toUpperCase() : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            console.log(`new Data =` + JSON.stringify(newData));
            setfilterData(newData);
            setSearch(text);
        } else {
            setfilterData(masterData);
            setSearch(text);
        }
    }

    const ItemView = ({ item }) => {
        return (
            <View style={styles.itemWrapperStyle}>
                <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={() =>
                    navigation.navigate('SearchDetails', {
                        id: item.id,
                    })
                }>
                    <Image style={styles.img} source={{ uri: item.image }} />
                    <Text style={styles.itemTitleStyle}>{item.s_name}</Text>
                </TouchableOpacity>

            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <NotifyHeader title="SEARCH" navigation={navigation} />
            {/* <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <ScrollView>
            <View >
                {teacherList?.map((l, i) => (
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('SearchDetails', {
                          id: l.id,
                        })
                      } >
                        <ListItem key={i} bottomDivider style={{ marginBottom: 10 }}>
                            <Avatar source={{ uri: l.image }} />
                            <ListItem.Content>
                                <ListItem.Title>{l.s_name}</ListItem.Title>
                                <ListItem.Subtitle>{l.users}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                ))}
            </View>
            </ScrollView> */}

            <View style={styles.searchWrapperStyle}>
                <Icon size={18} name="search" color="white" style={styles.iconStyle} />
                <TextInput
                    onChangeText={(text) => searchFilterFuntion(text)}
                    value={search}
                    underlineColorAndroid='transparent'
                    placeholder='Search Here'
                    placeholderTextColor={'#fff'}
                    placeholderColor={'#fff'}
                />
            </View>
            <FlatList
                data={filterData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    itemWrapperStyle: {
        borderBottomWidth: 1,
        paddingVertical: 8,
        borderColor: "#ccc",
        paddingHorizontal: 16,
    },
    itemTitleStyle: {
        fontSize: 14,
        color: "#000",
        fontWeight: "bold",
        marginLeft:10
    },
    itemBodyStyle: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
    errStyle: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        color: "red",
    },
    searchWrapperStyle: {
        backgroundColor: "#16A085",
        flexDirection: "row",
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
    img:{
        width:40,height:40,borderRadius:40
    }
});

