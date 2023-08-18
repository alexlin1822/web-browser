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

export default function Home({ route, navigation }) {
  const { needLoad } = route.params;
  const [isLoading, setIsLoading] = useState(needLoad);
  const [resourceProfile, setResourceList] = useState({});

  const currentAccountID = GetCurrentID("currentAccountID");
  const focusMemberID = GetCurrentID("focusMemberID");

  // ResourceCard click event
  const clickResourceCard = (item) => {
    if (isLoading) return;
    console.log("check point");
    console.log("clickResourceCard RID: " + item.rid);
    console.log("default_url: " + item.default_url);

    SetCurrentID("currentResourceID", item.rid);
    // navigation.navigate("Browser", { item: item, isEditMode: true });
    navigation.navigate("BrowserViewer", { item: item, isEditMode: true });
  };

  const longClickResourceCard = (item) => {
    if (isLoading) return;
    console.log("check point");
    console.log("clickResourceCard RID: " + item.rid);
    console.log("default_url: " + item.default_url);

    SetCurrentID("currentResourceID", item.rid);
    // navigation.navigate("Browser", { item: item, isEditMode: true });
    navigation.navigate("Browser", { item: item, isEditMode: true });
  };

  useEffect(() => {
    async function fetchData() {
      // For test clear this account profile
      // await SaveData_local(GetStorageKey(currentAccountID, focusMemberID), "");

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

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } else {
    return (
      <View style={styles.container}>
        {resourceProfile.resourcelist.map((item) => (
          <ResourceCard
            key={item.rid}
            item={item}
            onSubmitResource={clickResourceCard}
            onSubmitLongResource={longClickResourceCard}
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
