import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function BrowserEditBar({ updateURL }) {
  const [defaultUrl, setDefaultUrl] = useState("");
  const [urlInclude, setUrlInclude] = useState("");
  const [titleInclude, setTitleInclude] = useState("");
  const [whiteList, setWhiteList] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const [useUrlInclude, setUseUseUrlInclude] = useState(true);
  // const [userTitleInclude, setUseTitleInclude] = useState(false);
  // const [useWhiteList, setUseWhiteList] = useState(false);

  const handleOptionToggle = (option) => {
    console.log(selectedOptions);
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isOptionSelected = (option) => {
    return selectedOptions.includes(option);
  };

  //* handleSearch function
  const handleSearch = () => {
    // let tmp = addHttps(text);
    // setText(tmp);
    // setCurURL(tmp);
    // onSubmit(tmp);
  };

  const handleSetDefalut = () => {
    setDefaultUrl(updateURL);
  };

  //   function addHttps(input) {
  //     const startsWithHttp = input.startsWith("http://");
  //     const startsWithHttps = input.startsWith("https://");

  //     if (input.trim() == "about:blank" || input.trim() == "") {
  //       return "https://www.google.com/";
  //     } else if (!startsWithHttp && !startsWithHttps) {
  //       return "https://" + input;
  //     } else {
  //       return input;
  //     }
  //   }

  return (
    <View style={{ backgroundColor: "#d4e3fa", paddingVertical: 5 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 2 }}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={handleSetDefalut}
        >
          <Feather name="home" size={32} color="green" />
          <Text style={styles.text}>Set Default</Text>
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 1,
            marginLeft: 10,
            marginRight: 2,
            paddingLeft: 10,
            height: 32,
            borderColor: "gray",
            borderWidth: 1,
            marginRight: 10,
          }}
          onChangeText={setDefaultUrl}
          value={defaultUrl}
          placeholder="Please type or click the button to import the URL here"
        />
        <Button title="  Submit  " onPress={handleSearch} />
        <Button title=" Cancel " onPress={handleSearch} />
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 2 }}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            isOptionSelected("urlInclude") && styles.optionButtonSelected,
          ]}
          onPress={() => handleOptionToggle("urlInclude")}
        >
          <Text style={styles.optionText}>URL Include</Text>
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 0.5,
            marginLeft: 10,
            marginRight: 2,
            paddingLeft: 10,
            height: 32,
            borderColor: "gray",
            borderWidth: 1,
          }}
          onChangeText={setUrlInclude}
          value={urlInclude}
          placeholder="URL include content."
        />

        <TouchableOpacity
          style={[
            styles.optionButton,
            isOptionSelected("titleInclude") && styles.optionButtonSelected,
          ]}
          onPress={() => handleOptionToggle("titleInclude")}
        >
          <Text style={styles.optionText}>Title Include</Text>
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 0.5,
            marginLeft: 2,
            marginRight: 10,
            paddingLeft: 2,
            height: 32,
            borderColor: "gray",
            borderWidth: 1,
          }}
          onChangeText={setTitleInclude}
          value={titleInclude}
          placeholder="Title include content."
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            isOptionSelected("whiteList") && styles.optionButtonSelected,
          ]}
          onPress={() => handleOptionToggle("whiteList")}
        >
          <Text style={styles.optionText}>Whitelist</Text>
        </TouchableOpacity>
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
          onChangeText={setWhiteList}
          value={whiteList}
          placeholder='Please type the whitelist here, use "," to spearte.'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  imageButton: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  buttonText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: "blue",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  optionButtonSelected: {
    backgroundColor: "lightblue",
    marginLeft: 10,
  },
  optionText: {
    color: "white",
    fontSize: 16,
  },
  selectedOptionsText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});
