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
  rid,
  title,
  description,
  default_url,
  icon,
  memo,
  status,
  url_filter,
  title_filter,
  whitelist,
  onSubmit,
}) {
  let strIcon = icon.toString();

  const handleClick = () => {
    console.log("Resource card Clicked: " + rid);
    onSubmit(rid, default_url);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        {strIcon.startsWith("http") ? (
          <Image source={{ uri: icon }} style={styles.image} />
        ) : (
          <Image source={strIcon} style={styles.image} />
        )}
        <Text style={styles.text}>{title}</Text>
        <Text>{default_url}</Text>
        <Text>{description}</Text>
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
