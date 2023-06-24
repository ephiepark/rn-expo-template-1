import Login from './src/components/Login';
import * as WebBrowser from 'expo-web-browser';
import { withFirebaseApi, FirebaseContext, FirebaseApi, WithFirebaseApiProps } from './src/Firebase';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { useEffect } from 'react';
import { handleUserChange } from './src/redux/userSlice';
import { useAppDispatch, useAppSelector } from './src/redux/hooks';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

WebBrowser.maybeCompleteAuthSession();

const Tab = createBottomTabNavigator();

const AppBase = (props: {} & WithFirebaseApiProps) => {
  const userId = useAppSelector((state) => state.user.userId);
  const dispatch = useAppDispatch();

  console.log(userId);
  useEffect(() => {
    return props.firebaseApi.onAuthStateChanged((user) => {
      if (user) {
        dispatch(handleUserChange(props.firebaseApi, user.uid));
      } else {
        dispatch(handleUserChange(props.firebaseApi, null));
      }
    });
  }, []);

  return (<Tab.Navigator>
    <Tab.Screen name="Login" component={Login} />
  </Tab.Navigator>);

}
const App = withFirebaseApi(AppBase);

export default () => {
  return (
    <Provider store={store}>
      <FirebaseContext.Provider value={new FirebaseApi()}>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </FirebaseContext.Provider>
    </Provider>
  );
}
