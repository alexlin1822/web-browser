import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import {
  GetCurrentID,
  SetCurrentID,
  LoadData_local,
  SaveData_local,
  GetStorageKey,
} from "../utility/Common";
import { InitAccountProfile } from "../utility/DataStructure";

import PeopleCard from "../components/people_card";

export default function UserProfile({ route, navigation }) {
  const { needLoad } = route.params;
  const [isLoading, setIsLoading] = useState(needLoad);
  const [myAccountProfile, setMyAccountProfile] = useState({});

  const currentAccountID = GetCurrentID("currentAccountID");

  // PeopleCard click event
  const clickPeopleCard = (mid) => {
    if (isLoading) return;

    console.log("clickPeopleCard - UserProfile " + mid);
    const resultID = mid;
    SetCurrentID("focusMemberID", resultID);
    navigation.navigate("Home", { needLoad: true });
  };

  useEffect(() => {
    async function fetchData() {
      // For test clear this account profile
      // await SaveData_local(GetStorageKey(currentAccountID), "");

      try {
        // Pre-load
        let value = await LoadData_local(GetStorageKey(currentAccountID));

        let tmpAccountProfile = {};

        if (value !== "") {
          tmpAccountProfile = JSON.parse(value);
        } else {
          value = InitAccountProfile(currentAccountID);
          tmpAccountProfile = JSON.parse(value);
          await SaveData_local(GetStorageKey(currentAccountID), value);
        }
        setMyAccountProfile(tmpAccountProfile);
        console.log(
          "UserProfile Fetch Data: " + JSON.stringify(tmpAccountProfile)
        );
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } else {
    return (
      <View style={styles.container}>
        {myAccountProfile.memberlist.map((item) => (
          <PeopleCard
            key={item.key}
            mid={item.key}
            title={item.title}
            icon={item.icon}
            description={item.description}
            memo={item.memo}
            status={item.status}
            onSubmit={clickPeopleCard}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
  },
});
