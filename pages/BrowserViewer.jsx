import React, { useState, useEffect, useRef } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { WebView } from "react-native-webview";
// import SearchBar from "../components/search_bar";

import AsyncStorage from "@react-native-async-storage/async-storage";

import BrowserEditBar from "../components/browser_edit_bar";

import {
  GetCurrentID,
  LoadData_local,
  SaveData_local,
  GetStorageKey,
} from "../utility/Common";
import BrowserViewBar from "../components/browser_view_bar";

export default function BrowserViewer({ route, navigation }) {
  const { item, isEditMode } = route.params; //get params from previous page

  console.log("Browser - item here: " + JSON.stringify(item));

  const [url, setUrl] = useState(item.last_url);
  const [webTitle, setWebTitle] = useState("");
  const [favicon, setFavicon] = useState("");

  const [resourceProfile, setResourceList] = useState(item);

  const currentAccountID = GetCurrentID("currentAccountID");
  const focusMemberID = GetCurrentID("focusMemberID");
  const currentResourceID = GetCurrentID("currentResourceID");

  const webViewRef = useRef(null);

  console.log("currentResourceID - Browser: " + currentResourceID);
  console.log("url 00", url);

  const handleEditSubmit = async (newResourceProfile) => {
    if (newResourceProfile === null) {
      navigation.navigate("Home", { needLoad: false });
    }
  };

  const urlList = item.url_include.split(",");
  const titleList = item.title_include.split(",");
  const whitelistList = item.whitelist.split(",");

  const checkWeb = (currentUrl, currentTitle) => {
    if (currentUrl === item.default_url) {
      return true;
    }

    if (item.use_url_include) {
      //check url
      for (let i = 0; i < urlList.length; i++) {
        if (currentUrl.includes(urlList[i])) {
          return true;
        }
      }
    }

    if (item.use_title_include) {
      //check title
      for (let i = 0; i < titleList.length; i++) {
        if (currentTitle.includes(titleList[i])) {
          return true;
        }
      }
    }

    if (item.use_whitelist) {
      //check whitelist
      for (let i = 0; i < whitelistList.length; i++) {
        if (currentUrl.includes(whitelistList[i])) {
          return true;
        }
      }
    }
    return false;
  };

  const handleNavigationStateChange = (newNavState) => {
    const { url, title } = newNavState;

    console.log("--------------------");
    if (!checkWeb(url, title)) {
      console.log("checkWeb false");
      console.log(item.default_url);
      setUrl(item.default_url);
      console.log(url);
      webViewRef.current.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {/* <BrowserViewBar resourceList={resourceProfile} /> */}
      <WebView
        ref={webViewRef}
        style={{ marginTop: 10 }}
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationStateChange}
      />
      {/* <StatusBar style="auto" /> */}
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
