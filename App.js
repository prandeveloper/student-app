import 'react-native-gesture-handler';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Chip} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ChatScreen from './screen/ChatScreen';
import Courses from './screen/Courses';
import AllCourses from './screen/AllCourses';
import HomeScreen from './screen/HomeScreen';
import SplashScreen from './screen/SplashScreen';
import LogIn from './screen/LogIn';
import SecondScreen from './screen/SecondScreen';
import Register from './screen/Register';
import NotificationsScreen from './screen/NotificationsScreen';
import KycScreen from './screen/KycScreen';
import Messaging from './screen/Messaging';
import HomeDetails from './screen/HomeDetails';
import MyCourse from './screen/MyCourse';
import ProfileEdit from './screen/ProfileEdit';
import SeeMore from './screen/SeeMore';
import TermsScreen from './screen/TermsScreen';
import UpiIdScreen from './screen/UpiIdScreen';
import About from './screen/About';
import Contact from './screen/Contact';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import NotifyDetail from './screen/NotifyDetail';
import FullScreen from './screen/FullScreen';
import PdfRead from './screen/PdfRead';
import TransactionList from './screen/TransactionList';
import Batches from './screen/DrawerScreen/Batches';
import FavoriteStudent from './screen/DrawerScreen/FavoriteStudent';
import FavoriteTeacher from './screen/DrawerScreen/FavoriteTeacher';
import BatchesForm from './screen/DrawerScreen/BatchesForm';
import SearchScreen from './screen/SearchScreen';
import TeacherDetails from './screen/TeacherDetails';
import StudentDetails from './screen/StudentDetails';
import SearchDetails from './screen/SearchDetails';
import ForgotPassword from './screen/ForgotPassword';
import OtpScreen from './screen/OtpScreen';
import ConfirnPassword from './screen/ConfirnPassword';
//import Profile from "./src/profile.png";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});

const crteStackNav = createStackNavigator();

function TabScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        labelStyle: {
          fontSize: 11,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('./src/homa.png')
              : require('./src/homee.png');
          } else if (route.name === 'Search') {
            iconName = focused
              ? require('./src/loupe(1).png')
              : require('./src/loupe.png');
          }
          if (route.name === 'Courses') {
            iconName = focused
              ? require('./src/to-do-list(1).png')
              : require('./src/to-do-list.png');
          } else if (route.name === 'Setting') {
            iconName = focused
              ? require('./src/settings(1).png')
              : require('./src/settings.png');
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={{width: 25, height: 25}}
              resizeMode="contain"
            />
          );
        },
        activeTintColor: 'tomato',
        inactiveTintColor: 'black',
      })}
      options={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Courses"
        component={AllCourses}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Setting"
        component={ProfileEdit}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
const MyTab = ({component}) => (
  <crteStackNav.Navigator>
    <crteStackNav.Screen name={'Home'} options={{headerShown: false}}>
      {component}
    </crteStackNav.Screen>
  </crteStackNav.Navigator>
);

const myTabs = ({navigation}) => <MyTab component={() => TabScreen()} />;

const TabNavigation = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LogIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Second"
        component={SecondScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={myTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="CameraKyc"
        component={CameraKyc}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="Messaging"
        component={Messaging}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={HomeDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyCourse"
        component={MyCourse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FullScreen"
        component={FullScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PdfRead"
        component={PdfRead}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileEdit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SeeMore"
        component={SeeMore}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotifyDetail"
        component={NotifyDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpiIdScreen"
        component={UpiIdScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="TermsScreen"
        component={TermsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Batches"
        component={Batches}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BatchesForm"
        component={BatchesForm}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FavoriteStudent"
        component={FavoriteStudent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FavoriteTeacher"
        component={FavoriteTeacher}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TeacherDetails"
        component={TeacherDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StudentDetails"
        component={StudentDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SearchDetails"
        component={SearchDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConfirnPassword"
        component={ConfirnPassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = ({navigation}) => {
  const [user, setUser] = useState([]);
  const [storedata, setStoredata] = useState({});

  const getData = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      if (user_id !== null) {
        console.log('@@@@@@@@', user_id);
        setStoredata(user_id);
      }
    } catch (e) {
      console.log('no Value in login');
    }
  };
  const getUser = async () => {
    axios
      .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/usernewdata/${storedata}`,)
      .then(response => {
        const user = response.data.data[0];
        setUser(user);
        console.log("Profile #############",user);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getData();
    getUser();
  }, [storedata]);

  const CustomContentContent = ({navigation}) => {
    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'column',
              borderBottomColor: '#C8BDBD',
              borderBottomWidth: 5,
              marginBottom: 10,
              height: 200,
            }}>
            <View style={{alignSelf: 'flex-start'}}>
              {user?.image !== '' &&
              user?.image !== null &&
              user?.image !== undefined ? (
                <TouchableOpacity>
                  <Image
                    source={{uri: `${user?.image}`}}
                    // resizeMode="contain"
                    style={{width: 60, height: 60, borderRadius: 50}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <Image
                    source={require('./src/profile.png')}
                    // resizeMode="contain"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{alignSelf: 'flex-start', marginLeft: 10}}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {user?.s_name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'black'}}>{user?.email}</Text>
                <TouchableOpacity
                  style={{marginLeft: 5}}
                  onPress={() => navigation.navigate('Profile')}>
                  <Icon name="edit" color="black" size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="home" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Home
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="book" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Batches')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Batches
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="user" color="black" size={20} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('FavoriteStudent')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Favorite Student
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="users" color="black" size={20} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('FavoriteTeacher')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Favorite Teacher
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="list" color="black" size={20} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Transaction')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Deposit History
                </Text>
              </TouchableOpacity>
            </View> */}

            {/* <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="comment" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Chat
                </Text>
              </TouchableOpacity>
            </View> */}
            {/* <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="check" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Kyc')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Kyc
                </Text>
              </TouchableOpacity>
            </View> */}
            {/* <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="users" color="black" size={20} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Membership')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Membership
                </Text>
              </TouchableOpacity>
            </View> */}

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="address-card" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('About')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  About Us
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 13}}>
                <Icon name="info" color="black" size={20} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('TermsScreen')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Terms & Conditions
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="phone" color="black" size={20} />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Contact Us
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: '#D3D3D3',
                borderBottomWidth: 1,
              }}>
              <View style={{margin: 10}}>
                <Icon name="power-off" color="black" size={20} />
              </View>
              <TouchableOpacity
                onPress={async () => {
                  navigation.closeDrawer();
                  //navigation.dispatch(StackActions.push('Login'));
                  console.log('<<<<<<<<<<<');
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                  });
                  // navigation.replace('Login');
                  console.log('>>>>>>>>>>>');
                  await AsyncStorage.removeItem('user_id');
                  await AsyncStorage.removeItem('user_type');
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    margin: 10,
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => CustomContentContent(props)}>
        <Drawer.Screen
          name="Tab"
          component={TabNavigation}
          options={{headerShown: false, swipeEnabled: false}}
        />
        <Drawer.Screen
          name="Notification"
          component={NotificationsScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Courses"
          component={Courses}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Kyc"
          component={KycScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Transaction"
          component={TransactionList}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  levelText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});
