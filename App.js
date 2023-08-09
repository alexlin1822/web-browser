import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

import { LoadAccountData, GetInfo } from "./utility/Common";
import Browser from "./pages/Browser";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  const [accountNums, setAccountNums] = useState(0); //Used to store the number of existing accounts
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
        LoadAccountData;

        // Get the number of existing accounts
        setAccountNums(parseInt(await GetInfo("accountNums")));
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

  //If there is an account, show the Login page, else show the Signup page
  if (accountNums > 0) {
    return <Login />;
  } else {
    return <Signup />;
  }
}
