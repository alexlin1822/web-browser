import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import { WebView } from "react-native-webview";
import SearchBar from "../components/search_bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Browser() {
  const [url, setUrl] = useState("https://www.google.com/");

  const saveData = async () => {
    console.log(`Save data`);
    try {
      await AsyncStorage.setItem("@MyApp:key", "I like to save it.");
      console.log(`Save data inside`);
    } catch (error) {
      // Error saving data
    }
  };

  const loadData = async () => {
    console.log(`Load data`);
    try {
      const value = await AsyncStorage.getItem("@MyApp:key");
      console.log(`Load data inside`);
      if (value !== null) {
        // We have data!!
        console.log(`Value = ${value}`);
      }
    } catch (error) {
      // Error retrieving data
    }
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
    console.log(`New URL = ${newUrl}`);
    console.log(newUrl);
  };

  return (
    <View style={styles.container}>
      <SearchBar onSubmit={handleSubmit} updateURL={url} />
      <Button title="Save" onPress={saveData} />
      <Button title="Load" onPress={loadData} />
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
