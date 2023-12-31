import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
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
  const clickPeopleCard = (item, isLongPress) => {
    console.log("clickPeopleCard - UserProfile " + item.mid);
    console.log(item);
    console.log(isLongPress);
    const resultID = item.key;
    SetCurrentID("focusMemberID", resultID);

    if (isLongPress || item.key === "0") {
      navigation.navigate("UserEdit", { item: item });
    } else {
      navigation.navigate("Home", { needLoad: true });
    }
  };

  const clickLogout = () => {
    navigation.navigate("Login");
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
        <View style={styles.rowView}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => clickLogout()}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowView}>
          <Text style={[styles.buttonText, { color: "black" }]}>
            Please select one:{" "}
          </Text>
        </View>
        <View style={styles.rowView}>
          {myAccountProfile.memberlist.map((item) => (
            <PeopleCard
              key={item.key}
              item={item}
              onSubmitResource={() => clickPeopleCard(item, false)}
              onSubmitLongResource={() => clickPeopleCard(item, true)}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  submitButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: "blue",
    borderRadius: 5,
    height: 50,
    marginTop: 20,
    marginBottom: 50,
  },
  buttonText: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
