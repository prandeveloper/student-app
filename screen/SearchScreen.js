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

    const onChangeSearch = query => setSearchQuery(query);
    const list = [
        {
            name: 'Chris Jackson',
            avatar_url:
                'https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_4815126.jpg',
            subtitle: 'Both',
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
            subtitle: 'Teacher',
        },
    ];


    const search = async () => {
        const url = `https://edumatelive.in/studentadmin/api-search-student.php`;
        const response = await axios.post(url);
        console.log(response.data);
      };
    // const search = async () =>{
    //     const data = {
    //         method: 'post',
    //         url: `https://edumatelive.in/studentadmin/api-search-student.php`,
    //       };
    //       const response = await axios(data);
    //       console.log(response.data);
    //     };
    // }
    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <NotifyHeader title="SEARCH" navigation={navigation} />
            <Searchbar
                placeholder="Search"
                value={search}
            onChangeText={search => this.setState({search})}
            />
            <View >
                {list.map((l, i) => (
                    <TouchableOpacity>
                        <ListItem key={i} bottomDivider style={{ marginBottom: 10 }}>
                            <Avatar source={{ uri: l.avatar_url }} />
                            <ListItem.Content>
                                <ListItem.Title>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    );
}
const styles = StyleSheet.create({});

