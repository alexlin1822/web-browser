import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export default function Signup() {
  const [text_nickname, setNickName] = useState("");
  const [text_username, setUserName] = useState("");
  const [text_email, setEmail] = useState("");
  const [text_password, setPassword] = useState("");

  let rid = "1";

  console.log(Constants.expoConfig.extra.apiUrl);
  console.log(Constants.expoConfig.extra.apiKey);

  /**
   * @description This function generates a random string as user ID
   * @returns {string} random string
   */
  function generateId() {
    return Math.random().toString(36).slice(2, 10);
  }

  /**
   * @description This function is called when the user submits the Sign Up form
   *
   */
  const saveUserData = async () => {
    const userData = {
      rid: generateId(),
      nickname: text_nickname,
      username: text_username,
      password: text_password,
      email: text_email,
    };
  };

  const saveDefalutData = async () => {
    const userSetting = {
      rid: rid,
      editView: true,
    };

    const userData = {
      rid: rid,
      editView: true,
      title: title,
      favicon: favicon,
      defualt_page: url,
    };

    console.log(`Save data`);

    //const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
    //const myJSON = JSON.stringify(obj);

    try {
      await AsyncStorage.setItem("@M:userSetting", "I like to save it.");
      console.log(`Save data inside`);
    } catch (error) {
      // Error saving data
    }
  };

  const loadData = async () => {
    console.log(`Load data`);
    try {
      const value = await AsyncStorage.getItem("@MyApp:key");
      console.log(`Load data inside`);
      if (value !== null) {
        // We have data!!
        console.log(`Value = ${value}`);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const handleSignup = () => {
    // Call API to register account
  };

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput value={text_nickname} onChangeText={setNickName} />

      <Text>User Name</Text>
      <TextInput value={text_username} onChangeText={setUserName} />

      <Text>Email</Text>
      <TextInput
        value={text_email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text>Password</Text>
      <TextInput
        value={text_password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
});
