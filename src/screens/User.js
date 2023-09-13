import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
// import Header from '../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import EditProfiledata from '../common/EditProfileData';
import {useSelector, useDispatch} from 'react-redux';
import {deleteProfile} from '../redux/slices/ProfileSlice';

const User = () => {
  const items = useSelector(state => state.profile.data);
  const [profileData, setProfileData] = useState(items);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(profileData);
  useEffect(() => {
    setProfileData(items);
  }, [items]);

  const [modalVisible, setModalVisible] = useState(false);

  const logout = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        JSON.parse(value);
        Alert.alert(
          'Logout Confirmation',
          'Are you sure you want to logout?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Logout',
              onPress: async () => {
                try {
                  await AsyncStorage.clear();
                  navigation.navigate('Login');
                  console.log('Logout Done!');
                } catch (error) {
                  console.error('Error while clearing AsyncStorage:', error);
                }
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.error('Error while fetching AsyncStorage:', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* <Header
        leftIcon={require('../images/back.png')}
        // RightIcon={require('../images/cart.png')}
        title={' Profile'}
        // onClickLeftIcon={() => {navigation.goBack()}} 
      /> */}

      {/* <View
        style={{
          width: '100%',
          height: 65,
          backgroundColor: '#0786DAFD',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: 15,
          paddingRight: 15,
        }}>
        <TouchableOpacity>
          <Image
            style={{width: 32, height: 32, tintColor: '#fff'}}
            source={require('../images/back.png')}
          />
        </TouchableOpacity>
        <Text>Profile Screen</Text>
        <Text>3</Text>
      </View> */}

      <Text
        style={{
          alignSelf: 'center',
          color: '#000',
          fontSize: 20,
          marginTop: 40,
        }}>
        Profile Screen
      </Text>
      <Image
        source={require('../images/default_user.png')}
        style={styles.user}
      />
      {profileData.map((item, index) => (
        <View style={{width: '60%', alignSelf: 'center'}} key={index}>
          <Text style={styles.name}>Name: {item.name}</Text>
          <Text style={[styles.name, {fontSize: 16, marginTop: 0}]}>
            Email: {item.email}
          </Text>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={{
                borderRadius: 15,
                backgroundColor: '#FF9A0C',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 8,
                width: '30%',
                // marginLeft: 'auto',
              }}
              onPress={() => {
                dispatch(deleteProfile(item.id));
              }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={[styles.tab, {marginTop: 40}]}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.txt}>Add New Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, {marginTop: 10}]}
        onPress={() => {
          navigation.navigate('Orders');
        }}>
        <Text style={styles.txt}>Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, {marginTop: 10}]}
        onPress={() => {
          navigation.navigate('Addresses');
        }}>
        <Text style={styles.txt}>Address</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, {marginTop: 10}]}
        onPress={() => {
          navigation.navigate('PaymentScreen', {PaymentType: 'PaymentMethod'});
        }}>
        <Text style={styles.txt}>Payment Methods</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, {marginTop: 10}]}
        onPress={() => {
          logout();
        }}>
        <Text style={styles.txt}>Log out</Text>
      </TouchableOpacity>

      <EditProfiledata
        modalVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default User;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  tab: {
    width: '90%',
    height: 50,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    borderBottomColor: '#DBDBDB',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  txt: {
    color: '#000',
    fontSize: 16,
  },
  state: {
    color: '#000',
    fontSize: 18,
  },
  bottomView: {
    marginTop: 12,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  bottomicon: {
    width: 24,
    height: 24,
  },
});
