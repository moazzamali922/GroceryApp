import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header'; 
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';
import {useDispatch} from 'react-redux';
import {addItemToWishList} from '../redux/slices/WishlistSlice';
import {addItemToCart} from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AskForLoginModal from '../common/AskForLoginModal';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  // const [modalVisible, setModalVisible] = useState(false);

  // const checkUserStatus = async () => {
  //   let UserLoggedIn = false;
  //   const status = await AsyncStorage.getItem('IS_USER_LOGGED_IN');
  //   if (status == null) {
  //     UserLoggedIn = true;
  //   } else {
  //     UserLoggedIn = false;
  //   }
  //   return UserLoggedIn;
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Header
          leftIcon={require('../images/back.png')}
          RightIcon={require('../images/cart.png')}
          title={'Product Detail'}
          onClickLeftIcon={() => {
            navigation.goBack();
          }}
          isCart={true}
        />
        <Image source={{uri: route.params.data.image}} style={styles.banner} />
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.desc}>{route.params.data.description}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.price, {color: '#000'}]}>{'Price:'}</Text>
          <View style={styles.quantityButtons}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{qty}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => {
                setQty(qty + 1);
              }}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(addItemToWishList(route.params.data));

            // if (checkUserStatus() === true) {
            //   dispatch(addItemToWishList(route.params.data));
            // } else {
            //   // setModalVisible(true);
            // } 
          }}
          style={styles.wishListBtn}>
          <Image
            style={styles.icon}
            source={require('../images/wishlist.png')}
          />
        </TouchableOpacity>
        <CustomButton
          color={'#fff'}
          bg={'#FF9A0C'}
          title={'Add To Cart'}
          onClick={() => {
            dispatch(
              addItemToCart({
                category: route.params.data.category,
                description: route.params.data.description,
                id: route.params.data.id,
                image: route.params.data.image,
                price: route.params.data.price,
                qty: qty,
                rating: route.params.data.rating,
                title: route.params.data.title,
              }),
            );
            // if (checkUserStatus() === true) {
            //   dispatch(
            //     addItemToCart({
            //       category: route.params.data.category,
            //       description: route.params.data.description,
            //       id: route.params.data.id,
            //       image: route.params.data.image,
            //       price: route.params.data.price,
            //       qty: qty,
            //       rating: route.params.data.rating,
            //       title: route.params.data.title,
            //     }),
            //   );
            // } else {
            //   // setModalVisible(true);
            // }
          }}
        />
        {/* <AskForLoginModal
          modalVisible={modalVisible}
          onClose={() => {
            setModalVisible(false);
          }}
          onClickLogin={() => navigation.navigate('Login')}
          onClickSignup={() => navigation.navigate('Signup')}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 20,
  },
  desc: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 10,
  },
  price: {
    color: 'green',
    fontSize: 20,
    marginHorizontal: 20,
    marginTop: 20,
    fontWeight: '800',
  },
  wishListBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  icon: {
    width: 35,
    height: 35,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 13,
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
