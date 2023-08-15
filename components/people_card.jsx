import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";

export default function PeopleCard({
  mid,
  title,
  description,
  icon,
  memo,
  status,
  onSubmit,
}) {
  const strIcon = icon.toString();
  const handleClick = () => {
    // let param = {
    //   key: mid,
    //   mid: mid,
    //   title: title,
    //   icon: icon,
    //   description: description,
    //   memo: memo,
    //   status: status,
    // };
    // console.log("People card Clicked: " + JSON.stringify(param));
    onSubmit(mid);
  };
  // source={require("../assets/favicon.png")}
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        {strIcon.startsWith("http") ? (
          <Image source={{ uri: icon }} style={styles.image} />
        ) : (
          <Image
            source={require("../assets/favicon.png")}
            style={styles.image}
          />
        )}
        <Text style={styles.text}>{title}</Text>
        <Text style={{ color: "blue" }}>{description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    margin: 20,
  },
  button: {
    alignItems: "center",
    padding: 3,
    margin: 3,
  },
  image: {
    width: 64,
    height: 64,
  },
  text: {
    fontWeight: "bold",
    marginTop: 8,
  },
});
