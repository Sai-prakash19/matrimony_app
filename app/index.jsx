import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { Text, View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { COLORS, SIZES } from "./../app/theme";

const slides = [
  {
    id: 1,
    title: 'Welcome to Shubhodaya!',
    description: 'Shubhodaya: The Telugu Matrimony, An app for the Telugu states.',
    image: require("./../assets/images/screen1.png"),
  },
  {
    id: 2,
    title: '100% Genuine profiles',
    description: 'Verified profiles and 100% genuine connections. You relax while we handle the contacting process.',
    image: require("./../assets/images/screen2.png"),
  },
  {
    id: 3,
    title: 'Register & Relax',
    description: 'Just register, and we will take care of the rest! Simple, Easy and Stress-free.',
    image: require("./../assets/images/screen3.png"),
  }
];

export default function Index() {
  const [showHomePage, setShowHomePage] = useState(false);
  const router = useRouter(); // Use router for navigation

  const buttonLabel = (label) => {
    return (
      <View style={{ padding: 12 }}>
        <Text style={{ color: COLORS.title, fontWeight: '600', fontSize: SIZES.h4 }}>
          {label}
        </Text>
      </View>
    );
  }

  if (!showHomePage) {
    return (
      <View style={{ flex: 1, backgroundColor: '#f0d1db' }}>
        
        {/* App Intro Slider */}
        <AppIntroSlider
          data={slides}
          renderItem={({ item }) => {
            return (
              <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',  // Centers image and description in the middle of the screen
                padding: 15,
                backgroundColor: '#f0d1db',
              }}>
                <Image
                  source={item.image}
                  style={{
                    width: SIZES.width - 88,
                    height: 400,
                  }}
                  resizeMode='contain'
                />
                <Text style={{
                  fontWeight: 'bold',
                  color: COLORS.title,
                  fontSize: SIZES.h1,
                  marginTop: 20,
                }}>
                  {item.title}
                </Text>
                <Text style={{
                  textAlign: 'center',
                  paddingTop: 5,
                  color: COLORS.title,
                }}>
                  {item.description}
                </Text>
              </View>
            );
          }}
          activeDotStyle={{
            backgroundColor: '#b95d8d',
            width: 30,
          }}
          showSkipButton
          renderNextButton={() => buttonLabel('Next')}
          renderSkipButton={() => buttonLabel('Skip')}
          renderDoneButton={() => buttonLabel('Done')}
          onDone={() => {
            router.push('/login'); // Redirect to /login after Done
          }}
        />
      </View>
    );
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#f0d1db',
    }}>
      <Text>Welcome to the Home Page</Text>
    </View>
  );
}
