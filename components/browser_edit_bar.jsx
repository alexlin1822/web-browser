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
import { GenerateNewId } from "../utility/Common";

export default function BrowserEditBar({ resourceList, onSubmit, updateURL }) {
  console.log("BrowserEditBar", resourceList);

  const [rid, setRid] = useState(resourceList.rid);
  const [defaultUrl, setDefaultUrl] = useState(resourceList.default_url);
  const [urlInclude, setUrlInclude] = useState(resourceList.url_include);
  const [titleInclude, setTitleInclude] = useState(resourceList.title_include);
  const [whiteList, setWhiteList] = useState(resourceList.whitelist);

  const [useUrlInclude, setUseUrlInclude] = useState(
    resourceList.use_url_include
  );
  const [userTitleInclude, setUseTitleInclude] = useState(
    resourceList.use_title_include
  );
  const [useWhiteList, setUseWhiteList] = useState(resourceList.use_whitelist);

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

  //* Save Setting function
  const handleSubmit = () => {
    let newResourceList = {
      rid:
        resourceList.rid === "0" ? GenerateNewId("resource") : resourceList.rid,
      title: resourceList.rid === "0" ? defaultUrl : resourceList.title,
      description: resourceList.rid === "0" ? "" : resourceList.description,
      default_url: defaultUrl,
      icon: defaultUrl + "/favicon.ico",
      memo: resourceList.rid === "0" ? "" : resourceList.memo,
      status: resourceList.rid === "0" ? "" : resourceList.status,
      url_include: urlInclude,
      title_include: titleInclude,
      whitelist: whiteList,
      use_url_include: useUrlInclude,
      use_title_include: userTitleInclude,
      use_whitelist: useWhiteList,
      last_url:
        resourceList.rid === "0"
          ? resourceList.default_url
          : resourceList.last_url,
    };
    onSubmit(newResourceList);
  };

  const handleCancel = () => {
    onSubmit(null);
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
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleCancel}>
          <Text style={styles.buttonText}> Cancel</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 2 }}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            useUrlInclude && styles.optionButtonSelected,
          ]}
          onPress={() => setUseUrlInclude(!useUrlInclude)}
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
            userTitleInclude && styles.optionButtonSelected,
          ]}
          onPress={() => setUseTitleInclude(!userTitleInclude)}
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
            useWhiteList && styles.optionButtonSelected,
          ]}
          onPress={() => setUseWhiteList(!useWhiteList)}
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
  submitButton: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
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
    backgroundColor: "grey",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  optionButtonSelected: {
    backgroundColor: "green",
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
