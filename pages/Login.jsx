import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import {
  LoadAccountData,
  GetInfo,
  setShowNavigationBar,
  getShowNavigationBar,
} from "../utility/Common";

export default function Login({ navigation }) {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simulating a login check (you should replace this with your actual authentication logic)
    if (userName === "" && password === "") {
      setShowNavigationBar(false);
      console.log(getShowNavigationBar());
      navigation.navigate("Home");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = () => {
    setShowNavigationBar(true);
    navigation.navigate("SignUp");
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
