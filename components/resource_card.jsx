import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";

export default function ResourceCard({ title, icon, url, description }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.button}>
        <Image source={{ uri: icon }} style={styles.image} />
        <Text style={styles.text}>{title}</Text>
        <Text>{url}</Text>
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
