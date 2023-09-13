import React, { useEffect } from 'react';
import { StyleSheet, View, Image,Text } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    // Wait for 3 seconds and then navigate to the Login page
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
       <Text style={{fontSize:30,color:"#000",fontWeight:"bold",marginVertical:20,}}>Grocery App</Text>
      <Image source={require('../images/shopping.png')} style={styles.image} />
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width:200,  
    height:200,
  },
});

export default Splash;
