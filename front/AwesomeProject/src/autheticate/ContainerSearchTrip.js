import React from 'react';
import { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import SearchTrip from './SearchTrip';
import DateTrip from './DateTrip';
import AvailableTrip from './AvailableTrip';
import Datatrip from './DataTrip';


const SearchStack = createStackNavigator();

const transitionConfig = {
    ...TransitionPresets.SlideFromRightIOS, // Utiliza la animación predeterminada de SlideFromRightAndroid
  };


const ContainerSearch = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    navigator= useNavigation();

    const handleContinuePress = () => {
        navigator.navigate("AvailableTrip");
     };

    return (
        <SearchStack.Navigator
        initialRouteName="SearchTrip"
        screenOptions={{
        headerShown: false,
        ...transitionConfig, // assuming you have this defined elsewhere
        cardStyle: { backgroundColor: 'transparent' },
        }}
    >
             <SearchStack.Screen name="SearchTrip" options={{ headerShown: false }}>
                {props => <SearchTrip {...props} origin={origin} setOrigin={setOrigin} destination={destination} setDestination={setDestination}/>}
            </SearchStack.Screen>
            <SearchStack.Screen name="DateTrip" options={{ headerShown: false }}>
                {props => <DateTrip {...props} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} handleContinuePress={handleContinuePress} nameButtonContinue={"Buscar"}/>}
            </SearchStack.Screen>
            <SearchStack.Screen name="AvailableTrip" options={{ headerShown: false }}>
                {props => <AvailableTrip {...props} />}
            </SearchStack.Screen>
            <SearchStack.Screen name="DataTrip" options={{ headerShown: false }}>
                {props => <Datatrip {...props} />}
            </SearchStack.Screen>
        </SearchStack.Navigator>
    );
};

export default ContainerSearch;
