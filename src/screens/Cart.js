import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../common/Header';
import {useNavigation} from '@react-navigation/native';
import {addItemToCart, removeItemFromCart} from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckoutLayout from '../common/CheckoutLayout';

const Cart = () => {
  const items = useSelector(state => state.cartlist);
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(items.data);
  }, [items]);

  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.qty * item.price;
    });

    return total.toFixed(1);
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        RightIcon={require('../images/cart.png')}
        title={' Cart Item'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={cartItems}
        renderItem={({item}) => {
          return (
            <View style={styles.productItem}>
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
                  <View style={styles.quantityButtons}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => {
                        dispatch(removeItemFromCart(item));
                      }}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.qty}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => {
                        dispatch(addItemToCart(item));
                      }}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      {cartItems.length < 1 && (
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text style={{fontSize: 25, color: '#000'}}>
            No Cart Item in List
          </Text>
        </View>
      )}
      {cartItems.length > 0 && (
        <CheckoutLayout items={cartItems.length} total={getTotal()} />
      )}
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 100,
    height: 130,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  desc: {
    marginTop: 5,
  },
  priceAndButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  price: {
    color: 'green',
    fontSize: 18,
    fontWeight: '600',
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#000',
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffff',
  },
  quantityText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default Cart;
