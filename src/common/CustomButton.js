import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';

const { height, width } = Dimensions.get('window');

const CustomButton = ({ title, bg, color, onClick, }) => { 
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: bg }]}
      onPress={() => {
        onClick();
      }}>
      <Text style={{ color: color, fontSize: 18, fontWeight: '500' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    width: Dimensions.get('window').width -40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom:20,
    borderRadius: 10,
  },
});
