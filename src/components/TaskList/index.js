import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";

const TaskList = ({ data, deleteItem, editItem}) => {
  const { key, nome } = data;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => deleteItem(key) }>
        <Feather name="trash" color="#FFF" size={20} />
      </TouchableOpacity>
      <View>
        <TouchableWithoutFeedback onPress={() => editItem(data) }>
          <Text style={styles.task}>{nome}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#121212",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
  },
  task: {
    color: "#fff",
    fontSize: 20,
    padding: 10,
  },
});
