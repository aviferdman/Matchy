// HomeScreen.js

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions, ImageBackground } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const heartSizes = [24, 32, 40]; // Different heart sizes
const colors = ['#4E7AC7', '#F47DA3', '#FFD700']; // Blue, Pink, Gold
const maxDuration = 6000; // Maximum duration for each heart animation

const HomeScreen = ({ navigation }) => {
  const hearts = useRef(Array(5).fill().map(() => new Animated.Value(0)));
  const timeouts = useRef([]);

  useEffect(() => {
    startAnimations();
    return () => {
      timeouts.current.forEach(timeout => clearTimeout(timeout));
      hearts.current.forEach(animation => animation.stopAnimation());
    };
  }, []);

  const startAnimations = () => {
    hearts.current.forEach((_, index) => {
      animateHeart(index);
    });
  };

  const animateHeart = (index) => {
    const startX = Math.random() * (width - heartSizes[2]) - (width - heartSizes[2]) / 2;
    const startY = Math.random() * (height - heartSizes[2]);
    const endX = Math.random() * (width - heartSizes[2]) - (width - heartSizes[2]) / 2;
    const endY = Math.random() * (height - heartSizes[2]);

    hearts.current[index].setValue(0);

    Animated.timing(hearts.current[index], {
      toValue: 1,
      duration: getRandomDuration(),
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // Animation completed, restart heart animation
      animateHeart(index);
    });

    timeouts.current[index] = setTimeout(() => {
      // Clear animation after max duration
      hearts.current[index].stopAnimation();
    }, maxDuration);
  };

  const getRandomDuration = () => {
    return Math.random() * maxDuration + 1000; // Random duration between 1s to maxDuration + 1s
  };

  return (
    <View style={styles.container}>
      <View style={styles.heartsContainer}>
        {hearts.current.map((animation, index) => {
          const size = heartSizes[Math.floor(Math.random() * heartSizes.length)];
          const color = colors[Math.floor(Math.random() * colors.length)];
          const startX = Math.random() * (width - size) - (width - size) / 2;
          const startY = Math.random() * (height - size);
          const endX = Math.random() * (width - size) - (width - size) / 2;
          const endY = Math.random() * (height - size);

          const heartStyle = {
            position: 'absolute',
            top: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [startY, endY],
            }),
            left: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [startX, endX],
            }),
            zIndex: -1, // Ensure hearts are behind other elements
          };

          return (
            <Animated.View key={index} style={heartStyle}>
              <AntDesign name="heart" size={size} color={color} />
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.logoContainer}>
        <ImageBackground
          source={require('../assets/matchy.jpg')}
          style={styles.logoBackground}
          imageStyle={styles.logoImageStyle}
        >
          {/* Removed Text component as the image contains the text */}
        </ImageBackground>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>Swipe to meet new people!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  heartsContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoBackground: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImageStyle: {
    resizeMode: 'cover',
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#4E7AC7', // Blue color
  },
  registerButton: {
    backgroundColor: '#F47DA3', // Pink color
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  footerText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 20,
  },
});

export default HomeScreen;
