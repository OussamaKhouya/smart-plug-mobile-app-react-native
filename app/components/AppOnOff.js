import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import {
  AntDesign,
  FontAwesome,
  Entypo,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import fonts from "../config/fonts";
import colors from "../config/colors";

export default class AppOnOff extends Component {
  state = {
    plugState: "OFF", // ON, Wait
  };
  // changePlugStatus = async () => {
  //   if (this.state.plugState === "OFF") {
  //     this.setState({ plugState: "Wait" });
  //     setTimeout(() => this.setState({ plugState: "ON" }), 3000);
  //   } else if (this.state.plugState === "ON") {
  //     this.setState({ plugState: "Wait" });
  //     setTimeout(() => this.setState({ plugState: "OFF" }), 3000);
  //   }
  // };
  changePlugStatus = async () => {
    if (this.state.plugState === "OFF") {
      this.setState({ plugState: "Wait" });
      const fetchNow = function () {
        fetch(
          "https://api.thingspeak.com/update?api_key=NS8W5PWJY92J9436&field1=1"
        )
          .then((response) => {
            return response.text();
          })
          .then(function (text) {
            console.log(text);
            if (text == 0) fetchNow();
          });
      };
      fetchNow();

      setTimeout(() => this.setState({ plugState: "ON" }), 15000);
    } else if (this.state.plugState === "ON") {
      this.setState({ plugState: "Wait" });
      const fetchNow = function () {
        fetch(
          "https://api.thingspeak.com/update?api_key=NS8W5PWJY92J9436&field1=0"
        )
          .then((response) => {
            return response.text();
          })
          .then(function (Entier) {
            console.log(Entier);
            if (Entier == 0) fetchNow();
          });
      };
      fetchNow();
      
      setTimeout(() => this.setState({ plugState: "OFF" }), 15000);
    }
  };

  // switchOn(setWaitGreen) {
  //   setWaitGreen(true);
  //   const fetchNow = function () {
  //     fetch(
  //       "https://api.thingspeak.com/update?api_key=NS8W5PWJY92J9436&field1=1"
  //     )
  //       .then((response) => {
  //         return response.text();
  //       })
  //       .then(function (text) {
  //         console.log(text);
  //         if (text == 0) fetchNow();
  //       });
  //   };
  //   fetchNow();
  //   setTimeout(() => setWaitGreen(false), 14000);
  // }

  // async switchOff(setWaitRed) {
  //   setWaitRed(true);
  //   const fetchNow = function () {
  //     fetch(
  //       "https://api.thingspeak.com/update?api_key=NS8W5PWJY92J9436&field1=0"
  //     )
  //       .then((response) => {
  //         return response.text();
  //       })
  //       .then(function (Entier) {
  //         console.log(Entier);
  //         if (Entier == 0) fetchNow();
  //       });
  //   };
  //   fetchNow();
  //   setTimeout(() => setWaitRed(false), 14000);
  // }
  

  render() {
    const plugSt = this.state.plugState;
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image source={this.props.icon} style={styles.imgIcon} />
          <Text style={styles.textIcon}>{this.props.name}</Text>
        </View>
        <View style={styles.onOff}>
          <TouchableOpacity
            style={styles.onOffButton}
            onPress={this.changePlugStatus}
          >
            <FontAwesome
              name="power-off"
              size={50}
              color={
                plugSt === "ON"
                  ? "#FFF"
                  : plugSt === "OFF"
                  ? colors.bgColor11
                  : "#c1c1c1"
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "15%",
    marginBottom: "2%",
    marginHorizontal: "2%",
  },
  iconContainer: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    backgroundColor: colors.bgColor10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imgIcon: {
    width: 40,
    height: "50%",
    resizeMode: "contain",
    //marginBottom: "5%",
  },
  textIcon: {
    fontFamily: fonts.RalewayEL,
    fontSize: 12,
    color: "#CCC7",
  },
  onOff: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    backgroundColor: colors.bgColor10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  onOffButton: {},
});

AppOnOff.defaultProps = {
  name: "Lamp de Lamp",
};
