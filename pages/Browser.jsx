import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import { WebView } from "react-native-webview";
import SearchBar from "../components/search_bar";

import AsyncStorage from "@react-native-async-storage/async-storage";

import BrowserEditBar from "../components/browser_edit_bar";
import {
  GetCurrentID,
  SetCurrentID,
  LoadData_local,
  SaveData_local,
  GetStorageKey,
} from "../utility/Common";

export default function Browser({ navigation }) {
  const [url, setUrl] = useState("https://www.google.com/");

  const [isLoading, setIsLoading] = useState(true);
  const [resourceProfile, setResourceList] = useState({});

  const currentAccountID = GetCurrentID("currentAccountID");
  const focusMemberID = GetCurrentID("focusMemberID");
  const currentResourceID = GetCurrentID("currentResourceID");

  console.log("currentResourceID - Browser: " + currentResourceID);

  useEffect(() => {
    async function fetchData() {
      // For test clear this account profile
      // await SaveData_local(GetStorageKey(currentAccountID, focusMemberID), "");

      try {
        // Pre-load
        let value = await LoadData_local(
          GetStorageKey(currentAccountID, focusMemberID, currentResourceID)
        );

        let tmpMemberProfile = {};

        if (value !== "") {
          tmpMemberProfile = JSON.parse(value);
        } else {
          // value = InitResourceProfile(focusMemberID);
          // tmpMemberProfile = JSON.parse(value);
          // await SaveData_local(
          //   GetStorageKey(currentAccountID, focusMemberID),
          //   value
          // );
        }
        setResourceList(tmpMemberProfile);
        console.log(
          "UserProfile Fetch Data: " + JSON.stringify(tmpMemberProfile)
        );
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  /**
   * @description This function is called when the user submits the search
   * @param {*} searchText
   * @returns {void}
   *
   */
  const handleSubmit = (searchText) => {
    setUrl(`${searchText}`);
  };

  /**
   * @description This function is called when the url changes
   * @param {string} newUrl
   * @returns {void}
   */
  const handleUrlChange = (newUrl) => {
    setUrl(newUrl["url"]);
    console.log(`New URL = ${newUrl}`);
    console.log(newUrl);
  };

  return (
    <View style={styles.container}>
      <BrowserEditBar updateURL={url} />
      <SearchBar onSubmit={handleSubmit} updateURL={url} />
      <WebView
        style={{ marginTop: 10 }}
        source={{ uri: url }}
        onNavigationStateChange={handleUrlChange}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
});
