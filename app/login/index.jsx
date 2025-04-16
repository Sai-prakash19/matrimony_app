import { View, Text, Image, Pressable } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth, useUser } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { isSignedIn } = useUser(); // Check if the user is signed in
  const router = useRouter();

  const onPress = useCallback(async () => {
    if (isSignedIn) {
      // Redirect to home if already signed in
      router.replace('/home');
      return;
    }

    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        console.log('Session created:', createdSessionId);
        // Optionally navigate to home here after successful login
        router.replace('/home');
      } else {
        console.error('Session creation failed.');
      }
    } catch (err) {
      console.error('OAuth error', JSON.stringify(err));
    }
  }, [isSignedIn, startOAuthFlow, router]);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('./../../assets/images/subhodaya1.jpg')} // Set as full background
        style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        resizeMode="cover" // Cover the entire screen
      />
      <View style={{ padding: 20, flex: 1, justifyContent: 'flex-end' }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 35, textAlign: 'center', color:'#fff', marginBottom:100 }}>
            Discover the Everlasting Bond!
          </Text>
        <Pressable
          onPress={onPress}
          style={{ padding: 14, backgroundColor: '#b95d8d', borderRadius: 14, height: 60, marginBottom:100 }}
        >
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, color: '#fff', textAlign: 'center' }}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
