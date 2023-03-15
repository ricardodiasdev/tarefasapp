import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";

import firebase from "../../services/firebaseConnection";

const Sign = () => {
  const [type, setType] = useState("login");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const inputRef = useRef(null);

  const handleButtom =  () => {
    if (type === "login") {
      const user =  firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user.user);
          alert("Login...");
          setEmail("");
          setPassword("");
          inputRef.current.focus();
        })
        .catch((err) => {
          alert("Algo deu errado...");
          console.log(err);
          setEmail("");
          setPassword("");
          inputRef.current.focus();
          return;
        });
    } else {
      const user = firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user.user);
          alert("Cadastrado...");
          setEmail("");
          setPassword("");
          inputRef.current.focus();
        })
        .catch((err) => {
          alert("Algo deu errado...");
          console.log(err);
          setEmail("");
          setPassword("");
          inputRef.current.focus();
        });
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          { color: type === "login" ? "#3ea6f2" : "#141414" },
        ]}
      >
        {type === "login" ? "LOGIN" : "CADASTRO"}
      </Text>
      <TextInput
        placeholder="Seu email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        ref={inputRef}
      />
      <TextInput
        placeholder="*********"
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={[
          styles.handleButtom,
          { backgroundColor: type === "login" ? "#3ea6f2" : "#141414" },
        ]}
        onPress={handleButtom}
      >
        <Text style={styles.buttonText}>
          {type === "login" ? "Acessar" : "Cadastrar"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          setType((type) => (type === "login" ? "cadastrar" : "login"))
        }
      >
        <Text style={{ textAlign: "center" }}>
          {type === "login" ? "Criar uma conta" : "Já possuo uma conta"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2f6fc",
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: "#141414",
    fontSize: 25,
  },
  handleButtom: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    height: 45,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
  },
});
