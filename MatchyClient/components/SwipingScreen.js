// components/SwipingScreen.js

import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, FlatList } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const people = [
  {
    firstName: 'John',
    photos: [
      '../assets/matchy.jpg',
      'https://example.com/photo1_2.jpg',
      '../assets/matchy.jpg',
    ],
  },
  {
    firstName: 'Jane',
    photos: [
      'https://example.com/photo2_1.jpg',
      'https://example.com/photo2_2.jpg',
      'https://example.com/photo2_3.jpg',
    ],
  },
  // Add more people as needed
];

const SwipingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleLike = () => {
    Alert.alert('Liked', `You liked ${people[currentIndex].firstName}`);
    goToNext();
  };

  const handleUnlike = () => {
    Alert.alert('Unliked', `You unliked ${people[currentIndex].firstName}`);
    goToNext();
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % people.length);
  };

  const renderRightActions = () => (
    <View style={styles.actionButton}>
      <Button title="Like" onPress={handleLike} color="green" />
    </View>
  );

  const renderLeftActions = () => (
    <View style={styles.actionButton}>
      <Button title="Unlike" onPress={handleUnlike} color="red" />
    </View>
  );

  const renderPhoto = ({ item }) => (
    <Image source={{ uri: item }} style={styles.photo} />
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Swipeable
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        onSwipeableRightOpen={handleLike}
        onSwipeableLeftOpen={handleUnlike}
      >
        <View style={styles.card}>
          <FlatList
            data={people[currentIndex].photos}
            renderItem={renderPhoto}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
          />
          <Text style={styles.name}>{people[currentIndex].firstName}</Text>
        </View>
      </Swipeable>
      <View style={styles.buttonContainer}>
        <Button title="Unlike" onPress={handleUnlike} color="red" />
        <Button title="Like" onPress={handleLike} color="green" />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    overflow: 'hidden',
  },
  photo: {
    width: 300,
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
});

export default SwipingScreen;
