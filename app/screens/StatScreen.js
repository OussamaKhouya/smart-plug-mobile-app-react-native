import React from "react";
import { View, StyleSheet } from "react-native";
import AppStatNow from "../components/AppStatNow";
import AChart from "../components/AppChart";


function StatScreen({
  navigation,
  title,
  DataNow,
}) {
  return (
    <View style={styles.container}>

      <View style={styles.now}>
        <AppStatNow
          title={title}
          DataNow={DataNow}
          navigation={navigation}
    
        />
      </View>

      <View style={styles.chart}>
        <AChart title={title} navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:8,
        flexDirection:'column',
        alignItems:'center',
      
    },
    now:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        //backgroundColor:'tomato'
    },
    chart:{
        flex:8,
        //backgroundColor:'red'
    }
});

export default StatScreen;
