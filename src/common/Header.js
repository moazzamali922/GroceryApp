import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Header = ({
  title,
  leftIcon,
  RightIcon,
  onClickLeftIcon,
  isCart,
}) => {
  const navigation = useNavigation();
  const items = useSelector(state => state.cartlist);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btn}
        onPress={onClickLeftIcon}>
        <Image source={leftIcon} style={styles.icon} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
     { 
      !isCart && <View></View>
     }

      {isCart && (
        <TouchableOpacity
          style={styles.cartBtn} 
          onPress={() => navigation.navigate('Cart')}>
          <Image
            source={RightIcon}
            style={[styles.icon, { width: 40, height: 40 }]}
          />
          {items.data.length > 0 && (
            <View style={styles.cartItemCount}>
              <Text style={styles.cartItemCountText}>
                {items.data.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}; 

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 65,
    backgroundColor: '#0786DAFD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  cartBtn: {
    position: 'relative',
  },
  cartItemCount: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCountText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Header;
