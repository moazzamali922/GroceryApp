import {
  StyleSheet,
  Text,
  View, 
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../common/Header';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAddress} from '../redux/slices/AddressSlice';

const Addresses = () => {
  const navigation = useNavigation();
  const items = useSelector(state => state.address.data);
  const [currentAddress, setCurrentAddress] = useState(items);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentAddress(items);
  }, [items]);  

  const defaultAddress = async item => {
    await AsyncStorage.setItem(
      'MY_ADDRESS',
      '' +
        item.city +
        ' , ' +
        item.state +
        ' , ' +
        item.pincode +
        ' ,Type:' +
        item.selectedMethod,
    );
  };

  console.log(currentAddress);

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        // RightIcon={require('../images/cart.png')}
        title={'My Addresses'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />

      <FlatList
        data={currentAddress}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                defaultAddress(item);
              }}
              style={{
                width: '90%',
                backgroundColor: '#fff',
                borderWidth: 0.9,
                alignSelf: 'center',
                marginTop: 20,
                paddingLeft: 20,
                paddingBottom: 10,
                paddingTop: 10,
                borderRadius: 10,
              }}>
              <Text style={styles.state}>{`State:  ${item.state}`}</Text>
              <Text style={styles.state}>{`City:  ${item.city}`}</Text>
              <Text style={styles.state}>{`Pincode:  ${item.pincode}`}</Text>
              <Text
                style={[
                  styles.state,
                  {
                    position: 'absolute',
                    right: 20,
                    top: 12,
                    backgroundColor: '#B1BFF5',
                    borderRadius: 10,
                    padding: 5,
                    fontSize: 12,
                    fontWeight: 'bold',
                  },
                ]}>
                {item.selectedMethod}
              </Text>
              <View style={styles.bottomView}>
                <TouchableOpacity
                  style={[styles.bottomicon, {marginRight: 10}]}
                  onPress={() => {
                    navigation.navigate('AddAddress', {
                      type: edit,
                      data: item,
                    });

                  }}>
                  <Image
                    source={require('../images/edit.png')}
                    style={styles.bottomicon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.bottomicon}
                  onPress={() => {
                    dispatch(deleteAddress(item.id));
                  }}>
                  <Image
                    source={require('../images/delete.png')}
                    style={styles.bottomicon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AddAddress', {type: 'new'});
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#d2511d',
          position: 'absolute',
          bottom: 70,
          right: 20,
          width: '20%',
          height: '10%',
          borderRadius: 50,
        }}> 
        <Text style={{textAlign: 'center', fontSize: 50, color: '#fff'}}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: '#EC8A00',
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  state: {color: '#000', fontSize: 18},
  bottomView: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    flexDirection: 'row',
  },
  bottomicon: {
    width: 24,
    height: 24,
  },
});
