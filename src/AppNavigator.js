import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './screens/Main';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Checkout from './screens/Checkout';
import AddAddress from './screens/AddAddress';
import Addresses from './screens/Addresses';
import PaymentScreen from './screens/StripePayment';
import User from '../src/screens/User';
import Search from '../src/screens/Search';
import Wishlist from '../src/screens/Wishlist';
import HomeScreen from './screens/HomeScreen';
import Splash from './screens/Splash';
import Home from './screens/tabs/Home';
import EditProfiledata from './common/EditProfileData';


const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        /> */}
         <Stack.Screen
           component={HomeScreen}
           name='HomeScreen'
           options={{headerShown:false}}
         />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Addresses"
          component={Addresses}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{
            headerShown: false,
            headerStyle: {
              height: 80,
              backgroundColor: '#0786DAFD',
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: '#fff',
            },
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Wishlist"
          component={Wishlist}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="EditProfiledata"
          component={EditProfiledata}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Root"
          component={Main}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
