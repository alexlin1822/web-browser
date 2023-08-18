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

export default function BrowserViewBar({ resourceList }) {
  const [rid, setRid] = useState(resourceList.rid);
  const [defaultUrl, setDefaultUrl] = useState(resourceList.default_url);
  const [urlInclude, setUrlInclude] = useState(resourceList.url_include);
  const [titleInclude, setTitleInclude] = useState(resourceList.title_include);
  const [whiteList, setWhiteList] = useState(resourceList.whitelist);

  // const [useUrlInclude, setUseUseUrlInclude] = useState(true);
  // const [userTitleInclude, setUseTitleInclude] = useState(false);
  // const [useWhiteList, setUseWhiteList] = useState(false);

  // const currentAccountID = GetCurrentID("currentAccountID");
  // const focusMemberID = GetCurrentID("focusMemberID");
  // const currentResourceID = GetCurrentID("currentResourceID");
  // rid: "0",
  // title: "Add resource",
  // description: "Add resource",
  // default_url: "https://www.google.com/",
  // icon: "https://www.google.com/favicon.ico",
  // memo: "",
  // status: "0",
  // url_include: "",
  // title_include: "",
  // whitelist: "",
  // use_url_include: true,
  // use_title_include: false,
  // use_whitelist: false,
  // lastURL: "https://www.google.com/",

  //* Save Setting function
  const handleSubmit = () => {
    //
  };

  const handleCancel = () => {
    //
  };

  const handleSetDefalut = () => {
    // setDefaultUrl(updateURL);
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
