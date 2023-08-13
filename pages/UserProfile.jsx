import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SetCurrentID, GetCurrentID } from "../utility/Common";

import PeopleCard from "../components/people_card";

var dict = [];

export default function UserProfile({ navigation }) {
  const currentAccountID = GetCurrentID("currentAccountID");

  console.log("currentAccountID: " + currentAccountID);

  // let dict = [
  //   {
  //     mid: "1",
  //     title: "Ken1111111",
  //     icon: "https://www.google.com/favicon.ico",
  //     description: "Popular search engine",
  //   },
  //   {
  //     mid: "2",
  //     title: "Angela",
  //     icon: "https://www.facebook.com/favicon.ico",
  //     description: "Video sharing platform",
  //   },
  // ];

  return (
    <View style={styles.container}>
      {dict.map((item) => (
        <PeopleCard
          mid={item.mid}
          title={item.title}
          icon={item.icon}
          description={item.description}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    width: "50%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    margin: 20,
  },
});
