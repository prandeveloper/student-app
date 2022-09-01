import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ListItem, Avatar} from 'react-native-elements';
import CustomHeader from '../header/CustomHeader';

const FavoriteStudent = ({navigation}) => {
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
  return (
    <SafeAreaView >
      <View>
        <CustomHeader title="FAVORITE STUDENT" navigation={navigation} />
      </View>
      <View>
        <View >
          {list.map((l, i) => (
            <TouchableOpacity>
              <ListItem key={i} bottomDivider style={{marginBottom:10}}>
              <Avatar source={{uri: l.avatar_url}} />
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FavoriteStudent;

const styles = StyleSheet.create({});
