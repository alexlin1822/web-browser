import { View, Text, StyleSheet } from "react-native";
import ResourceCard from "../components/resource_card";

const directory = [
  {
    title: "Google",
    // icon: "https://www.google.com/favicon.ico",
    icon: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png",
    url: "https://www.google.com",
    description: "Popular search engine",
  },
  {
    title: "Youtube",
    icon: "https://www.facebook.com/favicon.ico",
    // icon: "https://github.com/alexlin1822/web-browser/blob/main/assets/custom-add.png",
    url: "https://www.youtube.com",
    description: "Video sharing platform",
  },
  {
    title: "Facebook",
    // icon: "https://www.facebook.com/favicon.ico",
    icon: "https://github.com/alexlin1822/web-browser/blob/main/assets/custom-add.png",
    url: "https://www.facebook.com",
    description: "Social media site",
  },
  {
    title: "Stack Overflow",
    // icon: "https://stackoverflow.com/favicon.ico",
    icon: "https://github.com/alexlin1822/web-browser/blob/main/assets/custom-add.png",
    url: "https://stackoverflow.com/",
    description: "Q&A for programmers",
  },
  {
    title: "Custom / Add Resource",
    icon: "https://github.com/alexlin1822/web-browser/blob/main/assets/custom-add.png",
    // icon: "https://stackoverflow.com/favicon.ico",
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
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    width: "50%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    margin: 20,
  },
});
