/* eslint-disable prettier/prettier */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PostsScreenComponent from './PostsScreenComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './AppNavigator';
import ProfileScreenComponent from './ProfileScreenComponent';

const Tap = createBottomTabNavigator();

type MainNavigatorScreenComponentProps=NativeStackScreenProps<RootStackParamList, 'MainNavigator'>

const MainNavigatorScreenComponent:React.FC<MainNavigatorScreenComponentProps> = ()=>(

    <Tap.Navigator>
        <Tap.Screen name="Posts" component={PostsScreenComponent} />
        <Tap.Screen name="Profile" component={ProfileScreenComponent} />
    </Tap.Navigator>

);
export default MainNavigatorScreenComponent;

