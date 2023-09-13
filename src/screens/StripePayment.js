import {
  Alert,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {CardField, confirmPayment} from '@stripe/stripe-react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const PaymentScreen = ({route}) => {
  const {totalAmount} = route.params;
  const navigation = useNavigation();
  const [cardInfo, setCardInfo] = useState(null);
  const {PaymentType} = route.params;
  const fetchCardDetail = cardDetail => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };
  const onDone = async () => {
    axios
      .post('http://192.168.0.101:4002/payment-sheet1', {
        currency: 'usd',
        paymentMethodType: 'Card',
        amount: totalAmount,
      })
      .then(response => {
        if (response.data.paymentIntent) {
          let confirmPaymentIntent = confirmPayment(
            response?.data?.paymentIntent,
            {paymentMethodType: 'Card'},
          );
          console.log('confirmPaymentIntent res++++', confirmPaymentIntent);
          Alert.alert('Payment!', 'Response received!', [
            {text: 'OK', onPress: () => navigation.navigate('Home')},
          ]);
        }
        console.log(response.data);
      })
      .catch(error => {
        console.warn('Error while creating payment intent: ' + error);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
        source={require('../images/bg.jpg')}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}>
          <TouchableOpacity
            style={{padding: 20}}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../images/back.png')}
              style={{width: 45, height: 45, tintColor: '#fff'}}
            />
          </TouchableOpacity>
          <View
            style={{
              padding: 16,
              justifyContent: 'center',
              width: '90%',
              alignSelf: 'center',
              height: 600,
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontSize: 40,
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {PaymentType ? `${PaymentType}` : ''}
              </Text>
            </View>
            <CardField
              postalCodeEnabled={false}
              placeholders={{
                number: '4242 4242 4242 4242',
                textColor: 'black',
              }}
              textColor={'black'}
              cardStyle={{
                backgroundColor: '#FFFFFF',
                textColor: 'black',
              }}
              style={{
                width: '100%',
                height: 50,
                marginVertical: 30,
                backgroundColor: '#fff',
              }}
              onCardChange={cardDetails => {
                fetchCardDetail(cardDetails);
              }}
              onFocus={focusedField => {
                console.log('focusField', focusedField);
              }}
            />
            <TouchableOpacity
              disabled={!cardInfo}
              style={{
                backgroundColor: cardInfo ? '#D7654D' : '#ccc',
                height: 42,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                onDone();
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
                DONE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default PaymentScreen;
