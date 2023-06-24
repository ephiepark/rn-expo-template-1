import Login from './src/components/Login';
import * as WebBrowser from 'expo-web-browser';
import { withFirebaseApi, FirebaseContext, FirebaseApi } from './src/Firebase';

WebBrowser.maybeCompleteAuthSession();

const AppBase = () => {
  return <Login />;
}
const App = withFirebaseApi(AppBase);

export default () => {
  return (
    <FirebaseContext.Provider value={new FirebaseApi()}>
      <App />
    </FirebaseContext.Provider>
  );
}
