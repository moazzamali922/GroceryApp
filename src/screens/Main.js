import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import CustomDrawer from './CustomDrawer';
import PaymentScreen from './StripePayment';

const Drawer = createDrawerNavigator();
const Main = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer />}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
