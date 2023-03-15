import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";

const Login = () => {
  const [type, setType] = useState("login");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const inputRef = useRef(null);

  const handleLogin = () => {
    alert("Login...");
    setEmail("");
    setPassword("");
    inputRef.current.focus();
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
          styles.handleLogin,
          { backgroundColor: type === "login" ? "#3ea6f2" : "#141414" },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.loginText}>
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

export default Login;

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
  },
  handleLogin: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#141414",
    height: 45,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 17,
  },
});
