import React, {useState, useEffect} from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import fonts from "../config/fonts";

import firebase from "firebase";


export default function PriseRenomer({navigation}) {

  const [nomMachine, onChangeNom] = useState();
  const [user, onChangeUser] = useState({});
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        onChangeUser(user);
      }
    });
  });
  
  return (
    <View style={styles.container}>
       <View style={styles.titleContainer}>
        <Text style={styles.title}>Renommer votre Smart   Plug</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
        Donnez à votre Smart Plug un nom simple et facile à retenir.
        </Text>
      </View>
      <View style={styles.imgContainer}>
      <TextInput
          onChangeText={onChangeNom}
          placeholderTextColor={"#00000055"}
          style={styles.input}
          placeholder="Saisir le nom"
          value={nomMachine}/>
      </View>
      <View style={styles.button}>
        <AppButton
          title="suivant"
          onPress={() => navigation.navigate("IconChoice", {email: user.email, nomMachine: nomMachine})}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor10,
  },
  titleContainer: {
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: fonts.RalewayL,
    fontSize: 28,
    textAlign: "center",
    color: colors.black,
  },
  descriptionContainer: {
    //backgroundColor:'red',
    height: "15%",
    alignItems: "center",
  },
  description: {
    fontFamily: fonts.RalewayL,
    fontSize: 18,
    textAlign: "center",
    width: "80%",
    color: colors.black,
  },
  imgContainer: {
    //backgroundColor:'green',
    height: "35%",
    alignItems: "center",
  },
  button: {
    //backgroundColor:'tomato',
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 10,
    paddingLeft: 12,
    height: '20%',
    width: '70%',
    borderWidth: 1,
    borderColor: colors.bgColor12,
  },
});
