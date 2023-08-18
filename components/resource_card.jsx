import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";

export default function ResourceCard({
  item,
  onSubmitResource,
  onSubmitLongResource,
}) {
  let strIcon = item.icon.toString();

  const handleClick = () => {
    console.log("Resource card Clicked: " + item.rid);
    onSubmitResource(item);
  };

  const handleLongClick = () => {
    console.log("Resource card Clicked: " + item.rid);
    onSubmitLongResource(item);
  };

  return (
    <View style={styles.card} key={item.rid}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleClick}
        onLongPress={handleLongClick}
      >
        {strIcon.startsWith("http") ? (
          <Image source={{ uri: item.icon }} style={styles.image} />
        ) : (
          <Image source={strIcon} style={styles.image} />
        )}
        <Text style={styles.text}>{item.title}</Text>
        <Text>{item.default_url}</Text>
        <Text>{item.description}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
  },
  image: {
    width: 32,
    height: 32,
  },
  text: {
    fontWeight: "bold",
    marginTop: 8,
  },
});
