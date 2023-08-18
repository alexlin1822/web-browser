import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { WebView } from "react-native-webview";
import SearchBar from "../components/search_bar";

import AsyncStorage from "@react-native-async-storage/async-storage";

import BrowserEditBar from "../components/browser_edit_bar";

import {
  GetCurrentID,
  LoadData_local,
  SaveData_local,
  GetStorageKey,
} from "../utility/Common";
import BrowserViewBar from "../components/browser_view_bar";

export default function Browser({ route, navigation }) {
  const { item, isEditMode } = route.params; //get params from previous page

  console.log("Browser - item here: " + JSON.stringify(item));

  const [url, setUrl] = useState(item.last_url);
  const [webTitle, setWebTitle] = useState("");
  const [favicon, setFavicon] = useState("");

  const [resourceProfile, setResourceList] = useState(item);

  const currentAccountID = GetCurrentID("currentAccountID");
  const focusMemberID = GetCurrentID("focusMemberID");
  const currentResourceID = GetCurrentID("currentResourceID");

  console.log("currentResourceID - Browser: " + currentResourceID);
  console.log("url 00", url);

  const handleEditSubmit = async (newResourceProfile) => {
    if (newResourceProfile === null) {
      navigation.navigate("Home", { needLoad: false });
    }

    console.log("newResourceProfile", newResourceProfile);
    // setResourceList(newResourceProfile);

    let value = await LoadData_local(
      GetStorageKey(currentAccountID, focusMemberID)
    );

    if (value !== "") {
      let tmpMemberProfile = JSON.parse(value);

      let keyToUpdate = newResourceProfile.rid;

      const updatedData = tmpMemberProfile.resourcelist.map((item) => {
        if (item.rid === keyToUpdate) {
          console.log("item_KKKK", item);
          // Update the desired key's value here
          return {
            ...item,
            // rid: "0",
            // title: "Add resource",
            // description: "Add resource",
            default_url: newResourceProfile.default_url,
            icon: newResourceProfile.icon,
            memo: newResourceProfile.memo,
            status: newResourceProfile.status,
            url_include: newResourceProfile.url_include,
            title_include: newResourceProfile.title_include,
            whitelist: newResourceProfile.whitelist,
            use_url_include: newResourceProfile.use_url_include,
            use_title_include: newResourceProfile.use_title_include,
            use_whitelist: newResourceProfile.use_whitelist,
            last_url: newResourceProfile.default_url,
          };
        }
        return item;
      });

      if (currentResourceID === "0") {
        //Add new records
        tmpMemberProfile.resourcelist.push(newResourceProfile);
      } else {
        tmpMemberProfile.resourcelist = updatedData;
      }
      value = JSON.stringify(tmpMemberProfile);
      console.log("value_KK", value);
      await SaveData_local(
        GetStorageKey(currentAccountID, focusMemberID),
        value
      );
    }
    navigation.navigate("Home", { needLoad: true });
  };

  const onWebViewLoad = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    const { title, url } = nativeEvent;

    // Extract the favicon URL from the page's HTML
    const faviconUrl = url + "/favicon.ico";

    setWebTitle(title);
    setFavicon(faviconUrl);
    // setUrl(url);
  };

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
    console.log(`New URL = ${newUrl["url"]}`);
  };

  return (
    <View style={styles.container}>
      {isEditMode ? (
        <View>
          <BrowserEditBar
            onSubmit={handleEditSubmit}
            resourceList={resourceProfile}
            updateURL={url}
          />
          <SearchBar onSubmit={handleSubmit} updateURL={url} />
        </View>
      ) : (
        <BrowserViewBar resourceList={resourceProfile} />
      )}

      <WebView
        style={{ marginTop: 10 }}
        source={{ uri: url }}
        onNavigationStateChange={handleUrlChange}
        onLoad={onWebViewLoad}
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
