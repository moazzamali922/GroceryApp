import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Home from './tabs/Home';
import Search from './Search';
import Wishlist from './Wishlist';
import User from './User';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {selectedTab === 0 ? (
        <Home />
      ) : selectedTab === 1 ? (
        <Search />
      ) : selectedTab === 2 ? (
        <Wishlist />
      ) : (
        <User />
      )}

      {!isKeyboardVisible && (
        <View style={styles.BottomView}>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => setSelectedTab(0)}>
            <Image
              source={
                selectedTab == 0
                  ? require('../images/home.png')
                  : require('../images/home_fill.png')
              }
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => setSelectedTab(1)}>
            <Image
              source={
                selectedTab == 2
                  ? require('../images/search.png')
                  : require('../images/search.png')
              }
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => setSelectedTab(2)}>
            <Image
              source={
                selectedTab == 2
                  ? require('../images/wishlist_fill.png')
                  : require('../images/wishlist.png')
              }
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => setSelectedTab(4)}>
            <Image
              source={
                selectedTab == 4
                  ? require('../images/user_fill.png')
                  : require('../images/user.png')
              }
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
});
