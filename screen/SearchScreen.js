import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
    Alert,
    Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotifyHeader from './header/NotifyHeader';
import { Searchbar } from 'react-native-paper';
import {ListItem, Avatar} from 'react-native-elements';

export default function SearchScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [teacherList,setTeacherList] = useState([])

    const onChangeSearch = query => setSearchQuery(query);
    const list = [
        {
            name: 'Chris Jackson',
            avatar_url:
                'https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_4815126.jpg',
            subtitle: 'Student',
        },
        {
            name: 'Amy Farha',
            avatar_url:
                'https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png',
            subtitle: 'Student',
        },
        {
            name: 'Chris Jackson',
            avatar_url:
                'https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_4815126.jpg',
            subtitle: 'Student',
        },
    ];
    const getTeacherList = async () => {
        axios
          .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/teacherbyid`)
          .then((response) => {
            console.log("<<<<<aa",response.data.data)
            const list = response.data.data
            setTeacherList(list)
          })
          .catch((error) => {
            console.log(error);
          });
      };
      useEffect(() => {
        getTeacherList();
      }, []);
    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <NotifyHeader title="SEARCH" navigation={navigation} />
            <Searchbar
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
            </ScrollView>

        </View>
    );
}
const styles = StyleSheet.create({});

