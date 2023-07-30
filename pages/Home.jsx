import { View, Text, StyleSheet } from "react-native";
import ResourceCard from "../components/resource_card";
import customIcon from "../assets/custom-add.png";

const directory = [
  {
    title: "Google",
    icon: "https://www.google.com/favicon.ico",
    url: "https://www.google.com",
    description: "Popular search engine",
  },
  {
    title: "Youtube",
    icon: "https://www.youtube.com/favicon.ico",
    url: "https://www.youtube.com",
    description: "Video sharing platform",
  },
  {
    title: "Facebook",
    icon: "https://www.facebook.com/favicon.ico",
    url: "https://www.facebook.com",
    description: "Social media site",
  },
  {
    title: "Stack Overflow",
    icon: "https://stackoverflow.com/favicon.ico",
    url: "https://stackoverflow.com/",
    description: "Q&A for programmers",
  },
  {
    title: "Custom / Add Resource",
    icon: "https://github.com/alexlin1822/web-browser/tree/main/assets/custom-add.png",
    url: "about:blank",
    description: "Custom / Add Resource",
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      {directory.map((item) => (
        <ResourceCard
          title={item.title}
          icon={item.icon}
          url={item.url}
          description={item.description}
        />
      ))}
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
});
