import { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

import * as Google from 'expo-auth-session/providers/google';

import { googleConfig } from "../../Google/googleConfig";
import { withFirebaseApi, WithFirebaseApiProps } from '../../Firebase';

const LoginBase = (props: {} & WithFirebaseApiProps) => {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: googleConfig.expoClientId,
  });

  useEffect(() => {
    if (response?.type === "success") {
      props.firebaseApi.signInWithGoogleCredential(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Google Login" onPress={() => { promptAsync(); }} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default withFirebaseApi(LoginBase);
