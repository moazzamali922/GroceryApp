import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
 
 
const AskForLoginModal = ({
  onClickLogin,
  onClickSignup,
  modalVisible,
  onClose,
}) => {
  return (
    <Modal visible={modalVisible} transparent>
      <View
        style={{  
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        <View
          style={{
            backgroundColor: '#fff', 
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15, 
            width: '90%',
            height: 240,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
           onPress={()=>onClose()}
            style={{
              width: '80%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              marginBottom: 20,
            }}>
            <Image
              style={{width: 30, height: 30, marginLeft: 'auto'}}
              source={require('../images/close.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
               onPress={()=>onClickLogin()}
            style={{
              marginVertical: 5,
              width: '80%',
              height: 60,
              backgroundColor: '#FF9A0C',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <Text style={{color: '#fff', alignItems: 'center', fontSize: 19}}>
              {'Login'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>onClickSignup()} 
            style={{
              marginVertical: 5,
              width: '80%',
              height: 60,
              backgroundColor: '#FF9A0C',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
            }}>
            <Text style={{color: '#fff', alignItems: 'center', fontSize: 17}}>
              {'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AskForLoginModal;

const styles = StyleSheet.create({});
