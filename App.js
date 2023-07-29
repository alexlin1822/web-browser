import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import * as Storage from "expo-storage";
import SearchBar from "./components/search_bar";
// import { SearchBar } from "react-native-elements";

export default function App() {
  const [url, setUrl] = useState("https://www.google.com/");
  // const [needUpdate, setNeedUpdate] = useState("0");

  // useEffect(() => {
  //   readData();
  // }, []);

  // const saveData = async () => {
  //   await Storage.setItem("key", value);
  //   readData();
  // };

  // const readData = async () => {
  //   const data = await Storage.getItem("key");
  //   setValue(data);
  // };
  const handleSubmit = (searchText) => {
    setUrl(`${searchText}`);
  };

  /**
   * @param {string} newUrl
   * @returns {void}
   * @description This function is called when the url changes
   * @example
   * handleUrlChange("https://www.google.com/")
   */
  const handleUrlChange = (newUrl) => {
    setUrl(newUrl["url"]);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        onSubmit={handleSubmit}
        updateURL={url}
        // isNeedUpdate={needUpdate}
      />

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
    paddingLeft: 5,
    paddingRight: 5,
  },
});
