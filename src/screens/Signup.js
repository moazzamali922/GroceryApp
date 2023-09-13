import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const addUser = () => {
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      mobile.trim() === '' ||
      pass.trim() === '' ||
      confirmPass.trim() === ''
    ) {
      Alert.alert('Field Required', 'Please Fill All Input Fields');
      return;
    }

    if (pass !== confirmPass) {
      Alert.alert(
        'Password Mismatch',
        'Passwords do not match. Please try again.',
        [
          {
            text: 'Ok',
          },
        ],
      );
      return;
    }
    // Email validation
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    if (!isEmailValid) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.', [
        {
          text: 'Ok',
        },
      ]);
      return;
    }

    const userData = {
      name: name,
      email: email,
      mobile: mobile,
    };

    firestore()
      .collection('Users')
      .add(userData)
      .then(() => {
        console.log('User added!');
        Alert.alert('User Created', 'Thank You', [
          {
            text: 'OK',
            onPress: () => {
              setName('');
              setEmail('');
              setMobile('');
              setPass('');
              setConfirmPass('');
              navigation.navigate('Login');
            },
          },
        ]);
      })
      .catch(error => {
        console.error('Error adding user: ', error);
        Alert.alert('Error', 'Failed to create user. Please try again later.');
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        resizeMode="cover"
        source={require('../images/bg.jpg')}
        style={{width: '100%', height: '100%'}}>
        {/* <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'flex-start'}}> */}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: '80%', alignSelf: 'center'}}>
            <Text
              style={{
                marginBottom: 20,
                fontSize: 35,
                color: '#000',
                fontWeight: 'bold',
              }}>
              Create Account
            </Text>
            <TextInput
              label="Name"
              onChangeText={txt => setName(txt)}
              value={name}
              style={{
                marginVertical: 5,
                backgroundColor: '#ece9f2',
                height: 52,
              }}
            />
            <TextInput
              label="Email"
              value={email}
              onChangeText={txt => setEmail(txt)}
              style={{
                marginVertical: 5,
                backgroundColor: '#ece9f2',
                height: 52,
              }}
            />
            <TextInput
              label="Mobile"
              value={mobile}
               keyboardType='number-pad'
              onChangeText={txt => setMobile(txt)}
              style={{
                marginVertical: 5,
                backgroundColor: '#ece9f2',
                height: 52,
              }}
            />
            <TextInput
              value={pass}
              label="Password"
              onChangeText={txt => setPass(txt)}
              secureTextEntry={secureTextEntry}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye-off' : 'eye'}
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}
                />
              }
              style={{
                marginVertical: 5,
                backgroundColor: '#ece9f2',
                height: 52,
              }}
            />
            <TextInput
              value={confirmPass}
              label="Confirm Password"
              secureTextEntry={secureTextEntry1}
              right={
                <TextInput.Icon
                  icon={secureTextEntry1 ? 'eye-off' : 'eye'}
                  onPress={() => {
                    setSecureTextEntry1(!secureTextEntry1);
                  }}
                />
              }
              onChangeText={txt => setConfirmPass(txt)}
              style={{
                marginVertical: 5,
                backgroundColor: '#ece9f2',
                height: 52,
              }}
            />
            <TouchableOpacity
              onPress={() => addUser()}
              style={{
                backgroundColor: '#FF9A0C',
                borderRadius: 10,
                padding: 13,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 17,
                  fontWeight: 'bold',
                }}>
                SignUp
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{marginVertical: 7}}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: 17,
                color: '#fff',
                // fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Already have an account ? SignIn
            </Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({});
