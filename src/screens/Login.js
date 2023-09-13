import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('ali123@gmail.com');
  const [pass, setPass] = useState('moazzam');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [credentials, setCredentials] = useState({email: email, pass: pass});

  const LoginUser = () => {
    if (email.trim() === '' || pass.trim() === '') {
      Alert.alert('Error', 'Please enter both email and password.');
      return; // Exit the function if fields are empty
    }
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.docs.length === 0) {
          Alert.alert('Error', 'Invalid email or password.');
        } else {
          console.log(querySnapshot.docs[0]._data);
          var userData = querySnapshot.docs[0]._data;
          AsyncStorage.setItem('userData', JSON.stringify(userData));
          navigation.navigate('Root', {screen: 'Main'});
        }
      })
      .catch(error => {
        console.error('Error while fetching user data:', error);
        Alert.alert('Error', 'An error occurred while logging in.');
      });
    setEmail('');
    setPass('');
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
                fontSize: 44,
                color: '#000',
                fontWeight: 'bold',
              }}>
              Login
            </Text>
            <Text
              style={{
                marginRight: 'auto',
                fontSize: 16,
                color: '#000',
                fontWeight: 'bold',
                marginVertical: 13,
              }}>
              Please Sign in to Continue
            </Text>
            <TextInput
              label="Email"
              value={email}
              onChangeText={txt => setEmail(txt)}
              style={{
                height: 52,
                marginVertical: 8,
                backgroundColor: '#ece9f2',
                color: '#000',
              }}
            />

            <TextInput
              value={pass}
              label="Password"
              secureTextEntry={secureTextEntry}
              onChangeText={txt => setPass(txt)}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye-off' : 'eye'}
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                  }}
                />
              }
              style={{
                marginVertical: 8,
                backgroundColor: '#ece9f2',
                color: '#000',
                height: 52,
              }}
            />

            <TouchableOpacity
              onPress={() => LoginUser()}
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
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{marginVertical: 7}}
            onPress={() => navigation.navigate('Signup')}>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                // fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Don't have an account? SignUp
            </Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
