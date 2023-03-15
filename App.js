import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Login from "./src/components/Login";

export default function App() {
  const [user, setUser] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      {!user ? (<Login/>):(<Text>Tarefas</Text>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2f6fc",
    paddingTop: 25,
    paddingHorizontal: 10,
  },
});
