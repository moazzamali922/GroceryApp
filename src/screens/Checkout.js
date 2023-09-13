import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
// import {addItemToCart, removeItemFromCart} from '../redux/slices/CartSlice';
import {useSelector} from 'react-redux';
import CustomButton from '../common/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Checkout = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const items = useSelector(state => state.cartlist);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const isfocused = useIsFocused();
  const [selectedAddress, SetSelectedAddress] = useState(
    'Please Enter a Address',
  );

  useEffect(() => {
    setCartItems(items.data);
  }, [items]);

  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.qty * item.price;
    });

    return Math.round(total * 100);
  };

  useEffect(() => {
    getSelectedAddress();
  }, [isfocused]);

  const getSelectedAddress = async () => {
    const address = await AsyncStorage.getItem('MY_ADDRESS');
    SetSelectedAddress(address);
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.container}>
        <Header
          leftIcon={require('../images/back.png')}
          // RightIcon={require('../images/cart.png')}
          title={'Check Out'}
          onClickLeftIcon={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.title}>Add Items</Text>
        <View style={{marginTop: 20, width: '90%', alignSelf: 'center'}}>
          {cartItems.map(item => (
            <View style={styles.productItem} key={item.id}>
              <Image source={{uri: item.image}} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.name}>
                  {item.title.length > 25
                    ? item.title.substring(0, 25) + '...'
                    : item.title}
                </Text>
                <Text style={styles.desc}>
                  {item.description.length > 30
                    ? item.description.substring(0, 30) + '...'
                    : item.description}
                </Text>
                <View style={styles.priceAndButtons}>
                  <Text style={styles.price}>{'$' + item.price}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.totalView}>
          <Text style={styles.title}>Total</Text>
          <Text style={[styles.title, {marginRight: 20}]}>
            {'$' + getTotal()}
          </Text>
        </View>
        <Text style={styles.title}> Select Payment Method </Text>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => {
            setSelectedMethod(0);
          }}>
          <Image
            source={
              selectedMethod == 0
                ? require('../images/radio_2.png')
                : require('../images/radio_1.png')
            }
            style={[
              styles.img,
              {tintColor: selectedMethod == 0 ? 'orange' : 'black'},
            ]}
          />
          <Text style={styles.paymentMethdodsTxt}>Credit Card </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => {
            setSelectedMethod(1);
          }}>
          <Image
            source={
              selectedMethod == 1
                ? require('../images/radio_2.png')
                : require('../images/radio_1.png')
            }
            style={[
              styles.img,
              {tintColor: selectedMethod == 1 ? 'orange' : 'black'},
            ]}
          />
          <Text style={styles.paymentMethdodsTxt}> Debit Card </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentMethods}
          onPress={() => {
            setSelectedMethod(2);
          }}>
          <Image
            source={
              selectedMethod == 2
                ? require('../images/radio_2.png')
                : require('../images/radio_1.png')
            }
            style={[
              styles.img,
              {tintColor: selectedMethod == 2 ? 'orange' : 'black'},
            ]}
          />
          <Text style={styles.paymentMethdodsTxt}> Cash on Delivery </Text>
        </TouchableOpacity>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 18}}>Address</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Addresses')}>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontSize: 18,
                color: '#2470c9',
              }}>
              Edit Address
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[styles.title, {fontSize: 16, marginTop: 5, color: '#000'}]}>
          {selectedAddress}
        </Text>
        <CustomButton
          bg={'green'}
          title={'Pay & Order'}
          color={'#fff'}
          onClick={() => {
            if (selectedMethod === 2) {
              Alert.alert('Cash on Delivery', 'Thank You');
            } else if (selectedMethod === 1) {
              navigation.navigate('PaymentScreen', {
                totalAmount: getTotal(),
                PaymentType: 'Debit Card',
              });
            } else if (selectedMethod === 0) {
              navigation.navigate('PaymentScreen', {
                totalAmount: getTotal(),
                PaymentType: 'Credit Card',
              });
            } else {
              navigation.navigate('PaymentScreen');
            }
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemDetails: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
    color: '#000',
  },
  productItem: {
    width: '100%',
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 20,
  },
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 5,
  },
  qtyview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalView: {
    width: '100%',
    justifyContent: 'space-between',

    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#B7B7B7',
  },
  paymentMethods: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    paddingLeft: 20,
  },
  img: {
    width: 24,
    height: 24,
  },
  paymentMethdodsTxt: {
    marginLeft: 15,
    fontSize: 16,
    color: '#000',
  },
  addressView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 0,
    paddingRight: 20,
  },
});
