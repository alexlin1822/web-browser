import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import { LoadAccountData, getShowNavigationBar } from "./utility/Common";
import Browser from "./pages/Browser";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import BrowserViewer from "./pages/BrowserViewer";

const Stack = createStackNavigator();

export default function App() {
  // const [accountNums, setAccountNums] = useState(0); //Used to store the number of existing accounts
  const [appIsReady, setAppIsReady] = useState(false);

  /**
   * Load app settings before render
   */
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // Load account data
        // LoadAccountData;
        // Get the number of existing accounts
        // setAccountNums(parseInt(await GetInfo("accountNums")));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // headerShown: getShowNavigationBar,
          headerShown: true,
          gestureEnabled: false,
        }} //Hide or show the header
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Browser" component={Browser} />
        <Stack.Screen name="BrowserViewer" component={BrowserViewer} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
