import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import {
  GetCurrentID,
  SetCurrentID,
  LoadData_local,
  SaveData_local,
  GetStorageKey,
} from "../utility/Common";
import { InitResourceProfile } from "../utility/DataStructure";
import ResourceCard from "../components/resource_card";

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [resourceProfile, setResourceList] = useState({});

  const currentAccountID = GetCurrentID("currentAccountID");
  const focusMemberID = GetCurrentID("focusMemberID");

  useEffect(() => {
    async function fetchData() {
      // For test clear this account profile
      await SaveData_local(GetStorageKey(currentAccountID, focusMemberID), "");

      try {
        // Pre-load
        let value = await LoadData_local(
          GetStorageKey(currentAccountID, focusMemberID)
        );

        let tmpMemberProfile = {};

        if (value !== "") {
          tmpMemberProfile = JSON.parse(value);
        } else {
          value = InitResourceProfile(focusMemberID);
          tmpMemberProfile = JSON.parse(value);
          await SaveData_local(
            GetStorageKey(currentAccountID, focusMemberID),
            value
          );
        }
        setResourceList(tmpMemberProfile);
        console.log(
          "UserProfile Fetch Data: " + JSON.stringify(tmpMemberProfile)
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

  // ResourceCard click event
  const clickResourceCard = (rid, default_url) => {
    console.log("clickResourceCard RID: " + rid);
    console.log("default_url: " + default_url);

    SetCurrentID("currentResourceID", rid);
    navigation.navigate("Browser", { searchText: default_url });
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } else {
    return (
      <View style={styles.container}>
        {resourceProfile.resourcelist.map((item) => (
          <ResourceCard
            title={item.title}
            icon={item.icon}
            default_url={item.default_url}
            description={item.description}
            onSubmit={clickResourceCard(item.rid, item.default_url)}
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
