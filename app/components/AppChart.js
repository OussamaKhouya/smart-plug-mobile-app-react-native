import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import {
  LineChart,
} from "react-native-chart-kit";

import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";

function actualiser(setDataX, setDataY) {
  const url =
    "https://api.thingspeak.com/channels/1347195/fields/1.json?api_key=T2I3OY33LCUPH0HH";
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (obj) {
      let len,
        x,
        y,
        y1,
        y2,
        DataX = [],
        DataY = [],
        Last5;
      len = obj.feeds.length;
      for (let i = len - 5; i < len; i++) {
        x = Number(obj.feeds[i].field1);
        y1 = obj.feeds[i].created_at.split("T");
        y2 = y1[1].split(":");
        y = [String(y2[0]), String(y2[1])];
        DataX.push(y);
        DataY.push(x);
      }
      console.log(DataX, DataY);
      setDataX(DataX);
      setDataY(DataY);
    })
    .catch(function (error) {
      console.log("Problem : ", error);
    });
}

function AChart({ title,navigation,XValues, YValues }) {
  const [DataX, setDataX] = useState(XValues);
  const [DataY, setDataY] = useState(YValues);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     //actualiser(setDataX, setDataY)
  //   });

  //   return unsubscribe;
  // }, [navigation]);


  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: DataX,
          datasets: [
            {
              data: DataY,
            },
          ],
        }}
        width={Dimensions.get("window").width*0.90} // from react-native
        height={Dimensions.get("window").height*0.54}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        formatXLabel={(Y) => String(Y[0]+'h'+Y[1]) }
        chartConfig={{
          
          backgroundGradientFrom: colors.bgColor10,
          backgroundGradientTo: colors.bgColor10,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "1",
            strokeWidth: "3",
            stroke: "#000",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 5,
        }}
      />
      <TouchableOpacity
        style={{ fontSize: 24, color: "#6cb9e0" }}
        onPress={actualiser.bind(this, setDataX, setDataY)}
      >
        <EvilIcons name="refresh" size={60} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: "center",
  },
});

export default AChart;
