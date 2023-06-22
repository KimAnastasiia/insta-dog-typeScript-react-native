/* eslint-disable prettier/prettier */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreenComponent from './LoginScreenComponent';
import RegistrationScreenComponent from './RegistrationScreenComponent';
import MainNavigatorScreenComponent from './MainNavigatorScreenComponent';

export type RootStackParamList = {
  Login: undefined;
  Registration:undefined,
  MainNavigator:undefined
};


const Stack = createNativeStackNavigator<RootStackParamList>();


const AppNavigator: React.FC = () => {
  return (
      <Stack.Navigator screenOptions={{ headerTitle: '' }}>
        <Stack.Screen name='Login' component={LoginScreenComponent} />
        <Stack.Screen name='Registration' component={RegistrationScreenComponent} />
        <Stack.Screen name='MainNavigator' component={MainNavigatorScreenComponent} />
      </Stack.Navigator>
  );
};

export default AppNavigator;