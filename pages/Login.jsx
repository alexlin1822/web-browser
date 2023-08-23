import { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { GetAccountID, SetCurrentID, GetCurrentID } from "../utility/Common";

export default function Login({ navigation }) {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  // const hasUnsavedChanges = true;

  const handleLogin = async () => {
    // Effect
    // useEffect(() => {
    //   navigation.addListener("beforeRemove", (e) => {
    //     console.log("onback1");
    //     e.preventDefault();
    //     console.log("onback2");
    //     // Do your stuff here
    //     // navigation.dispatch(e.data.action);
    //   });
    // }, []);

    // Simulating a login check (you should replace this with your actual authentication logic)
    let resultID = await GetAccountID(userName, password);
    console.log("resultID: " + resultID);

    if (resultID != "") {
      SetCurrentID("currentAccountID", resultID);
      console.log(
        "currentAccountID - Login page: " + GetCurrentID("currentAccountID")
      );

      navigation.navigate("UserProfile", { needLoad: true });
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");

    // test encryption
    // let text = "Apple";
    // let encryptedText = encryptString(text);
    // console.log(encryptedText);
    // console.log(decryptString(encryptedText));
    // test GenerateNewId
    // setShowNavigationBar(true);
    // for (let i = 0; i < 5; i++) {
    //   console.log(GenerateNewId("account"));
    // }
    // for (let i = 0; i < 5; i++) {
    //   console.log(GenerateNewId("member"));
    // }
    // for (let i = 0; i < 5; i++) {
    //   console.log(GenerateNewId("resource"));
    // }
  };

  return (
    <View style={styles.container}>
      <Text>User Name</Text>
      <TextInput
        value={userName}
        onChangeText={setuserName}
        autoCapitalize="none"
      />

      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignUp} />
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
