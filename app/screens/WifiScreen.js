import React, { useState, useEffect } from "react";

import { View, StyleSheet, Alert, Picker, TextInput, Image, Text  } from "react-native";

import AppButton from "../components/AppButton";
import colors from "../config/colors";

import { useNavigation } from "@react-navigation/native";
import fonts from "../config/fonts";





function WifiScreen({ navigation }) {
  const [SSID, setSSID] = useState();
  const [password, onChangePass] = useState();
  const [SSIDArray, setSSIDArray] = useState(["Mes Réseau Wi-Fi"]);

  useEffect(() => scan(setSSIDArray) );


  
const ESPWIFIAlert = () =>
Alert.alert("Consigne", "SVP connecter au Réseau SmartPlug", [
  { text: "OUI", onPress: () => console.log("OUI Pressed") },
]);
const NOWIFIAlert = () =>
Alert.alert(
  "Consigne",
  "Pas De Réseau sans fils Détecté, Essayer une Autre Fois",
  [{ text: "OUI", onPress: () => console.log("OUI Pressed") }]
);
const AnswerConnectionAlert = (ReponseDescription) =>
Alert.alert("Reponse", ReponseDescription, [
  { text: "OUI" , onPress: () => navigation.navigate("PrisesUserScreen") },
]);

//Cette fonction envoie une requête http (/setting) au point accès aui contient le SSID et Mot de passe
// entrés par l'utilisateur. la réponse et l'affirmation ou non de  la connection avec le WIFI.
 async function submitForm(SSID, password) {
  if (typeof SSID !== "undefined") {
    SSID = SSID.replace(/ /g, "+");
    let url =
      "http://192.168.4.1/setting?ssid=" + SSID + "&pass=" + String(password);
    if (SSID === "" && password === "") url = "http://192.168.4.1/setting";
    console.log(url);

    fetch(String(url))
      .then((response) => {
        return response.text();
      })
      .then(function (text) {
        let ReponseDescription = text;
        AnswerConnectionAlert(ReponseDescription);
      })
      .catch((err) => console.log(err.message));
  }
}

//cette fonction envoie une requête http (/) au point accès
// et répond par la liste des réseaux sans fils dans les environs.
let NetworkData;
 function scan(setSSIDArray) {
  fetch("http://192.168.4.1/")
    .then((response) => {
      return response.text();
    })
    .then(function (text) {
      NetworkData = text;
      if (
        typeof NetworkData !== "undefined" &&
        NetworkData.toUpperCase().includes("FAILED") === false
      ) {
        console.log(1, NetworkData);
        let NetworkDataArray, NetworkNumb, IP, SSIDArray;
        NetworkDataArray = NetworkData.split(",");
        IP = NetworkDataArray[0];
        NetworkNumb = NetworkDataArray[1];
        SSIDArray = NetworkDataArray.slice(2);
        if (typeof SSIDArray !== "undefined") {
          setSSIDArray(SSIDArray);
        } else {
          NOWIFIAlert();
          console.log("Pas De Réseau sans fils Détecté");
        }
      } else {
        ESPWIFIAlert();
        console.log("SVP Connecter au Point d'accès WIFI-ESP!");
      }
    })
    .catch((err) => {
      console.log(err.message);
      ESPWIFIAlert();
      console.log("SVP Connecter au Point d'accès WIFI-ESP!");
    });
}





  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> connectez l'appareil à votre réseau Wi-Fi</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
        Choisissez votre réseau Wi-Fi et entrez son mot de passe.
        </Text>
      </View>
      <View style={styles.imgContainer}>
      <View style={styles.picker}>
          <Picker selectedValue={SSID} onValueChange={setSSID} mode="dialog">
            {SSIDArray.map((ssid, k) => (
              <Picker.Item key={k} label={ssid} value={ssid} />
            ))}
          </Picker>
        </View>

        <TextInput
          onChangeText={onChangePass}
          placeholderTextColor={"#00000055"}
          style={styles.password}
          placeholder="MOT DE PASSE"
          autoCapitalize="none"
          value={password}
        />
        
      </View>
      <View style={styles.button}>
        <AppButton
          title="Connecter"
          onPress={submitForm.bind(this, SSID, password)}
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
    fontSize: 26,
    textAlign: "center",
    color: colors.black,
  },
  descriptionContainer: {
   // backgroundColor:'red',
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


  picker: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#9ACD32',
  },
  password: {
    height: 50,
    width: 300,
    marginTop: 10,
    paddingLeft: 12,
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#9ACD32',
  },
});

export default WifiScreen;


