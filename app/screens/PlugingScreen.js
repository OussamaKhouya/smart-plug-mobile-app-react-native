import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import AppButton from "../components/AppButton";

import colors from "../config/colors";
import fonts from "../config/fonts";

function PlugingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Brancher Smart Plug</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Brancher votre Smart Plug. Appuyer sur le button Power On. si la Led
          n'est pas allumer.{" "}
        </Text>
      </View>
      <View style={styles.imgContainer}>
      <Image source={require("../assets/icons/photo.png")} style={{width:'25%',height:'82%'}}/>
      </View>
      <View style={styles.button}>
        <AppButton
          title="suivant"
          onPress={() => navigation.navigate("AccessPScreen")}
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
    height: "18%",
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
    alignItems:'center',
    height: "32%",
    
  },
  button: {
    //backgroundColor:'tomato',
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlugingScreen;
