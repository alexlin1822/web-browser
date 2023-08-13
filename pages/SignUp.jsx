import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import {
  CheckUsernameisExist,
  GenerateNewId,
  GetStorageKey,
  getUserID,
  LoadData_local,
  SaveData_local,
} from "../utility/Common";

export default function Signup({ navigation }) {
  const [text_nickname, setNickName] = useState("");
  const [text_username, setUserName] = useState("");
  const [text_email, setEmail] = useState("");
  const [text_password, setPassword] = useState("");
  const [accountNums, setAccountNums] = useState(0); //Used to store the number of existing accounts

  //const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
  //const myJSON = JSON.stringify(obj);

  /**
   * @description This function is called when the user submits the Sign Up form
   */
  const handleSignup = async () => {
    // Check if the user has entered all the required fields
    if (
      text_nickname === "" ||
      text_username === "" ||
      text_email === "" ||
      text_password === ""
    ) {
      alert("Please fill in all the fields");
      return;
    }

    // Check if the user has entered a valid email address
    if (!text_email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    // Check if the user has entered a valid password
    if (text_password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    // Check if the user has entered a valid username and email address
    let checkValue = await CheckUsernameisExist(text_username, text_email);

    if (checkValue == 0) {
      //add new account
      value = await LoadData_local(GetStorageKey());

      let myAccount = {
        accountID: GenerateNewId("account"),
        nickname: text_nickname,
        username: text_username,
        email: text_email,
        password: text_password,
      };

      if (value != "" && value != null) {
        let blocks = JSON.parse(value);
        blocks.push(myAccount);
        value = JSON.stringify(blocks);
      } else {
        let blocks = [];
        blocks.push(myAccount);
        value = JSON.stringify(blocks);
      }

      SaveData_local(GetStorageKey(), value);
      alert("Account created successfully");
      navigation.navigate("Login");
    } else if (checkValue == 1) {
      alert("Username already exists");
      return;
    } else if (checkValue == 2) {
      alert("Email address already exists");
      return;
    }
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
