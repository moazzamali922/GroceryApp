import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import EditProfiledata from '../common/EditProfileData';
import {deleteProfile} from '../redux/slices/ProfileSlice';

const CustomDrawer = () => {
  const items = useSelector(state => state.profile.data);
  const [profileData, setProfileData] = useState(items);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setProfileData(items);
  }, [items]);

  const handleLogout = async () => {
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
    <DrawerContentScrollView contentContainerStyle={{paddingTop: 0, margin: 0}}>
      {/* Header */}
      <View>
        {profileData.map((item, index) => (
          <TouchableOpacity style={styles.drawerHeader} key={index}>
            <Text style={[styles.drawerHeaderText, {color: '#000'}]}>
              Name: {item.name}
            </Text>
            <Text style={{color: '#000', fontSize: 15, marginVertical: 2}}>
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
                  marginLeft: 'auto',
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
          </TouchableOpacity>
        ))}
      </View>
      {/* Edit Profile */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Image
          source={require('../images/editProfile.png')}
          style={styles.drawerItemIcon}
        />
        <Text style={styles.drawerItemText}>Add New Profile</Text>
      </TouchableOpacity>

      {/* Address */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.navigate('Addresses');
        }}>
        <Image
          source={require('../images/address.png')}
          style={styles.drawerItemIcon}
        />
        <Text style={styles.drawerItemText}>Address</Text>
      </TouchableOpacity>

      {/* Payment Method */}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.navigate('PaymentScreen', {PaymentType: 'PaymentMethod'});
        }}>
        <Image
          source={require('../images/payment.png')}
          style={styles.drawerItemIcon}
        />
        <Text style={styles.drawerItemText}>Payment Method</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
        <Image
          source={require('../images/logout.png')}
          style={styles.drawerItemIcon}
        />
        <Text style={styles.drawerItemText}>Logout</Text>
      </TouchableOpacity>
      <EditProfiledata
        modalVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#ccc',
  },
  drawerHeaderText: {
    fontSize: 18,
    // fontWeight: '500',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  drawerItemIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#000',
  },
  bottomView: {
    marginTop: 5,
  },
});

export default CustomDrawer;
