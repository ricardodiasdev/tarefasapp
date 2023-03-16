import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import Sign from "./src/components/Sign";
import TaskList from "./src/components/TaskList";

let tasks = [
  { key: "1", nome: "Comprar pão" },
  { key: "2", nome: "Estudar programação" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState();
  return (
    <SafeAreaView style={styles.container}>
      {!user ? (
        <Sign changeStatus={(user) => setUser(user)} />
      ) : (
        <View>
          <View style={styles.containerTask}>
            <TextInput
              style={styles.containerInput}
              placeholder="O que vai fazer hoje?"
              value={newTask}
              onChangeText={(text) => setNewTask(text)}
            />
            <TouchableOpacity style={styles.containerButtonAdd}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.key}
            renderItem={({item}) => <TaskList data={item}/>}
          />
        </View>
      )}
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
  containerTask: {
    flexDirection: "row",
    marginTop: 20,
  },
  containerInput: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#141414",
    height: 45,
    fontSize: 20,
  },
  containerButtonAdd: {
    backgroundColor: "#141414",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
  },
});
