import React, { useEffect, useState } from "react";
import { Keyboard } from "react-native";
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
import firebase from "./src/services/firebaseConnection";

export default function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();

  useEffect(() => {
    function getUser() {
      if (user) {
        firebase
          .database()
          .ref("tarefas")
          .child(user)
          .once("value", (snapshot) => {
            setTasks([]);
            snapshot?.forEach((childItem) => {
              let data = {
                key: childItem.key,
                nome: childItem.val().nome,
              };
              setTasks((oldTasks) => [...oldTasks, data]);
            });
          });
      }
    }
    getUser();
  }, [user]);

  function handleDelete(key) {
    firebase
      .database()
      .ref("tarefas")
      .child(user)
      .child(key)
      .remove()
      .then(() => {
        const findTasks = tasks.filter((item) => item.key !== key);
        setTasks(findTasks);
      });
  }

  function handleEdit(data) {
    console.log(data);
  }

  function handleAdd() {
    if (newTask) {
      let tarefas = firebase.database().ref("tarefas").child(user);
      let chave = tarefas.push().key;

      tarefas
        .child(chave)
        .set({ nome: newTask })
        .then(() => {
          const data = {
            key: chave,
            nome: newTask,
          };
          setTasks((oldTasks) => [...oldTasks, data]);
        });
      setNewTask("");
      Keyboard.dismiss();
    } else {
      return;
    }
  }

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
            <TouchableOpacity
              style={styles.containerButtonAdd}
              onPress={handleAdd}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            keyExtractor={(item) => item.key}
            data={tasks}
            renderItem={({ item }) => (
              <TaskList
                data={item}
                deleteItem={handleDelete}
                editItem={handleEdit}
              />
            )}
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
