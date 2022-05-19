import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import fonts from "../config/fonts";
function AppStatNow({
  title,
  DataNow,
  navigation,
  nextScreen,
  previousScreen,
}) {
  return (
    <View style={styles.container}>
      
      <View style={styles.control}>
        <Text style={styles.text}>
            {DataNow} 
            <Text style={{fontFamily:fonts.RalewayEL}}> (maintenant)</Text>
        </Text>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
  },
  textheading:{
    fontFamily:fonts.RalewayR, fontSize:30, color:'black',
  },
  control: {
    alignItems: "center",
    justifyContent:'center',
    backgroundColor:'yellow'
  },
  text: {
    fontSize: 20, fontFamily: fonts.RalewayR,color:'black',
  },
});

export default AppStatNow;
