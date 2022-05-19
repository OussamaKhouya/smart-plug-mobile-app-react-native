import React, { useState } from "react";

import WelcomeScreen from "./app/screens/WelcomeScreen";
import PlugingScreen from "./app/screens/PlugingScreen";
import AccessPScreen from "./app/screens/AccessPScreen";
import WifiScreen from "./app/screens/WifiScreen";
import EnergyScreen from "./app/screens/EnergyScreen";
import PowerScreen from "./app/screens/PowerScreen";
import VoltageScreen from "./app/screens/VoltageScreen";
import CurrentScreen from "./app/screens/CurrentScreen";
import  MyCharts  from "./app/MyCharts";
import IconChoices from "./app/screens/IconChoice";

//Chargement des fonts externs:
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFont = () => {
  return Font.loadAsync({
    RalewayEL: require("./app/assets/fonts/Raleway-ExtraLight.ttf"),
    RalewayM: require("./app/assets/fonts/Raleway-Medium.ttf"),
    RalewayL: require("./app/assets/fonts/Raleway-Light.ttf"),
    RalewayR: require("./app/assets/fonts/Raleway-Regular.ttf"),
    Surfer: require("./app/assets/fonts/OriginalSurfer-Regular.ttf"),
  });
};

// Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginForm from "./app/LoginForm";

//Firebase
import LoadingScreen from "./app/screens/LoadingScreen";
import InscriptionScreen from "./app/screens/InscriptionScreen";
import ConnectScreen from "./app/screens/ConnectScreen";
import HomeScreen from "./app/screens/HomeScreen";

import firebase from 'firebase';
import PriseRenomer from "./app/screens/PriseRenomer";
import IconChoice from "./app/screens/IconChoice";
import PrisesUserScreen from "./app/screens/PrisesUserScreen";
if (!firebase.apps.length)
firebase.initializeApp({
  apiKey: "AIzaSyAWrzHZhlAyW_5i14uALyZqilr9j--vy6Y",
    authDomain: "lasttry-c0a6c.firebaseapp.com",
    projectId: "lasttry-c0a6c",
    storageBucket: "lasttry-c0a6c.appspot.com",
    messagingSenderId: "107061644985",
    appId: "1:107061644985:web:d5d6767c54b633a0c09568"
  });
else 
    firebase.app();


//Navigation
const Stack = createStackNavigator();
const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="LoadingScreen"
  >
    <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
    <Stack.Screen name="PrisesUserScreen" component={PrisesUserScreen} />
    <Stack.Screen name="ConnectScreen" component={ConnectScreen} />
    <Stack.Screen name="InscriptionScreen" component={InscriptionScreen} />
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Stack.Screen name="PriseRenomer" component={PriseRenomer} />
    <Stack.Screen name="IconChoice" component={IconChoices} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />

    <Stack.Screen name="LoginForm" component={LoginForm} />
    <Stack.Screen name="MyCharts" component={MyCharts} />
    <Stack.Screen name="PlugingScreen" component={PlugingScreen} />
    <Stack.Screen name="AccessPScreen" component={AccessPScreen} />
    <Stack.Screen name="WifiScreen" component={WifiScreen} />
    <Stack.Screen name="EnergyScreen" component={EnergyScreen} />
    <Stack.Screen name="PowerScreen" component={PowerScreen} />
    <Stack.Screen name="VoltageScreen" component={VoltageScreen} />
    <Stack.Screen name="CurrentScreen" component={CurrentScreen} />
  </Stack.Navigator>
);

const App = () => {
  //S'il y a un problème avec les fonts.
  const [fontLoaded, setfontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFont}
        onError={() => console.log("Error")}
        onFinish={() => setfontLoaded(true)}
      />
    );
  }

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
