import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { useState } from 'react';
import SelectedHome from './SelectedHome';
import SearchTrip from './SearchTrip';
import DateTrip from './DateTrip';
import AsientosDisp from './AsientosDisp';
import AvailableTrip from './AvailableTrip';
import Datatrip from './DataTrip';
import TimeTrip from './TimeTrip';
import CarTrip from './CarTrip';
import CostTrip from './CostTrip';
import PostTrip from './PostTrip';

const HomeAppStack = createStackNavigator();

const transitionConfig = {
    ...TransitionPresets.SlideFromRightIOS, // Utiliza la animación predeterminada de SlideFromRightAndroid
  };

const ContainerPublishTrip = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [asientos, setAsientos] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [typeCarText, settypeCarText] = useState('');
    const [modelCarText, setmodelCarText] = useState('');
    const [patenteText, setPatenteText] = useState('');
    const [cost, setCost] = useState('');

  return (
    <HomeAppStack.Navigator
      initialRouteName="SelectedHome"
      screenOptions={{
        headerShown: false,
        ...transitionConfig, // assuming you have this defined elsewhere
        cardStyle: { backgroundColor: 'transparent' },
      }}
    >
      <HomeAppStack.Screen name="SelectedHome" options={{ headerShown: false }}>
        {props => <SelectedHome {...props} />}
      </HomeAppStack.Screen>
      <HomeAppStack.Screen name="SearchTrip" options={{ headerShown: false }}>
        {props => <SearchTrip {...props} origin={origin} setOrigin={setOrigin} destination={destination} setDestination={setDestination}/>}
      </HomeAppStack.Screen>
      <HomeAppStack.Screen name="DateTrip" options={{ headerShown: false }}>
        {props => <DateTrip {...props} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>}
      </HomeAppStack.Screen>
      <HomeAppStack.Screen name="TimeTrip" options={{ headerShown: false }}>
        {props => <TimeTrip {...props} startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime}/>}
      </HomeAppStack.Screen>
      <HomeAppStack.Screen name="CarTrip" options={{ headerShown: false }}>
        {props => <CarTrip {...props} patenteText={patenteText} setPatenteText={setPatenteText} modelCarText={modelCarText} setmodelCarText={setmodelCarText} typeCarText={typeCarText} settypeCarText={settypeCarText}/>}
      </HomeAppStack.Screen>
      <HomeAppStack.Screen name="AsientosDisp" options={{ headerShown: false }}>
        {props => <AsientosDisp {...props} asientos={asientos} setAsientos={setAsientos}/>}
      </HomeAppStack.Screen>
      <HomeAppStack.Screen name="CostTrip" options={{ headerShown: false }}>
        {props => <CostTrip {...props} cost={cost} setCost={setCost}/>}
      </HomeAppStack.Screen>
      <HomeAppStack.Screen name="PostTrip" options={{ headerShown: false }}>
        {props => <PostTrip {...props} origin={origin}
                            destination={destination}
                            startDate={startDate}
                            endDate={endDate}
                            asientos={asientos}
                            startTime={startTime}
                            endTime={endTime}
                            typeCarText={typeCarText}
                            modelCarText={modelCarText}
                            patenteText={patenteText}
                            cost={cost} />}
      </HomeAppStack.Screen>
      <HomeAppStack.Screen name="AvailableTrip" options={{ headerShown: false }}>
        {props => <AvailableTrip {...props} />}
      </HomeAppStack.Screen>
      <HomeAppStack.Screen name="DataTrip" options={{ headerShown: false }}>
        {props => <Datatrip {...props} />}
      </HomeAppStack.Screen>
    </HomeAppStack.Navigator>
  );
};

export default ContainerPublishTrip;
