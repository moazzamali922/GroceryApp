import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {addProfile} from '../redux/slices/ProfileSlice';
import {useNavigation} from '@react-navigation/native';
// import {Platform, PermissionsAndroid} from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';

const EditProfiledata = ({modalVisible, onClose}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // const ImagePick = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.requestMultiple([
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //     ]);

  //     if (
  //       granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
  //       granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
  //     ) {
  //       // Permissions granted, you can now open the gallery
  //       ImagePicker.openCamera({
  //         width: 300,
  //         height: 400,
  //         cropping: true,
  //       }).then(image => {
  //         console.log(image);
  //       });
  //     } else {
  //       // Permissions denied, handle this case
  //       console.warn('Permissions denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

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
            // alignItems: 'center',
            borderRadius: 15,
            width: '90%',
            height: 260,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => onClose()}
            style={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              marginBottom: 20,
            }}>
            <Image
              style={{width: 25, height: 25, marginLeft: 'auto'}}
              source={require('../images/close.png')}
            />
          </TouchableOpacity>
          <View style={{width: '80%', alignSelf: 'center'}}>
            <TextInput
              label="Name"
              style={{backgroundColor: '#ccc'}}
              value={name}
              onChangeText={txt => setName(txt)}
            />

            <TextInput
              label="Email"
              style={{backgroundColor: '#ccc', marginVertical: 8}}
              value={email}
              onChangeText={txt => setEmail(txt)}
            />

            {/* <View style={{width: '50%', height: 40}}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#000',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  ImagePicker.openPicker({
                    width: 300,
                    height: 400,
                    cropping: true,
                  }).then(image => {
                    console.log(image);
                  });
                }}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  Pic Image From Gallery{' '}
                </Text>
              </TouchableOpacity>
            </View> */}

            <TouchableOpacity
              onPress={() => {
                const isEmailValid =
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
                if (!isEmailValid) {
                  Alert.alert(
                    'Invalid Email',
                    'Please enter a valid email address.',
                    [
                      {
                        text: 'Ok',
                      },
                    ],
                  );
                  return;
                }
                else if (email.trim() === '' || name.trim() === '') {
                  Alert.alert(
                    'Input Field',
                    'Fill Input Field Please Thanku You',
                  );
                } else {
                  dispatch(
                    addProfile({
                      name: name,
                      email: email,
                      id: uuid.v4(),
                    }),
                  );
                  onClose();
                  setEmail('');
                  setName('');
                }
              }}
              style={{
                borderRadius: 15,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FF9A0C',
                marginVertical: 10,
                width: '40%',
                alignSelf: 'center',
              }}>
              <Text style={{textAlign: 'center', color: '#fff'}}>
                Save Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfiledata;

const styles = StyleSheet.create({});
