/* eslint-disable prettier/prettier */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './Components/AppNavigator';


const App: React.FC<{}> = () => {

    return(
        <NavigationContainer>
            <AppNavigator/>
        </NavigationContainer>
    )
}

export default App; 