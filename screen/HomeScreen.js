import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  AppRegistry,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator} from 'react-native';
import {Image} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import axiosConfig from '../axiosConfig';
import {Badge} from 'react-native-paper';
import axios from 'axios';

import HomeDetails from './HomeDetails';

export default function HomeScreen({navigation}) {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [course, setCourse] = useState([]);
  const [recent, setRecent] = useState([]);
  const [free, setFree] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [student, setStudent] = useState([]);
  const [banner, setBanner] = useState([]);

  // useEffect(() => {
  //   // Recent Course
  //   axiosConfig
  //     .get('/allcoursebyrecent')
  //     .then(response => {
  //       setRecent(response.data.data);
  //       //console.log(response.data.data);
  //     })
  //     .catch(error => {
  //       console.log(error.response);
  //     });

  //   // CAtegory List Api
  //   axiosConfig
  //     .get('/allCat')
  //     .then(response => {
  //       setCategory(response.data.data);
  //       console.log(response.data.data);
  //     })
  //     .catch(error => {
  //       console.log(error.response);
  //     });
  // }, []);

  //Get Banner Api

  const getBanner = () => {
    axios
      .get(`https://edumatelive.in/studentadmin/newadmin//api/ApiCommonController/bannerlisttt`)
      .then(response => {
        // console.log(response.data[0]);
        const banner = response.data.data[0];
        setBanner(banner);
        console.log(",,,,,,,,,",banner);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //Get Course List

  const getCourse = () => {
    axios
      .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/courses`)
      .then(response => {
        console.log('Course', response.data.data);
        const course = response.data.data;
        setCourse(course);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCourse();
    getBanner();
  }, []);

  const getTeacher = () => {
    axios
      .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/teacherbyid`)
      .then(response => {
        // console.log('techer////', response.data.data);
        const teacher = response.data.data;
        setTeacher(teacher);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTeacher();
  }, []);

  const getStudent = () => {
    axios
      .get(`https://edumatelive.in/studentadmin/newadmin/api/ApiCommonController/studentbyid`)
      .then(response => {
        console.log('student???', response.data.data);
        const student = response.data.data;
        setStudent(student);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    getStudent();
  }, []);

  const scrollRef = useRef();
  let intervalId = null;

  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {};
  });

  const onSlideChange = useCallback(() => {
    // Calculate newIndex here and use it to update your state and to scroll to the new slide
    const newIndex =
      selectedIndex === carouselImages.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: dimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, 3000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();

    return () => {
      // Clear the interval when component unmounts, otherwise you could have memory leaks
      clearInterval(intervalId);
    };
  }, [onSlideChange]);

  const onTouchStart = () => {
    // As soon as the user touches the slide, stop the automatic sliding
    clearInterval(intervalId);
  };

  const onTouchEnd = () => {
    // As soon as the user stops touching the slide, releases it, start the automatic sliding again
    startInterval();
  };

  const carouselImages = [
    {image: require('../src/edu1.png')},
    {image: require('../src/edu2.png')},
    {image: require('../src/edu3.png')},
  ];

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  function CustomHeader({title, navigation}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          backgroundColor: '#f1f3f6',
          marginBottom: 5,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon name="indent" type="font-awesome" size={22} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: '800',
              fontSize: 20,
              color: 'black',
            }}>
            {title}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('NotificationsScreen')}>
            <Icon name="bell" type="font-awesome" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f1f3f6'}}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <CustomHeader title="Home" navigation={navigation} />
      <ScrollView>
        <View>
          {/* Top Banner Section Starts from Here */}
          <View
            style={{
              width: dimension.width,
              borderWidth: 0,
              marginBottom: 20,
              borderColor: 'lightgreen',
            }}>
            <ScrollView
              horizontal
              ref={scrollRef}
              onMomentumScrollEnd={setIndex}
              showsHorizontalScrollIndicator={false}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              pagingEnabled>
              <Image
                source={{uri: `${banner?.image}`}}
                style={{
                  width: dimension?.width,
                  height: 180,
                  resizeMode: 'cover',
                }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Image
                source={{uri: `${banner?.image1}`}}
                style={{
                  width: dimension?.width,
                  height: 180,
                  resizeMode: 'cover',
                }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Image
                source={{uri: `${banner?.image2}`}}
                style={{
                  width: dimension?.width,
                  height: 180,
                  resizeMode: 'cover',
                }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </ScrollView>
          </View>
          {/* Latest Course Tab Starts From Here */}
          <View>
            <Text style={styles.popular}>Top Courses</Text>
            <ScrollView horizontal={true}>
              {course?.map(courses => (
                <View key={courses.id_c} style={styles.first1}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Details', {id: courses.id_c})
                    }>
                    <View style={styles.second}>
                      <Image
                        style={styles.latestImg}
                        source={{uri: `${courses?.poster_image}`}}
                      />
                      <Text style={styles.coursetitle1}>{courses?.title}</Text>
                    </View>
                    <View style={styles.teachcat}>
                      <View style={styles.third}>
                        <Image
                          style={{width: 30, height: 30, borderRadius: 50}}
                          source={{uri: `${courses?.poster_image}`}}
                        />
                        <Text style={styles.teacherText1}>
                          {courses?.title}
                        </Text>
                      </View>

                      {/* <View style={styles.third}>
                        <Text style={styles.teacherText}>
                          {recents.category_id?.catName}
                        </Text>
                      </View> */}
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          {/* teacher Tab Starts From Here */}
          <View>
            <Text style={styles.popular}>Top Teacher</Text>
            <ScrollView horizontal={true}>
              {teacher.map(cat => (
                <View key={cat._id} style={styles.catmain}>
                  <TouchableOpacity onPress={()=> navigation.navigate('TeacherDetails', {id: cat.id})} >
                    <View style={styles.catview}>
                      <Image
                        style={styles.banner}
                        source={{uri: `${cat?.image}`}}
                      />
                      <Text style={styles.cattext}>{cat?.s_name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          {/* student Tab Starts From Here */}
          <View>
            <Text style={styles.popular}>Top Student</Text>
            <ScrollView horizontal={true}>
              {student.map(cat => (
                <View key={cat._id} style={styles.catmain}>
                  <TouchableOpacity onPress={()=> navigation.navigate('StudentDetails', {id: cat.id})}>
                    <View style={styles.catview}>
                      <Image
                        style={styles.banner}
                        source={{uri: `${cat?.image}`}}
                      />
                      <Text style={styles.cattext}>{cat?.s_name}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  first1: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    // borderRadius: 15,
    // borderWidth: 1,
  },
  first: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  second: {
    flex: 1,
    flexDirection: 'column',
  },
  third: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  teacherText: {
    marginLeft: 5,
    fontWeight: '600',
    color: 'black',
  },
  teacherText1: {
    marginLeft: 5,
    fontWeight: '600',
    color: 'black',
  },
  catmain: {
    padding: 15,
  },
  catview: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 2,
  },
  cattext: {padding: 15, color: 'black', fontWeight: '500'},
  latestImg: {
    width: 250,
    height: 160,
    resizeMode: 'cover',
    margin: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgreen',
  },
  banner: {
    width: 200,
    height: 140,

    margin: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'lightgreen',
  },
  coursetitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    textTransform: 'capitalize',
  },
  coursetitle1: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    textTransform: 'capitalize',
  },
  popular: {
    fontSize: 25,
    marginLeft: 10,
    color: 'black',
    fontWeight: '700',
    fontFamily: 'Quintessential-Regular',
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  teachcat: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
