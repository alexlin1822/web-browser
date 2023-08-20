import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function BrowserViewBar({ resourceList, timeLeft }) {
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

  return;
  // return (
  //   <View style={styles.container}>
  //     <View>
  //       <Text>Time left: {timeLeft}</Text>
  //     </View>
  //     <View style={styles.buttonContainer}>
  //       <TouchableOpacity style={styles.button}>
  //         <Text style={styles.buttonText}>Button 1</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.button}>
  //         <Text style={styles.buttonText}>Button 2</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.button}>
  //         <Text style={styles.buttonText}>Button 3</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
