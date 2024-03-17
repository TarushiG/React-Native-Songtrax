import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import PrimaryScreen from './root/Views/PrimaryScreen/PrimaryScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="PrimaryScreen" component={PrimaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
