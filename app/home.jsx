import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('./../assets/images/home.jpg')} // Ensure 'home.jpg' is in your assets directory
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>The Ideal Matrimony...</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('form')} // Navigate to Form page
        >
          <Text style={styles.buttonText}>Register Here</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end', // Keep content at the bottom
    alignItems: 'center',
  },
  title: {
    fontFamily: 'outfit-bold', // Bold font for the title
    fontSize: 35,
    textAlign: 'center',
    color: '#fff', // White text color
    marginBottom: 200, // Adjusted space below the title
  },
  buttonContainer: {
    marginBottom: 100, // Maintain spacing from bottom of the screen
    alignItems: 'center', // Center align the button
  },
  button: {
    backgroundColor: '#b95d8d', // Consistent button color
    padding: 14,
    borderRadius: 14,
    width:320,
    height: 60, // Match the height of the button in LoginScreen
    justifyContent: 'center',

  },
  buttonText: {
    color: '#fff',
    fontFamily: 'outfit-medium', // Assuming Outfit is already set up globally
    fontSize: 20, // Increase font size for visibility
    textAlign: 'center',
  },
});

export default Home;
