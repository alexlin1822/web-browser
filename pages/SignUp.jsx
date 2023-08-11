import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { GetInfo, SetInfo } from "../utility/Common";

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

    // Load current account numbers in AsyncStorage
    try {
      console.log("@KidWebBrowser:AccountNums");

      const value = await AsyncStorage.getItem("@KidWebBrowser:AccountNums");

      if (value !== null) {
        setAccountNums(parseInt(value) + 1);
      } else {
        setAccountNums(1);
      }
    } catch (error) {
      // No account found
      // setAccountNums(1);
      console.log(error);
    }

    // Save the user data in AsyncStorage
    try {
      console.log(`Save data inside`);
      const result = await AsyncStorage.setItem(
        "@KidWebBrowser:AccountNums",
        accountNums.toString()
      );
      console.log(result);
    } catch (error) {
      // Error saving data
      console.log(error);
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
