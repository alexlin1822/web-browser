import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

import { GlobalStateProvider } from "./GlobalStateContext";
import Browser from "./pages/Browser";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  const [isReady, setIsReady] = useState(false); //For loading app
  const [accountNums, setAccountNums] = useState(0); //Used to store the number of existing accounts

  /**
   * Load app settings before render
   */
  const loadAppSettings = async () => {
    // try {
    //   console.log(`Save data inside`);
    //   const result = await AsyncStorage.setItem(
    //     "@KidWebBrowser:AccountNums",
    //     "0"
    //   );
    //   console.log(result);
    // } catch (error) {
    //   // Error saving data
    //   console.log(error);
    // }

    console.log(`Loading data`);

    try {
      console.log("@KidWebBrowser:AccountNums");

      const value = await AsyncStorage.getItem("@KidWebBrowser:AccountNums");

      if (value !== null) {
        setAccountNums(parseInt(value));
      } else {
        setAccountNums(0);
      }
    } catch (error) {
      // No account found
      setAccountNums(0);
    }
  };

  if (!isReady) {
    console.log(`Got account number.`);
    return (
      <AppLoading
        startAsync={loadAppSettings}
        onFinish={() => setIsReady(true)}
        onError={(error) => console.error("Error loading app:", error)}
      />
    );
  }

  //If there is an account, show the Login page, else show the Signup page
  if (accountNums > 0) {
    return (
      <GlobalStateProvider>
        <Login />
      </GlobalStateProvider>
    );
  } else {
    return (
      <GlobalStateProvider>
        <Signup />
      </GlobalStateProvider>
    );
  }
}
