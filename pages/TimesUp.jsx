import { View, StyleSheet, Text, Button } from "react-native";

export default function TimesUp({ navigation }) {
  const handleReturn = async () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Times Up</Text>
      <Button style={styles.button} title="Go Back" onPress={handleReturn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 60,
    fontWeight: "bold",
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 20,
  },
  button: {
    height: 40,
  },
});
