import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function KidBar({ onSubmit, updateURL }) {
  const [text, setText] = useState("https://www.google.com/");
  const [curURL, setCurURL] = useState("https://www.google.com/");

  if (updateURL != curURL) {
    setText(updateURL);
    setCurURL(updateURL);
  }

  //* handleSearch function
  const handleSearch = () => {
    let tmp = addHttps(text);
    setText(tmp);
    setCurURL(tmp);
    onSubmit(tmp);
  };

  function addHttps(input) {
    const startsWithHttp = input.startsWith("http://");
    const startsWithHttps = input.startsWith("https://");

    if (input.trim() == "about:blank" || input.trim() == "") {
      return "https://www.google.com/";
    } else if (!startsWithHttp && !startsWithHttps) {
      return "https://" + input;
    } else {
      return input;
    }
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
      <Feather name="search" size={16} color="black" />
      <TextInput
        style={{
          flex: 1,
          marginLeft: 10,
          marginRight: 2,
          paddingLeft: 10,
          height: 32,
          borderColor: "gray",
          borderWidth: 1,
        }}
        onChangeText={setText}
        value={text}
        placeholder="Please type the URL here"
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}
